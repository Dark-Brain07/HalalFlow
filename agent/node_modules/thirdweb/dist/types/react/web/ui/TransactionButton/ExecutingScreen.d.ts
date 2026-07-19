import type { WaitForReceiptOptions } from "../../../../transaction/actions/wait-for-tx-receipt.js";
import type { PreparedTransaction } from "../../../../transaction/prepare-transaction.js";
import type { WindowAdapter } from "../../../core/adapters/WindowAdapter.js";
export declare function ExecutingTxScreen(props: {
    tx: PreparedTransaction;
    closeModal: () => void;
    onTxSent: (data: WaitForReceiptOptions) => void;
    onBack: (() => void) | undefined;
    windowAdapter: WindowAdapter;
}): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ExecutingScreen.d.ts.map