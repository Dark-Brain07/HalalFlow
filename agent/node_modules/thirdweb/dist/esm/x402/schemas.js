import { EvmNetworkToChainId, PaymentPayloadSchema, PaymentRequirementsSchema, SettleResponseSchema, SupportedPaymentKindsResponseSchema, VerifyResponseSchema, } from "x402/types";
import { z } from "zod";
import { PaymentSchemeSchema } from "./types.js";
const FacilitatorNetworkSchema = z.string();
const RequestedPaymentPayloadSchema = PaymentPayloadSchema.extend({
    network: FacilitatorNetworkSchema,
    scheme: PaymentSchemeSchema,
});
export const RequestedPaymentRequirementsSchema = PaymentRequirementsSchema.extend({
    network: FacilitatorNetworkSchema,
    scheme: PaymentSchemeSchema,
});
const FacilitatorSettleResponseSchema = SettleResponseSchema.extend({
    network: FacilitatorNetworkSchema,
    errorMessage: z.string().optional(),
    fundWalletLink: z.string().optional(),
    allowance: z.string().optional(),
    balance: z.string().optional(),
});
const FacilitatorVerifyResponseSchema = VerifyResponseSchema.extend({
    errorMessage: z.string().optional(),
    fundWalletLink: z.string().optional(),
    allowance: z.string().optional(),
    balance: z.string().optional(),
});
export const SupportedSignatureTypeSchema = z.enum([
    "TransferWithAuthorization",
    "Permit",
]);
const FacilitatorSupportedAssetSchema = z.object({
    address: z.string(),
    decimals: z.number(),
    eip712: z.object({
        name: z.string(),
        version: z.string(),
        primaryType: SupportedSignatureTypeSchema,
    }),
});
const FacilitatorSupportedResponseSchema = SupportedPaymentKindsResponseSchema.extend({
    kinds: z.array(z.object({
        x402Version: z.union([z.literal(1), z.literal(2)]),
        scheme: PaymentSchemeSchema,
        network: FacilitatorNetworkSchema,
        extra: z
            .object({
            defaultAsset: FacilitatorSupportedAssetSchema.optional(),
            supportedAssets: z
                .array(FacilitatorSupportedAssetSchema)
                .optional(),
        })
            .optional(),
    })),
}).describe("Supported payment kinds for this facilitator");
function isEvmChain(caip2ChainId) {
    return caip2ChainId.startsWith("eip155:");
}
/**
 * Extract numeric chain ID from CAIP-2 EVM chain (e.g., "eip155:1" -> 1)
 */
export function extractEvmChainId(caip2ChainId) {
    if (!isEvmChain(caip2ChainId)) {
        return null;
    }
    const parts = caip2ChainId.split(":");
    const chainId = Number(parts[1]);
    return Number.isNaN(chainId) ? null : chainId;
}
/**
 * CAIP-2 compliant blockchain identifier
 * @see https://chainagnostic.org/CAIPs/caip-2
 */
const Caip2ChainIdSchema = z
    .union([z.string(), z.number().int().positive()])
    .transform((value, ctx) => {
    // Handle proper CAIP-2 format (already valid)
    if (typeof value === "string" && value.includes(":")) {
        const [namespace, reference] = value.split(":");
        // Solana mainnet/devnet aliases
        if (namespace === "solana" && reference === "mainnet") {
            return "solana:4sGjMW1sUnHzSxGspuhpqLDx6wiyjNtZ";
        }
        if (namespace === "solana" && reference === "devnet") {
            return "solana:8E9rvCKLFQia2Y35HXjjpWzj8weVo44K";
        }
        // Validate CAIP-2 format
        const namespaceRegex = /^[-a-z0-9]{3,8}$/;
        const referenceRegex = /^[-_a-zA-Z0-9]{1,32}$/;
        if (!namespaceRegex.test(namespace ?? "")) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: `Invalid CAIP-2 namespace: ${namespace}. Must match [-a-z0-9]{3,8}`,
            });
            return z.NEVER;
        }
        if (!referenceRegex.test(reference ?? "")) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: `Invalid CAIP-2 reference: ${reference}. Must match [-_a-zA-Z0-9]{1,32}`,
            });
            return z.NEVER;
        }
        return value;
    }
    // Handle number (EVM chain ID fallback)
    if (typeof value === "number") {
        return `eip155:${value}`;
    }
    // Handle string number (EVM chain ID fallback)
    const numValue = Number(value);
    if (!Number.isNaN(numValue) && Number.isInteger(numValue) && numValue > 0) {
        return `eip155:${numValue}`;
    }
    const mappedChainId = EvmNetworkToChainId.get(value);
    if (mappedChainId) {
        return `eip155:${mappedChainId}`;
    }
    ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Invalid chain ID: ${value}. Must be a CAIP-2 identifier (e.g., "eip155:1", "solana:4sGjMW1sUnHzSxGspuhpqLDx6wiyjNtZ"), a numeric chain ID for EVM, or "solana:mainnet"/"solana:devnet"`,
    });
    return z.NEVER;
})
    .describe("CAIP-2 blockchain identifier (e.g., 'eip155:1' for Ethereum, 'solana:4sGjMW1sUnHzSxGspuhpqLDx6wiyjNtZ' for Solana mainnet). Also accepts numeric EVM chain IDs (e.g., 1, 137) or aliases ('solana:mainnet', 'solana:devnet') for backward compatibility.");
export function networkToCaip2ChainId(network) {
    if (typeof network === "object") {
        return `eip155:${network.id}`;
    }
    return Caip2ChainIdSchema.parse(network);
}
//# sourceMappingURL=schemas.js.map