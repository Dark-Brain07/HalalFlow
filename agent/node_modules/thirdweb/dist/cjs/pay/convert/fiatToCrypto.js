"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertFiatToCrypto = convertFiatToCrypto;
const address_js_1 = require("../../utils/address.js");
const get_token_js_1 = require("./get-token.js");
/**
 * Convert a fiat value to a token.
 * Currently only USD is supported.
 * @example
 * ### Basic usage
 * ```ts
 * import { convertFiatToCrypto } from "thirdweb/pay";
 *
 * // Convert 2 cents to ETH
 * const result = await convertFiatToCrypto({
 *   from: "USD",
 *   // the token address. For native token, use NATIVE_TOKEN_ADDRESS
 *   to: "0x...",
 *   // the chain (of the chain where the token belong to)
 *   chain: ethereum,
 *   // 2 cents
 *   fromAmount: 0.02,
 * });
 * ```
 * Result: `{ result: 0.0000057 }`
 * @buyCrypto
 */
async function convertFiatToCrypto(options) {
    const { client, to, chain, fromAmount, from } = options;
    if (Number(fromAmount) === 0) {
        return { result: 0 };
    }
    // Testnets just don't work with our current provider(s)
    if (chain.testnet === true) {
        throw new Error(`Cannot fetch price for a testnet (chainId: ${chain.id})`);
    }
    // Some provider that we are using will return `0` for unsupported token
    // so we should do some basic input validations before sending the request
    // Make sure it's a valid EVM address
    if (!(0, address_js_1.isAddress)(to)) {
        throw new Error("Invalid `to`. Expected a valid EVM contract address");
    }
    const token = await (0, get_token_js_1.getToken)(client, to, chain.id);
    const price = token?.prices[from] || 0;
    if (!token || price === 0) {
        throw new Error(`Error: Failed to fetch price for token ${to} on chainId: ${chain.id}`);
    }
    return { result: fromAmount / price };
}
//# sourceMappingURL=fiatToCrypto.js.map