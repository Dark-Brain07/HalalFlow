"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StepRunner = StepRunner;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_icons_1 = require("@radix-ui/react-icons");
const utils_js_1 = require("../../../../chains/utils.js");
const CustomThemeProvider_js_1 = require("../../../core/design-system/CustomThemeProvider.js");
const index_js_1 = require("../../../core/design-system/index.js");
const useStepExecutor_js_1 = require("../../../core/hooks/useStepExecutor.js");
const basic_js_1 = require("../components/basic.js");
const buttons_js_1 = require("../components/buttons.js");
const ChainName_js_1 = require("../components/ChainName.js");
const Spacer_js_1 = require("../components/Spacer.js");
const Spinner_js_1 = require("../components/Spinner.js");
const text_js_1 = require("../components/text.js");
function StepRunner({ title, request, wallet, client, windowAdapter, onComplete, onCancel, onBack, autoStart, preparedQuote, }) {
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
    // Use the real step executor hook
    const { currentStep, progress, executionState, onrampStatus, steps, error, start, cancel, retry, } = (0, useStepExecutor_js_1.useStepExecutor)({
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
                return ((0, jsx_runtime_1.jsx)(react_icons_1.CheckIcon, { color: theme.colors.accentButtonText, height: index_js_1.iconSize.sm, width: index_js_1.iconSize.sm }));
            case "executing":
                return (0, jsx_runtime_1.jsx)(Spinner_js_1.Spinner, { color: "accentButtonText", size: "sm" });
            case "failed":
                return ((0, jsx_runtime_1.jsx)(react_icons_1.Cross1Icon, { color: "white", height: index_js_1.iconSize.sm, width: index_js_1.iconSize.sm }));
            default:
                return ((0, jsx_runtime_1.jsx)(react_icons_1.ClockIcon, { color: theme.colors.primaryText, height: index_js_1.iconSize.sm, width: index_js_1.iconSize.sm }));
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
            return ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "row", gap: "3xs", children: [(0, jsx_runtime_1.jsxs)(text_js_1.Text, { color: "primaryText", size: "sm", children: ["Bridge ", originToken.symbol, " to", " "] }), (0, jsx_runtime_1.jsx)(ChainName_js_1.ChainName, { chain: getDestinationChain(request), client: client, color: "primaryText", short: true, size: "sm" })] }));
        }
        // If different tokens on same chain, it's a swap
        if (originToken.symbol !== destinationToken.symbol) {
            return ((0, jsx_runtime_1.jsxs)(text_js_1.Text, { color: "primaryText", size: "sm", children: ["Swap ", originToken.symbol, " to ", destinationToken.symbol] }));
        }
        // Fallback to step number
        return ((0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "primaryText", size: "sm", children: "Process transaction" }));
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
    return ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "column", fullHeight: true, px: "md", pb: "md", pt: "md+", children: [(0, jsx_runtime_1.jsx)(basic_js_1.ModalHeader, { onBack: onBack, title: title || "Processing Payment" }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "xl" }), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "column", children: [(0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "column", gap: "sm", children: [(0, jsx_runtime_1.jsxs)(basic_js_1.Container, { center: "y", flex: "row", children: [(0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "secondaryText", size: "sm", style: { flex: 1 }, children: "Progress" }), (0, jsx_runtime_1.jsxs)(text_js_1.Text, { color: "primaryText", size: "sm", children: [progress, "%"] })] }), (0, jsx_runtime_1.jsx)(basic_js_1.Container, { style: {
                                    backgroundColor: theme.colors.tertiaryBg,
                                    border: `1px solid ${theme.colors.borderColor}`,
                                    borderRadius: "4px",
                                    height: "8px",
                                    overflow: "hidden",
                                    width: "100%",
                                }, children: (0, jsx_runtime_1.jsx)(basic_js_1.Container, { style: {
                                        backgroundColor: error
                                            ? theme.colors.danger
                                            : theme.colors.accentButtonBg,
                                        height: "100%",
                                        transition: "width 0.3s ease",
                                        width: `${progress}%`,
                                    }, children: (0, jsx_runtime_1.jsx)(text_js_1.Text, {}) }) })] }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "lg" }), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "column", gap: "sm", children: [request.type === "onramp" && onrampStatus ? ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "row", gap: "md", style: {
                                    alignItems: "center",
                                    backgroundColor: getStepBackgroundColor(onrampStatus),
                                    border: `1px solid ${theme.colors.borderColor}`,
                                    borderRadius: index_js_1.radius.md,
                                    padding: `${index_js_1.spacing.sm} ${index_js_1.spacing.md}`,
                                }, children: [(0, jsx_runtime_1.jsx)(basic_js_1.Container, { center: "both", flex: "row", style: {
                                            backgroundColor: getIconBackgroundColor(onrampStatus),
                                            borderRadius: "50%",
                                            color: theme.colors.primaryButtonText,
                                            flexShrink: 0,
                                            height: `${index_js_1.iconSize.lg}px`,
                                            width: `${index_js_1.iconSize.lg}px`,
                                        }, children: getStatusIcon(onrampStatus) }), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "column", gap: "3xs", style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "primaryText", size: "sm", children: request.onramp.slice(0, 1).toUpperCase() +
                                                    request.onramp.slice(1) }), (0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "secondaryText", size: "xs", children: getStepStatusText(onrampStatus) })] })] })) : null, steps?.map((step, index) => {
                                const status = getStepStatus(index);
                                return ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "row", gap: "md", style: {
                                        alignItems: "center",
                                        backgroundColor: getStepBackgroundColor(status),
                                        border: `1px solid ${theme.colors.borderColor}`,
                                        borderRadius: index_js_1.radius.md,
                                        padding: `${index_js_1.spacing.sm} ${index_js_1.spacing.md}`,
                                    }, children: [(0, jsx_runtime_1.jsx)(basic_js_1.Container, { center: "both", flex: "row", style: {
                                                backgroundColor: getIconBackgroundColor(status),
                                                borderRadius: "50%",
                                                color: theme.colors.primaryButtonText,
                                                flexShrink: 0,
                                                height: `${index_js_1.iconSize.lg}px`,
                                                width: `${index_js_1.iconSize.lg}px`,
                                            }, children: getStatusIcon(status) }), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "column", gap: "3xs", style: { flex: 1 }, children: [getStepDescription(step), (0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "secondaryText", size: "xs", children: getStepStatusText(status) })] })] }, `${step.originToken.chainId}-${step.destinationToken.chainId}-${index}`));
                            })] }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "md" }), (0, jsx_runtime_1.jsx)(text_js_1.Text, { center: true, color: error ? "danger" : "secondaryText", size: "xs", multiline: true, children: error ? (error.message || "An error occurred. Please try again.") : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: ["Keep this window open until all", (0, jsx_runtime_1.jsx)("br", {}), " transactions are complete."] })) }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "lg" }), error ? ((0, jsx_runtime_1.jsx)(basic_js_1.Container, { flex: "row", gap: "md", children: (0, jsx_runtime_1.jsx)(buttons_js_1.Button, { fullWidth: true, onClick: handleRetry, variant: "primary", children: "Retry" }) })) : executionState === "idle" && progress === 0 ? ((0, jsx_runtime_1.jsx)(buttons_js_1.Button, { fullWidth: true, onClick: start, variant: "accent", children: "Start Transaction" })) : executionState === "executing" ||
                        executionState === "auto-starting" ? ((0, jsx_runtime_1.jsx)(buttons_js_1.Button, { fullWidth: true, onClick: handleCancel, variant: "secondary", children: "Cancel Transaction" })) : null] })] }));
}
function getDestinationChain(request) {
    switch (request.type) {
        case "onramp":
            return (0, utils_js_1.defineChain)(request.chainId);
        case "buy":
        case "sell":
            return (0, utils_js_1.defineChain)(request.destinationChainId);
        case "transfer":
            return (0, utils_js_1.defineChain)(request.chainId);
        default:
            throw new Error("Invalid quote type");
    }
}
//# sourceMappingURL=StepRunner.js.map