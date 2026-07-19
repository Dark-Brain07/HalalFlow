export function invalidateWalletBalance(queryClient, chainId) {
    queryClient.invalidateQueries({
        queryKey: chainId ? ["walletBalance", chainId] : ["walletBalance"],
    });
    queryClient.invalidateQueries({
        queryKey: chainId
            ? ["internal_account_balance", chainId]
            : ["internal_account_balance"],
    });
    queryClient.invalidateQueries({
        queryKey: chainId ? ["nfts", chainId] : ["nfts"],
    });
    queryClient.invalidateQueries({
        queryKey: chainId ? ["tokens", chainId] : ["tokens"],
    });
}
//# sourceMappingURL=invalidateWalletBalance.js.map