/**
 * internal helper functions for Base Account SDK wallet
 */
import { trackConnect } from "../../analytics/track/connect.js";
import { getCachedChainIfExists } from "../../chains/utils.js";
import { BASE_ACCOUNT } from "../constants.js";
import { createWalletEmitter } from "../wallet-emitter.js";
/**
 * @internal
 */
export function baseAccountWalletSDK(args) {
    const { createOptions } = args;
    const emitter = createWalletEmitter();
    let account;
    let chain;
    function reset() {
        account = undefined;
        chain = undefined;
    }
    let handleDisconnect = async () => { };
    let handleSwitchChain = async (newChain) => {
        chain = newChain;
    };
    const unsubscribeChainChanged = emitter.subscribe("chainChanged", (newChain) => {
        chain = newChain;
    });
    const unsubscribeDisconnect = emitter.subscribe("disconnect", () => {
        reset();
        unsubscribeChainChanged();
        unsubscribeDisconnect();
    });
    emitter.subscribe("accountChanged", (_account) => {
        account = _account;
    });
    return {
        autoConnect: async (options) => {
            const { autoConnectBaseAccountSDK } = await import("./base-account-web.js");
            const provider = await args.providerFactory();
            const [connectedAccount, connectedChain, doDisconnect, doSwitchChain] = await autoConnectBaseAccountSDK(options, emitter, provider);
            // set the states
            account = connectedAccount;
            chain = connectedChain;
            handleDisconnect = doDisconnect;
            handleSwitchChain = doSwitchChain;
            trackConnect({
                chainId: chain.id,
                client: options.client,
                walletAddress: account.address,
                walletType: BASE_ACCOUNT,
            });
            // return account
            return account;
        },
        connect: async (options) => {
            const { connectBaseAccountSDK } = await import("./base-account-web.js");
            const provider = await args.providerFactory();
            const [connectedAccount, connectedChain, doDisconnect, doSwitchChain] = await connectBaseAccountSDK(options, emitter, provider);
            // set the states
            account = connectedAccount;
            chain = connectedChain;
            handleDisconnect = doDisconnect;
            handleSwitchChain = doSwitchChain;
            trackConnect({
                chainId: chain.id,
                client: options.client,
                walletAddress: account.address,
                walletType: BASE_ACCOUNT,
            });
            // return account
            return account;
        },
        disconnect: async () => {
            reset();
            await handleDisconnect();
        },
        getAccount: () => account,
        getChain() {
            if (!chain) {
                return undefined;
            }
            chain = getCachedChainIfExists(chain.id) || chain;
            return chain;
        },
        getConfig: () => createOptions,
        id: BASE_ACCOUNT,
        subscribe: emitter.subscribe,
        switchChain: async (newChain) => {
            await handleSwitchChain(newChain);
        },
    };
}
//# sourceMappingURL=base-account-wallet.js.map