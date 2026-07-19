import type { SendCallsResult } from "../../../../wallets/eip5792/send-calls.js";
/**
 * A hook to wait for the receipt of eip5792 calls.
 * @param options - The options for the hook.
 * @returns A useQuery object.
 * @example
 * ```tsx
 * const { data: receipt, isLoading } = useWaitForCallsReceipt({ id, client, chain, wallet });
 * ```
 *
 * Example with useSendCalls:
 * ```tsx
 * const { mutate: sendCalls, data } = useSendCalls();
 * const { data: receipt, isLoading } = useWaitForCallsReceipt(data);
 * ```
 * @extension EIP5792
 */
export declare function useWaitForCallsReceipt(args: (SendCallsResult & {
    maxBlocksWaitTime?: number;
    queryOptions?: {
        enabled?: boolean;
    };
}) | undefined): import("@tanstack/react-query").UseQueryResult<{
    chainId: number;
    id: string;
    atomic: boolean;
    receipts?: import("../../../../wallets/eip5792/types.js").WalletCallReceipt<bigint, "success" | "reverted">[] | undefined;
    version: string;
    statusCode: number;
    status: "pending" | "success" | "failure" | undefined;
}, Error>;
//# sourceMappingURL=useWaitForCallsReceipt.d.ts.map