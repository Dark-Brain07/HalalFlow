import type { status as OnrampStatus } from "../../../bridge/OnrampStatus.js";
import { ApiError } from "../../../bridge/types/Errors.js";
import type { RouteStep } from "../../../bridge/types/Route.js";
import type { Status } from "../../../bridge/types/Status.js";
import type { ThirdwebClient } from "../../../client/client.js";
import type { Wallet } from "../../../wallets/interfaces/wallet.js";
import type { WindowAdapter } from "../adapters/WindowAdapter.js";
import type { BridgePrepareResult } from "./useBridgePrepare.js";
/**
 * Type for completed status results from Bridge.status and Onramp.status
 */
export type CompletedStatusResult = ({
    type: "buy";
} & Extract<Status, {
    status: "COMPLETED";
}>) | ({
    type: "sell";
} & Extract<Status, {
    status: "COMPLETED";
}>) | ({
    type: "transfer";
} & Extract<Status, {
    status: "COMPLETED";
}>) | ({
    type: "onramp";
} & Extract<OnrampStatus.Result, {
    status: "COMPLETED";
}>);
/**
 * Options for the step executor hook
 */
interface StepExecutorOptions {
    preparedQuote: BridgePrepareResult;
    /** Wallet instance providing getAccount() & sendTransaction */
    wallet?: Wallet;
    /** Window adapter for opening on-ramp URLs (web / RN) */
    windowAdapter: WindowAdapter;
    /** Thirdweb client for API calls */
    client: ThirdwebClient;
    /** Auto start execution as soon as hook mounts */
    autoStart?: boolean;
    /** Callback when all steps complete successfully - receives array of all completed status results */
    onComplete?: (completedStatuses: CompletedStatusResult[]) => void;
}
/**
 * Public return type of useStepExecutor
 */
interface StepExecutorResult {
    currentStep?: RouteStep;
    currentTxIndex?: number;
    progress: number;
    onrampStatus?: "pending" | "executing" | "completed" | "failed";
    executionState: "idle" | "executing" | "auto-starting";
    steps?: RouteStep[];
    error?: ApiError;
    start: () => void;
    cancel: () => void;
    retry: () => void;
}
/**
 * Hook that sequentially executes prepared steps.
 * NOTE: initial implementation only exposes progress + basic state machine. Actual execution logic will follow in later subtasks.
 */
export declare function useStepExecutor(options: StepExecutorOptions): StepExecutorResult;
export {};
//# sourceMappingURL=useStepExecutor.d.ts.map