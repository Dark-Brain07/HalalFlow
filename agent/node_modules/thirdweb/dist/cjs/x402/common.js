"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodePaymentRequest = decodePaymentRequest;
exports.getSupportedSignatureType = getSupportedSignatureType;
const utils_1 = require("viem/utils");
const utils_js_1 = require("../chains/utils.js");
const resolve_abi_js_1 = require("../contract/actions/resolve-abi.js");
const contract_js_1 = require("../contract/contract.js");
const permit_js_1 = require("../extensions/erc20/__generated__/IERC20Permit/write/permit.js");
const transferWithAuthorization_js_1 = require("../extensions/erc20/__generated__/USDC/write/transferWithAuthorization.js");
const encode_js_1 = require("./encode.js");
const schemas_js_1 = require("./schemas.js");
const types_js_1 = require("./types.js");
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
            "PAYMENT-REQUIRED": (0, encode_js_1.encodePaymentRequired)(paymentRequired),
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
async function decodePaymentRequest(args) {
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
        decodedPayment = (0, encode_js_1.decodePayment)(paymentData);
        // Preserve version provided by the client, default to the current protocol version if missing
        decodedPayment.x402Version ??= types_js_1.x402Version;
    }
    catch (error) {
        // Decode error - default to v2 format since we can't determine client version
        return formatPaymentRequiredResponseV2(paymentRequirements, errorMessages?.invalidPayment ||
            (error instanceof Error ? error.message : "Invalid payment"), resourceUrl);
    }
    const selectedPaymentRequirements = paymentRequirements.find((value) => value.scheme === decodedPayment.scheme &&
        (0, schemas_js_1.networkToCaip2ChainId)(value.network) ===
            (0, schemas_js_1.networkToCaip2ChainId)(decodedPayment.network));
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
async function getSupportedSignatureType(args) {
    const primaryType = args.eip712Extras?.primaryType;
    if (primaryType === "Permit" || primaryType === "TransferWithAuthorization") {
        return primaryType;
    }
    // not specified, so we need to detect it
    const abi = await (0, resolve_abi_js_1.resolveContractAbi)((0, contract_js_1.getContract)({
        client: args.client,
        address: args.asset,
        chain: (0, utils_js_1.getCachedChain)(args.chainId),
    })).catch((error) => {
        console.error("Error resolving contract ABI", error);
        return [];
    });
    const selectors = abi
        .filter((f) => f.type === "function")
        .map((f) => (0, utils_1.toFunctionSelector)(f));
    const hasPermit = (0, permit_js_1.isPermitSupported)(selectors);
    const hasTransferWithAuthorization = (0, transferWithAuthorization_js_1.isTransferWithAuthorizationSupported)(selectors);
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