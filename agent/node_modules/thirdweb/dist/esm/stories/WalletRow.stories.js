import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CustomThemeProvider } from "../react/core/design-system/CustomThemeProvider.js";
import { WalletRow } from "../react/web/ui/ConnectWallet/screens/Buy/swap/WalletRow.js";
import { storyClient } from "./utils.js";
// Wrapper component to provide theme context
const WalletRowWithTheme = (props) => {
    const { theme, ...walletRowProps } = props;
    return (_jsx(CustomThemeProvider, { theme: theme, children: _jsx(WalletRow, { ...walletRowProps }) }));
};
const meta = {
    args: {
        address: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
        client: storyClient, // Vitalik's address for ENS demo
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
export const Light = {
    args: {
        theme: "light",
    },
    parameters: {
        backgrounds: { default: "light" },
    },
};
export const Dark = {
    args: {
        theme: "dark",
    },
    parameters: {
        backgrounds: { default: "dark" },
    },
};
export const WithLabel = {
    args: {
        address: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
        label: "Recipient Wallet",
        theme: "dark",
    },
    parameters: {
        backgrounds: { default: "dark" },
    },
};
export const LargeSize = {
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
export const SmallSize = {
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
export const DifferentAddresses = {
    args: {
        theme: "dark",
    },
    parameters: {
        backgrounds: { default: "dark" },
    },
    render: (args) => (_jsx(CustomThemeProvider, { theme: args.theme, children: _jsxs("div", { style: {
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                minWidth: "300px",
            }, children: [_jsx(WalletRow, { address: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045", client: args.client, label: "ENS Example (vitalik.eth)" }), _jsx(WalletRow, { address: "0x4fA9230f4E8978462cE7Bf8e6b5a2588da5F4264", client: args.client, label: "Regular Address" }), _jsx(WalletRow, { address: "0x4fA9230f4E8978462cE7Bf8e6b5a2588da5F4264", client: args.client, label: "Short Address" })] }) })),
};
export default meta;
//# sourceMappingURL=WalletRow.stories.js.map