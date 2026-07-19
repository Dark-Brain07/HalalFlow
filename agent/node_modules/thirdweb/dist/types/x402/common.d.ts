import type { ThirdwebClient } from "../client/client.js";
import { type RequestedPaymentPayload, type RequestedPaymentRequirements } from "./schemas.js";
import { type ERC20TokenAmount, type PaymentArgs, type PaymentRequiredResult, type SupportedSignatureType } from "./types.js";
type GetPaymentRequirementsResult = {
    status: 200;
    paymentRequirements: RequestedPaymentRequirements[];
    selectedPaymentRequirements: RequestedPaymentRequirements;
    decodedPayment: RequestedPaymentPayload;
};
/**
 * Decodes a payment request and returns the payment requirements, selected payment requirements, and decoded payment
 * @param args
 * @returns The payment requirements, selected payment requirements, and decoded payment
 */
export declare function decodePaymentRequest(args: PaymentArgs): Promise<GetPaymentRequirementsResult | PaymentRequiredResult>;
export declare function getSupportedSignatureType(args: {
    client: ThirdwebClient;
    asset: string;
    chainId: number;
    eip712Extras: ERC20TokenAmount["asset"]["eip712"] | undefined;
}): Promise<SupportedSignatureType | undefined>;
export {};
//# sourceMappingURL=common.d.ts.map