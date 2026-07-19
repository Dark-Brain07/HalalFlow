import { useQuery } from "@tanstack/react-query";
import { getContract } from "../../../../contract/contract.js";
/**
 * @internal
 */
export function useTokenInfo(options) {
    const { chain, tokenAddress, client } = options;
    return useQuery({
        enabled: !!chain && !!client,
        queryFn: async () => {
            // erc20 case
            if (tokenAddress) {
                const { getCurrencyMetadata } = await import("../../../../extensions/erc20/read/getCurrencyMetadata.js");
                const result = await getCurrencyMetadata({
                    contract: getContract({ address: tokenAddress, chain, client }),
                });
                return result;
            }
            const { getChainDecimals, getChainNativeCurrencyName, getChainSymbol } = await import("../../../../chains/utils.js");
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