"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecutingTxScreen = ExecutingTxScreen;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_icons_1 = require("@radix-ui/react-icons");
const react_1 = require("react");
const url_js_1 = require("../../../../utils/url.js");
const CustomThemeProvider_js_1 = require("../../../core/design-system/CustomThemeProvider.js");
const index_js_1 = require("../../../core/design-system/index.js");
const useChainQuery_js_1 = require("../../../core/hooks/others/useChainQuery.js");
const useSendTransaction_js_1 = require("../../hooks/transaction/useSendTransaction.js");
const AccentFailIcon_js_1 = require("../ConnectWallet/icons/AccentFailIcon.js");
const basic_js_1 = require("../components/basic.js");
const buttons_js_1 = require("../components/buttons.js");
const Spacer_js_1 = require("../components/Spacer.js");
const Spinner_js_1 = require("../components/Spinner.js");
const text_js_1 = require("../components/text.js");
function ExecutingTxScreen(props) {
    const sendTxCore = (0, useSendTransaction_js_1.useSendTransaction)({
        payModal: false,
    });
    const [txHash, setTxHash] = (0, react_1.useState)();
    const [txError, setTxError] = (0, react_1.useState)();
    const chainExplorers = (0, useChainQuery_js_1.useChainExplorers)(props.tx.chain);
    const [status, setStatus] = (0, react_1.useState)("loading");
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
    const sendTx = (0, react_1.useCallback)(async () => {
        setStatus("loading");
        setTxError(undefined);
        try {
            const txData = await sendTxCore.mutateAsync(props.tx);
            setTxHash(txData.transactionHash);
            props.onTxSent(txData);
            setStatus("sent");
        }
        catch (e) {
            // Do not reject the transaction here, because the user may want to try again
            // we only reject on modal close
            console.error(e);
            setTxError(e);
            setStatus("failed");
        }
    }, [sendTxCore, props.tx, props.onTxSent]);
    const done = (0, react_1.useRef)(false);
    (0, react_1.useEffect)(() => {
        if (done.current) {
            return;
        }
        done.current = true;
        sendTx();
    }, [sendTx]);
    return ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { p: "lg", children: [(0, jsx_runtime_1.jsx)(basic_js_1.ModalHeader, { onBack: props.onBack, title: "Transaction" }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "xxl" }), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { center: "x", flex: "row", children: [status === "loading" && (0, jsx_runtime_1.jsx)(Spinner_js_1.Spinner, { color: "accentText", size: "xxl" }), status === "failed" && (0, jsx_runtime_1.jsx)(AccentFailIcon_js_1.AccentFailIcon, { size: index_js_1.iconSize["3xl"] }), status === "sent" && ((0, jsx_runtime_1.jsx)(basic_js_1.Container, { center: "both", flex: "row", style: {
                            animation: "successBounce 0.6s ease-out",
                            backgroundColor: theme.colors.tertiaryBg,
                            border: `2px solid ${theme.colors.success}`,
                            borderRadius: "50%",
                            height: "64px",
                            marginBottom: "16px",
                            width: "64px",
                        }, children: (0, jsx_runtime_1.jsx)(react_icons_1.CheckIcon, { color: theme.colors.success, height: index_js_1.iconSize.xl, style: {
                                animation: "checkAppear 0.3s ease-out 0.3s both",
                            }, width: index_js_1.iconSize.xl }) }))] }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "md" }), (0, jsx_runtime_1.jsxs)(text_js_1.Text, { center: true, color: "primaryText", size: "lg", children: [status === "loading" && "Sending transaction", status === "failed" && "Transaction failed", status === "sent" && "Transaction sent"] }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "sm" }), (0, jsx_runtime_1.jsx)(text_js_1.Text, { center: true, color: "danger", size: "sm", children: status === "failed" && txError ? txError.message || "" : "" }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "xl" }), status === "failed" && ((0, jsx_runtime_1.jsx)(buttons_js_1.Button, { fullWidth: true, onClick: sendTx, variant: "accent", children: "Try Again" })), status === "sent" && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [txHash && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(buttons_js_1.Button, { color: "primaryText", fullWidth: true, gap: "xs", onClick: () => {
                                    props.windowAdapter.open((0, url_js_1.formatExplorerTxUrl)(chainExplorers.explorers[0]?.url ?? "", txHash));
                                }, variant: "secondary", children: ["View on Explorer", (0, jsx_runtime_1.jsx)(react_icons_1.ExternalLinkIcon, { height: index_js_1.iconSize.sm, width: index_js_1.iconSize.sm })] }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "sm" })] })), (0, jsx_runtime_1.jsx)(buttons_js_1.Button, { fullWidth: true, onClick: props.closeModal, variant: "accent", children: "Done" })] })), (0, jsx_runtime_1.jsx)("style", { children: `
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
//# sourceMappingURL=ExecutingScreen.js.map