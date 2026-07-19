"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DarkTokenList = exports.TokenList = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const ethereum_js_1 = require("../chains/chain-definitions/ethereum.js");
const CustomThemeProvider_js_1 = require("../react/core/design-system/CustomThemeProvider.js");
const TokenBalanceRow_js_1 = require("../react/web/ui/Bridge/common/TokenBalanceRow.js");
const fixtures_js_1 = require("./Bridge/fixtures.js");
const utils_js_1 = require("./utils.js");
const dummyBalanceETH = "1.2345";
const dummyBalanceUSDC = "1234.56";
const dummyBalanceLowUNI = "0.0012";
// Wrapper component to provide theme context
const TokenBalanceRowWithTheme = (props) => {
    const { theme, ...tokenBalanceRowProps } = props;
    return ((0, jsx_runtime_1.jsx)(CustomThemeProvider_js_1.CustomThemeProvider, { theme: theme, children: (0, jsx_runtime_1.jsx)(TokenBalanceRow_js_1.TokenBalanceRow, { ...tokenBalanceRowProps }) }));
};
const meta = {
    args: {
        amount: dummyBalanceETH,
        chain: ethereum_js_1.ethereum,
        client: utils_js_1.storyClient,
        onClick: (_token) => { },
        theme: "dark",
        token: fixtures_js_1.ETH,
    },
    argTypes: {
        onClick: {
            action: "clicked",
            description: "Callback function when token row is clicked",
        },
        theme: {
            control: "select",
            description: "Theme for the component",
            options: ["light", "dark"],
        },
    },
    component: TokenBalanceRowWithTheme,
    parameters: {
        docs: {
            description: {
                component: "A row component that displays token balance information including token icon, symbol, chain, balance amount and fiat value. Used in bridge interfaces for token selection.",
            },
        },
        layout: "centered",
    },
    tags: ["autodocs"],
    title: "Bridge/TokenBalanceRow",
};
exports.TokenList = {
    args: {
        theme: "light",
    },
    parameters: {
        backgrounds: { default: "light" },
    },
    render: (args) => ((0, jsx_runtime_1.jsx)(CustomThemeProvider_js_1.CustomThemeProvider, { theme: args.theme, children: (0, jsx_runtime_1.jsxs)("div", { style: {
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                maxWidth: "500px",
                minWidth: "400px",
            }, children: [(0, jsx_runtime_1.jsx)(TokenBalanceRow_js_1.TokenBalanceRow, { amount: dummyBalanceETH, client: args.client, onClick: args.onClick, token: fixtures_js_1.ETH }), (0, jsx_runtime_1.jsx)(TokenBalanceRow_js_1.TokenBalanceRow, { amount: dummyBalanceETH, client: args.client, onClick: args.onClick, token: fixtures_js_1.ETH }), (0, jsx_runtime_1.jsx)(TokenBalanceRow_js_1.TokenBalanceRow, { amount: dummyBalanceUSDC, client: args.client, onClick: args.onClick, token: fixtures_js_1.USDC }), (0, jsx_runtime_1.jsx)(TokenBalanceRow_js_1.TokenBalanceRow, { amount: dummyBalanceLowUNI, client: args.client, onClick: args.onClick, token: fixtures_js_1.UNI })] }) })),
};
exports.DarkTokenList = {
    args: {
        theme: "dark",
    },
    parameters: {
        backgrounds: { default: "dark" },
    },
    render: (args) => ((0, jsx_runtime_1.jsx)(CustomThemeProvider_js_1.CustomThemeProvider, { theme: args.theme, children: (0, jsx_runtime_1.jsxs)("div", { style: {
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                maxWidth: "500px",
                minWidth: "400px",
            }, children: [(0, jsx_runtime_1.jsx)(TokenBalanceRow_js_1.TokenBalanceRow, { amount: dummyBalanceETH, client: args.client, onClick: args.onClick, token: fixtures_js_1.ETH }), (0, jsx_runtime_1.jsx)(TokenBalanceRow_js_1.TokenBalanceRow, { amount: dummyBalanceETH, client: args.client, onClick: args.onClick, token: fixtures_js_1.ETH }), (0, jsx_runtime_1.jsx)(TokenBalanceRow_js_1.TokenBalanceRow, { amount: dummyBalanceUSDC, client: args.client, onClick: args.onClick, token: fixtures_js_1.USDC }), (0, jsx_runtime_1.jsx)(TokenBalanceRow_js_1.TokenBalanceRow, { amount: dummyBalanceLowUNI, client: args.client, onClick: args.onClick, token: fixtures_js_1.UNI })] }) })),
};
exports.default = meta;
//# sourceMappingURL=TokenBalanceRow.stories.js.map