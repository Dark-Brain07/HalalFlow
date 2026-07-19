"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSiweAuth = useSiweAuth;
const react_query_1 = require("@tanstack/react-query");
const utils_js_1 = require("../../../../chains/utils.js");
/**
 * @internal
 */
function useSiweAuth(activeWallet, activeAccount, authOptions) {
    const requiresAuth = !!authOptions;
    const queryClient = (0, react_query_1.useQueryClient)();
    const isLoggedInQuery = (0, react_query_1.useQuery)({
        enabled: requiresAuth && !!activeAccount?.address,
        gcTime: 0,
        placeholderData: false,
        queryFn: () => {
            // these cases should never be hit but just in case...
            if (!authOptions || !activeAccount?.address) {
                return false;
            }
            return authOptions.isLoggedIn(activeAccount.address);
        },
        queryKey: ["siwe_auth", "isLoggedIn", activeAccount?.address],
        refetchOnWindowFocus: false,
    });
    const loginMutation = (0, react_query_1.useMutation)({
        mutationFn: async () => {
            if (!authOptions) {
                throw new Error("No auth options provided");
            }
            if (!activeWallet) {
                throw new Error("No active wallet");
            }
            const chain = activeWallet.getChain();
            if (!chain) {
                throw new Error("No active chain");
            }
            if (!activeAccount) {
                throw new Error("No active account");
            }
            const [payload, { signLoginPayload }] = await Promise.all([
                authOptions.getLoginPayload({
                    address: activeAccount.address,
                    chainId: chain.id,
                }),
                Promise.resolve().then(() => require("../../../../auth/core/sign-login-payload.js")),
            ]);
            if (payload.chain_id && Number(payload.chain_id) !== chain.id) {
                await activeWallet.switchChain((0, utils_js_1.getCachedChain)(Number(payload.chain_id)));
            }
            const signedPayload = await signLoginPayload({
                account: activeAccount,
                payload,
            });
            return await authOptions.doLogin(signedPayload);
        },
        mutationKey: ["siwe_auth", "login", activeAccount?.address],
        onSuccess: () => {
            return queryClient.invalidateQueries({
                queryKey: ["siwe_auth", "isLoggedIn"],
            });
        },
    });
    const logoutMutation = (0, react_query_1.useMutation)({
        mutationFn: async () => {
            if (!authOptions) {
                throw new Error("No auth options provided");
            }
            return await authOptions.doLogout();
        },
        mutationKey: ["siwe_auth", "logout", activeAccount?.address],
        onSuccess: () => {
            return queryClient.invalidateQueries({
                queryKey: ["siwe_auth", "isLoggedIn"],
            });
        },
    });
    return {
        // login
        doLogin: loginMutation.mutateAsync,
        // logout
        doLogout: logoutMutation.mutateAsync,
        isLoading: isLoggedInQuery.isFetching,
        // checking if logged in
        isLoggedIn: isLoggedInQuery.data,
        isLoggingIn: loginMutation.isPending,
        isLoggingOut: logoutMutation.isPending,
        isPending: isLoggedInQuery.isPending,
        // is auth even enabled
        requiresAuth,
    };
}
//# sourceMappingURL=useSiweAuth.js.map