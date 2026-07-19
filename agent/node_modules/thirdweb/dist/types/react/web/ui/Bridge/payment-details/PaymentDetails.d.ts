import type { ThirdwebClient } from "../../../../../client/client.js";
import type { SupportedFiatCurrency } from "../../../../../pay/convert/type.js";
import type { BridgePrepareResult } from "../../../../core/hooks/useBridgePrepare.js";
import type { ModeInfo, PaymentMethod } from "../types.js";
type PaymentDetailsProps = {
    metadata: {
        title: string | undefined;
        description: string | undefined;
    };
    currency: SupportedFiatCurrency;
    modeInfo: ModeInfo;
    confirmButtonLabel: string | undefined;
    /**
     * The client to use
     */
    client: ThirdwebClient;
    /**
     * The payment method to use
     */
    paymentMethod: PaymentMethod;
    /**
     * The prepared quote to preview
     */
    preparedQuote: BridgePrepareResult;
    /**
     * Called when user confirms the route
     */
    onConfirm: () => void;
    /**
     * Called when user wants to go back
     */
    onBack: () => void;
    /**
     * Called when an error occurs
     */
    onError: (error: Error) => void;
};
export declare function PaymentDetails({ metadata, confirmButtonLabel, client, paymentMethod, preparedQuote, onConfirm, onBack, onError, currency, modeInfo, }: PaymentDetailsProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=PaymentDetails.d.ts.map