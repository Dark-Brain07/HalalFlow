"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenSelector = TokenSelector;
const jsx_runtime_1 = require("react/jsx-runtime");
const styled_1 = require("@emotion/styled");
const react_icons_1 = require("@radix-ui/react-icons");
const react_query_1 = require("@tanstack/react-query");
const react_1 = require("react");
const getTokenBalance_js_1 = require("../../../../../wallets/utils/getTokenBalance.js");
const CustomThemeProvider_js_1 = require("../../../../core/design-system/CustomThemeProvider.js");
const index_js_1 = require("../../../../core/design-system/index.js");
const useChainQuery_js_1 = require("../../../../core/hooks/others/useChainQuery.js");
const useTokenInfo_js_1 = require("../../../../core/hooks/others/useTokenInfo.js");
const useActiveAccount_js_1 = require("../../../../core/hooks/wallets/useActiveAccount.js");
const basic_js_1 = require("../../components/basic.js");
const buttons_js_1 = require("../../components/buttons.js");
const ChainIcon_js_1 = require("../../components/ChainIcon.js");
const formElements_js_1 = require("../../components/formElements.js");
const Skeleton_js_1 = require("../../components/Skeleton.js");
const Spacer_js_1 = require("../../components/Spacer.js");
const Spinner_js_1 = require("../../components/Spinner.js");
const TokenIcon_js_1 = require("../../components/TokenIcon.js");
const text_js_1 = require("../../components/text.js");
const NetworkSelector_js_1 = require("../NetworkSelector.js");
const formatTokenBalance_js_1 = require("./formatTokenBalance.js");
const nativeToken_js_1 = require("./nativeToken.js");
// Note: TokenSelector can be used when wallet may or may not be connected
/**
 *
 * @internal
 */
