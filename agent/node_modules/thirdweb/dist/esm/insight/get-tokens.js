/**
 * Get ERC20 tokens owned by an address
 * @example
 * ```ts
 * import { Insight } from "thirdweb";
 *
 * const tokens = await Insight.getOwnedTokens({
 *   client,
 *   chains: [sepolia],
 *   ownerAddress: "0x1234567890123456789012345678901234567890",
 * });
 * ```
 * @insight
 */
export async function getOwnedTokens(args) {
    const [{ getV1Tokens }, { getThirdwebDomains }, { getClientFetch }, { assertInsightEnabled }, { stringify },] = await Promise.all([
        import("@thirdweb-dev/insight"),
        import("../utils/domains.js"),
        import("../utils/fetch.js"),
        import("./common.js"),
        import("../utils/json.js"),
    ]);
    const { client, chains, ownerAddress, tokenAddresses, queryOptions } = args;
    await assertInsightEnabled(chains);
    const defaultQueryOptions = {
        chain_id: chains.length > 0 ? chains.map((chain) => chain.id) : [1],
        include_native: "true",
        include_spam: "false",
        limit: 50,
        metadata: "true",
        owner_address: [ownerAddress],
        token_address: tokenAddresses ? tokenAddresses : undefined,
        sort_by: "balance",
        sort_order: "desc",
    };
    const result = await getV1Tokens({
        baseUrl: `https://${getThirdwebDomains().insight}`,
        fetch: getClientFetch(client),
        query: {
            ...defaultQueryOptions,
            ...queryOptions,
        },
    });
    if (result.error) {
        throw new Error(`${result.response.status} ${result.response.statusText} - ${result.error ? stringify(result.error) : "Unknown error"}`);
    }
    return transformOwnedToken(result.data?.data ?? []);
}
async function transformOwnedToken(token) {
    const { toTokens } = await import("../utils/units.js");
    return token.map((t) => {
        const decimals = t.decimals ?? 18;
        const value = BigInt(t.balance);
        return {
            chainId: t.chain_id,
            decimals,
            displayValue: toTokens(value, decimals),
            name: t.name ?? "",
            symbol: t.symbol ?? "",
            tokenAddress: t.token_address,
            value,
        };
    });
}
//# sourceMappingURL=get-tokens.js.map