"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTokenBalance = useTokenBalance;
const utils_js_1 = require("../../../../../chains/utils.js");
const addresses_js_1 = require("../../../../../constants/addresses.js");
const address_js_1 = require("../../../../../utils/address.js");
const useWalletBalance_js_1 = require("../../../../core/hooks/others/useWalletBalance.js");
function useTokenBalance(props) {
    return (0, useWalletBalance_js_1.useWalletBalance)({
        address: props.walletAddress,
        chain: props.chainId ? (0, utils_js_1.defineChain)(props.chainId) : undefined,
        client: props.client,
        tokenAddress: props.tokenAddress
            ? (0, address_js_1.getAddress)(props.tokenAddress) === (0, address_js_1.getAddress)(addresses_js_1.NATIVE_TOKEN_ADDRESS)
                ? undefined
                : (0, address_js_1.getAddress)(props.tokenAddress)
            : undefined,
    });
}
//# sourceMappingURL=token-balance.js.map