function TokenSelector(props) {
    const [screen, setScreen] = (0, react_1.useState)("base");
    const [input, setInput] = (0, react_1.useState)("");
    const chain = props.chain;
    const chainNameQuery = (0, useChainQuery_js_1.useChainName)(chain);
    const chainIconQuery = (0, useChainQuery_js_1.useChainIconUrl)(chain);
    // if input is undefined, it loads the native token
    // otherwise it loads the token with given address
    const tokenQuery = (0, useTokenInfo_js_1.useTokenInfo)({
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
        return ((0, jsx_runtime_1.jsx)(NetworkSelector_js_1.NetworkSelectorContent, { className: "tw-send-funds-screen tw-send-funds-screen__select-chain", chains: chainSelection.chains, client: props.client, closeModal: () => setScreen("base"), connectLocale: props.connectLocale, 
            // pass swap supported chains
            networkSelector: {
                renderChain(renderChainProps) {
                    return ((0, jsx_runtime_1.jsx)(NetworkSelector_js_1.ChainButton, { chain: renderChainProps.chain, client: props.client, confirming: false, connectLocale: props.connectLocale, onClick: () => {
                            chainSelection.select(renderChainProps.chain);
                            setScreen("base");
                        }, switchingFailed: false }));
                },
            }, onBack: () => setScreen("base"), showTabs: false }));
    }
    return ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { className: "tw-send-funds-screen tw-send-funds-screen__select-token", animate: "fadein", style: {
            minHeight: "300px",
        }, children: [(0, jsx_runtime_1.jsx)(basic_js_1.Container, { p: "lg", children: (0, jsx_runtime_1.jsx)(basic_js_1.ModalHeader, { onBack: props.onBack, title: props.modalTitle || locale.selectTokenTitle }) }), (0, jsx_runtime_1.jsx)(basic_js_1.Line, {}), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { scrollY: true, style: {
                    maxHeight: "450px",
                }, children: [(0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "md" }), props.chainSelection && ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { px: "lg", children: [(0, jsx_runtime_1.jsx)(text_js_1.Text, { size: "sm", children: "Select Network" }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "xxs" }), (0, jsx_runtime_1.jsxs)(SelectTokenBtn, { fullWidth: true, onClick: () => {
                                    setScreen("select-chain");
                                }, variant: "secondary", children: [(0, jsx_runtime_1.jsx)(ChainIcon_js_1.ChainIcon, { chainIconUrl: chainIconQuery.url, client: props.client, size: index_js_1.iconSize.lg }), chainNameQuery.name ? ((0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "primaryText", size: "sm", children: chainNameQuery.name })) : ((0, jsx_runtime_1.jsx)(Skeleton_js_1.Skeleton, { height: index_js_1.fontSize.md })), (0, jsx_runtime_1.jsx)(react_icons_1.ChevronDownIcon, { height: index_js_1.iconSize.sm, style: {
                                            marginLeft: "auto",
                                        }, width: index_js_1.iconSize.sm })] }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "xl" }), (0, jsx_runtime_1.jsx)(text_js_1.Text, { size: "sm", children: "Select Token" })] })), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { px: "lg", children: [(0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "xs" }), (0, jsx_runtime_1.jsx)(formElements_js_1.Input, { onChange: (e) => {
                                    setInput(e.target.value);
                                }, placeholder: locale.searchToken, value: input, variant: "outline" })] }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "md" }), (filteredList.length > 0 || !input) && ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "column", gap: "xs", px: "lg", scrollY: true, style: {
                            paddingBottom: index_js_1.spacing.lg,
                            paddingTop: 0,
                        }, children: [!input && ((0, jsx_runtime_1.jsx)(SelectTokenButton, { chain: props.chain, client: props.client, onClick: () => {
                                    props.onTokenSelect(nativeToken_js_1.NATIVE_TOKEN);
                                }, token: nativeToken_js_1.NATIVE_TOKEN })), filteredList.map((token) => {
                                return ((0, jsx_runtime_1.jsx)(SelectTokenButton, { chain: props.chain, client: props.client, onClick: () => props.onTokenSelect(token), token: token }, token.address));
                            })] })), filteredList.length === 0 && tokenQuery.isLoading && input && ((0, jsx_runtime_1.jsx)(basic_js_1.Container, { animate: "fadein", center: "both", color: "secondaryText", flex: "column", gap: "md", p: "lg", style: {
                            minHeight: "200px",
                            paddingTop: 0,
                        }, children: (0, jsx_runtime_1.jsx)(Spinner_js_1.Spinner, { color: "accentText", size: "lg" }) })), filteredList.length === 0 && !tokenQuery.isLoading && input && ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { animate: "fadein", center: "both", color: "secondaryText", flex: "column", gap: "md", p: "lg", style: {
                            minHeight: "200px",
                            paddingTop: 0,
                        }, children: [(0, jsx_runtime_1.jsx)(react_icons_1.CrossCircledIcon, { height: index_js_1.iconSize.lg, width: index_js_1.iconSize.lg }), locale.noTokensFound] })), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "md" })] })] }));
}
function SelectTokenButton(props) {
    const account = (0, useActiveAccount_js_1.useActiveAccount)();
    const tokenInfoQuery = (0, useTokenInfo_js_1.useTokenInfo)({
        chain: props.chain,
        client: props.client,
        tokenAddress: (0, nativeToken_js_1.isNativeToken)(props.token) ? undefined : props.token.address,
    });
    const tokenName = (0, nativeToken_js_1.isNativeToken)(props.token)
        ? tokenInfoQuery.data?.name
        : props.token.name;
    return ((0, jsx_runtime_1.jsxs)(SelectTokenBtn, { fullWidth: true, onClick: props.onClick, variant: "secondary", children: [(0, jsx_runtime_1.jsx)(TokenIcon_js_1.TokenIcon, { chain: props.chain, client: props.client, size: "lg", token: props.token }), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "column", gap: "4xs", children: [tokenName ? ((0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "primaryText", size: "sm", children: tokenName })) : ((0, jsx_runtime_1.jsx)(Skeleton_js_1.Skeleton, { height: index_js_1.fontSize.md, width: "150px" })), account && ((0, jsx_runtime_1.jsx)(TokenBalance, { account: account, chain: props.chain, client: props.client, tokenAddress: (0, nativeToken_js_1.isNativeToken)(props.token) ? undefined : props.token.address }))] })] }));
}
function TokenBalance(props) {
    const tokenBalanceQuery = (0, react_query_1.useQuery)({
        queryFn: async () => {
            return (0, getTokenBalance_js_1.getTokenBalance)({
                account: props.account,
                chain: props.chain,
                client: props.client,
                tokenAddress: props.tokenAddress,
            });
        },
        queryKey: ["tokenBalance", props],
    });
    if (tokenBalanceQuery.data) {
        return (0, jsx_runtime_1.jsxs)(text_js_1.Text, { size: "xs", children: [" ", (0, formatTokenBalance_js_1.formatTokenBalance)(tokenBalanceQuery.data)] });
    }
    return (0, jsx_runtime_1.jsx)(Skeleton_js_1.Skeleton, { height: index_js_1.fontSize.xs, width: "100px" });
}
const SelectTokenBtn = /* @__PURE__ */ (0, styled_1.default)(buttons_js_1.Button)(() => {
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
    return {
        "&:hover": {
            background: theme.colors.secondaryButtonBg,
            transform: "scale(1.01)",
        },
        background: theme.colors.tertiaryBg,
        gap: index_js_1.spacing.sm,
        justifyContent: "flex-start",
        padding: index_js_1.spacing.sm,
        transition: "background 200ms ease, transform 150ms ease",
    };
});
//# sourceMappingURL=TokenSelector.js.map