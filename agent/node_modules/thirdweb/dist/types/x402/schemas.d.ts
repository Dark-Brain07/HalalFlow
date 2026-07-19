import { type ExactEvmPayload } from "x402/types";
import { z } from "zod";
import type { Chain } from "../chains/types.js";
declare const FacilitatorNetworkSchema: z.ZodString;
export type FacilitatorNetwork = z.infer<typeof FacilitatorNetworkSchema>;
declare const RequestedPaymentPayloadSchema: z.ZodObject<{
    x402Version: z.ZodEffects<z.ZodNumber, number, number>;
    payload: z.ZodUnion<[z.ZodObject<{
        signature: z.ZodString;
        authorization: z.ZodObject<{
            from: z.ZodString;
            to: z.ZodString;
            value: z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, string, string>;
            validAfter: z.ZodEffects<z.ZodString, string, string>;
            validBefore: z.ZodEffects<z.ZodString, string, string>;
            nonce: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            from: string;
            to: string;
            value: string;
            validAfter: string;
            validBefore: string;
            nonce: string;
        }, {
            from: string;
            to: string;
            value: string;
            validAfter: string;
            validBefore: string;
            nonce: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        signature: string;
        authorization: {
            from: string;
            to: string;
            value: string;
            validAfter: string;
            validBefore: string;
            nonce: string;
        };
    }, {
        signature: string;
        authorization: {
            from: string;
            to: string;
            value: string;
            validAfter: string;
            validBefore: string;
            nonce: string;
        };
    }>, z.ZodObject<{
        transaction: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        transaction: string;
    }, {
        transaction: string;
    }>]>;
} & {
    network: z.ZodString;
    scheme: z.ZodUnion<[z.ZodLiteral<"exact">, z.ZodLiteral<"upto">]>;
}, "strip", z.ZodTypeAny, {
    payload: {
        signature: string;
        authorization: {
            from: string;
            to: string;
            value: string;
            validAfter: string;
            validBefore: string;
            nonce: string;
        };
    } | {
        transaction: string;
    };
    scheme: "exact" | "upto";
    network: string;
    x402Version: number;
}, {
    payload: {
        signature: string;
        authorization: {
            from: string;
            to: string;
            value: string;
            validAfter: string;
            validBefore: string;
            nonce: string;
        };
    } | {
        transaction: string;
    };
    scheme: "exact" | "upto";
    network: string;
    x402Version: number;
}>;
export type RequestedPaymentPayload = z.infer<typeof RequestedPaymentPayloadSchema>;
export type UnsignedPaymentPayload = Omit<RequestedPaymentPayload, "payload"> & {
    payload: Omit<ExactEvmPayload, "signature"> & {
        signature: undefined;
    };
};
export declare const RequestedPaymentRequirementsSchema: z.ZodObject<{
    maxAmountRequired: z.ZodEffects<z.ZodString, string, string>;
    resource: z.ZodString;
    description: z.ZodString;
    mimeType: z.ZodString;
    outputSchema: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    payTo: z.ZodUnion<[z.ZodString, z.ZodString]>;
    maxTimeoutSeconds: z.ZodNumber;
    asset: z.ZodUnion<[z.ZodString, z.ZodString]>;
    extra: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
} & {
    network: z.ZodString;
    scheme: z.ZodUnion<[z.ZodLiteral<"exact">, z.ZodLiteral<"upto">]>;
}, "strip", z.ZodTypeAny, {
    description: string;
    scheme: "exact" | "upto";
    resource: string;
    mimeType: string;
    network: string;
    maxAmountRequired: string;
    payTo: string;
    maxTimeoutSeconds: number;
    asset: string;
    outputSchema?: Record<string, any> | undefined;
    extra?: Record<string, any> | undefined;
}, {
    description: string;
    scheme: "exact" | "upto";
    resource: string;
    mimeType: string;
    network: string;
    maxAmountRequired: string;
    payTo: string;
    maxTimeoutSeconds: number;
    asset: string;
    outputSchema?: Record<string, any> | undefined;
    extra?: Record<string, any> | undefined;
}>;
export type RequestedPaymentRequirements = z.infer<typeof RequestedPaymentRequirementsSchema>;
declare const FacilitatorSettleResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
    errorReason: z.ZodOptional<z.ZodEnum<["insufficient_funds", "invalid_exact_evm_payload_authorization_valid_after", "invalid_exact_evm_payload_authorization_valid_before", "invalid_exact_evm_payload_authorization_value", "invalid_exact_evm_payload_signature", "invalid_exact_evm_payload_recipient_mismatch", "invalid_exact_svm_payload_transaction", "invalid_exact_svm_payload_transaction_amount_mismatch", "invalid_exact_svm_payload_transaction_create_ata_instruction", "invalid_exact_svm_payload_transaction_create_ata_instruction_incorrect_payee", "invalid_exact_svm_payload_transaction_create_ata_instruction_incorrect_asset", "invalid_exact_svm_payload_transaction_instructions", "invalid_exact_svm_payload_transaction_instructions_length", "invalid_exact_svm_payload_transaction_instructions_compute_limit_instruction", "invalid_exact_svm_payload_transaction_instructions_compute_price_instruction", "invalid_exact_svm_payload_transaction_instructions_compute_price_instruction_too_high", "invalid_exact_svm_payload_transaction_instruction_not_spl_token_transfer_checked", "invalid_exact_svm_payload_transaction_instruction_not_token_2022_transfer_checked", "invalid_exact_svm_payload_transaction_not_a_transfer_instruction", "invalid_exact_svm_payload_transaction_receiver_ata_not_found", "invalid_exact_svm_payload_transaction_sender_ata_not_found", "invalid_exact_svm_payload_transaction_simulation_failed", "invalid_exact_svm_payload_transaction_transfer_to_incorrect_ata", "invalid_network", "invalid_payload", "invalid_payment_requirements", "invalid_scheme", "invalid_payment", "payment_expired", "unsupported_scheme", "invalid_x402_version", "invalid_transaction_state", "invalid_x402_version", "settle_exact_svm_block_height_exceeded", "settle_exact_svm_transaction_confirmation_timed_out", "unsupported_scheme", "unexpected_settle_error", "unexpected_verify_error"]>>;
    payer: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodString]>>;
    transaction: z.ZodString;
} & {
    network: z.ZodString;
    errorMessage: z.ZodOptional<z.ZodString>;
    fundWalletLink: z.ZodOptional<z.ZodString>;
    allowance: z.ZodOptional<z.ZodString>;
    balance: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    transaction: string;
    success: boolean;
    network: string;
    errorMessage?: string | undefined;
    balance?: string | undefined;
    fundWalletLink?: string | undefined;
    allowance?: string | undefined;
    payer?: string | undefined;
    errorReason?: "insufficient_funds" | "invalid_exact_evm_payload_authorization_valid_after" | "invalid_exact_evm_payload_authorization_valid_before" | "invalid_exact_evm_payload_authorization_value" | "invalid_exact_evm_payload_signature" | "invalid_exact_evm_payload_recipient_mismatch" | "invalid_exact_svm_payload_transaction" | "invalid_exact_svm_payload_transaction_amount_mismatch" | "invalid_exact_svm_payload_transaction_create_ata_instruction" | "invalid_exact_svm_payload_transaction_create_ata_instruction_incorrect_payee" | "invalid_exact_svm_payload_transaction_create_ata_instruction_incorrect_asset" | "invalid_exact_svm_payload_transaction_instructions" | "invalid_exact_svm_payload_transaction_instructions_length" | "invalid_exact_svm_payload_transaction_instructions_compute_limit_instruction" | "invalid_exact_svm_payload_transaction_instructions_compute_price_instruction" | "invalid_exact_svm_payload_transaction_instructions_compute_price_instruction_too_high" | "invalid_exact_svm_payload_transaction_instruction_not_spl_token_transfer_checked" | "invalid_exact_svm_payload_transaction_instruction_not_token_2022_transfer_checked" | "invalid_exact_svm_payload_transaction_not_a_transfer_instruction" | "invalid_exact_svm_payload_transaction_receiver_ata_not_found" | "invalid_exact_svm_payload_transaction_sender_ata_not_found" | "invalid_exact_svm_payload_transaction_simulation_failed" | "invalid_exact_svm_payload_transaction_transfer_to_incorrect_ata" | "invalid_network" | "invalid_payload" | "invalid_payment_requirements" | "invalid_scheme" | "invalid_payment" | "payment_expired" | "unsupported_scheme" | "invalid_x402_version" | "invalid_transaction_state" | "settle_exact_svm_block_height_exceeded" | "settle_exact_svm_transaction_confirmation_timed_out" | "unexpected_settle_error" | "unexpected_verify_error" | undefined;
}, {
    transaction: string;
    success: boolean;
    network: string;
    errorMessage?: string | undefined;
    balance?: string | undefined;
    fundWalletLink?: string | undefined;
    allowance?: string | undefined;
    payer?: string | undefined;
    errorReason?: "insufficient_funds" | "invalid_exact_evm_payload_authorization_valid_after" | "invalid_exact_evm_payload_authorization_valid_before" | "invalid_exact_evm_payload_authorization_value" | "invalid_exact_evm_payload_signature" | "invalid_exact_evm_payload_recipient_mismatch" | "invalid_exact_svm_payload_transaction" | "invalid_exact_svm_payload_transaction_amount_mismatch" | "invalid_exact_svm_payload_transaction_create_ata_instruction" | "invalid_exact_svm_payload_transaction_create_ata_instruction_incorrect_payee" | "invalid_exact_svm_payload_transaction_create_ata_instruction_incorrect_asset" | "invalid_exact_svm_payload_transaction_instructions" | "invalid_exact_svm_payload_transaction_instructions_length" | "invalid_exact_svm_payload_transaction_instructions_compute_limit_instruction" | "invalid_exact_svm_payload_transaction_instructions_compute_price_instruction" | "invalid_exact_svm_payload_transaction_instructions_compute_price_instruction_too_high" | "invalid_exact_svm_payload_transaction_instruction_not_spl_token_transfer_checked" | "invalid_exact_svm_payload_transaction_instruction_not_token_2022_transfer_checked" | "invalid_exact_svm_payload_transaction_not_a_transfer_instruction" | "invalid_exact_svm_payload_transaction_receiver_ata_not_found" | "invalid_exact_svm_payload_transaction_sender_ata_not_found" | "invalid_exact_svm_payload_transaction_simulation_failed" | "invalid_exact_svm_payload_transaction_transfer_to_incorrect_ata" | "invalid_network" | "invalid_payload" | "invalid_payment_requirements" | "invalid_scheme" | "invalid_payment" | "payment_expired" | "unsupported_scheme" | "invalid_x402_version" | "invalid_transaction_state" | "settle_exact_svm_block_height_exceeded" | "settle_exact_svm_transaction_confirmation_timed_out" | "unexpected_settle_error" | "unexpected_verify_error" | undefined;
}>;
export type FacilitatorSettleResponse = z.infer<typeof FacilitatorSettleResponseSchema>;
declare const FacilitatorVerifyResponseSchema: z.ZodObject<{
    isValid: z.ZodBoolean;
    invalidReason: z.ZodOptional<z.ZodEnum<["insufficient_funds", "invalid_exact_evm_payload_authorization_valid_after", "invalid_exact_evm_payload_authorization_valid_before", "invalid_exact_evm_payload_authorization_value", "invalid_exact_evm_payload_signature", "invalid_exact_evm_payload_recipient_mismatch", "invalid_exact_svm_payload_transaction", "invalid_exact_svm_payload_transaction_amount_mismatch", "invalid_exact_svm_payload_transaction_create_ata_instruction", "invalid_exact_svm_payload_transaction_create_ata_instruction_incorrect_payee", "invalid_exact_svm_payload_transaction_create_ata_instruction_incorrect_asset", "invalid_exact_svm_payload_transaction_instructions", "invalid_exact_svm_payload_transaction_instructions_length", "invalid_exact_svm_payload_transaction_instructions_compute_limit_instruction", "invalid_exact_svm_payload_transaction_instructions_compute_price_instruction", "invalid_exact_svm_payload_transaction_instructions_compute_price_instruction_too_high", "invalid_exact_svm_payload_transaction_instruction_not_spl_token_transfer_checked", "invalid_exact_svm_payload_transaction_instruction_not_token_2022_transfer_checked", "invalid_exact_svm_payload_transaction_not_a_transfer_instruction", "invalid_exact_svm_payload_transaction_receiver_ata_not_found", "invalid_exact_svm_payload_transaction_sender_ata_not_found", "invalid_exact_svm_payload_transaction_simulation_failed", "invalid_exact_svm_payload_transaction_transfer_to_incorrect_ata", "invalid_network", "invalid_payload", "invalid_payment_requirements", "invalid_scheme", "invalid_payment", "payment_expired", "unsupported_scheme", "invalid_x402_version", "invalid_transaction_state", "invalid_x402_version", "settle_exact_svm_block_height_exceeded", "settle_exact_svm_transaction_confirmation_timed_out", "unsupported_scheme", "unexpected_settle_error", "unexpected_verify_error"]>>;
    payer: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodString]>>;
} & {
    errorMessage: z.ZodOptional<z.ZodString>;
    fundWalletLink: z.ZodOptional<z.ZodString>;
    allowance: z.ZodOptional<z.ZodString>;
    balance: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    isValid: boolean;
    errorMessage?: string | undefined;
    balance?: string | undefined;
    fundWalletLink?: string | undefined;
    allowance?: string | undefined;
    invalidReason?: "insufficient_funds" | "invalid_exact_evm_payload_authorization_valid_after" | "invalid_exact_evm_payload_authorization_valid_before" | "invalid_exact_evm_payload_authorization_value" | "invalid_exact_evm_payload_signature" | "invalid_exact_evm_payload_recipient_mismatch" | "invalid_exact_svm_payload_transaction" | "invalid_exact_svm_payload_transaction_amount_mismatch" | "invalid_exact_svm_payload_transaction_create_ata_instruction" | "invalid_exact_svm_payload_transaction_create_ata_instruction_incorrect_payee" | "invalid_exact_svm_payload_transaction_create_ata_instruction_incorrect_asset" | "invalid_exact_svm_payload_transaction_instructions" | "invalid_exact_svm_payload_transaction_instructions_length" | "invalid_exact_svm_payload_transaction_instructions_compute_limit_instruction" | "invalid_exact_svm_payload_transaction_instructions_compute_price_instruction" | "invalid_exact_svm_payload_transaction_instructions_compute_price_instruction_too_high" | "invalid_exact_svm_payload_transaction_instruction_not_spl_token_transfer_checked" | "invalid_exact_svm_payload_transaction_instruction_not_token_2022_transfer_checked" | "invalid_exact_svm_payload_transaction_not_a_transfer_instruction" | "invalid_exact_svm_payload_transaction_receiver_ata_not_found" | "invalid_exact_svm_payload_transaction_sender_ata_not_found" | "invalid_exact_svm_payload_transaction_simulation_failed" | "invalid_exact_svm_payload_transaction_transfer_to_incorrect_ata" | "invalid_network" | "invalid_payload" | "invalid_payment_requirements" | "invalid_scheme" | "invalid_payment" | "payment_expired" | "unsupported_scheme" | "invalid_x402_version" | "invalid_transaction_state" | "settle_exact_svm_block_height_exceeded" | "settle_exact_svm_transaction_confirmation_timed_out" | "unexpected_settle_error" | "unexpected_verify_error" | undefined;
    payer?: string | undefined;
}, {
    isValid: boolean;
    errorMessage?: string | undefined;
    balance?: string | undefined;
    fundWalletLink?: string | undefined;
    allowance?: string | undefined;
    invalidReason?: "insufficient_funds" | "invalid_exact_evm_payload_authorization_valid_after" | "invalid_exact_evm_payload_authorization_valid_before" | "invalid_exact_evm_payload_authorization_value" | "invalid_exact_evm_payload_signature" | "invalid_exact_evm_payload_recipient_mismatch" | "invalid_exact_svm_payload_transaction" | "invalid_exact_svm_payload_transaction_amount_mismatch" | "invalid_exact_svm_payload_transaction_create_ata_instruction" | "invalid_exact_svm_payload_transaction_create_ata_instruction_incorrect_payee" | "invalid_exact_svm_payload_transaction_create_ata_instruction_incorrect_asset" | "invalid_exact_svm_payload_transaction_instructions" | "invalid_exact_svm_payload_transaction_instructions_length" | "invalid_exact_svm_payload_transaction_instructions_compute_limit_instruction" | "invalid_exact_svm_payload_transaction_instructions_compute_price_instruction" | "invalid_exact_svm_payload_transaction_instructions_compute_price_instruction_too_high" | "invalid_exact_svm_payload_transaction_instruction_not_spl_token_transfer_checked" | "invalid_exact_svm_payload_transaction_instruction_not_token_2022_transfer_checked" | "invalid_exact_svm_payload_transaction_not_a_transfer_instruction" | "invalid_exact_svm_payload_transaction_receiver_ata_not_found" | "invalid_exact_svm_payload_transaction_sender_ata_not_found" | "invalid_exact_svm_payload_transaction_simulation_failed" | "invalid_exact_svm_payload_transaction_transfer_to_incorrect_ata" | "invalid_network" | "invalid_payload" | "invalid_payment_requirements" | "invalid_scheme" | "invalid_payment" | "payment_expired" | "unsupported_scheme" | "invalid_x402_version" | "invalid_transaction_state" | "settle_exact_svm_block_height_exceeded" | "settle_exact_svm_transaction_confirmation_timed_out" | "unexpected_settle_error" | "unexpected_verify_error" | undefined;
    payer?: string | undefined;
}>;
export type FacilitatorVerifyResponse = z.infer<typeof FacilitatorVerifyResponseSchema>;
export declare const SupportedSignatureTypeSchema: z.ZodEnum<["TransferWithAuthorization", "Permit"]>;
declare const FacilitatorSupportedResponseSchema: z.ZodObject<{} & {
    kinds: z.ZodArray<z.ZodObject<{
        x402Version: z.ZodUnion<[z.ZodLiteral<1>, z.ZodLiteral<2>]>;
        scheme: z.ZodUnion<[z.ZodLiteral<"exact">, z.ZodLiteral<"upto">]>;
        network: z.ZodString;
        extra: z.ZodOptional<z.ZodObject<{
            defaultAsset: z.ZodOptional<z.ZodObject<{
                address: z.ZodString;
                decimals: z.ZodNumber;
                eip712: z.ZodObject<{
                    name: z.ZodString;
                    version: z.ZodString;
                    primaryType: z.ZodEnum<["TransferWithAuthorization", "Permit"]>;
                }, "strip", z.ZodTypeAny, {
                    name: string;
                    primaryType: "TransferWithAuthorization" | "Permit";
                    version: string;
                }, {
                    name: string;
                    primaryType: "TransferWithAuthorization" | "Permit";
                    version: string;
                }>;
            }, "strip", z.ZodTypeAny, {
                address: string;
                eip712: {
                    name: string;
                    primaryType: "TransferWithAuthorization" | "Permit";
                    version: string;
                };
                decimals: number;
            }, {
                address: string;
                eip712: {
                    name: string;
                    primaryType: "TransferWithAuthorization" | "Permit";
                    version: string;
                };
                decimals: number;
            }>>;
            supportedAssets: z.ZodOptional<z.ZodArray<z.ZodObject<{
                address: z.ZodString;
                decimals: z.ZodNumber;
                eip712: z.ZodObject<{
                    name: z.ZodString;
                    version: z.ZodString;
                    primaryType: z.ZodEnum<["TransferWithAuthorization", "Permit"]>;
                }, "strip", z.ZodTypeAny, {
                    name: string;
                    primaryType: "TransferWithAuthorization" | "Permit";
                    version: string;
                }, {
                    name: string;
                    primaryType: "TransferWithAuthorization" | "Permit";
                    version: string;
                }>;
            }, "strip", z.ZodTypeAny, {
                address: string;
                eip712: {
                    name: string;
                    primaryType: "TransferWithAuthorization" | "Permit";
                    version: string;
                };
                decimals: number;
            }, {
                address: string;
                eip712: {
                    name: string;
                    primaryType: "TransferWithAuthorization" | "Permit";
                    version: string;
                };
                decimals: number;
            }>, "many">>;
        }, "strip", z.ZodTypeAny, {
            defaultAsset?: {
                address: string;
                eip712: {
                    name: string;
                    primaryType: "TransferWithAuthorization" | "Permit";
                    version: string;
                };
                decimals: number;
            } | undefined;
            supportedAssets?: {
                address: string;
                eip712: {
                    name: string;
                    primaryType: "TransferWithAuthorization" | "Permit";
                    version: string;
                };
                decimals: number;
            }[] | undefined;
        }, {
            defaultAsset?: {
                address: string;
                eip712: {
                    name: string;
                    primaryType: "TransferWithAuthorization" | "Permit";
                    version: string;
                };
                decimals: number;
            } | undefined;
            supportedAssets?: {
                address: string;
                eip712: {
                    name: string;
                    primaryType: "TransferWithAuthorization" | "Permit";
                    version: string;
                };
                decimals: number;
            }[] | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        scheme: "exact" | "upto";
        network: string;
        x402Version: 2 | 1;
        extra?: {
            defaultAsset?: {
                address: string;
                eip712: {
                    name: string;
                    primaryType: "TransferWithAuthorization" | "Permit";
                    version: string;
                };
                decimals: number;
            } | undefined;
            supportedAssets?: {
                address: string;
                eip712: {
                    name: string;
                    primaryType: "TransferWithAuthorization" | "Permit";
                    version: string;
                };
                decimals: number;
            }[] | undefined;
        } | undefined;
    }, {
        scheme: "exact" | "upto";
        network: string;
        x402Version: 2 | 1;
        extra?: {
            defaultAsset?: {
                address: string;
                eip712: {
                    name: string;
                    primaryType: "TransferWithAuthorization" | "Permit";
                    version: string;
                };
                decimals: number;
            } | undefined;
            supportedAssets?: {
                address: string;
                eip712: {
                    name: string;
                    primaryType: "TransferWithAuthorization" | "Permit";
                    version: string;
                };
                decimals: number;
            }[] | undefined;
        } | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    kinds: {
        scheme: "exact" | "upto";
        network: string;
        x402Version: 2 | 1;
        extra?: {
            defaultAsset?: {
                address: string;
                eip712: {
                    name: string;
                    primaryType: "TransferWithAuthorization" | "Permit";
                    version: string;
                };
                decimals: number;
            } | undefined;
            supportedAssets?: {
                address: string;
                eip712: {
                    name: string;
                    primaryType: "TransferWithAuthorization" | "Permit";
                    version: string;
                };
                decimals: number;
            }[] | undefined;
        } | undefined;
    }[];
}, {
    kinds: {
        scheme: "exact" | "upto";
        network: string;
        x402Version: 2 | 1;
        extra?: {
            defaultAsset?: {
                address: string;
                eip712: {
                    name: string;
                    primaryType: "TransferWithAuthorization" | "Permit";
                    version: string;
                };
                decimals: number;
            } | undefined;
            supportedAssets?: {
                address: string;
                eip712: {
                    name: string;
                    primaryType: "TransferWithAuthorization" | "Permit";
                    version: string;
                };
                decimals: number;
            }[] | undefined;
        } | undefined;
    }[];
}>;
export type FacilitatorSupportedResponse = z.infer<typeof FacilitatorSupportedResponseSchema>;
/**
 * Extract numeric chain ID from CAIP-2 EVM chain (e.g., "eip155:1" -> 1)
 */
export declare function extractEvmChainId(caip2ChainId: Caip2ChainId): number | null;
/**
 * CAIP-2 compliant blockchain identifier
 * @see https://chainagnostic.org/CAIPs/caip-2
 */
declare const Caip2ChainIdSchema: z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodNumber]>, `${string}:${string}`, string | number>;
type Caip2ChainId = z.output<typeof Caip2ChainIdSchema>;
export declare function networkToCaip2ChainId(network: string | Chain): Caip2ChainId;
export {};
//# sourceMappingURL=schemas.d.ts.map