import type { TokenWithPrices } from "../../../../bridge/types/Token.js";
import type { ThirdwebClient } from "../../../../client/client.js";
import type { SupportedFiatCurrency } from "../../../../pay/convert/type.js";
import type { Address } from "../../../../utils/address.js";
import type { DirectPaymentInfo } from "./types.js";
type DirectPaymentProps = {
    paymentInfo: DirectPaymentInfo;
    currency: SupportedFiatCurrency;
    metadata: {
        title: string | undefined;
        description: string | undefined;
        image: string | undefined;
    };
    buttonLabel: string | undefined;
    /**
     * ThirdwebClient for blockchain interactions
     */
    client: ThirdwebClient;
    /**
     * Called when user continues with the payment
     */
    onContinue: (amount: string, token: TokenWithPrices, receiverAddress: Address) => void;
    /**
     * Whether to show thirdweb branding in the widget.
     */
    showThirdwebBranding: boolean;
};
export declare function DirectPayment({ paymentInfo, metadata, client, onContinue, showThirdwebBranding, buttonLabel, currency, }: DirectPaymentProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=DirectPayment.d.ts.map