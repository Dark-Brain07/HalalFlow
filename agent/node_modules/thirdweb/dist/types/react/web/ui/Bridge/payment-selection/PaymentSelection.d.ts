import type { TokenWithPrices } from "../../../../../bridge/types/Token.js";
import type { ThirdwebClient } from "../../../../../client/client.js";
import type { SupportedFiatCurrency } from "../../../../../pay/convert/type.js";
import type { Address } from "../../../../../utils/address.js";
import type { SupportedTokens } from "../../../../core/utils/defaultTokens.js";
import type { ConnectLocale } from "../../ConnectWallet/locale/types.js";
import type { PayEmbedConnectOptions } from "../../PayEmbed.js";
import type { PaymentMethod } from "../types.js";
type PaymentSelectionProps = {
    /**
     * The destination token to bridge to
     */
    destinationToken: TokenWithPrices;
    /**
     * The destination amount to bridge
     */
    destinationAmount: string;
    /**
     * The receiver address
     */
    receiverAddress: Address;
    /**
     * ThirdwebClient for API calls
     */
    client: ThirdwebClient;
    /**
     * Called when user selects a payment method
     */
    onPaymentMethodSelected: (paymentMethod: PaymentMethod) => void;
    /**
     * Called when an error occurs
     */
    onError: (error: Error) => void;
    /**
     * Called when user wants to go back
     */
    onBack: () => void;
    /**
     * Connect options for wallet connection
     */
    connectOptions: PayEmbedConnectOptions | undefined;
    /**
     * Locale for connect UI
     */
    connectLocale: ConnectLocale;
    /**
     * Allowed payment methods
     */
    paymentMethods: ("crypto" | "card")[];
    /**
     * Fee payer
     */
    feePayer: "sender" | "receiver" | undefined;
    /**
     * The currency to use for the payment.
     * @default "USD"
     */
    currency: SupportedFiatCurrency;
    /**
     * The user's ISO 3166 alpha-2 country code. This is used to determine onramp provider support.
     */
    country: string | undefined;
    supportedTokens: SupportedTokens | undefined;
};
export declare function PaymentSelection({ destinationToken, client, destinationAmount, receiverAddress, onPaymentMethodSelected, onError, onBack, connectOptions, connectLocale, paymentMethods, supportedTokens, feePayer, currency, country, }: PaymentSelectionProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=PaymentSelection.d.ts.map