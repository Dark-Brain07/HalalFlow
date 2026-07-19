import { ethereum } from "../../../../chains/chain-definitions/ethereum.js";
import { socialAuthOptions, } from "../../../../wallets/types.js";
import { create7702MinimalAccount } from "../eip7702/minimal-account.js";
/**
 * Checks if the provided wallet is an in-app wallet.
 *
 * @param wallet - The wallet to check.
 * @returns True if the wallet is an in-app wallet, false otherwise.
 */
export function isInAppWallet(wallet) {
    return wallet.id === "inApp" || wallet.id === "embedded";
}
/**
 * @internal
 */
export async function connectInAppWallet(options, createOptions, connector) {
    if (
    // if auth mode is not specified, the default is popup
    createOptions?.auth?.mode !== "popup" &&
        createOptions?.auth?.mode !== undefined &&
        connector.authenticateWithRedirect) {
        const strategy = options.strategy;
        if (socialAuthOptions.includes(strategy)) {
            await connector.authenticateWithRedirect(strategy, createOptions?.auth?.mode, createOptions?.auth?.redirectUrl);
        }
    }
    // If we don't have authenticateWithRedirect then it's likely react native, so the default is to redirect and we can carry on
    // IF WE EVER ADD MORE CONNECTOR TYPES, this could cause redirect to be ignored despite being specified
    // TODO: In V6, make everything redirect auth
    const authResult = await connector.connect(options);
    const authAccount = authResult.user.account;
    return createInAppAccount({
        authAccount,
        client: options.client,
        createOptions,
        desiredChain: options.chain,
    });
}
/**
 * @internal
 */
export async function autoConnectInAppWallet(options, createOptions, connector) {
    if (options.authResult && connector.loginWithAuthToken) {
        await connector.loginWithAuthToken(options.authResult);
    }
    const user = await getAuthenticatedUser(connector);
    if (!user) {
        throw new Error("Failed to authenticate user.");
    }
    const authAccount = user.account;
    return createInAppAccount({
        authAccount,
        client: options.client,
        createOptions,
        desiredChain: options.chain,
    });
}
async function convertToSmartAccount(options) {
    const { connectSmartAccount } = await import("../../../smart/index.js");
    return connectSmartAccount({
        chain: options.chain,
        client: options.client,
        personalAccount: options.authAccount,
    }, options.smartAccountOptions);
}
async function getAuthenticatedUser(connector) {
    const user = await connector.getUser();
    switch (user.status) {
        case "Logged In, Wallet Initialized": {
            return user;
        }
    }
    return undefined;
}
async function createInAppAccount(options) {
    const { createOptions, authAccount, desiredChain, client } = options;
    let smartAccountOptions;
    let eip7702;
    const executionMode = createOptions && "executionMode" in createOptions
        ? createOptions.executionMode
        : undefined;
    if (executionMode) {
        if (executionMode.mode === "EIP4337") {
            smartAccountOptions = executionMode.smartAccount;
        }
        else if (executionMode.mode === "EIP7702") {
            eip7702 = executionMode;
        }
    }
    // backwards compatibility
    if (createOptions &&
        "smartAccount" in createOptions &&
        createOptions?.smartAccount) {
        smartAccountOptions = createOptions.smartAccount;
    }
    if (smartAccountOptions) {
        const [account, chain] = await convertToSmartAccount({
            authAccount,
            chain: desiredChain,
            client,
            smartAccountOptions,
        });
        return { account, adminAccount: authAccount, chain };
    }
    if (eip7702) {
        const chain = desiredChain;
        if (!chain) {
            throw new Error("Chain is required for EIP-7702 execution, pass a chain when connecting the inAppWallet.");
        }
        const account = create7702MinimalAccount({
            adminAccount: authAccount,
            client,
            sponsorGas: eip7702.sponsorGas,
        });
        return {
            account,
            adminAccount: authAccount,
            chain,
        };
    }
    return { account: authAccount, chain: desiredChain || ethereum };
}
//# sourceMappingURL=index.js.map