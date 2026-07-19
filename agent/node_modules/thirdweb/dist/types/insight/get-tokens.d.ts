import type { GetV1TokensData } from "@thirdweb-dev/insight";
import type { Chain } from "../chains/types.js";
import type { ThirdwebClient } from "../client/client.js";
import type { GetWalletBalanceResult } from "../wallets/utils/getWalletBalance.js";
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
export declare function getOwnedTokens(args: {
    client: ThirdwebClient;
    chains: Chain[];
    ownerAddress: string;
    tokenAddresses?: string[];
    queryOptions?: Omit<GetV1TokensData["query"], "owner_address" | "chain_id" | "chain">;
}): Promise<GetWalletBalanceResult[]>;
//# sourceMappingURL=get-tokens.d.ts.map