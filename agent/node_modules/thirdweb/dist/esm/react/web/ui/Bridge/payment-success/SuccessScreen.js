"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CheckIcon } from "@radix-ui/react-icons";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { trackPayEvent } from "../../../../../analytics/track/pay.js";
import { useCustomTheme } from "../../../../core/design-system/CustomThemeProvider.js";
import { iconSize, spacing } from "../../../../core/design-system/index.js";
import { Container } from "../../components/basic.js";
import { Button } from "../../components/buttons.js";
import { Spacer } from "../../components/Spacer.js";
import { Text } from "../../components/text.js";
import { PaymentReceipt } from "./PaymentReceipt.js";
export function SuccessScreen({ preparedQuote, completedStatuses, onDone, windowAdapter, client, hasPaymentId = false, showContinueWithTx, type, }) {
    const theme = useCustomTheme();
    const [viewState, setViewState] = useState("success");
    const queryClient = useQueryClient();
    const hasFiredSuccessEvent = useRef(false);
    useEffect(() => {
        if (hasFiredSuccessEvent.current)
            return;
        hasFiredSuccessEvent.current = true;
        if (preparedQuote.type === "buy" || preparedQuote.type === "sell") {
            trackPayEvent({
                chainId: preparedQuote.intent.originChainId,
                client: client,
                event: "ub:ui:success_screen",
                fromToken: preparedQuote.intent.originTokenAddress,
                toChainId: preparedQuote.intent.destinationChainId,
                toToken: preparedQuote.intent.destinationTokenAddress,
                walletAddress: preparedQuote.intent.sender,
            });
        }
        if (preparedQuote.type === "transfer") {
            trackPayEvent({
                chainId: preparedQuote.intent.chainId,
                client: client,
                event: "ub:ui:success_screen",
                fromToken: preparedQuote.intent.tokenAddress,
                toChainId: preparedQuote.intent.chainId,
                toToken: preparedQuote.intent.tokenAddress,
                walletAddress: preparedQuote.intent.sender,
            });
        }
        queryClient.invalidateQueries({
            queryKey: ["bridge/v1/wallets"],
        });
        queryClient.invalidateQueries({
            queryKey: ["walletBalance"],
        });
        queryClient.invalidateQueries({
            queryKey: ["payment-methods"],
        });
    }, [client, preparedQuote, queryClient]);
    if (viewState === "detail") {
        return (_jsx(PaymentReceipt, { completedStatuses: completedStatuses, onBack: () => setViewState("success"), preparedQuote: preparedQuote, windowAdapter: windowAdapter }));
    }
    const title = type === "swap-success" ? "Swap Successful" : "Payment Successful";
    const description = type === "swap-success"
        ? "Your token swap has been completed successfully."
        : "Your payment has been completed successfully.";
    return (_jsxs(Container, { flex: "column", fullHeight: true, px: "md", pb: "md", pt: "md+", children: [_jsx(Spacer, { y: "3xl" }), _jsxs(Container, { center: "x", flex: "column", gap: "md", children: [_jsx(Container, { center: "both", flex: "row", style: {
                            animation: "successBounce 0.6s ease-out",
                            border: `2px solid ${theme.colors.success}`,
                            borderRadius: "50%",
                            height: "64px",
                            marginBottom: "16px",
                            width: "64px",
                        }, children: _jsx(CheckIcon, { color: theme.colors.success, height: iconSize.xl, style: {
                                animation: "checkAppear 0.3s ease-out 0.3s both",
                            }, width: iconSize.xl }) }), _jsxs("div", { children: [_jsx(Text, { center: true, color: "primaryText", size: "xl", weight: 600, trackingTight: true, style: {
                                    marginBottom: spacing.xxs,
                                }, children: title }), _jsx(Text, { center: true, color: "secondaryText", size: "sm", children: hasPaymentId
                                    ? "You can now close this page and return to the application."
                                    : showContinueWithTx
                                        ? "Click continue to execute your transaction."
                                        : description })] })] }), _jsx(Spacer, { y: "3xl" }), _jsxs(Container, { flex: "column", gap: "sm", style: { width: "100%" }, children: [_jsx(Button, { fullWidth: true, onClick: () => setViewState("detail"), variant: "secondary", children: "View Transaction Receipt" }), !hasPaymentId && (_jsx(Button, { fullWidth: true, onClick: onDone, variant: "accent", children: showContinueWithTx ? "Continue" : "Done" }))] }), _jsx("style", { children: `
          @keyframes successBounce {
            0% {
              transform: scale(0.3);
              opacity: 0;
            }
            50% {
              transform: scale(1.05);
            }
            70% {
              transform: scale(0.9);
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }

          @keyframes checkAppear {
            0% {
              transform: scale(0);
              opacity: 0;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
        ` })] }));
}
//# sourceMappingURL=SuccessScreen.js.map