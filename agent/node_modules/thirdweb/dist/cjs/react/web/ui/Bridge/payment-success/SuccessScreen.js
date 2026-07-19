"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuccessScreen = SuccessScreen;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_icons_1 = require("@radix-ui/react-icons");
const react_query_1 = require("@tanstack/react-query");
const react_1 = require("react");
const pay_js_1 = require("../../../../../analytics/track/pay.js");
const CustomThemeProvider_js_1 = require("../../../../core/design-system/CustomThemeProvider.js");
const index_js_1 = require("../../../../core/design-system/index.js");
const basic_js_1 = require("../../components/basic.js");
const buttons_js_1 = require("../../components/buttons.js");
const Spacer_js_1 = require("../../components/Spacer.js");
const text_js_1 = require("../../components/text.js");
const PaymentReceipt_js_1 = require("./PaymentReceipt.js");
function SuccessScreen({ preparedQuote, completedStatuses, onDone, windowAdapter, client, hasPaymentId = false, showContinueWithTx, type, }) {
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
    const [viewState, setViewState] = (0, react_1.useState)("success");
    const queryClient = (0, react_query_1.useQueryClient)();
    const hasFiredSuccessEvent = (0, react_1.useRef)(false);
    (0, react_1.useEffect)(() => {
        if (hasFiredSuccessEvent.current)
            return;
        hasFiredSuccessEvent.current = true;
        if (preparedQuote.type === "buy" || preparedQuote.type === "sell") {
            (0, pay_js_1.trackPayEvent)({
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
            (0, pay_js_1.trackPayEvent)({
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
        return ((0, jsx_runtime_1.jsx)(PaymentReceipt_js_1.PaymentReceipt, { completedStatuses: completedStatuses, onBack: () => setViewState("success"), preparedQuote: preparedQuote, windowAdapter: windowAdapter }));
    }
    const title = type === "swap-success" ? "Swap Successful" : "Payment Successful";
    const description = type === "swap-success"
        ? "Your token swap has been completed successfully."
        : "Your payment has been completed successfully.";
    return ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "column", fullHeight: true, px: "md", pb: "md", pt: "md+", children: [(0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "3xl" }), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { center: "x", flex: "column", gap: "md", children: [(0, jsx_runtime_1.jsx)(basic_js_1.Container, { center: "both", flex: "row", style: {
                            animation: "successBounce 0.6s ease-out",
                            border: `2px solid ${theme.colors.success}`,
                            borderRadius: "50%",
                            height: "64px",
                            marginBottom: "16px",
                            width: "64px",
                        }, children: (0, jsx_runtime_1.jsx)(react_icons_1.CheckIcon, { color: theme.colors.success, height: index_js_1.iconSize.xl, style: {
                                animation: "checkAppear 0.3s ease-out 0.3s both",
                            }, width: index_js_1.iconSize.xl }) }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(text_js_1.Text, { center: true, color: "primaryText", size: "xl", weight: 600, trackingTight: true, style: {
                                    marginBottom: index_js_1.spacing.xxs,
                                }, children: title }), (0, jsx_runtime_1.jsx)(text_js_1.Text, { center: true, color: "secondaryText", size: "sm", children: hasPaymentId
                                    ? "You can now close this page and return to the application."
                                    : showContinueWithTx
                                        ? "Click continue to execute your transaction."
                                        : description })] })] }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "3xl" }), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "column", gap: "sm", style: { width: "100%" }, children: [(0, jsx_runtime_1.jsx)(buttons_js_1.Button, { fullWidth: true, onClick: () => setViewState("detail"), variant: "secondary", children: "View Transaction Receipt" }), !hasPaymentId && ((0, jsx_runtime_1.jsx)(buttons_js_1.Button, { fullWidth: true, onClick: onDone, variant: "accent", children: showContinueWithTx ? "Continue" : "Done" }))] }), (0, jsx_runtime_1.jsx)("style", { children: `
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