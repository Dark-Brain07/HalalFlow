import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CheckCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import { useId, useState } from "react";
import { fontSize, iconSize, spacing, } from "../../../../core/design-system/index.js";
import { useWalletBalance } from "../../../../core/hooks/others/useWalletBalance.js";
import { useActiveAccount } from "../../../../core/hooks/wallets/useActiveAccount.js";
import { useActiveWalletChain } from "../../../../core/hooks/wallets/useActiveWalletChain.js";
import { useSendToken } from "../../../../core/hooks/wallets/useSendToken.js";
import { defaultTokens, } from "../../../../core/utils/defaultTokens.js";
import { Container, ModalHeader } from "../../components/basic.js";
import { Button } from "../../components/buttons.js";
import { Input, Label } from "../../components/formElements.js";
import { Skeleton } from "../../components/Skeleton.js";
import { Spacer } from "../../components/Spacer.js";
import { Spinner } from "../../components/Spinner.js";
import { TokenIcon } from "../../components/TokenIcon.js";
import { Text } from "../../components/text.js";
import { StyledDiv } from "../../design-system/elements.js";
import { formatTokenBalance } from "./formatTokenBalance.js";
import { NATIVE_TOKEN } from "./nativeToken.js";
import { TokenSelector } from "./TokenSelector.js";
/**
 * @internal
 */
export function SendFunds(props) {
    const [screen, setScreen] = useState("base");
    const activeChain = useActiveWalletChain();
    const chainId = activeChain?.id;
    const { connectLocale, client } = props;
    let defaultToken = NATIVE_TOKEN;
    const supportedTokens = props.supportedTokens || defaultTokens;
    if (
    // if we know chainId
    chainId &&
        // if there is a list of tokens for this chain
        supportedTokens[chainId] &&
        // if the list of tokens is not the default list
        supportedTokens[chainId] !== defaultTokens[chainId]) {
        // use the first token in the list as default selected
        const tokensForChain = supportedTokens[chainId];
        const firstToken = tokensForChain?.[0];
        if (firstToken) {
            defaultToken = firstToken;
        }
    }
    const [token, setToken] = useState(defaultToken);
    const [receiverAddress, setReceiverAddress] = useState("");
    const [amount, setAmount] = useState("0");
    const chain = useActiveWalletChain();
    const tokenList = (chain?.id ? supportedTokens[chain.id] : undefined) || [];
    if (screen === "tokenSelector" && chain) {
        return (_jsx(TokenSelector, { chain: chain, client: client, connectLocale: connectLocale, onBack: () => {
                setScreen("base");
            }, onTokenSelect: (_token) => {
                setToken(_token);
                setScreen("base");
            }, tokenList: tokenList }));
    }
    return (_jsx(SendFundsForm, { amount: amount, client: client, connectLocale: connectLocale, onBack: props.onBack, onTokenSelect: () => {
            setScreen("tokenSelector");
        }, receiverAddress: receiverAddress, setAmount: setAmount, setReceiverAddress: setReceiverAddress, token: token }));
}
/**
 * @internal Exported for tests
 */
