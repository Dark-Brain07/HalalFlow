"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenBalanceRow = TokenBalanceRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const styled_1 = require("@emotion/styled");
const utils_js_1 = require("../../../../../chains/utils.js");
const CustomThemeProvider_js_1 = require("../../../../core/design-system/CustomThemeProvider.js");
const index_js_1 = require("../../../../core/design-system/index.js");
const FiatValue_js_1 = require("../../ConnectWallet/screens/Buy/swap/FiatValue.js");
const basic_js_1 = require("../../components/basic.js");
const buttons_js_1 = require("../../components/buttons.js");
const text_js_1 = require("../../components/text.js");
const TokenAndChain_js_1 = require("./TokenAndChain.js");
function TokenBalanceRow({ client, token, amount, onClick, style, currency, }) {
    const chain = (0, utils_js_1.getCachedChain)(token.chainId);
    return ((0, jsx_runtime_1.jsxs)(StyledButton, { onClick: () => onClick(token), style: {
            display: "flex",
            justifyContent: "space-between",
            padding: `${index_js_1.spacing.md} ${index_js_1.spacing.md}`,
            ...style,
        }, variant: "secondary", children: [(0, jsx_runtime_1.jsx)(TokenAndChain_js_1.TokenAndChain, { client: client, size: "lg", style: { flex: 1, maxWidth: "50%" }, token: token }), (0, jsx_runtime_1.jsx)(basic_js_1.Container, { center: "y", color: "secondaryText", flex: "row", gap: "4xs", style: {
                    flex: "1",
                    flexWrap: "nowrap",
                    justifyContent: "flex-end",
                    maxWidth: "50%",
                    minWidth: 0,
                }, children: (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { color: "secondaryText", flex: "column", gap: "3xs", style: {
                        alignItems: "flex-end",
                        minWidth: 0,
                        overflow: "hidden",
                    }, children: [(0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "primaryText", size: "sm", style: {
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                            }, children: `${Number(amount).toLocaleString(undefined, {
                                maximumFractionDigits: 6,
                                minimumFractionDigits: 0,
                            })} ${token.symbol}` }), (0, jsx_runtime_1.jsx)(FiatValue_js_1.FiatValue, { currency: currency, chain: chain, client: client, color: "secondaryText", size: "sm", token: token, tokenAmount: amount })] }) })] }));
}
const StyledButton = /* @__PURE__ */ (0, styled_1.default)(buttons_js_1.Button)((props) => {
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
    return {
        "&:hover": {
            background: theme.colors.secondaryButtonBg,
        },
        background: "transparent",
        flexDirection: "row",
        flexWrap: "nowrap",
        gap: index_js_1.spacing.sm,
        justifyContent: "space-between",
        padding: index_js_1.spacing.sm,
        paddingRight: index_js_1.spacing.xs,
        transition: "background 200ms ease, transform 150ms ease",
        ...props.style,
    };
});
//# sourceMappingURL=TokenBalanceRow.js.map