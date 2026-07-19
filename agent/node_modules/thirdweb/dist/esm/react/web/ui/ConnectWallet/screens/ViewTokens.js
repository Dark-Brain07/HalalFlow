import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
import { getOwnedTokens } from "../../../../../insight/get-tokens.js";
import { fontSize } from "../../../../core/design-system/index.js";
import { useWalletBalance } from "../../../../core/hooks/others/useWalletBalance.js";
import { useActiveAccount } from "../../../../core/hooks/wallets/useActiveAccount.js";
import { useActiveWalletChain } from "../../../../core/hooks/wallets/useActiveWalletChain.js";
import { defaultTokens, } from "../../../../core/utils/defaultTokens.js";
import { Container, Line, ModalHeader } from "../../components/basic.js";
import { Skeleton } from "../../components/Skeleton.js";
import { Spacer } from "../../components/Spacer.js";
import { TokenIcon } from "../../components/TokenIcon.js";
import { Text } from "../../components/text.js";
import { formatTokenBalance } from "./formatTokenBalance.js";
import { isNativeToken, NATIVE_TOKEN, } from "./nativeToken.js";
/**
 * @internal
 */
export function ViewTokens(props) {
    return (_jsxs(Container, { style: {
            minHeight: "300px",
        }, children: [_jsx(Container, { p: "lg", children: _jsx(ModalHeader, { onBack: props.onBack, title: props.connectLocale.viewFunds.viewTokens }) }), _jsx(Line, {}), _jsxs(Container, { px: "sm", scrollY: true, style: {
                    maxHeight: "500px",
                }, children: [_jsx(Spacer, { y: "md" }), _jsx(ViewTokensContent, { ...props }), _jsx(Spacer, { y: "lg" })] })] }));
}
export function ViewTokensContent(props) {
    const account = useActiveAccount();
    const activeChain = useActiveWalletChain();
    const supportedTokens = props.supportedTokens || defaultTokens;
    const tokenList = (activeChain?.id ? supportedTokens[activeChain.id] : undefined) || [];
    const erc20TokensQuery = useQuery({
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
            const result = await getOwnedTokens({
                chains: [activeChain],
                client: props.client,
                ownerAddress: account.address,
            });
            return result.filter((token) => !defaultTokens[activeChain.id]?.some((t) => t.address.toLowerCase() === token.tokenAddress.toLowerCase()));
        },
        queryKey: ["tokens", activeChain?.id, account?.address],
    });
    if (!activeChain || !account) {
        return null;
    }
    return (_jsxs(_Fragment, { children: [_jsx(TokenInfo, { chain: activeChain, client: props.client, token: NATIVE_TOKEN }), tokenList.map((token) => {
                return (_jsx(TokenInfo, { chain: activeChain, client: props.client, token: token }, token.address));
            }), erc20TokensQuery.isLoading && (_jsxs(Container, { flex: "column", gap: "sm", p: "sm", children: [_jsx(Skeleton, { height: fontSize.md, width: "100%" }), _jsx(Skeleton, { height: fontSize.md, width: "100%" })] })), erc20TokensQuery.data?.map((token) => {
                return (_jsx(TokenInfo, { balanceData: token, chain: activeChain, client: props.client, token: {
                        address: token.tokenAddress,
                        name: token.name ?? "",
                        symbol: token.symbol ?? "",
                    } }, token.tokenAddress));
            })] }));
}
function TokenInfo(props) {
    const account = useActiveAccount();
    const tokenBalanceQuery = useWalletBalance({
        address: account?.address,
        chain: props.chain,
        client: props.client,
        tokenAddress: isNativeToken(props.token)
            ? undefined
            : props.token.address,
    }, {
        enabled: props.balanceData === undefined,
    });
    const tokenName = isNativeToken(props.token)
        ? tokenBalanceQuery.data?.name
        : props.token.name;
    return (_jsxs(Container, { flex: "row", gap: "sm", p: "sm", children: [_jsx(TokenIcon, { chain: props.chain, client: props.client, size: "lg", token: props.token }), _jsxs(Container, { flex: "column", gap: "xxs", children: [tokenName ? (_jsx(Text, { color: "primaryText", size: "sm", children: tokenName })) : (_jsx(Skeleton, { height: fontSize.md, width: "150px" })), props.balanceData ? (_jsxs(Text, { size: "xs", children: [" ", formatTokenBalance(props.balanceData)] })) : tokenBalanceQuery.data ? (_jsxs(Text, { size: "xs", children: [" ", formatTokenBalance(tokenBalanceQuery.data)] })) : (_jsx(Skeleton, { height: fontSize.xs, width: "100px" }))] })] }));
}
//# sourceMappingURL=ViewTokens.js.map