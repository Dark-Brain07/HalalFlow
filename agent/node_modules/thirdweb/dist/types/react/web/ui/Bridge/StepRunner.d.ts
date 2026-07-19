import type { ThirdwebClient } from "../../../../client/client.js";
import type { Wallet } from "../../../../wallets/interfaces/wallet.js";
import type { WindowAdapter } from "../../../core/adapters/WindowAdapter.js";
import type { BridgePrepareRequest, BridgePrepareResult } from "../../../core/hooks/useBridgePrepare.js";
import { type CompletedStatusResult } from "../../../core/hooks/useStepExecutor.js";
type StepRunnerProps = {
    title: string | undefined;
    request: BridgePrepareRequest;
    /**
     * Wallet instance for executing transactions
     */
    wallet: Wallet | undefined;
    /**
     * Thirdweb client for API calls
     */
    client: ThirdwebClient;
    /**
     * Window adapter for opening URLs (web/RN)
     */
    windowAdapter: WindowAdapter;
    /**
     * Whether to automatically start the transaction process
     */
    autoStart: boolean;
    /**
     * Called when all steps are completed - receives array of completed status results
     */
    onComplete: (completedStatuses: CompletedStatusResult[]) => void;
    /**
     * Called when user cancels the flow
     */
    onCancel: (() => void) | undefined;
    /**
     * Called when user clicks the back button
     */
    onBack: () => void;
    /**
     * Prepared quote to use
     */
    preparedQuote: BridgePrepareResult;
};
export declare function StepRunner({ title, request, wallet, client, windowAdapter, onComplete, onCancel, onBack, autoStart, preparedQuote, }: StepRunnerProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=StepRunner.d.ts.map