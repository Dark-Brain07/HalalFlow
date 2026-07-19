import type { WindowAdapter } from "../../../../core/adapters/WindowAdapter.js";
import type { BridgePrepareResult } from "../../../../core/hooks/useBridgePrepare.js";
import type { CompletedStatusResult } from "../../../../core/hooks/useStepExecutor.js";
interface PaymentReceitProps {
    /**
     * Prepared quote from Bridge.prepare
     */
    preparedQuote: BridgePrepareResult;
    /**
     * Completed status results from step execution
     */
    completedStatuses: CompletedStatusResult[];
    /**
     * Called when user goes back to success screen
     */
    onBack: () => void;
    /**
     * Window adapter for opening URLs
     */
    windowAdapter: WindowAdapter;
}
export declare function PaymentReceipt({ preparedQuote, completedStatuses, onBack, windowAdapter, }: PaymentReceitProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=PaymentReceipt.d.ts.map