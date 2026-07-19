"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTokenQuery = useTokenQuery;
const react_query_1 = require("@tanstack/react-query");
const addresses_js_1 = require("../../../../../constants/addresses.js");
const get_token_js_1 = require("../../../../../pay/convert/get-token.js");
function useTokenQuery(params) {
    return (0, react_query_1.useQuery)({
        enabled: !!params.chainId,
        queryFn: async () => {
            if (!params.chainId) {
                throw new Error("Chain ID is required");
            }
            const tokenAddress = params.tokenAddress || addresses_js_1.NATIVE_TOKEN_ADDRESS;
            const token = await (0, get_token_js_1.getToken)(params.client, tokenAddress, params.chainId).catch((err) => {
                err.message.includes("not supported") ? undefined : Promise.reject(err);
            });
            if (!token) {
                return {
                    type: "unsupported_token",
                };
            }
            return {
                token: token,
                type: "success",
            };
        },
        queryKey: ["bridge.getToken", params],
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
    });
}
//# sourceMappingURL=token-query.js.map