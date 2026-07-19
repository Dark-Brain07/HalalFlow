import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ethereum } from "../chains/chain-definitions/ethereum.js";
import { CustomThemeProvider } from "../react/core/design-system/CustomThemeProvider.js";
import { TokenBalanceRow } from "../react/web/ui/Bridge/common/TokenBalanceRow.js";
import { ETH, UNI, USDC } from "./Bridge/fixtures.js";
import { storyClient } from "./utils.js";
const dummyBalanceETH = "1.2345";
const dummyBalanceUSDC = "1234.56";
const dummyBalanceLowUNI = "0.0012";
// Wrapper component to provide theme context
const TokenBalanceRowWithTheme = (props) => {
    const { theme, ...tokenBalanceRowProps } = props;
    return (_jsx(CustomThemeProvider, { theme: theme, children: _jsx(TokenBalanceRow, { ...tokenBalanceRowProps }) }));
};
const meta = {
    args: {
        amount: dummyBalanceETH,
        chain: ethereum,
        client: storyClient,
        onClick: (_token) => { },
        theme: "dark",
        token: ETH,
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
export const TokenList = {
    args: {
        theme: "light",
    },
    parameters: {
        backgrounds: { default: "light" },
    },
    render: (args) => (_jsx(CustomThemeProvider, { theme: args.theme, children: _jsxs("div", { style: {
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                maxWidth: "500px",
                minWidth: "400px",
            }, children: [_jsx(TokenBalanceRow, { amount: dummyBalanceETH, client: args.client, onClick: args.onClick, token: ETH }), _jsx(TokenBalanceRow, { amount: dummyBalanceETH, client: args.client, onClick: args.onClick, token: ETH }), _jsx(TokenBalanceRow, { amount: dummyBalanceUSDC, client: args.client, onClick: args.onClick, token: USDC }), _jsx(TokenBalanceRow, { amount: dummyBalanceLowUNI, client: args.client, onClick: args.onClick, token: UNI })] }) })),
};
export const DarkTokenList = {
    args: {
        theme: "dark",
    },
    parameters: {
        backgrounds: { default: "dark" },
    },
    render: (args) => (_jsx(CustomThemeProvider, { theme: args.theme, children: _jsxs("div", { style: {
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                maxWidth: "500px",
                minWidth: "400px",
            }, children: [_jsx(TokenBalanceRow, { amount: dummyBalanceETH, client: args.client, onClick: args.onClick, token: ETH }), _jsx(TokenBalanceRow, { amount: dummyBalanceETH, client: args.client, onClick: args.onClick, token: ETH }), _jsx(TokenBalanceRow, { amount: dummyBalanceUSDC, client: args.client, onClick: args.onClick, token: USDC }), _jsx(TokenBalanceRow, { amount: dummyBalanceLowUNI, client: args.client, onClick: args.onClick, token: UNI })] }) })),
};
export default meta;
//# sourceMappingURL=TokenBalanceRow.stories.js.map