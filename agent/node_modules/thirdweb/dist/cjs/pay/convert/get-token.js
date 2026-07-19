"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getToken = getToken;
const Token_js_1 = require("../../bridge/Token.js");
const withCache_js_1 = require("../../utils/promise/withCache.js");
async function getToken(client, tokenAddress, chainId) {
    return (0, withCache_js_1.withCache)(async () => {
        const result = await (0, Token_js_1.tokens)({
            chainId,
            client,
            tokenAddress,
        });
        const token = result[0];
        if (!token) {
            // Attempt to add the token
            const tokenResult = await (0, Token_js_1.add)({
                chainId,
                client,
                tokenAddress,
            }).catch(() => {
                throw new Error("Token not supported");
            });
            return tokenResult;
        }
        return token;
    }, {
        cacheKey: `get-token-price-${tokenAddress}-${chainId}`,
        cacheTime: 1000 * 60, // 1 minute
    });
}
//# sourceMappingURL=get-token.js.map