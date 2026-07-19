import { isNativeTokenAddress } from "../../constants/addresses.js";
import { toTokens } from "../units.js";
export async function resolveCurrencyValue(options) {
    if (isNativeTokenAddress(options.currencyAddress)) {
        const [name, decimals, symbol] = await Promise.all([
            options.chain.nativeCurrency?.name ??
                import("../../chains/utils.js").then(({ getChainNativeCurrencyName }) => getChainNativeCurrencyName(options.chain)),
            options.chain.nativeCurrency?.decimals ??
                import("../../chains/utils.js").then(({ getChainDecimals }) => getChainDecimals(options.chain)),
            options.chain.nativeCurrency?.symbol ??
                import("../../chains/utils.js").then(({ getChainSymbol }) => getChainSymbol(options.chain)),
        ]);
        return {
            decimals,
            displayValue: toTokens(options.wei, decimals),
            name,
            symbol,
            value: options.wei,
        };
    }
    // else it's a erc20
    const [{ getContract }, { getCurrencyMetadata }] = await Promise.all([
        import("../../contract/contract.js"),
        import("../../extensions/erc20/read/getCurrencyMetadata.js"),
    ]);
    const contract = getContract({
        address: options.currencyAddress,
        chain: options.chain,
        client: options.client,
    });
    const metadata = await getCurrencyMetadata({ contract });
    return {
        decimals: metadata.decimals,
        displayValue: toTokens(options.wei, metadata.decimals),
        name: metadata.name,
        symbol: metadata.symbol,
        value: options.wei,
    };
}
//# sourceMappingURL=resolve-currency-value.js.map