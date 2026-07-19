"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.siweAuthenticate = siweAuthenticate;
const sign_login_payload_js_1 = require("../../../../auth/core/sign-login-payload.js");
const utils_js_1 = require("../../../../chains/utils.js");
const fetch_js_1 = require("../../../../utils/fetch.js");
const json_js_1 = require("../../../../utils/json.js");
const getLoginPath_js_1 = require("./getLoginPath.js");
// wallets that cannot sign with ethereum mainnet, require a specific chain always
const NON_ETHEREUM_WALLETS = ["xyz.abs"];
/**
 * @internal
 */
async function siweAuthenticate(args) {
    const { wallet, client, ecosystem, chain } = args;
    const siweChain = NON_ETHEREUM_WALLETS.includes(wallet.id)
        ? chain || (0, utils_js_1.getCachedChain)(1)
        : (0, utils_js_1.getCachedChain)(1); // fallback to mainnet for SIWE for wide wallet compatibility
    // only connect if the wallet doesn't alnready have an account
    const account = wallet.getAccount() || (await wallet.connect({ chain: siweChain, client }));
    const clientFetch = (0, fetch_js_1.getClientFetch)(client, ecosystem);
    const payload = await (async () => {
        const path = (0, getLoginPath_js_1.getLoginUrl)({
            authOption: "wallet",
            client: args.client,
            ecosystem: args.ecosystem,
        });
        const res = await clientFetch(`${path}&address=${account.address}&chainId=${siweChain.id}`);
        if (!res.ok)
            throw new Error("Failed to generate SIWE login payload");
        return (await res.json());
    })();
    const { signature } = await (0, sign_login_payload_js_1.signLoginPayload)({ account, payload });
    const authResult = await (async () => {
        const path = (0, getLoginPath_js_1.getLoginCallbackUrl)({
            authOption: "wallet",
            client: args.client,
            ecosystem: args.ecosystem,
        });
        const res = await clientFetch(`${path}&signature=${signature}&payload=${encodeURIComponent(payload)}`, {
            body: (0, json_js_1.stringify)({
                payload,
                signature,
            }),
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
        });
        if (!res.ok)
            throw new Error("Failed to verify SIWE signature");
        return (await res.json());
    })();
    return authResult;
}
//# sourceMappingURL=siwe.js.map