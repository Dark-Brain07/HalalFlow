"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DifferentAddresses = exports.SmallSize = exports.LargeSize = exports.WithLabel = exports.Dark = exports.Light = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const CustomThemeProvider_js_1 = require("../react/core/design-system/CustomThemeProvider.js");
const WalletRow_js_1 = require("../react/web/ui/ConnectWallet/screens/Buy/swap/WalletRow.js");
const utils_js_1 = require("./utils.js");
// Wrapper component to provide theme context
const WalletRowWithTheme = (props) => {
    const { theme, ...walletRowProps } = props;
    return ((0, jsx_runtime_1.jsx)(CustomThemeProvider_js_1.CustomThemeProvider, { theme: theme, children: (0, jsx_runtime_1.jsx)(WalletRow_js_1.WalletRow, { ...walletRowProps }) }));
};
const meta = {
    args: {
        address: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
        client: utils_js_1.storyClient, // Vitalik's address for ENS demo
        theme: "dark",
    },
    argTypes: {
        address: {
            control: "text",
            description: "Wallet address to display",
        },
        iconSize: {
            control: "select",
            description: "Size of the wallet icon",
            options: ["xs", "sm", "md", "lg", "xl"],
        },
        label: {
            control: "text",
            description: "Optional label to display above the address",
        },
        textSize: {
            control: "select",
            description: "Size of the main address text",
            options: ["xs", "sm", "md", "lg", "xl"],
        },
        theme: {
            control: "select",
            description: "Theme for the component",
            options: ["light", "dark"],
        },
    },
    component: WalletRowWithTheme,
    parameters: {
        docs: {
            description: {
                component: "A reusable component that displays wallet information including address, wallet type, and optional ENS name or email.",
            },
        },
        layout: "centered",
    },
    tags: ["autodocs"],
    title: "Connect/WalletRow",
};
exports.Light = {
    args: {
        theme: "light",
    },
    parameters: {
        backgrounds: { default: "light" },
    },
};
exports.Dark = {
    args: {
        theme: "dark",
    },
    parameters: {
        backgrounds: { default: "dark" },
    },
};
exports.WithLabel = {
    args: {
        address: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
        label: "Recipient Wallet",
        theme: "dark",
    },
    parameters: {
        backgrounds: { default: "dark" },
    },
};
exports.LargeSize = {
    args: {
        address: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
        iconSize: "lg",
        label: "Primary Wallet",
        textSize: "md",
        theme: "light",
    },
    parameters: {
        backgrounds: { default: "light" },
    },
};
exports.SmallSize = {
    args: {
        address: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
        iconSize: "sm",
        textSize: "xs",
        theme: "dark",
    },
    parameters: {
        backgrounds: { default: "dark" },
    },
};
exports.DifferentAddresses = {
    args: {
        theme: "dark",
    },
    parameters: {
        backgrounds: { default: "dark" },
    },
    render: (args) => ((0, jsx_runtime_1.jsx)(CustomThemeProvider_js_1.CustomThemeProvider, { theme: args.theme, children: (0, jsx_runtime_1.jsxs)("div", { style: {
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                minWidth: "300px",
            }, children: [(0, jsx_runtime_1.jsx)(WalletRow_js_1.WalletRow, { address: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045", client: args.client, label: "ENS Example (vitalik.eth)" }), (0, jsx_runtime_1.jsx)(WalletRow_js_1.WalletRow, { address: "0x4fA9230f4E8978462cE7Bf8e6b5a2588da5F4264", client: args.client, label: "Regular Address" }), (0, jsx_runtime_1.jsx)(WalletRow_js_1.WalletRow, { address: "0x4fA9230f4E8978462cE7Bf8e6b5a2588da5F4264", client: args.client, label: "Short Address" })] }) })),
};
exports.default = meta;
//# sourceMappingURL=WalletRow.stories.js.map