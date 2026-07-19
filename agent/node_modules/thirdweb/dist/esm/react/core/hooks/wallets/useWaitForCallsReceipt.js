import { useQuery } from "@tanstack/react-query";
import { waitForCallsReceipt } from "../../../../wallets/eip5792/wait-for-calls-receipt.js";
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
export function useWaitForCallsReceipt(args) {
    return useQuery({
        enabled: !!args?.id && (args?.queryOptions?.enabled ?? true),
        queryFn: async () => {
            if (!args?.id) {
                throw new Error("No call result provided");
            }
            return waitForCallsReceipt({
                ...args,
                maxBlocksWaitTime: args.maxBlocksWaitTime,
            });
        },
        queryKey: ["waitForCallsReceipt", args?.id],
        retry: false,
    });
}
//# sourceMappingURL=useWaitForCallsReceipt.js.map