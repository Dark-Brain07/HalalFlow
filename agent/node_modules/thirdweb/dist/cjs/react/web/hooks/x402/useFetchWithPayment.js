"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFetchWithPayment = useFetchWithPayment;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const webStorage_js_1 = require("../../../../utils/storage/webStorage.js");
const useFetchWithPaymentCore_js_1 = require("../../../core/hooks/x402/useFetchWithPaymentCore.js");
const RootElementContext_js_1 = require("../../../core/providers/RootElementContext.js");
const useConnectModal_js_1 = require("../../ui/ConnectWallet/useConnectModal.js");
const PaymentErrorModal_js_1 = require("../../ui/x402/PaymentErrorModal.js");
const SignInRequiredModal_js_1 = require("../../ui/x402/SignInRequiredModal.js");
/**
 * A React hook that wraps the native fetch API to automatically handle 402 Payment Required responses
 * using the x402 payment protocol with the currently connected wallet.
 *
 * This hook enables you to make API calls that require payment without manually handling the payment flow.
 * Responses are automatically parsed as JSON by default (can be customized with `parseAs` option).
 *
 * When a 402 response is received, it will automatically:
 * 1. Parse the payment requirements
 * 2. Verify the payment amount is within the allowed maximum
 * 3. Create a payment header using the connected wallet
 * 4. Retry the request with the payment header
 *
 * If payment fails (e.g. insufficient funds), a modal will be shown to help the user resolve the issue.
 * If no wallet is connected, a sign-in modal will be shown to connect a wallet.
 *
 * @param client - The thirdweb client used to access RPC infrastructure
 * @param options - Optional configuration for payment handling
 * @param options.maxValue - The maximum allowed payment amount in base units
 * @param options.paymentRequirementsSelector - Custom function to select payment requirements from available options
 * @param options.parseAs - How to parse the response: "json" (default), "text", or "raw"
 * @param options.uiEnabled - Whether to show the UI for connection, funding or payment retries (defaults to true). Set to false to handle errors yourself
 * @param options.theme - Theme for the payment error modal (defaults to "dark")
 * @param options.fundWalletOptions - Customize the BuyWidget shown when user needs to fund their wallet
 * @param options.connectOptions - Customize the ConnectModal shown when user needs to sign in
 * @param options.signInRequiredModal - Customize the SignInRequiredModal shown when user needs to sign in (title, description, buttonLabel)
 * @returns An object containing:
 * - `fetchWithPayment`: Function to make fetch requests with automatic payment handling (returns parsed data)
 * - `isPending`: Boolean indicating if a request is in progress
 * - `error`: Any error that occurred during the request
 * - `data`: The parsed response data (JSON by default, or based on `parseAs` option)
 * - Other mutation properties from React Query
 *
 * @example
 * ```tsx
 * import { useFetchWithPayment } from "thirdweb/react";
 * import { createThirdwebClient } from "thirdweb";
 *
 * const client = createThirdwebClient({ clientId: "your-client-id" });
 *
 * function MyComponent() {
 *   const { fetchWithPayment, isPending } = useFetchWithPayment(client);
 *
 *   const handleApiCall = async () => {
 *     // Response is automatically parsed as JSON
 *     const data = await fetchWithPayment('https://api.example.com/paid-endpoint');
 *     console.log(data);
 *   };
 *
 *   return (
 *     <button onClick={handleApiCall} disabled={isPending}>
 *       {isPending ? 'Loading...' : 'Make Paid API Call'}
 *     </button>
 *   );
 * }
 * ```
 *
 * ### Customize response parsing
 * ```tsx
 * const { fetchWithPayment } = useFetchWithPayment(client, {
 *   parseAs: "text", // Get response as text instead of JSON
 * });
 *
 * const textData = await fetchWithPayment('https://api.example.com/endpoint');
 * ```
 *
 * ### Customize payment options
 * ```tsx
 * const { fetchWithPayment } = useFetchWithPayment(client, {
 *   maxValue: 5000000n, // 5 USDC in base units
 *   theme: "light",
 *   paymentRequirementsSelector: (requirements) => {
 *     // Custom logic to select preferred payment method
 *     return requirements[0];
 *   }
 * });
 * ```
 *
 * ### Customize the fund wallet widget
 * ```tsx
 * const { fetchWithPayment } = useFetchWithPayment(client, {
 *   fundWalletOptions: {
 *     title: "Add Funds",
 *     description: "You need more tokens to complete this payment",
 *     buttonLabel: "Get Tokens",
 *   }
 * });
 * ```
 *
 * ### Customize the connect modal
 * ```tsx
 * const { fetchWithPayment } = useFetchWithPayment(client, {
 *   connectOptions: {
 *     wallets: [inAppWallet(), createWallet("io.metamask")],
 *     title: "Sign in to continue",
 *   }
 * });
 * ```
 *
 * ### Customize the sign in required modal
 * ```tsx
 * const { fetchWithPayment } = useFetchWithPayment(client, {
 *   signInRequiredModal: {
 *     title: "Authentication Required",
 *     description: "Please sign in to access this paid content.",
 *     buttonLabel: "Connect Wallet",
 *   }
 * });
 * ```
 *
 * ### Disable the UI and handle errors yourself
 * ```tsx
 * const { fetchWithPayment, error } = useFetchWithPayment(client, {
 *   uiEnabled: false,
 * });
 *
 * // Handle the error manually
 * if (error) {
 *   console.error("Payment failed:", error);
 * }
 * ```
 *
 * @x402
 */
