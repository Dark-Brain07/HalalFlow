"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupportedSignatureTypeSchema = exports.RequestedPaymentRequirementsSchema = void 0;
exports.extractEvmChainId = extractEvmChainId;
exports.networkToCaip2ChainId = networkToCaip2ChainId;
const types_1 = require("x402/types");
const zod_1 = require("zod");
const types_js_1 = require("./types.js");
const FacilitatorNetworkSchema = zod_1.z.string();
const RequestedPaymentPayloadSchema = types_1.PaymentPayloadSchema.extend({
    network: FacilitatorNetworkSchema,
    scheme: types_js_1.PaymentSchemeSchema,
});
exports.RequestedPaymentRequirementsSchema = types_1.PaymentRequirementsSchema.extend({
    network: FacilitatorNetworkSchema,
    scheme: types_js_1.PaymentSchemeSchema,
});
const FacilitatorSettleResponseSchema = types_1.SettleResponseSchema.extend({
    network: FacilitatorNetworkSchema,
    errorMessage: zod_1.z.string().optional(),
    fundWalletLink: zod_1.z.string().optional(),
    allowance: zod_1.z.string().optional(),
    balance: zod_1.z.string().optional(),
});
const FacilitatorVerifyResponseSchema = types_1.VerifyResponseSchema.extend({
    errorMessage: zod_1.z.string().optional(),
    fundWalletLink: zod_1.z.string().optional(),
    allowance: zod_1.z.string().optional(),
    balance: zod_1.z.string().optional(),
});
exports.SupportedSignatureTypeSchema = zod_1.z.enum([
    "TransferWithAuthorization",
    "Permit",
]);
const FacilitatorSupportedAssetSchema = zod_1.z.object({
    address: zod_1.z.string(),
    decimals: zod_1.z.number(),
    eip712: zod_1.z.object({
        name: zod_1.z.string(),
        version: zod_1.z.string(),
        primaryType: exports.SupportedSignatureTypeSchema,
    }),
});
const FacilitatorSupportedResponseSchema = types_1.SupportedPaymentKindsResponseSchema.extend({
    kinds: zod_1.z.array(zod_1.z.object({
        x402Version: zod_1.z.union([zod_1.z.literal(1), zod_1.z.literal(2)]),
        scheme: types_js_1.PaymentSchemeSchema,
        network: FacilitatorNetworkSchema,
        extra: zod_1.z
            .object({
            defaultAsset: FacilitatorSupportedAssetSchema.optional(),
            supportedAssets: zod_1.z
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
function extractEvmChainId(caip2ChainId) {
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
const Caip2ChainIdSchema = zod_1.z
    .union([zod_1.z.string(), zod_1.z.number().int().positive()])
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
                code: zod_1.z.ZodIssueCode.custom,
                message: `Invalid CAIP-2 namespace: ${namespace}. Must match [-a-z0-9]{3,8}`,
            });
            return zod_1.z.NEVER;
        }
        if (!referenceRegex.test(reference ?? "")) {
            ctx.addIssue({
                code: zod_1.z.ZodIssueCode.custom,
                message: `Invalid CAIP-2 reference: ${reference}. Must match [-_a-zA-Z0-9]{1,32}`,
            });
            return zod_1.z.NEVER;
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
    const mappedChainId = types_1.EvmNetworkToChainId.get(value);
    if (mappedChainId) {
        return `eip155:${mappedChainId}`;
    }
    ctx.addIssue({
        code: zod_1.z.ZodIssueCode.custom,
        message: `Invalid chain ID: ${value}. Must be a CAIP-2 identifier (e.g., "eip155:1", "solana:4sGjMW1sUnHzSxGspuhpqLDx6wiyjNtZ"), a numeric chain ID for EVM, or "solana:mainnet"/"solana:devnet"`,
    });
    return zod_1.z.NEVER;
})
    .describe("CAIP-2 blockchain identifier (e.g., 'eip155:1' for Ethereum, 'solana:4sGjMW1sUnHzSxGspuhpqLDx6wiyjNtZ' for Solana mainnet). Also accepts numeric EVM chain IDs (e.g., 1, 137) or aliases ('solana:mainnet', 'solana:devnet') for backward compatibility.");
function networkToCaip2ChainId(network) {
    if (typeof network === "object") {
        return `eip155:${network.id}`;
    }
    return Caip2ChainIdSchema.parse(network);
}
//# sourceMappingURL=schemas.js.map