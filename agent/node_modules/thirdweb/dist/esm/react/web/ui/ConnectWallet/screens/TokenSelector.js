import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled from "@emotion/styled";
import { ChevronDownIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getTokenBalance } from "../../../../../wallets/utils/getTokenBalance.js";
import { useCustomTheme } from "../../../../core/design-system/CustomThemeProvider.js";
import { fontSize, iconSize, spacing, } from "../../../../core/design-system/index.js";
import { useChainIconUrl, useChainName, } from "../../../../core/hooks/others/useChainQuery.js";
import { useTokenInfo } from "../../../../core/hooks/others/useTokenInfo.js";
import { useActiveAccount } from "../../../../core/hooks/wallets/useActiveAccount.js";
import { Container, Line, ModalHeader } from "../../components/basic.js";
import { Button } from "../../components/buttons.js";
import { ChainIcon } from "../../components/ChainIcon.js";
import { Input } from "../../components/formElements.js";
import { Skeleton } from "../../components/Skeleton.js";
import { Spacer } from "../../components/Spacer.js";
import { Spinner } from "../../components/Spinner.js";
import { TokenIcon } from "../../components/TokenIcon.js";
import { Text } from "../../components/text.js";
import { ChainButton, NetworkSelectorContent } from "../NetworkSelector.js";
import { formatTokenBalance } from "./formatTokenBalance.js";
import { isNativeToken, NATIVE_TOKEN, } from "./nativeToken.js";
// Note: TokenSelector can be used when wallet may or may not be connected
/**
 *
 * @internal
 */