function useFetchWithPayment(client, options) {
    const setRootEl = (0, react_1.useContext)(RootElementContext_js_1.SetRootElementContext);
    const { connect } = (0, useConnectModal_js_1.useConnectModal)();
    const theme = options?.theme || "dark";
    const showModal = options?.uiEnabled !== false; // Default to true
    const showErrorModal = showModal
        ? (data) => {
            setRootEl((0, jsx_runtime_1.jsx)(PaymentErrorModal_js_1.PaymentErrorModal, { client: client, errorData: data.errorData, onCancel: () => {
                    setRootEl(null);
                    data.onCancel();
                }, onRetry: () => {
                    setRootEl(null);
                    data.onRetry();
                }, theme: theme, fundWalletOptions: options?.fundWalletOptions, paymentRequirementsSelector: options?.paymentRequirementsSelector }));
        }
        : undefined;
    const showConnectModal = showModal
        ? (data) => {
            // First, show the SignInRequiredModal
            setRootEl((0, jsx_runtime_1.jsx)(SignInRequiredModal_js_1.SignInRequiredModal, { theme: theme, title: options?.signInRequiredModal?.title, description: options?.signInRequiredModal?.description, buttonLabel: options?.signInRequiredModal?.buttonLabel, onSignIn: async () => {
                    // Close the SignInRequiredModal
                    setRootEl(null);
                    // Open the ConnectModal
                    try {
                        const connectedWallet = await connect({
                            client,
                            theme,
                            ...options?.connectOptions,
                        });
                        // On successful connection, trigger onConnect callback with the wallet
                        data.onConnect(connectedWallet);
                    }
                    catch (_error) {
                        // User cancelled the connection
                        data.onCancel();
                    }
                }, onCancel: () => {
                    setRootEl(null);
                    data.onCancel();
                } }));
        }
        : undefined;
    // Default to webLocalStorage for permit signature caching
    const resolvedOptions = (0, react_1.useMemo)(() => ({
        ...(options ?? {}),
        storage: options?.storage ?? webStorage_js_1.webLocalStorage,
    }), [options]);
    return (0, useFetchWithPaymentCore_js_1.useFetchWithPaymentCore)(client, resolvedOptions, showErrorModal, showConnectModal);
}
//# sourceMappingURL=useFetchWithPayment.js.map