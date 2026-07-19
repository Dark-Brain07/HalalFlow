import type { ThirdwebClient } from "../../../../client/client.js";
import { type RequestedPaymentRequirements } from "../../../../x402/schemas.js";
import type { PaymentRequiredResult } from "../../../../x402/types.js";
import type { Theme } from "../../../core/design-system/index.js";
import { type BuyWidgetProps } from "../Bridge/BuyWidget.js";
type PaymentErrorModalProps = {
    client: ThirdwebClient;
    errorData: PaymentRequiredResult["responseBody"];
    onRetry: () => void;
    onCancel: () => void;
    theme: Theme | "light" | "dark";
    fundWalletOptions?: Partial<Omit<BuyWidgetProps, "client" | "chain" | "tokenAddress" | "amount" | "onSuccess" | "onCancel" | "theme">>;
    paymentRequirementsSelector?: (paymentRequirements: RequestedPaymentRequirements[]) => RequestedPaymentRequirements | undefined;
};
/**
 * @internal
 */
export declare function PaymentErrorModal(props: PaymentErrorModalProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=PaymentErrorModal.d.ts.map