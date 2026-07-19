"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { CheckIcon, ClockIcon, Cross1Icon } from "@radix-ui/react-icons";
import { defineChain } from "../../../../chains/utils.js";
import { useCustomTheme } from "../../../core/design-system/CustomThemeProvider.js";
import { iconSize, radius, spacing, } from "../../../core/design-system/index.js";
import { useStepExecutor, } from "../../../core/hooks/useStepExecutor.js";
import { Container, ModalHeader } from "../components/basic.js";
import { Button } from "../components/buttons.js";
import { ChainName } from "../components/ChainName.js";
import { Spacer } from "../components/Spacer.js";
import { Spinner } from "../components/Spinner.js";
import { Text } from "../components/text.js";
export function StepRunner({ title, request, wallet, client, windowAdapter, onComplete, onCancel, onBack, autoStart, preparedQuote, }) {
    const theme = useCustomTheme();
    // Use the real step executor hook
    const { currentStep, progress, executionState, onrampStatus, steps, error, start, cancel, retry, } = useStepExecutor({
        autoStart,
        client,
        onComplete: (completedStatuses) => {
            onComplete(completedStatuses);
        },
        wallet,
        preparedQuote,
        windowAdapter,
    });
    const handleCancel = () => {
        cancel();
        if (onCancel) {
            onCancel();
        }
    };
    const handleRetry = () => {
        retry();
    };
    const getStepStatus = (stepIndex) => {
        if (!currentStep || !steps) {
            // Not started yet
            return stepIndex === 0 ? (error ? "failed" : "pending") : "pending";
        }
        const currentStepIndex = steps.findIndex((step) => step === currentStep);
        if (stepIndex < currentStepIndex)
            return "completed";
        if (stepIndex === currentStepIndex && executionState === "executing")
            return "executing";
        if (stepIndex === currentStepIndex && error)
            return "failed";
        if (stepIndex === currentStepIndex &&
            executionState === "idle" &&
            progress === 100)
            return "completed";
        return "pending";
    };
    const getStatusIcon = (status) => {
        switch (status) {
            case "completed":
                return (_jsx(CheckIcon, { color: theme.colors.accentButtonText, height: iconSize.sm, width: iconSize.sm }));
            case "executing":
                return _jsx(Spinner, { color: "accentButtonText", size: "sm" });
            case "failed":
                return (_jsx(Cross1Icon, { color: "white", height: iconSize.sm, width: iconSize.sm }));
            default:
                return (_jsx(ClockIcon, { color: theme.colors.primaryText, height: iconSize.sm, width: iconSize.sm }));
        }
    };
    const getStepBackgroundColor = (status) => {
        switch (status) {
            case "completed":
                return theme.colors.tertiaryBg;
            case "executing":
                return theme.colors.tertiaryBg;
            case "failed":
                return theme.colors.tertiaryBg;
            default:
                return theme.colors.tertiaryBg;
        }
    };
    const getIconBackgroundColor = (status) => {
        switch (status) {
            case "completed":
                return theme.colors.success;
            case "executing":
                return theme.colors.accentButtonBg;
            case "failed":
                return theme.colors.danger;
            default:
                return theme.colors.borderColor;
        }
    };
    const getStepDescription = (step) => {
        const { originToken, destinationToken } = step;
        // If tokens are the same, it's likely a bridge operation
        if (originToken.chainId !== destinationToken.chainId) {
            return (_jsxs(Container, { flex: "row", gap: "3xs", children: [_jsxs(Text, { color: "primaryText", size: "sm", children: ["Bridge ", originToken.symbol, " to", " "] }), _jsx(ChainName, { chain: getDestinationChain(request), client: client, color: "primaryText", short: true, size: "sm" })] }));
        }
        // If different tokens on same chain, it's a swap
        if (originToken.symbol !== destinationToken.symbol) {
            return (_jsxs(Text, { color: "primaryText", size: "sm", children: ["Swap ", originToken.symbol, " to ", destinationToken.symbol] }));
        }
        // Fallback to step number
        return (_jsx(Text, { color: "primaryText", size: "sm", children: "Process transaction" }));
    };
    const getStepStatusText = (status) => {
        switch (status) {
            case "executing":
                return "Processing...";
            case "completed":
                return "Completed";
            case "pending":
                return "Waiting...";
            case "failed":
                return "Failed";
            default:
                return "Unknown";
        }
    };
    return (_jsxs(Container, { flex: "column", fullHeight: true, px: "md", pb: "md", pt: "md+", children: [_jsx(ModalHeader, { onBack: onBack, title: title || "Processing Payment" }), _jsx(Spacer, { y: "xl" }), _jsxs(Container, { flex: "column", children: [_jsxs(Container, { flex: "column", gap: "sm", children: [_jsxs(Container, { center: "y", flex: "row", children: [_jsx(Text, { color: "secondaryText", size: "sm", style: { flex: 1 }, children: "Progress" }), _jsxs(Text, { color: "primaryText", size: "sm", children: [progress, "%"] })] }), _jsx(Container, { style: {
                                    backgroundColor: theme.colors.tertiaryBg,
                                    border: `1px solid ${theme.colors.borderColor}`,
                                    borderRadius: "4px",
                                    height: "8px",
                                    overflow: "hidden",
                                    width: "100%",
                                }, children: _jsx(Container, { style: {
                                        backgroundColor: error
                                            ? theme.colors.danger
                                            : theme.colors.accentButtonBg,
                                        height: "100%",
                                        transition: "width 0.3s ease",
                                        width: `${progress}%`,
                                    }, children: _jsx(Text, {}) }) })] }), _jsx(Spacer, { y: "lg" }), _jsxs(Container, { flex: "column", gap: "sm", children: [request.type === "onramp" && onrampStatus ? (_jsxs(Container, { flex: "row", gap: "md", style: {
                                    alignItems: "center",
                                    backgroundColor: getStepBackgroundColor(onrampStatus),
                                    border: `1px solid ${theme.colors.borderColor}`,
                                    borderRadius: radius.md,
                                    padding: `${spacing.sm} ${spacing.md}`,
                                }, children: [_jsx(Container, { center: "both", flex: "row", style: {
                                            backgroundColor: getIconBackgroundColor(onrampStatus),
                                            borderRadius: "50%",
                                            color: theme.colors.primaryButtonText,
                                            flexShrink: 0,
                                            height: `${iconSize.lg}px`,
                                            width: `${iconSize.lg}px`,
                                        }, children: getStatusIcon(onrampStatus) }), _jsxs(Container, { flex: "column", gap: "3xs", style: { flex: 1 }, children: [_jsx(Text, { color: "primaryText", size: "sm", children: request.onramp.slice(0, 1).toUpperCase() +
                                                    request.onramp.slice(1) }), _jsx(Text, { color: "secondaryText", size: "xs", children: getStepStatusText(onrampStatus) })] })] })) : null, steps?.map((step, index) => {
                                const status = getStepStatus(index);
                                return (_jsxs(Container, { flex: "row", gap: "md", style: {
                                        alignItems: "center",
                                        backgroundColor: getStepBackgroundColor(status),
                                        border: `1px solid ${theme.colors.borderColor}`,
                                        borderRadius: radius.md,
                                        padding: `${spacing.sm} ${spacing.md}`,
                                    }, children: [_jsx(Container, { center: "both", flex: "row", style: {
                                                backgroundColor: getIconBackgroundColor(status),
                                                borderRadius: "50%",
                                                color: theme.colors.primaryButtonText,
                                                flexShrink: 0,
                                                height: `${iconSize.lg}px`,
                                                width: `${iconSize.lg}px`,
                                            }, children: getStatusIcon(status) }), _jsxs(Container, { flex: "column", gap: "3xs", style: { flex: 1 }, children: [getStepDescription(step), _jsx(Text, { color: "secondaryText", size: "xs", children: getStepStatusText(status) })] })] }, `${step.originToken.chainId}-${step.destinationToken.chainId}-${index}`));
                            })] }), _jsx(Spacer, { y: "md" }), _jsx(Text, { center: true, color: error ? "danger" : "secondaryText", size: "xs", multiline: true, children: error ? (error.message || "An error occurred. Please try again.") : (_jsxs(_Fragment, { children: ["Keep this window open until all", _jsx("br", {}), " transactions are complete."] })) }), _jsx(Spacer, { y: "lg" }), error ? (_jsx(Container, { flex: "row", gap: "md", children: _jsx(Button, { fullWidth: true, onClick: handleRetry, variant: "primary", children: "Retry" }) })) : executionState === "idle" && progress === 0 ? (_jsx(Button, { fullWidth: true, onClick: start, variant: "accent", children: "Start Transaction" })) : executionState === "executing" ||
                        executionState === "auto-starting" ? (_jsx(Button, { fullWidth: true, onClick: handleCancel, variant: "secondary", children: "Cancel Transaction" })) : null] })] }));
}
function getDestinationChain(request) {
    switch (request.type) {
        case "onramp":
            return defineChain(request.chainId);
        case "buy":
        case "sell":
            return defineChain(request.destinationChainId);
        case "transfer":
            return defineChain(request.chainId);
        default:
            throw new Error("Invalid quote type");
    }
}
//# sourceMappingURL=StepRunner.js.map