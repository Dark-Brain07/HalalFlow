"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServerWallets = getServerWallets;
const engine_1 = require("@thirdweb-dev/engine");
const viem_1 = require("viem");
const domains_js_1 = require("../utils/domains.js");
const fetch_js_1 = require("../utils/fetch.js");
/**
 * List all server wallets.
 * @param params - The parameters for the server wallet.
 * @param params.client - The thirdweb client to use.
 * @returns an array of server wallets with their signer address and predicted smart account address.
 * @engine
 * @example
 * ```ts
 * import { Engine } from "thirdweb";
 *
 * const serverWallets = await Engine.getServerWallets({
 *   client,
 * });
 * console.log(serverWallets);
 * ```
 */
async function getServerWallets(params) {
    const { client } = params;
    const result = await (0, engine_1.listAccounts)({
        baseUrl: (0, domains_js_1.getThirdwebBaseUrl)("engineCloud"),
        bodySerializer: viem_1.stringify,
        fetch: (0, fetch_js_1.getClientFetch)(client),
        query: {
            limit: params.limit,
            page: params.page,
        },
    });
    if (result.error) {
        throw new Error(`Error listing server wallets: ${(0, viem_1.stringify)(result.error)}`);
    }
    const data = result.data?.result;
    if (!data) {
        throw new Error("No server wallets found");
    }
    return data;
}
//# sourceMappingURL=list-server-wallets.js.map