export function SendFundsForm(props) {
    const locale = props.connectLocale.sendFundsScreen;
    const tokenAddress = props.token && "address" in props.token ? props.token.address : undefined;
    const chain = useActiveWalletChain();
    const activeAccount = useActiveAccount();
    const activeChain = useActiveWalletChain();
    const balanceQuery = useWalletBalance({
        address: activeAccount?.address,
        chain,
        client: props.client,
        tokenAddress: tokenAddress,
    });
    const { receiverAddress, setReceiverAddress, amount, setAmount } = props;
    const sendTokenMutation = useSendToken(props.client);
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
    const tokenId = useId();
    const receiverId = useId();
    const amountId = useId();
    if (!activeChain) {
        return null; // this should never happen
    }
    if (sendTokenMutation.isError) {
        return (_jsxs(Container, { animate: "fadein", p: "lg", className: "tw-send-funds-screen tw-send-funds-screen__error", children: [_jsx(ModalHeader, { onBack: () => {
                        sendTokenMutation.reset();
                    }, title: locale.title }), _jsx(Spacer, { y: "xl" }), _jsxs(Container, { animate: "fadein", center: "both", color: "danger", flex: "column", gap: "lg", style: {
                        minHeight: "200px",
                    }, children: [_jsx(CrossCircledIcon, { height: iconSize.xl, width: iconSize.xl }), _jsx(Text, { center: true, color: "danger", multiline: true, children: getErrorMessage(sendTokenMutation.error) })] })] }));
    }
    if (sendTokenMutation.isSuccess) {
        return (_jsxs(Container, { animate: "fadein", p: "lg", className: "tw-send-funds-screen tw-send-funds-screen__success", children: [_jsx(ModalHeader, { onBack: () => {
                        sendTokenMutation.reset();
                    }, title: locale.title }), _jsxs(Container, { animate: "fadein", center: "both", color: "success", flex: "column", gap: "lg", style: {
                        minHeight: "250px",
                    }, children: [_jsx(CheckCircledIcon, { height: iconSize.xl, width: iconSize.xl }), _jsxs(Text, { color: "success", children: [" ", locale.successMessage, " "] })] })] }));
    }
    const tokenName = (props.token && "name" in props.token ? props.token.name : undefined) ||
        balanceQuery?.data?.name;
    const tokenSymbol = (props.token && "symbol" in props.token ? props.token.symbol : undefined) ||
        balanceQuery?.data?.symbol;
    return (_jsxs(Container, { animate: "fadein", p: "lg", className: "tw-send-funds-screen tw-send-funds-screen__form", children: [_jsx(ModalHeader, { onBack: props.onBack, title: locale.title }), _jsx(Spacer, { y: "xl" }), _jsxs("form", { onSubmit: (e) => {
                    e.preventDefault();
                }, children: [_jsx(Label, { color: "secondaryText", htmlFor: tokenId, children: locale.token }), _jsx(Spacer, { y: "sm" }), _jsxs(Button, { className: "tw-select-token-button", fullWidth: true, id: tokenId, onClick: props.onTokenSelect, style: {
                            gap: spacing.sm,
                            justifyContent: "flex-start",
                            padding: spacing.sm,
                        }, variant: "outline", children: [_jsx(TokenIcon, { chain: activeChain, client: props.client, size: "lg", token: props.token }), _jsxs(Container, { flex: "column", gap: "xs", children: [tokenName ? (_jsx(Text, { color: "primaryText", size: "sm", children: tokenName })) : (_jsx(Skeleton, { height: fontSize.xs, width: "150px" })), balanceQuery.data ? (_jsx(Text, { size: "xs", children: formatTokenBalance(balanceQuery.data) })) : (_jsx(Skeleton, { height: fontSize.xs, width: "100px" }))] })] }), _jsx(Spacer, { y: "lg" }), _jsx(Label, { color: "secondaryText", htmlFor: receiverId, children: locale.sendTo }), _jsx(Spacer, { y: "sm" }), _jsx(Input, { className: "tw-address-input", id: receiverId, onChange: (e) => {
                            setReceiverAddress(e.target.value);
                        }, placeholder: "0x... or ENS name", required: true, value: receiverAddress, variant: "outline" }), _jsx(Spacer, { y: "lg" }), _jsx(Label, { color: "secondaryText", htmlFor: amountId, children: locale.amount }), _jsx(Spacer, { y: "sm" }), _jsxs(Container, { relative: true, children: [_jsx(Input, { className: "tw-amount-input", id: amountId, onChange: (e) => {
                                    setAmount(e.target.value);
                                }, required: true, type: "number", value: amount, variant: "outline" }), _jsx(CurrencyBadge, { children: _jsxs(Text, { size: "xs", children: [" ", tokenSymbol, " "] }) })] }), _jsx(Spacer, { y: "xxl" }), _jsxs(Button, { className: "tw-send-funds-button", fullWidth: true, onClick: async () => {
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
                            gap: spacing.sm,
                            padding: spacing.md,
                        }, type: "submit", variant: "accent", children: [sendTokenMutation.isPending && (_jsx(Spinner, { color: "accentButtonText", size: "sm" })), sendTokenMutation.isPending ? locale.sending : locale.submitButton] })] })] }));
}
const CurrencyBadge = /* @__PURE__ */ StyledDiv({
    position: "absolute",
    right: spacing.sm,
    top: "50%",
    transform: "translateY(-50%)",
});
//# sourceMappingURL=SendFunds.js.map