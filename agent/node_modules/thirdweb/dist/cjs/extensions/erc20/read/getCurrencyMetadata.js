"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrencyMetadata = getCurrencyMetadata;
const zod_1 = require("zod");
const addresses_js_1 = require("../../../constants/addresses.js");
const name_js_1 = require("../../common/read/name.js");
const symbol_js_1 = require("../../common/read/symbol.js");
const decimals_js_1 = require("../__generated__/IERC20/read/decimals.js");
const NATIVE_CURRENCY_SCHEMA = zod_1.z
    .object({
    name: zod_1.z.string().default("Ether"),
    symbol: zod_1.z.string().default("ETH"),
    decimals: zod_1.z.number().default(18),
})
    .default({
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
});
/**
 * Retrieves the metadata of a currency.
 * @param options - The options for the transaction.
 * @returns A promise that resolves to an object containing the currency metadata.
 * @extension ERC20
 * @example
 * ```ts
 * import { getCurrencyMetadata } from "thirdweb/extensions/erc20";
 *
 * const currencyMetadata = await getCurrencyMetadata({ contract });
 * ```
 */
async function getCurrencyMetadata(options) {
    // if the contract is the native token, return the native currency metadata
    if ((0, addresses_js_1.isNativeTokenAddress)(options.contract.address)) {
        // if the chain definition does not have a native currency, attempt to fetch it from the API
        if (!options.contract.chain.nativeCurrency ||
            !options.contract.chain.nativeCurrency.name ||
            !options.contract.chain.nativeCurrency.symbol ||
            !options.contract.chain.nativeCurrency.decimals) {
            try {
                const { getChainMetadata } = await Promise.resolve().then(() => require("../../../chains/utils.js"));
                const chain = await getChainMetadata(options.contract.chain);
                // return the native currency of the chain
                return NATIVE_CURRENCY_SCHEMA.parse({
                    ...chain.nativeCurrency,
                    ...options.contract.chain.nativeCurrency,
                });
            }
            catch {
                // no-op, fall through to the default values below
            }
        }
        return NATIVE_CURRENCY_SCHEMA.parse(options.contract.chain.nativeCurrency);
    }
    try {
        const [name_, symbol_, decimals_] = await Promise.all([
            (0, name_js_1.name)(options).catch(() => ""),
            (0, symbol_js_1.symbol)(options),
            (0, decimals_js_1.decimals)(options),
        ]);
        return {
            decimals: decimals_,
            name: name_,
            symbol: symbol_,
        };
    }
    catch (e) {
        throw new Error(`Invalid currency token: ${e}`);
    }
}
//# sourceMappingURL=getCurrencyMetadata.js.map