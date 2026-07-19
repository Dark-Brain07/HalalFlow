"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useActiveWalletInfo = useActiveWalletInfo;
exports.useTokenPrice = useTokenPrice;
const react_query_1 = require("@tanstack/react-query");
const react_1 = require("react");
const get_token_js_1 = require("../../../../../pay/convert/get-token.js");
const useActiveAccount_js_1 = require("../../../../core/hooks/wallets/useActiveAccount.js");
const useActiveWallet_js_1 = require("../../../../core/hooks/wallets/useActiveWallet.js");
const useActiveWalletChain_js_1 = require("../../../../core/hooks/wallets/useActiveWalletChain.js");
function useActiveWalletInfo(activeWalletOverride) {
    const activeAccount = (0, useActiveAccount_js_1.useActiveAccount)();
    const activeWallet = (0, useActiveWallet_js_1.useActiveWallet)();
    const activeChain = (0, useActiveWalletChain_js_1.useActiveWalletChain)();
    return (0, react_1.useMemo)(() => {
        const wallet = activeWalletOverride || activeWallet;
        const chain = activeWalletOverride?.getChain() || activeChain;
        const account = activeWalletOverride?.getAccount() || activeAccount;
        return wallet && chain && account
            ? {
                activeChain: chain,
                activeWallet: wallet,
                activeAccount: account,
            }
            : undefined;
    }, [activeAccount, activeWallet, activeChain, activeWalletOverride]);
}
function useTokenPrice(options) {
    return (0, react_query_1.useQuery)({
        queryKey: ["token-price", options.token],
        enabled: !!options.token,
        queryFn: () => {
            if (!options.token) {
                throw new Error("Token is required");
            }
            return (0, get_token_js_1.getToken)(options.client, options.token.tokenAddress, options.token.chainId);
        },
        refetchOnMount: false,
        retry: false,
        refetchOnWindowFocus: false,
    });
}
//# sourceMappingURL=hooks.js.map