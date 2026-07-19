"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendFunds = SendFunds;
exports.SendFundsForm = SendFundsForm;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_icons_1 = require("@radix-ui/react-icons");
const react_1 = require("react");
const index_js_1 = require("../../../../core/design-system/index.js");
const useWalletBalance_js_1 = require("../../../../core/hooks/others/useWalletBalance.js");
const useActiveAccount_js_1 = require("../../../../core/hooks/wallets/useActiveAccount.js");
const useActiveWalletChain_js_1 = require("../../../../core/hooks/wallets/useActiveWalletChain.js");
const useSendToken_js_1 = require("../../../../core/hooks/wallets/useSendToken.js");
const defaultTokens_js_1 = require("../../../../core/utils/defaultTokens.js");
const basic_js_1 = require("../../components/basic.js");
const buttons_js_1 = require("../../components/buttons.js");
const formElements_js_1 = require("../../components/formElements.js");
const Skeleton_js_1 = require("../../components/Skeleton.js");
const Spacer_js_1 = require("../../components/Spacer.js");
const Spinner_js_1 = require("../../components/Spinner.js");
const TokenIcon_js_1 = require("../../components/TokenIcon.js");
const text_js_1 = require("../../components/text.js");
const elements_js_1 = require("../../design-system/elements.js");
const formatTokenBalance_js_1 = require("./formatTokenBalance.js");
const nativeToken_js_1 = require("./nativeToken.js");
const TokenSelector_js_1 = require("./TokenSelector.js");
/**
 * @internal
 */
function SendFunds(props) {
    const [screen, setScreen] = (0, react_1.useState)("base");
    const activeChain = (0, useActiveWalletChain_js_1.useActiveWalletChain)();
    const chainId = activeChain?.id;
    const { connectLocale, client } = props;
    let defaultToken = nativeToken_js_1.NATIVE_TOKEN;
    const supportedTokens = props.supportedTokens || defaultTokens_js_1.defaultTokens;
    if (
    // if we know chainId
    chainId &&
        // if there is a list of tokens for this chain
        supportedTokens[chainId] &&
        // if the list of tokens is not the default list
        supportedTokens[chainId] !== defaultTokens_js_1.defaultTokens[chainId]) {
        // use the first token in the list as default selected
        const tokensForChain = supportedTokens[chainId];
        const firstToken = tokensForChain?.[0];
        if (firstToken) {
            defaultToken = firstToken;
        }
    }
    const [token, setToken] = (0, react_1.useState)(defaultToken);
    const [receiverAddress, setReceiverAddress] = (0, react_1.useState)("");
    const [amount, setAmount] = (0, react_1.useState)("0");
    const chain = (0, useActiveWalletChain_js_1.useActiveWalletChain)();
    const tokenList = (chain?.id ? supportedTokens[chain.id] : undefined) || [];
    if (screen === "tokenSelector" && chain) {
        return ((0, jsx_runtime_1.jsx)(TokenSelector_js_1.TokenSelector, { chain: chain, client: client, connectLocale: connectLocale, onBack: () => {
                setScreen("base");
            }, onTokenSelect: (_token) => {
                setToken(_token);
                setScreen("base");
            }, tokenList: tokenList }));
    }
    return ((0, jsx_runtime_1.jsx)(SendFundsForm, { amount: amount, client: client, connectLocale: connectLocale, onBack: props.onBack, onTokenSelect: () => {
            setScreen("tokenSelector");
        }, receiverAddress: receiverAddress, setAmount: setAmount, setReceiverAddress: setReceiverAddress, token: token }));
}
/**
 * @internal Exported for tests
 */
