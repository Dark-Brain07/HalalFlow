import { toFunctionSelector } from "viem/utils";
import { getCachedChain } from "../chains/utils.js";
import { resolveContractAbi } from "../contract/actions/resolve-abi.js";
import { getContract } from "../contract/contract.js";
import { isPermitSupported } from "../extensions/erc20/__generated__/IERC20Permit/write/permit.js";
import { isTransferWithAuthorizationSupported } from "../extensions/erc20/__generated__/USDC/write/transferWithAuthorization.js";
import { decodePayment, encodePaymentRequired } from "./encode.js";
import { networkToCaip2ChainId, } from "./schemas.js";
import { x402Version, } from "./types.js";
/**
 * Formats a payment required response in x402 v2 format (header-based)
 */
function formatPaymentRequiredResponseV2(paymentRequirements, error, resourceUrl) {
    const paymentRequired = {
        x402Version: 2,
        error,
        accepts: paymentRequirements,
        resource: { url: resourceUrl },
    };
    return {
        status: 402,
        responseHeaders: {
            "PAYMENT-REQUIRED": encodePaymentRequired(paymentRequired),
        },
        responseBody: {},
    };
}
/**
 * Formats a payment required response in x402 v1 format (body-based)
 */
function formatPaymentRequiredResponseV1(paymentRequirements, error) {
    return {
        status: 402,
        responseHeaders: {
            "Content-Type": "application/json",
        },
        responseBody: {
            x402Version: 1,
            error,
            accepts: paymentRequirements,
        },
    };
}
/**
 * Decodes a payment request and returns the payment requirements, selected payment requirements, and decoded payment
 * @param args
 * @returns The payment requirements, selected payment requirements, and decoded payment
 */
export async function decodePaymentRequest(args) {
    const { facilitator, routeConfig = {}, paymentData, resourceUrl } = args;
    const { errorMessages } = routeConfig;
    // facilitator.accepts() returns v1 format from API - extract payment requirements
    const paymentRequirementsResult = await facilitator.accepts(args);
    const paymentRequirements = paymentRequirementsResult.responseBody.accepts;
    // Check for payment header, if none, return the payment requirements in v2 format (default)
    if (!paymentData) {
        return formatPaymentRequiredResponseV2(paymentRequirements, "Payment required", resourceUrl);
    }
    // decode b64 payment
    let decodedPayment;
    try {
        decodedPayment = decodePayment(paymentData);
        // Preserve version provided by the client, default to the current protocol version if missing
        decodedPayment.x402Version ??= x402Version;
    }
    catch (error) {
        // Decode error - default to v2 format since we can't determine client version
        return formatPaymentRequiredResponseV2(paymentRequirements, errorMessages?.invalidPayment ||
            (error instanceof Error ? error.message : "Invalid payment"), resourceUrl);
    }
    const selectedPaymentRequirements = paymentRequirements.find((value) => value.scheme === decodedPayment.scheme &&
        networkToCaip2ChainId(value.network) ===
            networkToCaip2ChainId(decodedPayment.network));
    if (!selectedPaymentRequirements) {
        // Use the client's version for the response format
        const errorMessage = errorMessages?.noMatchingRequirements ||
            "Unable to find matching payment requirements";
        if (decodedPayment.x402Version === 1) {
            return formatPaymentRequiredResponseV1(paymentRequirements, errorMessage);
        }
        return formatPaymentRequiredResponseV2(paymentRequirements, errorMessage, resourceUrl);
    }
    return {
        status: 200,
        paymentRequirements,
        decodedPayment,
        selectedPaymentRequirements,
    };
}
export async function getSupportedSignatureType(args) {
    const primaryType = args.eip712Extras?.primaryType;
    if (primaryType === "Permit" || primaryType === "TransferWithAuthorization") {
        return primaryType;
    }
    // not specified, so we need to detect it
    const abi = await resolveContractAbi(getContract({
        client: args.client,
        address: args.asset,
        chain: getCachedChain(args.chainId),
    })).catch((error) => {
        console.error("Error resolving contract ABI", error);
        return [];
    });
    const selectors = abi
        .filter((f) => f.type === "function")
        .map((f) => toFunctionSelector(f));
    const hasPermit = isPermitSupported(selectors);
    const hasTransferWithAuthorization = isTransferWithAuthorizationSupported(selectors);
    // prefer transferWithAuthorization over permit
    if (hasTransferWithAuthorization) {
        return "TransferWithAuthorization";
    }
    if (hasPermit) {
        return "Permit";
    }
    return undefined;
}
//# sourceMappingURL=common.js.map