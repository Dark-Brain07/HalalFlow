"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { getCachedChain } from "../../../../chains/utils.js";
import { extractEvmChainId, networkToCaip2ChainId, } from "../../../../x402/schemas.js";
import { CustomThemeProvider } from "../../../core/design-system/CustomThemeProvider.js";
import { spacing } from "../../../core/design-system/index.js";
import { useActiveWallet } from "../../../core/hooks/wallets/useActiveWallet.js";
import { BuyWidget } from "../Bridge/BuyWidget.js";
import { Container, ModalHeader, ScreenBottomContainer, } from "../components/basic.js";
import { Button } from "../components/buttons.js";
import { Modal } from "../components/Modal.js";
import { Text } from "../components/text.js";
/**
 * @internal
 */
export function PaymentErrorModal(props) {
    const { client, errorData, onRetry, onCancel, theme, fundWalletOptions, paymentRequirementsSelector, } = props;
    const [screen, setScreen] = useState("error");
    const isInsufficientFunds = errorData.error === "insufficient_funds";
    const wallet = useActiveWallet();
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
        const caip2ChainId = networkToCaip2ChainId(selectedRequirement.network);
        const chainId = extractEvmChainId(caip2ChainId);
        if (!chainId)
            return null;
        const chain = getCachedChain(chainId);
        const tokenAddress = selectedRequirement.asset;
        return {
            chain,
            tokenAddress,
            amount: undefined,
        };
    };
    const buyWidgetConfig = isInsufficientFunds ? getBuyWidgetConfig() : null;
    if (screen === "buy-widget" && buyWidgetConfig) {
        return (_jsx(CustomThemeProvider, { theme: theme, children: _jsx(Modal, { className: "tw-payment-error-modal", hideCloseIcon: false, open: true, setOpen: (open) => {
                    if (!open) {
                        onCancel();
                    }
                }, size: "compact", title: "Top up your wallet", crossContainerStyles: {
                    position: "absolute",
                    right: spacing.lg,
                    top: spacing.lg,
                    zIndex: 1,
                }, children: _jsx(BuyWidget, { client: client, theme: theme, chain: buyWidgetConfig.chain, tokenAddress: buyWidgetConfig.tokenAddress, amount: buyWidgetConfig.amount, style: {
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
    return (_jsx(CustomThemeProvider, { theme: theme, children: _jsxs(Modal, { className: "tw-payment-error-modal", hideCloseIcon: true, open: true, setOpen: (open) => {
                if (!open) {
                    onCancel();
                }
            }, size: "compact", title: "Payment Failed", children: [_jsxs(Container, { p: "lg", children: [_jsx(ModalHeader, { title: "Payment failed" }), _jsx(Container, { flex: "column", gap: "lg", style: {
                                paddingTop: spacing.lg,
                            }, children: _jsx(Text, { size: "sm", style: {
                                    color: "inherit",
                                    lineHeight: 1.5,
                                }, children: isInsufficientFunds
                                    ? "Your wallet doesn't have enough funds to complete this payment. Please top up your wallet and try again."
                                    : errorData.errorMessage ||
                                        "An error occurred while processing your payment." }) })] }), _jsx(ScreenBottomContainer, { children: isInsufficientFunds && buyWidgetConfig ? (_jsxs(_Fragment, { children: [_jsx(Button, { fullWidth: true, gap: "xs", onClick: () => setScreen("buy-widget"), variant: "accent", children: "Top up your wallet" }), _jsx(Button, { fullWidth: true, gap: "xs", onClick: onCancel, variant: "secondary", children: "Cancel" })] })) : (_jsxs(_Fragment, { children: [_jsx(Button, { fullWidth: true, gap: "xs", onClick: onRetry, variant: "accent", children: "Try Again" }), _jsx(Button, { fullWidth: true, gap: "xs", onClick: onCancel, variant: "secondary", children: "Cancel" })] })) })] }) }));
}
// Default payment requirement selector - same logic as in fetchWithPayment.ts
function defaultPaymentRequirementsSelector(paymentRequirements, chainId, scheme, _error) {
    if (!paymentRequirements.length) {
        return undefined;
    }
    // If we have a chainId, find matching payment requirements
    if (chainId !== undefined) {
        const matchingPaymentRequirements = paymentRequirements.find((x) => extractEvmChainId(networkToCaip2ChainId(x.network)) === chainId &&
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