function SendFundsForm(props) {
    const locale = props.connectLocale.sendFundsScreen;
    const tokenAddress = props.token && "address" in props.token ? props.token.address : undefined;
    const chain = (0, useActiveWalletChain_js_1.useActiveWalletChain)();
    const activeAccount = (0, useActiveAccount_js_1.useActiveAccount)();
    const activeChain = (0, useActiveWalletChain_js_1.useActiveWalletChain)();
    const balanceQuery = (0, useWalletBalance_js_1.useWalletBalance)({
        address: activeAccount?.address,
        chain,
        client: props.client,
        tokenAddress: tokenAddress,
    });
    const { receiverAddress, setReceiverAddress, amount, setAmount } = props;
    const sendTokenMutation = (0, useSendToken_js_1.useSendToken)(props.client);
    function getErrorMessage(error) {
        const message = error?.data?.message || error?.message;
        if (!message) {
            return locale.transactionFailed;
        }
        if (message.includes("user rejected") ||
            message.includes("user closed modal") ||
            message.includes("user denied")) {
            return locale.transactionRejected;
        }
        if (message.includes("insufficient funds")) {
            return locale.insufficientFunds;
        }
        return message;
    }
    const tokenId = (0, react_1.useId)();
    const receiverId = (0, react_1.useId)();
    const amountId = (0, react_1.useId)();
    if (!activeChain) {
        return null; // this should never happen
    }
    if (sendTokenMutation.isError) {
        return ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { animate: "fadein", p: "lg", className: "tw-send-funds-screen tw-send-funds-screen__error", children: [(0, jsx_runtime_1.jsx)(basic_js_1.ModalHeader, { onBack: () => {
                        sendTokenMutation.reset();
                    }, title: locale.title }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "xl" }), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { animate: "fadein", center: "both", color: "danger", flex: "column", gap: "lg", style: {
                        minHeight: "200px",
                    }, children: [(0, jsx_runtime_1.jsx)(react_icons_1.CrossCircledIcon, { height: index_js_1.iconSize.xl, width: index_js_1.iconSize.xl }), (0, jsx_runtime_1.jsx)(text_js_1.Text, { center: true, color: "danger", multiline: true, children: getErrorMessage(sendTokenMutation.error) })] })] }));
    }
    if (sendTokenMutation.isSuccess) {
        return ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { animate: "fadein", p: "lg", className: "tw-send-funds-screen tw-send-funds-screen__success", children: [(0, jsx_runtime_1.jsx)(basic_js_1.ModalHeader, { onBack: () => {
                        sendTokenMutation.reset();
                    }, title: locale.title }), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { animate: "fadein", center: "both", color: "success", flex: "column", gap: "lg", style: {
                        minHeight: "250px",
                    }, children: [(0, jsx_runtime_1.jsx)(react_icons_1.CheckCircledIcon, { height: index_js_1.iconSize.xl, width: index_js_1.iconSize.xl }), (0, jsx_runtime_1.jsxs)(text_js_1.Text, { color: "success", children: [" ", locale.successMessage, " "] })] })] }));
    }
    const tokenName = (props.token && "name" in props.token ? props.token.name : undefined) ||
        balanceQuery?.data?.name;
    const tokenSymbol = (props.token && "symbol" in props.token ? props.token.symbol : undefined) ||
        balanceQuery?.data?.symbol;
    return ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { animate: "fadein", p: "lg", className: "tw-send-funds-screen tw-send-funds-screen__form", children: [(0, jsx_runtime_1.jsx)(basic_js_1.ModalHeader, { onBack: props.onBack, title: locale.title }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "xl" }), (0, jsx_runtime_1.jsxs)("form", { onSubmit: (e) => {
                    e.preventDefault();
                }, children: [(0, jsx_runtime_1.jsx)(formElements_js_1.Label, { color: "secondaryText", htmlFor: tokenId, children: locale.token }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "sm" }), (0, jsx_runtime_1.jsxs)(buttons_js_1.Button, { className: "tw-select-token-button", fullWidth: true, id: tokenId, onClick: props.onTokenSelect, style: {
                            gap: index_js_1.spacing.sm,
                            justifyContent: "flex-start",
                            padding: index_js_1.spacing.sm,
                        }, variant: "outline", children: [(0, jsx_runtime_1.jsx)(TokenIcon_js_1.TokenIcon, { chain: activeChain, client: props.client, size: "lg", token: props.token }), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "column", gap: "xs", children: [tokenName ? ((0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "primaryText", size: "sm", children: tokenName })) : ((0, jsx_runtime_1.jsx)(Skeleton_js_1.Skeleton, { height: index_js_1.fontSize.xs, width: "150px" })), balanceQuery.data ? ((0, jsx_runtime_1.jsx)(text_js_1.Text, { size: "xs", children: (0, formatTokenBalance_js_1.formatTokenBalance)(balanceQuery.data) })) : ((0, jsx_runtime_1.jsx)(Skeleton_js_1.Skeleton, { height: index_js_1.fontSize.xs, width: "100px" }))] })] }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "lg" }), (0, jsx_runtime_1.jsx)(formElements_js_1.Label, { color: "secondaryText", htmlFor: receiverId, children: locale.sendTo }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "sm" }), (0, jsx_runtime_1.jsx)(formElements_js_1.Input, { className: "tw-address-input", id: receiverId, onChange: (e) => {
                            setReceiverAddress(e.target.value);
                        }, placeholder: "0x... or ENS name", required: true, value: receiverAddress, variant: "outline" }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "lg" }), (0, jsx_runtime_1.jsx)(formElements_js_1.Label, { color: "secondaryText", htmlFor: amountId, children: locale.amount }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "sm" }), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { relative: true, children: [(0, jsx_runtime_1.jsx)(formElements_js_1.Input, { className: "tw-amount-input", id: amountId, onChange: (e) => {
                                    setAmount(e.target.value);
                                }, required: true, type: "number", value: amount, variant: "outline" }), (0, jsx_runtime_1.jsx)(CurrencyBadge, { children: (0, jsx_runtime_1.jsxs)(text_js_1.Text, { size: "xs", children: [" ", tokenSymbol, " "] }) })] }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "xxl" }), (0, jsx_runtime_1.jsxs)(buttons_js_1.Button, { className: "tw-send-funds-button", fullWidth: true, onClick: async () => {
                            if (!receiverAddress || !amount) {
                                return;
                            }
                            await sendTokenMutation.mutateAsync({
                                amount,
                                receiverAddress,
                                tokenAddress: tokenAddress,
                            });
                        }, style: {
                            alignItems: "center",
                            gap: index_js_1.spacing.sm,
                            padding: index_js_1.spacing.md,
                        }, type: "submit", variant: "accent", children: [sendTokenMutation.isPending && ((0, jsx_runtime_1.jsx)(Spinner_js_1.Spinner, { color: "accentButtonText", size: "sm" })), sendTokenMutation.isPending ? locale.sending : locale.submitButton] })] })] }));
}
const CurrencyBadge = /* @__PURE__ */ (0, elements_js_1.StyledDiv)({
    position: "absolute",
    right: index_js_1.spacing.sm,
    top: "50%",
    transform: "translateY(-50%)",
});
//# sourceMappingURL=SendFunds.js.map