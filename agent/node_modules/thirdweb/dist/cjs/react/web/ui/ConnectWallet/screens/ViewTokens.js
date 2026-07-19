"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewTokens = ViewTokens;
exports.ViewTokensContent = ViewTokensContent;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_query_1 = require("@tanstack/react-query");
const get_tokens_js_1 = require("../../../../../insight/get-tokens.js");
const index_js_1 = require("../../../../core/design-system/index.js");
const useWalletBalance_js_1 = require("../../../../core/hooks/others/useWalletBalance.js");
const useActiveAccount_js_1 = require("../../../../core/hooks/wallets/useActiveAccount.js");
const useActiveWalletChain_js_1 = require("../../../../core/hooks/wallets/useActiveWalletChain.js");
const defaultTokens_js_1 = require("../../../../core/utils/defaultTokens.js");
const basic_js_1 = require("../../components/basic.js");
const Skeleton_js_1 = require("../../components/Skeleton.js");
const Spacer_js_1 = require("../../components/Spacer.js");
const TokenIcon_js_1 = require("../../components/TokenIcon.js");
const text_js_1 = require("../../components/text.js");
const formatTokenBalance_js_1 = require("./formatTokenBalance.js");
const nativeToken_js_1 = require("./nativeToken.js");
/**
 * @internal
 */
function ViewTokens(props) {
    return ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { style: {
            minHeight: "300px",
        }, children: [(0, jsx_runtime_1.jsx)(basic_js_1.Container, { p: "lg", children: (0, jsx_runtime_1.jsx)(basic_js_1.ModalHeader, { onBack: props.onBack, title: props.connectLocale.viewFunds.viewTokens }) }), (0, jsx_runtime_1.jsx)(basic_js_1.Line, {}), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { px: "sm", scrollY: true, style: {
                    maxHeight: "500px",
                }, children: [(0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "md" }), (0, jsx_runtime_1.jsx)(ViewTokensContent, { ...props }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "lg" })] })] }));
}
function ViewTokensContent(props) {
    const account = (0, useActiveAccount_js_1.useActiveAccount)();
    const activeChain = (0, useActiveWalletChain_js_1.useActiveWalletChain)();
    const supportedTokens = props.supportedTokens || defaultTokens_js_1.defaultTokens;
    const tokenList = (activeChain?.id ? supportedTokens[activeChain.id] : undefined) || [];
    const erc20TokensQuery = (0, react_query_1.useQuery)({
        // only fetch tokens if no explicit supported tokens are provided
        enabled: !!activeChain &&
            !!account &&
            (!props.supportedTokens || !props.supportedTokens[activeChain.id]),
        queryFn: async () => {
            if (!activeChain) {
                throw new Error("No active chain");
            }
            if (!account) {
                throw new Error("No account");
            }
            const result = await (0, get_tokens_js_1.getOwnedTokens)({
                chains: [activeChain],
                client: props.client,
                ownerAddress: account.address,
            });
            return result.filter((token) => !defaultTokens_js_1.defaultTokens[activeChain.id]?.some((t) => t.address.toLowerCase() === token.tokenAddress.toLowerCase()));
        },
        queryKey: ["tokens", activeChain?.id, account?.address],
    });
    if (!activeChain || !account) {
        return null;
    }
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(TokenInfo, { chain: activeChain, client: props.client, token: nativeToken_js_1.NATIVE_TOKEN }), tokenList.map((token) => {
                return ((0, jsx_runtime_1.jsx)(TokenInfo, { chain: activeChain, client: props.client, token: token }, token.address));
            }), erc20TokensQuery.isLoading && ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "column", gap: "sm", p: "sm", children: [(0, jsx_runtime_1.jsx)(Skeleton_js_1.Skeleton, { height: index_js_1.fontSize.md, width: "100%" }), (0, jsx_runtime_1.jsx)(Skeleton_js_1.Skeleton, { height: index_js_1.fontSize.md, width: "100%" })] })), erc20TokensQuery.data?.map((token) => {
                return ((0, jsx_runtime_1.jsx)(TokenInfo, { balanceData: token, chain: activeChain, client: props.client, token: {
                        address: token.tokenAddress,
                        name: token.name ?? "",
                        symbol: token.symbol ?? "",
                    } }, token.tokenAddress));
            })] }));
}
function TokenInfo(props) {
    const account = (0, useActiveAccount_js_1.useActiveAccount)();
    const tokenBalanceQuery = (0, useWalletBalance_js_1.useWalletBalance)({
        address: account?.address,
        chain: props.chain,
        client: props.client,
        tokenAddress: (0, nativeToken_js_1.isNativeToken)(props.token)
            ? undefined
            : props.token.address,
    }, {
        enabled: props.balanceData === undefined,
    });
    const tokenName = (0, nativeToken_js_1.isNativeToken)(props.token)
        ? tokenBalanceQuery.data?.name
        : props.token.name;
    return ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "row", gap: "sm", p: "sm", children: [(0, jsx_runtime_1.jsx)(TokenIcon_js_1.TokenIcon, { chain: props.chain, client: props.client, size: "lg", token: props.token }), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "column", gap: "xxs", children: [tokenName ? ((0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "primaryText", size: "sm", children: tokenName })) : ((0, jsx_runtime_1.jsx)(Skeleton_js_1.Skeleton, { height: index_js_1.fontSize.md, width: "150px" })), props.balanceData ? ((0, jsx_runtime_1.jsxs)(text_js_1.Text, { size: "xs", children: [" ", (0, formatTokenBalance_js_1.formatTokenBalance)(props.balanceData)] })) : tokenBalanceQuery.data ? ((0, jsx_runtime_1.jsxs)(text_js_1.Text, { size: "xs", children: [" ", (0, formatTokenBalance_js_1.formatTokenBalance)(tokenBalanceQuery.data)] })) : ((0, jsx_runtime_1.jsx)(Skeleton_js_1.Skeleton, { height: index_js_1.fontSize.xs, width: "100px" }))] })] }));
}
//# sourceMappingURL=ViewTokens.js.map