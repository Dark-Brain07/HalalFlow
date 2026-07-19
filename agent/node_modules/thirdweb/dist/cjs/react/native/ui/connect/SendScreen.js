"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendScreen = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_native_1 = require("react-native");
const useChainQuery_js_1 = require("../../../core/hooks/others/useChainQuery.js");
const useActiveAccount_js_1 = require("../../../core/hooks/wallets/useActiveAccount.js");
const useActiveWalletChain_js_1 = require("../../../core/hooks/wallets/useActiveWalletChain.js");
const useSendToken_js_1 = require("../../../core/hooks/wallets/useSendToken.js");
const index_js_1 = require("../../design-system/index.js");
const button_js_1 = require("../components/button.js");
const Header_js_1 = require("../components/Header.js");
const input_js_1 = require("../components/input.js");
const spacer_js_1 = require("../components/spacer.js");
const spinner_js_1 = require("../components/spinner.js");
const text_js_1 = require("../components/text.js");
const ErrorView_js_1 = require("./ErrorView.js");
const SuccessView_js_1 = require("./SuccessView.js");
const TokenListScreen_js_1 = require("./TokenListScreen.js");
const SendScreen = (props) => {
    const { theme, client, onClose, onBack, containerType, supportedTokens } = props;
    const [receiverAddress, setReceiverAddress] = (0, react_1.useState)("");
    const [amount, setAmount] = (0, react_1.useState)("0");
    const [selectedToken, setSelectedToken] = (0, react_1.useState)();
    const account = (0, useActiveAccount_js_1.useActiveAccount)();
    const chain = (0, useActiveWalletChain_js_1.useActiveWalletChain)();
    const { symbol } = (0, useChainQuery_js_1.useChainSymbol)(chain);
    const sendMutation = (0, useSendToken_js_1.useSendToken)(client);
    const [screen, setScreen] = (0, react_1.useState)("base");
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
        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Header_js_1.Header, { containerType: containerType, onBack: () => setScreen("base"), onClose: onClose, theme: theme, title: "Funds Sent" }), (0, jsx_runtime_1.jsx)(spacer_js_1.Spacer, { size: "xl" }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 }, children: (0, jsx_runtime_1.jsx)(SuccessView_js_1.SuccessView, { theme: theme, title: "Transaction Successful" }) })] }));
    }
    if (screen === "error") {
        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Header_js_1.Header, { containerType: containerType, onBack: () => setScreen("base"), onClose: onClose, theme: theme, title: "Error Sending Funds" }), (0, jsx_runtime_1.jsx)(spacer_js_1.Spacer, { size: "xl" }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 }, children: (0, jsx_runtime_1.jsx)(ErrorView_js_1.ErrorView, { theme: theme, title: sendMutation.error?.message || "Unknown error" }) })] }));
    }
    if (screen === "tokenList") {
        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Header_js_1.Header, { containerType: containerType, onBack: () => setScreen("base"), onClose: onClose, theme: theme, title: "Token to Send" }), (0, jsx_runtime_1.jsx)(spacer_js_1.Spacer, { size: "xl" }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 }, children: (0, jsx_runtime_1.jsx)(TokenListScreen_js_1.TokenListScreen, { client: client, onTokenSelected: (t) => {
                            setSelectedToken(t);
                            setScreen("base");
                        }, supportedTokens: supportedTokens, theme: theme }) })] }));
    }
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Header_js_1.Header, { containerType: containerType, onBack: onBack, onClose: onClose, theme: theme, title: "Send Funds" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: styles.container, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: styles.inputContainer, children: [(0, jsx_runtime_1.jsx)(text_js_1.ThemedText, { theme: theme, type: "subtext", children: "Token" }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    borderColor: theme.colors.borderColor,
                                    borderRadius: index_js_1.radius.lg,
                                    borderWidth: 1,
                                    paddingHorizontal: index_js_1.spacing.md,
                                    paddingVertical: index_js_1.spacing.smd,
                                }, children: (0, jsx_runtime_1.jsx)(TokenListScreen_js_1.TokenRow, { address: account?.address, chain: chain, client: client, onTokenSelected: handleTokenClicked, theme: theme, token: selectedToken }) })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: styles.inputContainer, children: [(0, jsx_runtime_1.jsx)(text_js_1.ThemedText, { theme: theme, type: "subtext", children: "Send to" }), (0, jsx_runtime_1.jsx)(input_js_1.ThemedInput, { autoCapitalize: "none", keyboardType: "url", onChangeText: setReceiverAddress, placeholder: "0x... / ENS name", textContentType: "URL", theme: theme, value: receiverAddress })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: styles.inputContainer, children: [(0, jsx_runtime_1.jsx)(text_js_1.ThemedText, { theme: theme, type: "subtext", children: "Amount" }), (0, jsx_runtime_1.jsx)(input_js_1.ThemedInput, { inputMode: "decimal", onChangeText: setAmount, rightView: (0, jsx_runtime_1.jsx)(text_js_1.ThemedText, { style: { marginRight: index_js_1.spacing.md }, theme: theme, type: "subtext", children: selectedToken?.symbol || symbol }), theme: theme, value: amount })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: styles.inputContainer, children: (0, jsx_runtime_1.jsx)(button_js_1.ThemedButton, { disabled: sendMutation.isPending, onPress: handleSend, theme: theme, variant: "accent", children: sendMutation.isPending ? ((0, jsx_runtime_1.jsx)(spinner_js_1.ThemedSpinner, { color: theme.colors.accentButtonText })) : ((0, jsx_runtime_1.jsx)(text_js_1.ThemedText, { style: {
                                    color: theme.colors.accentButtonText,
                                }, theme: theme, type: "defaultSemiBold", children: "Send" })) }) })] })] }));
};
exports.SendScreen = SendScreen;
const styles = react_native_1.StyleSheet.create({
    container: {
        flexDirection: "column",
        gap: index_js_1.spacing.md,
        paddingHorizontal: index_js_1.spacing.lg,
        paddingVertical: index_js_1.spacing.lg,
    },
    inputContainer: {
        gap: index_js_1.spacing.sm,
    },
});
//# sourceMappingURL=SendScreen.js.map