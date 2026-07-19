import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled from "@emotion/styled";
import { getCachedChain } from "../../../../../chains/utils.js";
import { useCustomTheme } from "../../../../core/design-system/CustomThemeProvider.js";
import { spacing } from "../../../../core/design-system/index.js";
import { FiatValue } from "../../ConnectWallet/screens/Buy/swap/FiatValue.js";
import { Container } from "../../components/basic.js";
import { Button } from "../../components/buttons.js";
import { Text } from "../../components/text.js";
import { TokenAndChain } from "./TokenAndChain.js";
export function TokenBalanceRow({ client, token, amount, onClick, style, currency, }) {
    const chain = getCachedChain(token.chainId);
    return (_jsxs(StyledButton, { onClick: () => onClick(token), style: {
            display: "flex",
            justifyContent: "space-between",
            padding: `${spacing.md} ${spacing.md}`,
            ...style,
        }, variant: "secondary", children: [_jsx(TokenAndChain, { client: client, size: "lg", style: { flex: 1, maxWidth: "50%" }, token: token }), _jsx(Container, { center: "y", color: "secondaryText", flex: "row", gap: "4xs", style: {
                    flex: "1",
                    flexWrap: "nowrap",
                    justifyContent: "flex-end",
                    maxWidth: "50%",
                    minWidth: 0,
                }, children: _jsxs(Container, { color: "secondaryText", flex: "column", gap: "3xs", style: {
                        alignItems: "flex-end",
                        minWidth: 0,
                        overflow: "hidden",
                    }, children: [_jsx(Text, { color: "primaryText", size: "sm", style: {
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                            }, children: `${Number(amount).toLocaleString(undefined, {
                                maximumFractionDigits: 6,
                                minimumFractionDigits: 0,
                            })} ${token.symbol}` }), _jsx(FiatValue, { currency: currency, chain: chain, client: client, color: "secondaryText", size: "sm", token: token, tokenAmount: amount })] }) })] }));
}
const StyledButton = /* @__PURE__ */ styled(Button)((props) => {
    const theme = useCustomTheme();
    return {
        "&:hover": {
            background: theme.colors.secondaryButtonBg,
        },
        background: "transparent",
        flexDirection: "row",
        flexWrap: "nowrap",
        gap: spacing.sm,
        justifyContent: "space-between",
        padding: spacing.sm,
        paddingRight: spacing.xs,
        transition: "background 200ms ease, transform 150ms ease",
        ...props.style,
    };
});
//# sourceMappingURL=TokenBalanceRow.js.map