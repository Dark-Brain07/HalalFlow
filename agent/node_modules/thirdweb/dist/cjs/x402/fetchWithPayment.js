"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapFetchWithPayment = wrapFetchWithPayment;
const utils_js_1 = require("../chains/utils.js");
const address_js_1 = require("../utils/address.js");
const webStorage_js_1 = require("../utils/storage/webStorage.js");
const encode_js_1 = require("./encode.js");
const headers_js_1 = require("./headers.js");
const permitSignatureStorage_js_1 = require("./permitSignatureStorage.js");
const schemas_js_1 = require("./schemas.js");
const sign_js_1 = require("./sign.js");
const types_js_1 = require("./types.js");
/**
 * Enables the payment of APIs using the x402 payment protocol.
 *
 * This function wraps the native fetch API to automatically handle 402 Payment Required responses
 * by creating and sending a payment header. It will:
 * 1. Make the initial request
 * 2. If a 402 response is received, parse the payment requirements
 * 3. Verify the payment amount is within the allowed maximum
 * 4. Create a payment header using the provided wallet client
 * 5. Retry the request with the payment header
 *
 * @param fetch - The fetch function to wrap (typically globalThis.fetch)
 * @param client - The thirdweb client used to access RPC infrastructure
 * @param wallet - The wallet used to sign payment messages
 * @param maxValue - The maximum allowed payment amount in base units
 * @returns A wrapped fetch function that handles 402 responses automatically
 *
 * @example
 * ```typescript
 * import { wrapFetchWithPayment } from "thirdweb/x402";
 * import { createThirdwebClient } from "thirdweb";
 * import { createWallet } from "thirdweb/wallets";
 *
 * const client = createThirdwebClient({ clientId: "your-client-id" });
 * const wallet = createWallet("io.metamask");
 * await wallet.connect({ client })
 *
 * const fetchWithPay = wrapFetchWithPayment(fetch, client, wallet);
 *
 * // Make a request that may require payment
 * const response = await fetchWithPay('https://api.example.com/paid-endpoint');
 * ```
 *
 * @throws {Error} If the payment amount exceeds the maximum allowed value
 * @throws {Error} If a payment has already been attempted for this request
 * @throws {Error} If there's an error creating the payment header
 *
 * @x402
 */
function wrapFetchWithPayment(fetch, client, wallet, options) {
    return async (input, init) => {
        const response = await fetch(input, init);
        if (response.status !== 402) {
            return response;
        }
        let x402Version;
        let parsedPaymentRequirements;
        let error;
        // Check payment-required header first before falling back to JSON body
        const paymentRequiredHeader = response.headers.get("payment-required");
        if (paymentRequiredHeader) {
            const decoded = (0, encode_js_1.safeBase64Decode)(paymentRequiredHeader);
            const parsed = JSON.parse(decoded);
            if (!Array.isArray(parsed.accepts)) {
                throw new Error(`402 response has no usable x402 payment requirements. ${parsed.error ?? ""}`);
            }
            x402Version = parsed.x402Version ?? types_js_1.x402Version;
            parsedPaymentRequirements = parsed.accepts.map((x) => schemas_js_1.RequestedPaymentRequirementsSchema.parse(x));
            error = parsed.error;
        }
        else {
            const body = (await response.json());
            if (!Array.isArray(body.accepts)) {
                throw new Error(`402 response has no usable x402 payment requirements. ${body.error ?? ""}`);
            }
            x402Version = body.x402Version ?? types_js_1.x402Version;
            parsedPaymentRequirements = body.accepts.map((x) => schemas_js_1.RequestedPaymentRequirementsSchema.parse(x));
            error = body.error;
        }
        const account = wallet.getAccount();
        let chain = wallet.getChain();
        if (!account || !chain) {
            throw new Error("Wallet not connected. Please connect your wallet to continue.");
        }
        const selectedPaymentRequirements = options?.paymentRequirementsSelector
            ? options.paymentRequirementsSelector(parsedPaymentRequirements)
            : defaultPaymentRequirementsSelector(parsedPaymentRequirements, chain.id, error);
        if (!selectedPaymentRequirements) {
            throw new Error(`No suitable payment requirements found for chain ${chain.id}. ${error}`);
        }
        if (options?.maxValue &&
            BigInt(selectedPaymentRequirements.maxAmountRequired) > options.maxValue) {
            throw new Error(`Payment amount exceeds maximum allowed (currently set to ${options.maxValue} in base units)`);
        }
        const caip2ChainId = (0, schemas_js_1.networkToCaip2ChainId)(selectedPaymentRequirements.network);
        const paymentChainId = (0, schemas_js_1.extractEvmChainId)(caip2ChainId);
        // TODO (402): support solana
        if (paymentChainId === null) {
            throw new Error(`Unsupported chain ID: ${selectedPaymentRequirements.network}`);
        }
        // switch to the payment chain if it's not the current chain
        if (paymentChainId !== chain.id) {
            await wallet.switchChain((0, utils_js_1.getCachedChain)(paymentChainId));
            chain = wallet.getChain();
            if (!chain) {
                throw new Error(`Failed to switch chain (${paymentChainId})`);
            }
        }
        const paymentHeader = await (0, sign_js_1.createPaymentHeader)(client, account, selectedPaymentRequirements, x402Version, options?.storage ?? webStorage_js_1.webLocalStorage);
        const paymentRequestHeaderName = (0, headers_js_1.getPaymentRequestHeader)(x402Version);
        const paymentResponseHeaderName = (0, headers_js_1.getPaymentResponseHeader)(x402Version);
        const initParams = init || {};
        if (initParams.__is402Retry) {
            throw new Error("Payment already attempted");
        }
        const newInit = {
            ...initParams,
            headers: {
                ...(initParams.headers || {}),
                [paymentRequestHeaderName]: paymentHeader,
                "Access-Control-Expose-Headers": paymentResponseHeaderName,
            },
            __is402Retry: true,
        };
        const secondResponse = await fetch(input, newInit);
        // If payment was rejected (still 402), clear cached signature
        if (secondResponse.status === 402 && options?.storage) {
            await (0, permitSignatureStorage_js_1.clearPermitSignatureFromCache)(options.storage, {
                chainId: paymentChainId,
                asset: selectedPaymentRequirements.asset,
                owner: (0, address_js_1.getAddress)(account.address),
                spender: (0, address_js_1.getAddress)(selectedPaymentRequirements.payTo),
            });
        }
        return secondResponse;
    };
}
function defaultPaymentRequirementsSelector(paymentRequirements, chainId, error) {
    if (!paymentRequirements.length) {
        throw new Error(`No valid payment requirements found in server 402 response. ${error}`);
    }
    // find the payment requirements matching the connected wallet chain
    const matchingPaymentRequirements = paymentRequirements.find((x) => (0, schemas_js_1.extractEvmChainId)((0, schemas_js_1.networkToCaip2ChainId)(x.network)) === chainId);
    if (matchingPaymentRequirements) {
        return matchingPaymentRequirements;
    }
    else {
        // if no matching payment requirements, use the first payment requirement
        // and switch the wallet to that chain
        const firstPaymentRequirement = paymentRequirements[0];
        return firstPaymentRequirement;
    }
}
//# sourceMappingURL=fetchWithPayment.js.map