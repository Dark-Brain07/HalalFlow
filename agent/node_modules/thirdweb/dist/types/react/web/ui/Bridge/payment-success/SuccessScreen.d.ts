import type { ThirdwebClient } from "../../../../../client/client.js";
import type { WindowAdapter } from "../../../../core/adapters/WindowAdapter.js";
import type { BridgePrepareResult } from "../../../../core/hooks/useBridgePrepare.js";
import type { CompletedStatusResult } from "../../../../core/hooks/useStepExecutor.js";
type SuccessScreenProps = {
    /**
     * UI options
     */
    showContinueWithTx: boolean;
    /**
     * Prepared quote from Bridge.prepare
     */
    preparedQuote: BridgePrepareResult;
    /**
     * Completed status results from step execution
     */
    completedStatuses: CompletedStatusResult[];
    /**
     * Called when user closes the success screen
     */
    onDone: () => void;
    /**
     * Window adapter for opening URLs
     */
    windowAdapter: WindowAdapter;
    client: ThirdwebClient;
    /**
     * Whether or not this payment is associated with a payment ID. If it does, we show a different message.
     */
    hasPaymentId: boolean;
    type: "swap-success" | "payment-success";
};
export declare function SuccessScreen({ preparedQuote, completedStatuses, onDone, windowAdapter, client, hasPaymentId, showContinueWithTx, type, }: SuccessScreenProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=SuccessScreen.d.ts.map