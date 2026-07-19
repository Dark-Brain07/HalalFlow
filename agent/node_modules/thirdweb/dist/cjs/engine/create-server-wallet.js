"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServerWallet = createServerWallet;
const engine_1 = require("@thirdweb-dev/engine");
const viem_1 = require("viem");
const domains_js_1 = require("../utils/domains.js");
const fetch_js_1 = require("../utils/fetch.js");
/**
 * Create a new server wallet.
 * @param params - The parameters for the server wallet.
 * @param params.client - The thirdweb client to use.
 * @param params.label - The label for the server wallet.
 * @returns The server wallet signer address and the predicted smart account address.
 * @engine
 * @example
 * ```ts
 * import { Engine } from "thirdweb";
 *
 * const serverWallet = await Engine.createServerWallet({
 *   client,
 *   label: "My Server Wallet",
 * });
 * console.log(serverWallet.address);
 * console.log(serverWallet.smartAccountAddress);
 * ```
 */
async function createServerWallet(params) {
    const { client, label } = params;
    const result = await (0, engine_1.createAccount)({
        baseUrl: (0, domains_js_1.getThirdwebBaseUrl)("engineCloud"),
        body: {
            label,
        },
        bodySerializer: viem_1.stringify,
        fetch: (0, fetch_js_1.getClientFetch)(client),
    });
    if (result.error) {
        throw new Error(`Error creating server wallet with label ${label}: ${(0, viem_1.stringify)(result.error)}`);
    }
    const data = result.data?.result;
    if (!data) {
        throw new Error(`No server wallet created with label ${label}`);
    }
    return data;
}
//# sourceMappingURL=create-server-wallet.js.map