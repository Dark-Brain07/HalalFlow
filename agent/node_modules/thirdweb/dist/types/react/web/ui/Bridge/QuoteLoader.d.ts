import type { Token } from "../../../../bridge/types/Token.js";
import type { ThirdwebClient } from "../../../../client/client.js";
import type { PurchaseData } from "../../../../pay/types.js";
import { type BridgePrepareRequest, type BridgePrepareResult } from "../../../core/hooks/useBridgePrepare.js";
import type { PaymentMethod } from "./types.js";
interface QuoteLoaderProps {
    /**
     * The destination token to bridge to
     */
    destinationToken: Token;
    /**
     * The payment method to use
     */
    paymentMethod: PaymentMethod;
    /**
     * The amount to bridge (as string)
     */
    amount: string;
    /**
     * The sender address
     */
    sender: string | undefined;
    /**
     * The receiver address
     */
    receiver: string;
    /**
     * ThirdwebClient for API calls
     */
    client: ThirdwebClient;
    /**
     * Called when a quote is successfully received
     */
    onQuoteReceived: (preparedQuote: BridgePrepareResult, request: BridgePrepareRequest) => void;
    /**
     * Called when an error occurs
     */
    onError: (error: Error) => void;
    /**
     * Called when user wants to go back
     */
    onBack: (() => void) | undefined;
    /**
     * Optional purchase data for the payment
     */
    purchaseData: PurchaseData | undefined;
    /**
     * Optional payment link ID for the payment
     */
    paymentLinkId: string | undefined;
    feePayer: "sender" | "receiver" | undefined;
    mode: "direct_payment" | "fund_wallet" | "transaction";
}
export declare function QuoteLoader({ destinationToken, paymentMethod, amount, sender, receiver, client, onQuoteReceived, onError, purchaseData, paymentLinkId, feePayer, mode: _mode, }: QuoteLoaderProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=QuoteLoader.d.ts.map