"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWalletBalance = getWalletBalance;
const utils_js_1 = require("../../chains/utils.js");
const addresses_js_1 = require("../../constants/addresses.js");
const contract_js_1 = require("../../contract/contract.js");
const eth_getBalance_js_1 = require("../../rpc/actions/eth_getBalance.js");
const rpc_js_1 = require("../../rpc/rpc.js");
const address_js_1 = require("../../utils/address.js");
const units_js_1 = require("../../utils/units.js");
/**
 * Retrieves the balance of a token or native currency for a given wallet.
 * @param options - The options for retrieving the token balance.
 * @param options.address - The address for which to retrieve the balance.
 * @param options.client - The Thirdweb client to use for the request.
 * @param options.chain - The chain for which to retrieve the balance.
 * @param options.tokenAddress - (Optional) The address of the token to retrieve the balance for. If not provided, the balance of the native token will be retrieved.
 * @returns A promise that resolves to the token balance result.
 * @example
 * ```ts
 * import { getWalletBalance } from "thirdweb/wallets";
 * const balance = await getWalletBalance({ address, client, chain, tokenAddress });
 * ```
 * @walletUtils
 */
async function getWalletBalance(options) {
    const { address, client, chain } = options;
    // Scipper chain (42429) uses a wrapped native token for balance queries
    const tokenAddress = options.tokenAddress ||
        (chain.id === 42429
            ? "0x20c0000000000000000000000000000000000000"
            : undefined);
    // erc20 case
    if (tokenAddress &&
        (0, address_js_1.getAddress)(tokenAddress) !== (0, address_js_1.getAddress)(addresses_js_1.NATIVE_TOKEN_ADDRESS)) {
        // load balanceOf dynamically to avoid circular dependency
        const { getBalance } = await Promise.resolve().then(() => require("../../extensions/erc20/read/getBalance.js"));
        return getBalance({
            address,
            contract: (0, contract_js_1.getContract)({ address: tokenAddress, chain, client }),
        });
    }
    // native token case
    const rpcRequest = (0, rpc_js_1.getRpcClient)({ chain, client });
    const [nativeSymbol, nativeDecimals, nativeName, nativeBalance] = await Promise.all([
        (0, utils_js_1.getChainSymbol)(chain),
        (0, utils_js_1.getChainDecimals)(chain),
        (0, utils_js_1.getChainNativeCurrencyName)(chain),
        (0, eth_getBalance_js_1.eth_getBalance)(rpcRequest, { address }),
    ]);
    return {
        chainId: chain.id,
        decimals: nativeDecimals,
        displayValue: (0, units_js_1.toTokens)(nativeBalance, nativeDecimals),
        name: nativeName,
        symbol: nativeSymbol,
        tokenAddress: tokenAddress ?? addresses_js_1.NATIVE_TOKEN_ADDRESS,
        value: nativeBalance,
    };
}
//# sourceMappingURL=getWalletBalance.js.map