export function TokenSelector(props) {
    const [screen, setScreen] = useState("base");
    const [input, setInput] = useState("");
    const chain = props.chain;
    const chainNameQuery = useChainName(chain);
    const chainIconQuery = useChainIconUrl(chain);
    // if input is undefined, it loads the native token
    // otherwise it loads the token with given address
    const tokenQuery = useTokenInfo({
        chain: chain,
        client: props.client,
        tokenAddress: input,
    });
    const locale = props.connectLocale.sendFundsScreen;
    let tokenList = props.tokenList;
    if (tokenQuery.data && input) {
        tokenList = [
            {
                ...tokenQuery.data,
                address: input,
            },
            ...tokenList,
        ];
    }
    const filteredList = input
        ? tokenList.filter((t) => {
            const inputStr = input.toLowerCase();
            return (t.name.toLowerCase().includes(inputStr) ||
                t.symbol.toLowerCase().includes(inputStr) ||
                t.address.includes(input));
        })
        : tokenList;
    const { chainSelection } = props;
    if (screen === "select-chain" && chainSelection) {
        return (_jsx(NetworkSelectorContent, { className: "tw-send-funds-screen tw-send-funds-screen__select-chain", chains: chainSelection.chains, client: props.client, closeModal: () => setScreen("base"), connectLocale: props.connectLocale, 
            // pass swap supported chains
            networkSelector: {
                renderChain(renderChainProps) {
                    return (_jsx(ChainButton, { chain: renderChainProps.chain, client: props.client, confirming: false, connectLocale: props.connectLocale, onClick: () => {
                            chainSelection.select(renderChainProps.chain);
                            setScreen("base");
                        }, switchingFailed: false }));
                },
            }, onBack: () => setScreen("base"), showTabs: false }));
    }
    return (_jsxs(Container, { className: "tw-send-funds-screen tw-send-funds-screen__select-token", animate: "fadein", style: {
            minHeight: "300px",
        }, children: [_jsx(Container, { p: "lg", children: _jsx(ModalHeader, { onBack: props.onBack, title: props.modalTitle || locale.selectTokenTitle }) }), _jsx(Line, {}), _jsxs(Container, { scrollY: true, style: {
                    maxHeight: "450px",
                }, children: [_jsx(Spacer, { y: "md" }), props.chainSelection && (_jsxs(Container, { px: "lg", children: [_jsx(Text, { size: "sm", children: "Select Network" }), _jsx(Spacer, { y: "xxs" }), _jsxs(SelectTokenBtn, { fullWidth: true, onClick: () => {
                                    setScreen("select-chain");
                                }, variant: "secondary", children: [_jsx(ChainIcon, { chainIconUrl: chainIconQuery.url, client: props.client, size: iconSize.lg }), chainNameQuery.name ? (_jsx(Text, { color: "primaryText", size: "sm", children: chainNameQuery.name })) : (_jsx(Skeleton, { height: fontSize.md })), _jsx(ChevronDownIcon, { height: iconSize.sm, style: {
                                            marginLeft: "auto",
                                        }, width: iconSize.sm })] }), _jsx(Spacer, { y: "xl" }), _jsx(Text, { size: "sm", children: "Select Token" })] })), _jsxs(Container, { px: "lg", children: [_jsx(Spacer, { y: "xs" }), _jsx(Input, { onChange: (e) => {
                                    setInput(e.target.value);
                                }, placeholder: locale.searchToken, value: input, variant: "outline" })] }), _jsx(Spacer, { y: "md" }), (filteredList.length > 0 || !input) && (_jsxs(Container, { flex: "column", gap: "xs", px: "lg", scrollY: true, style: {
                            paddingBottom: spacing.lg,
                            paddingTop: 0,
                        }, children: [!input && (_jsx(SelectTokenButton, { chain: props.chain, client: props.client, onClick: () => {
                                    props.onTokenSelect(NATIVE_TOKEN);
                                }, token: NATIVE_TOKEN })), filteredList.map((token) => {
                                return (_jsx(SelectTokenButton, { chain: props.chain, client: props.client, onClick: () => props.onTokenSelect(token), token: token }, token.address));
                            })] })), filteredList.length === 0 && tokenQuery.isLoading && input && (_jsx(Container, { animate: "fadein", center: "both", color: "secondaryText", flex: "column", gap: "md", p: "lg", style: {
                            minHeight: "200px",
                            paddingTop: 0,
                        }, children: _jsx(Spinner, { color: "accentText", size: "lg" }) })), filteredList.length === 0 && !tokenQuery.isLoading && input && (_jsxs(Container, { animate: "fadein", center: "both", color: "secondaryText", flex: "column", gap: "md", p: "lg", style: {
                            minHeight: "200px",
                            paddingTop: 0,
                        }, children: [_jsx(CrossCircledIcon, { height: iconSize.lg, width: iconSize.lg }), locale.noTokensFound] })), _jsx(Spacer, { y: "md" })] })] }));
}
function SelectTokenButton(props) {
    const account = useActiveAccount();
    const tokenInfoQuery = useTokenInfo({
        chain: props.chain,
        client: props.client,
        tokenAddress: isNativeToken(props.token) ? undefined : props.token.address,
    });
    const tokenName = isNativeToken(props.token)
        ? tokenInfoQuery.data?.name
        : props.token.name;
    return (_jsxs(SelectTokenBtn, { fullWidth: true, onClick: props.onClick, variant: "secondary", children: [_jsx(TokenIcon, { chain: props.chain, client: props.client, size: "lg", token: props.token }), _jsxs(Container, { flex: "column", gap: "4xs", children: [tokenName ? (_jsx(Text, { color: "primaryText", size: "sm", children: tokenName })) : (_jsx(Skeleton, { height: fontSize.md, width: "150px" })), account && (_jsx(TokenBalance, { account: account, chain: props.chain, client: props.client, tokenAddress: isNativeToken(props.token) ? undefined : props.token.address }))] })] }));
}
function TokenBalance(props) {
    const tokenBalanceQuery = useQuery({
        queryFn: async () => {
            return getTokenBalance({
                account: props.account,
                chain: props.chain,
                client: props.client,
                tokenAddress: props.tokenAddress,
            });
        },
        queryKey: ["tokenBalance", props],
    });
    if (tokenBalanceQuery.data) {
        return _jsxs(Text, { size: "xs", children: [" ", formatTokenBalance(tokenBalanceQuery.data)] });
    }
    return _jsx(Skeleton, { height: fontSize.xs, width: "100px" });
}
const SelectTokenBtn = /* @__PURE__ */ styled(Button)(() => {
    const theme = useCustomTheme();
    return {
        "&:hover": {
            background: theme.colors.secondaryButtonBg,
            transform: "scale(1.01)",
        },
        background: theme.colors.tertiaryBg,
        gap: spacing.sm,
        justifyContent: "flex-start",
        padding: spacing.sm,
        transition: "background 200ms ease, transform 150ms ease",
    };
});
//# sourceMappingURL=TokenSelector.js.map