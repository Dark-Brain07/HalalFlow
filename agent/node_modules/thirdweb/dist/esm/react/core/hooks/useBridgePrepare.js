import { useQuery } from "@tanstack/react-query";
import * as Bridge from "../../../bridge/index.js";
import { ApiError } from "../../../bridge/types/Errors.js";
import { stringify } from "../../../utils/json.js";
import { mapBridgeError } from "../errors/mapBridgeError.js";
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
export function useBridgePrepare(params) {
    const { enabled = true, type, ...prepareParams } = params;
    return useQuery({
        enabled: enabled && !!prepareParams.client,
        gcTime: 5 * 60 * 1000,
        queryFn: async () => {
            switch (type) {
                case "buy": {
                    const result = await Bridge.Buy.prepare(prepareParams);
                    return { type: "buy", ...result };
                }
                case "sell": {
                    const result = await Bridge.Sell.prepare(prepareParams);
                    return { type: "sell", ...result };
                }
                case "transfer": {
                    const result = await Bridge.Transfer.prepare(prepareParams);
                    return { type: "transfer", ...result };
                }
                case "onramp": {
                    const result = await Bridge.Onramp.prepare(prepareParams);
                    return { type: "onramp", ...result };
                }
                default:
                    throw new Error(`Unsupported bridge prepare type: ${type}`);
            }
        },
        queryKey: ["bridge-prepare", type, stringify(prepareParams)], // 2 minutes - prepared quotes have shorter validity
        retry: (failureCount, error) => {
            // Handle both ApiError and generic Error instances
            if (error instanceof ApiError) {
                const bridgeError = mapBridgeError(error);
                // Don't retry on client-side errors (4xx)
                if (bridgeError.statusCode &&
                    bridgeError.statusCode >= 400 &&
                    bridgeError.statusCode < 500) {
                    return false;
                }
            }
            // Retry up to 2 times for prepared quotes (they're more time-sensitive)
            return failureCount < 2;
        }, // 5 minutes garbage collection
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
        staleTime: 2 * 60 * 1000, // Exponential backoff, max 10s
    });
}
//# sourceMappingURL=useBridgePrepare.js.map