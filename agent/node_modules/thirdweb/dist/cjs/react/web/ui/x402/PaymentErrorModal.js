"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentErrorModal = PaymentErrorModal;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const utils_js_1 = require("../../../../chains/utils.js");
const schemas_js_1 = require("../../../../x402/schemas.js");
const CustomThemeProvider_js_1 = require("../../../core/design-system/CustomThemeProvider.js");
const index_js_1 = require("../../../core/design-system/index.js");
const useActiveWallet_js_1 = require("../../../core/hooks/wallets/useActiveWallet.js");
const BuyWidget_js_1 = require("../Bridge/BuyWidget.js");
const basic_js_1 = require("../components/basic.js");
const buttons_js_1 = require("../components/buttons.js");
const Modal_js_1 = require("../components/Modal.js");
const text_js_1 = require("../components/text.js");
/**
 * @internal
 */
function PaymentErrorModal(props) {
    const { client, errorData, onRetry, onCancel, theme, fundWalletOptions, paymentRequirementsSelector, } = props;
    const [screen, setScreen] = (0, react_1.useState)("error");
    const isInsufficientFunds = errorData.error === "insufficient_funds";
    const wallet = (0, useActiveWallet_js_1.useActiveWallet)();
    // Extract chain and token info from errorData for BuyWidget
    const getBuyWidgetConfig = () => {
        if (!errorData.accepts || errorData.accepts.length === 0) {
            return null;
        }
        // Get payment requirements from errorData
        const parsedPaymentRequirements = errorData.accepts;
        // Get the current chain from wallet
        const currentChain = wallet?.getChain();
        const currentChainId = currentChain?.id;
        // Select payment requirement using the same logic as wrapFetchWithPayment
        const selectedRequirement = paymentRequirementsSelector
            ? paymentRequirementsSelector(parsedPaymentRequirements)
            : defaultPaymentRequirementsSelector(parsedPaymentRequirements, currentChainId, "exact", errorData.error);
        if (!selectedRequirement)
            return null;
        const caip2ChainId = (0, schemas_js_1.networkToCaip2ChainId)(selectedRequirement.network);
        const chainId = (0, schemas_js_1.extractEvmChainId)(caip2ChainId);
        if (!chainId)
            return null;
        const chain = (0, utils_js_1.getCachedChain)(chainId);
        const tokenAddress = selectedRequirement.asset;
        return {
            chain,
            tokenAddress,
            amount: undefined,
        };
    };
    const buyWidgetConfig = isInsufficientFunds ? getBuyWidgetConfig() : null;
    if (screen === "buy-widget" && buyWidgetConfig) {
        return ((0, jsx_runtime_1.jsx)(CustomThemeProvider_js_1.CustomThemeProvider, { theme: theme, children: (0, jsx_runtime_1.jsx)(Modal_js_1.Modal, { className: "tw-payment-error-modal", hideCloseIcon: false, open: true, setOpen: (open) => {
                    if (!open) {
                        onCancel();
                    }
                }, size: "compact", title: "Top up your wallet", crossContainerStyles: {
                    position: "absolute",
                    right: index_js_1.spacing.lg,
                    top: index_js_1.spacing.lg,
                    zIndex: 1,
                }, children: (0, jsx_runtime_1.jsx)(BuyWidget_js_1.BuyWidget, { client: client, theme: theme, chain: buyWidgetConfig.chain, tokenAddress: buyWidgetConfig.tokenAddress, amount: buyWidgetConfig.amount, style: {
                        border: "none",
                        width: "100%",
                    }, buttonLabel: "Continue", title: "Get funds", description: "Top up your wallet to complete your payment.", ...fundWalletOptions, onSuccess: () => {
                        // Close modal and retry the payment
                        onRetry();
                    }, onCancel: () => {
                        // Go back to error screen
                        setScreen("error");
                    } }) }) }));
    }
    // Error screen (default)
    return ((0, jsx_runtime_1.jsx)(CustomThemeProvider_js_1.CustomThemeProvider, { theme: theme, children: (0, jsx_runtime_1.jsxs)(Modal_js_1.Modal, { className: "tw-payment-error-modal", hideCloseIcon: true, open: true, setOpen: (open) => {
                if (!open) {
                    onCancel();
                }
            }, size: "compact", title: "Payment Failed", children: [(0, jsx_runtime_1.jsxs)(basic_js_1.Container, { p: "lg", children: [(0, jsx_runtime_1.jsx)(basic_js_1.ModalHeader, { title: "Payment failed" }), (0, jsx_runtime_1.jsx)(basic_js_1.Container, { flex: "column", gap: "lg", style: {
                                paddingTop: index_js_1.spacing.lg,
                            }, children: (0, jsx_runtime_1.jsx)(text_js_1.Text, { size: "sm", style: {
                                    color: "inherit",
                                    lineHeight: 1.5,
                                }, children: isInsufficientFunds
                                    ? "Your wallet doesn't have enough funds to complete this payment. Please top up your wallet and try again."
                                    : errorData.errorMessage ||
                                        "An error occurred while processing your payment." }) })] }), (0, jsx_runtime_1.jsx)(basic_js_1.ScreenBottomContainer, { children: isInsufficientFunds && buyWidgetConfig ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(buttons_js_1.Button, { fullWidth: true, gap: "xs", onClick: () => setScreen("buy-widget"), variant: "accent", children: "Top up your wallet" }), (0, jsx_runtime_1.jsx)(buttons_js_1.Button, { fullWidth: true, gap: "xs", onClick: onCancel, variant: "secondary", children: "Cancel" })] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(buttons_js_1.Button, { fullWidth: true, gap: "xs", onClick: onRetry, variant: "accent", children: "Try Again" }), (0, jsx_runtime_1.jsx)(buttons_js_1.Button, { fullWidth: true, gap: "xs", onClick: onCancel, variant: "secondary", children: "Cancel" })] })) })] }) }));
}
// Default payment requirement selector - same logic as in fetchWithPayment.ts
function defaultPaymentRequirementsSelector(paymentRequirements, chainId, scheme, _error) {
    if (!paymentRequirements.length) {
        return undefined;
    }
    // If we have a chainId, find matching payment requirements
    if (chainId !== undefined) {
        const matchingPaymentRequirements = paymentRequirements.find((x) => (0, schemas_js_1.extractEvmChainId)((0, schemas_js_1.networkToCaip2ChainId)(x.network)) === chainId &&
            x.scheme === scheme);
        if (matchingPaymentRequirements) {
            return matchingPaymentRequirements;
        }
    }
    // If no matching payment requirements, use the first payment requirement
    const firstPaymentRequirement = paymentRequirements.find((x) => x.scheme === scheme);
    return firstPaymentRequirement;
}
//# sourceMappingURL=PaymentErrorModal.js.map