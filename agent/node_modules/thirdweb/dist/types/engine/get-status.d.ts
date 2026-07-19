import type { Chain } from "../chains/types.js";
import type { ThirdwebClient } from "../client/client.js";
import type { Hex } from "../utils/encoding/hex.js";
import type { Prettify } from "../utils/type-utils.js";
export type RevertData = {
    errorName: string;
    errorArgs: Record<string, unknown>;
};
type ExecutionResult4337Serialized = {
    status: "QUEUED";
} | {
    status: "FAILED";
    error: string;
} | {
    status: "SUBMITTED";
    monitoringStatus: "WILL_MONITOR" | "CANNOT_MONITOR";
    userOpHash: string;
} | ({
    status: "CONFIRMED";
    userOpHash: Hex;
    transactionHash: Hex;
    actualGasCost: string;
    actualGasUsed: string;
    nonce: string;
} & ({
    onchainStatus: "SUCCESS";
} | {
    onchainStatus: "REVERTED";
    revertData?: RevertData;
}));
export type ExecutionResult = Prettify<ExecutionResult4337Serialized & {
    chain: Chain;
    from: string | undefined;
    id: string;
    createdAt: string;
    confirmedAt: string | null;
    cancelledAt: string | null;
}>;
/**
 * Get the execution status of a transaction.
 * @param args - The arguments for the transaction.
 * @param args.client - The thirdweb client to use.
 * @param args.transactionId - The id of the transaction to get the status of.
 * @engine
 * @example
 * ```ts
 * import { Engine } from "thirdweb";
 *
 * const executionResult = await Engine.getTransactionStatus({
 *   client,
 *   transactionId,
 * });
 * console.log(executionResult.status);
 * ```
 */
export declare function getTransactionStatus(args: {
    client: ThirdwebClient;
    transactionId: string;
}): Promise<ExecutionResult>;
export {};
//# sourceMappingURL=get-status.d.ts.map