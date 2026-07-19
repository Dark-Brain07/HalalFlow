import type { Token } from "../../../../../bridge/types/Token.js";
import type { ThirdwebClient } from "../../../../../client/client.js";
import type { SupportedFiatCurrency } from "../../../../../pay/convert/type.js";
import type { PaymentMethod } from "../types.js";
interface TokenSelectionProps {
    paymentMethods: PaymentMethod[];
    paymentMethodsLoading: boolean;
    client: ThirdwebClient;
    onPaymentMethodSelected: (paymentMethod: PaymentMethod) => void;
    onBack: () => void;
    destinationToken: Token;
    destinationAmount: bigint;
    feePayer?: "sender" | "receiver";
    currency?: SupportedFiatCurrency;
}
export declare function TokenSelection({ paymentMethods, paymentMethodsLoading, client, onPaymentMethodSelected, onBack, destinationToken, destinationAmount, feePayer, currency, }: TokenSelectionProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=TokenSelection.d.ts.map