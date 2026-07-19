"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTokenInfo = useTokenInfo;
const react_query_1 = require("@tanstack/react-query");
const contract_js_1 = require("../../../../contract/contract.js");
/**
 * @internal
 */
function useTokenInfo(options) {
    const { chain, tokenAddress, client } = options;
    return (0, react_query_1.useQuery)({
        enabled: !!chain && !!client,
        queryFn: async () => {
            // erc20 case
            if (tokenAddress) {
                const { getCurrencyMetadata } = await Promise.resolve().then(() => require("../../../../extensions/erc20/read/getCurrencyMetadata.js"));
                const result = await getCurrencyMetadata({
                    contract: (0, contract_js_1.getContract)({ address: tokenAddress, chain, client }),
                });
                return result;
            }
            const { getChainDecimals, getChainNativeCurrencyName, getChainSymbol } = await Promise.resolve().then(() => require("../../../../chains/utils.js"));
            const [nativeSymbol, nativeDecimals, nativeName] = await Promise.all([
                getChainSymbol(chain),
                getChainDecimals(chain),
                getChainNativeCurrencyName(chain),
            ]);
            const result = {
                decimals: nativeDecimals,
                name: nativeName,
                symbol: nativeSymbol,
            };
            return result;
        },
        queryKey: ["tokenInfo", chain?.id || -1, { tokenAddress }],
    });
}
//# sourceMappingURL=useTokenInfo.js.map