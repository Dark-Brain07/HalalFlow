import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { CheckIcon, ExternalLinkIcon } from "@radix-ui/react-icons";
import { useCallback, useEffect, useRef, useState } from "react";
import { formatExplorerTxUrl } from "../../../../utils/url.js";
import { useCustomTheme } from "../../../core/design-system/CustomThemeProvider.js";
import { iconSize } from "../../../core/design-system/index.js";
import { useChainExplorers } from "../../../core/hooks/others/useChainQuery.js";
import { useSendTransaction } from "../../hooks/transaction/useSendTransaction.js";
import { AccentFailIcon } from "../ConnectWallet/icons/AccentFailIcon.js";
import { Container, ModalHeader } from "../components/basic.js";
import { Button } from "../components/buttons.js";
import { Spacer } from "../components/Spacer.js";
import { Spinner } from "../components/Spinner.js";
import { Text } from "../components/text.js";
export function ExecutingTxScreen(props) {
    const sendTxCore = useSendTransaction({
        payModal: false,
    });
    const [txHash, setTxHash] = useState();
    const [txError, setTxError] = useState();
    const chainExplorers = useChainExplorers(props.tx.chain);
    const [status, setStatus] = useState("loading");
    const theme = useCustomTheme();
    const sendTx = useCallback(async () => {
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
    const done = useRef(false);
    useEffect(() => {
        if (done.current) {
            return;
        }
        done.current = true;
        sendTx();
    }, [sendTx]);
    return (_jsxs(Container, { p: "lg", children: [_jsx(ModalHeader, { onBack: props.onBack, title: "Transaction" }), _jsx(Spacer, { y: "xxl" }), _jsxs(Container, { center: "x", flex: "row", children: [status === "loading" && _jsx(Spinner, { color: "accentText", size: "xxl" }), status === "failed" && _jsx(AccentFailIcon, { size: iconSize["3xl"] }), status === "sent" && (_jsx(Container, { center: "both", flex: "row", style: {
                            animation: "successBounce 0.6s ease-out",
                            backgroundColor: theme.colors.tertiaryBg,
                            border: `2px solid ${theme.colors.success}`,
                            borderRadius: "50%",
                            height: "64px",
                            marginBottom: "16px",
                            width: "64px",
                        }, children: _jsx(CheckIcon, { color: theme.colors.success, height: iconSize.xl, style: {
                                animation: "checkAppear 0.3s ease-out 0.3s both",
                            }, width: iconSize.xl }) }))] }), _jsx(Spacer, { y: "md" }), _jsxs(Text, { center: true, color: "primaryText", size: "lg", children: [status === "loading" && "Sending transaction", status === "failed" && "Transaction failed", status === "sent" && "Transaction sent"] }), _jsx(Spacer, { y: "sm" }), _jsx(Text, { center: true, color: "danger", size: "sm", children: status === "failed" && txError ? txError.message || "" : "" }), _jsx(Spacer, { y: "xl" }), status === "failed" && (_jsx(Button, { fullWidth: true, onClick: sendTx, variant: "accent", children: "Try Again" })), status === "sent" && (_jsxs(_Fragment, { children: [txHash && (_jsxs(_Fragment, { children: [_jsxs(Button, { color: "primaryText", fullWidth: true, gap: "xs", onClick: () => {
                                    props.windowAdapter.open(formatExplorerTxUrl(chainExplorers.explorers[0]?.url ?? "", txHash));
                                }, variant: "secondary", children: ["View on Explorer", _jsx(ExternalLinkIcon, { height: iconSize.sm, width: iconSize.sm })] }), _jsx(Spacer, { y: "sm" })] })), _jsx(Button, { fullWidth: true, onClick: props.closeModal, variant: "accent", children: "Done" })] })), _jsx("style", { children: `
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