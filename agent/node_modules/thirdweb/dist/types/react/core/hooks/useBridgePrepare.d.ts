import type { prepare as BuyPrepare } from "../../../bridge/Buy.js";
import type { prepare as OnrampPrepare } from "../../../bridge/Onramp.js";
import type { prepare as SellPrepare } from "../../../bridge/Sell.js";
import type { prepare as TransferPrepare } from "../../../bridge/Transfer.js";
/**
 * Union type for different Bridge prepare request types
 */
export type BridgePrepareRequest = ({
    type: "buy";
} & BuyPrepare.Options) | ({
    type: "sell";
} & SellPrepare.Options) | ({
    type: "transfer";
} & TransferPrepare.Options) | ({
    type: "onramp";
} & OnrampPrepare.Options);
/**
 * Union type for different Bridge prepare result types
 */
export type BridgePrepareResult = ({
    type: "buy";
} & BuyPrepare.Result) | ({
    type: "sell";
} & SellPrepare.Result) | ({
    type: "transfer";
} & TransferPrepare.Result) | ({
    type: "onramp";
} & OnrampPrepare.Result);
/**
 * Parameters for the useBridgePrepare hook
 */
export type UseBridgePrepareParams = BridgePrepareRequest & {
    /**
     * Whether to enable the query. Useful for conditional fetching.
     * @default true
     */
    enabled?: boolean;
};
/**
 * Hook that prepares bridge transactions with caching and retry logic
 *
 * @param params - Parameters for preparing bridge transactions including type and specific options
 * @returns React Query result with prepared transaction data, loading state, and error handling
 *
 * @example
 * ```tsx
 * // Buy preparation
 * const { data: preparedBuy, isLoading, error } = useBridgePrepare({
 *   type: "buy",
 *   client: thirdwebClient,
 *   originChainId: 1,
 *   originTokenAddress: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
 *   destinationChainId: 137,
 *   destinationTokenAddress: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
 *   amount: parseEther("1"),
 *   sender: "0x...",
 *   receiver: "0x..."
 * });
 *
 * // Transfer preparation
 * const { data: preparedTransfer } = useBridgePrepare({
 *   type: "transfer",
 *   client: thirdwebClient,
 *   originChainId: 1,
 *   originTokenAddress: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
 *   destinationChainId: 137,
 *   destinationTokenAddress: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
 *   amount: 1000000n,
 *   sender: "0x...",
 *   receiver: "0x..."
 * });
 * ```
 */
export declare function useBridgePrepare(params: UseBridgePrepareParams): import("@tanstack/react-query").UseQueryResult<BridgePrepareResult, Error>;
//# sourceMappingURL=useBridgePrepare.d.ts.map