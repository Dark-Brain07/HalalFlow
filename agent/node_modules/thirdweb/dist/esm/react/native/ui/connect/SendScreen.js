import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useChainSymbol } from "../../../core/hooks/others/useChainQuery.js";
import { useActiveAccount } from "../../../core/hooks/wallets/useActiveAccount.js";
import { useActiveWalletChain } from "../../../core/hooks/wallets/useActiveWalletChain.js";
import { useSendToken } from "../../../core/hooks/wallets/useSendToken.js";
import { radius, spacing } from "../../design-system/index.js";
import { ThemedButton } from "../components/button.js";
import { Header } from "../components/Header.js";
import { ThemedInput } from "../components/input.js";
import { Spacer } from "../components/spacer.js";
import { ThemedSpinner } from "../components/spinner.js";
import { ThemedText } from "../components/text.js";
import { ErrorView } from "./ErrorView.js";
import { SuccessView } from "./SuccessView.js";
import { TokenListScreen, TokenRow } from "./TokenListScreen.js";
export const SendScreen = (props) => {
    const { theme, client, onClose, onBack, containerType, supportedTokens } = props;
    const [receiverAddress, setReceiverAddress] = useState("");
    const [amount, setAmount] = useState("0");
    const [selectedToken, setSelectedToken] = useState();
    const account = useActiveAccount();
    const chain = useActiveWalletChain();
    const { symbol } = useChainSymbol(chain);
    const sendMutation = useSendToken(client);
    const [screen, setScreen] = useState("base");
    const handleTokenClicked = () => {
        setScreen("tokenList");
    };
    const handleSend = async () => {
        sendMutation.mutate({
            amount,
            receiverAddress,
            tokenAddress: selectedToken?.address,
        }, {
            onError() {
                setScreen("error");
            },
            onSuccess() {
                setScreen("success");
            },
        });
    };
    if (screen === "success") {
        return (_jsxs(_Fragment, { children: [_jsx(Header, { containerType: containerType, onBack: () => setScreen("base"), onClose: onClose, theme: theme, title: "Funds Sent" }), _jsx(Spacer, { size: "xl" }), _jsx(View, { style: { flex: 1 }, children: _jsx(SuccessView, { theme: theme, title: "Transaction Successful" }) })] }));
    }
    if (screen === "error") {
        return (_jsxs(_Fragment, { children: [_jsx(Header, { containerType: containerType, onBack: () => setScreen("base"), onClose: onClose, theme: theme, title: "Error Sending Funds" }), _jsx(Spacer, { size: "xl" }), _jsx(View, { style: { flex: 1 }, children: _jsx(ErrorView, { theme: theme, title: sendMutation.error?.message || "Unknown error" }) })] }));
    }
    if (screen === "tokenList") {
        return (_jsxs(_Fragment, { children: [_jsx(Header, { containerType: containerType, onBack: () => setScreen("base"), onClose: onClose, theme: theme, title: "Token to Send" }), _jsx(Spacer, { size: "xl" }), _jsx(View, { style: { flex: 1 }, children: _jsx(TokenListScreen, { client: client, onTokenSelected: (t) => {
                            setSelectedToken(t);
                            setScreen("base");
                        }, supportedTokens: supportedTokens, theme: theme }) })] }));
    }
    return (_jsxs(_Fragment, { children: [_jsx(Header, { containerType: containerType, onBack: onBack, onClose: onClose, theme: theme, title: "Send Funds" }), _jsxs(View, { style: styles.container, children: [_jsxs(View, { style: styles.inputContainer, children: [_jsx(ThemedText, { theme: theme, type: "subtext", children: "Token" }), _jsx(View, { style: {
                                    borderColor: theme.colors.borderColor,
                                    borderRadius: radius.lg,
                                    borderWidth: 1,
                                    paddingHorizontal: spacing.md,
                                    paddingVertical: spacing.smd,
                                }, children: _jsx(TokenRow, { address: account?.address, chain: chain, client: client, onTokenSelected: handleTokenClicked, theme: theme, token: selectedToken }) })] }), _jsxs(View, { style: styles.inputContainer, children: [_jsx(ThemedText, { theme: theme, type: "subtext", children: "Send to" }), _jsx(ThemedInput, { autoCapitalize: "none", keyboardType: "url", onChangeText: setReceiverAddress, placeholder: "0x... / ENS name", textContentType: "URL", theme: theme, value: receiverAddress })] }), _jsxs(View, { style: styles.inputContainer, children: [_jsx(ThemedText, { theme: theme, type: "subtext", children: "Amount" }), _jsx(ThemedInput, { inputMode: "decimal", onChangeText: setAmount, rightView: _jsx(ThemedText, { style: { marginRight: spacing.md }, theme: theme, type: "subtext", children: selectedToken?.symbol || symbol }), theme: theme, value: amount })] }), _jsx(View, { style: styles.inputContainer, children: _jsx(ThemedButton, { disabled: sendMutation.isPending, onPress: handleSend, theme: theme, variant: "accent", children: sendMutation.isPending ? (_jsx(ThemedSpinner, { color: theme.colors.accentButtonText })) : (_jsx(ThemedText, { style: {
                                    color: theme.colors.accentButtonText,
                                }, theme: theme, type: "defaultSemiBold", children: "Send" })) }) })] })] }));
};
const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        gap: spacing.md,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.lg,
    },
    inputContainer: {
        gap: spacing.sm,
    },
});
//# sourceMappingURL=SendScreen.js.map