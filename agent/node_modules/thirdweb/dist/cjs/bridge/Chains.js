"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chains = chains;
const domains_js_1 = require("../utils/domains.js");
const fetch_js_1 = require("../utils/fetch.js");
const withCache_js_1 = require("../utils/promise/withCache.js");
const Errors_js_1 = require("./types/Errors.js");
/**
 * Retrieves supported Bridge chains.
 *
 * @example
 * ```typescript
 * import { Bridge } from "thirdweb";
 *
 * const chains = await Bridge.chains({
 *   client: thirdwebClient,
 * });
 * ```
 *
 * Returned chains might look something like:
 * ```typescript
 * [
 *   {
 *     chainId: 1,
 *     name: "Ethereum",
 *     icon: "https://assets.thirdweb.com/chains/1.png",
 *     nativeCurrency: {
 *       name: "Ether",
 *       symbol: "ETH",
 *       decimals: 18
 *     }
 *   },
 *   {
 *     chainId: 137,
 *     name: "Polygon",
 *     icon: "https://assets.thirdweb.com/chains/137.png",
 *     nativeCurrency: {
 *       name: "MATIC",
 *       symbol: "MATIC",
 *       decimals: 18
 *     }
 *   }
 * ]
 * ```
 *
 * @param options - The options for fetching chains.
 * @param options.client - Your thirdweb client.
 *
 * @returns A promise that resolves to an array of chains.
 *
 * @throws Will throw an error if there is an issue fetching the chains.
 * @bridge
 * @beta
 */
async function chains(options) {
    const { client } = options;
    return (0, withCache_js_1.withCache)(async () => {
        const clientFetch = (0, fetch_js_1.getClientFetch)(client);
        const url = new URL(`${(0, domains_js_1.getThirdwebBaseUrl)("bridge")}/v1/chains`);
        if (options.testnet) {
            url.searchParams.set("testnet", options.testnet.toString());
        }
        // set type or originChainId or destinationChainId
        if ("type" in options && options.type) {
            url.searchParams.set("type", options.type);
        }
        else if ("originChainId" in options && options.originChainId) {
            url.searchParams.set("originChainId", options.originChainId.toString());
        }
        else if ("destinationChainId" in options &&
            options.destinationChainId) {
            url.searchParams.set("destinationChainId", options.destinationChainId.toString());
        }
        const response = await clientFetch(url.toString());
        if (!response.ok) {
            const errorJson = await response.json();
            throw new Errors_js_1.ApiError({
                code: errorJson.code || "UNKNOWN_ERROR",
                correlationId: errorJson.correlationId || undefined,
                message: errorJson.message || response.statusText,
                statusCode: response.status,
            });
        }
        const { data } = await response.json();
        return data;
    }, {
        cacheKey: `bridge-chains-${JSON.stringify(options)}`,
        cacheTime: 1000 * 60 * 60 * 1, // 1 hours
    });
}
//# sourceMappingURL=Chains.js.map