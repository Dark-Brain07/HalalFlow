import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { base } from "../../chains/chain-definitions/base.js";
import { ethereum } from "../../chains/chain-definitions/ethereum.js";
import { polygon } from "../../chains/chain-definitions/polygon.js";
import { lightTheme } from "../../react/core/design-system/index.js";
import { useActiveAccount } from "../../react/core/hooks/wallets/useActiveAccount.js";
import { ConnectButton } from "../../react/web/ui/ConnectWallet/ConnectButton.js";
import { useWalletDetailsModal, } from "../../react/web/ui/ConnectWallet/Details.js";
import { storyClient } from "../utils.js";
const meta = {
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    title: "Hooks/useWalletDetailsModal",
    decorators: [
        (Story) => {
            return (_jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "10px" }, children: [_jsx(ConnectButton, { client: storyClient, autoConnect: true }), _jsx(Story, {})] }));
        },
    ],
};
export default meta;
export function BasicUsage() {
    return _jsx(Variant, { client: storyClient });
}
export function DisableLinkingProfiles() {
    return (_jsx(Variant, { client: storyClient, manageWallet: { allowLinkingProfiles: false } }));
}
export function HideSwitchWallet() {
    return _jsx(Variant, { client: storyClient, hideSwitchWallet: true });
}
export function HideDisconnect() {
    return _jsx(Variant, { client: storyClient, hideDisconnect: true });
}
export function HideSendFunds() {
    return _jsx(Variant, { client: storyClient, hideSendFunds: true });
}
export function HideReceiveFunds() {
    return _jsx(Variant, { client: storyClient, hideReceiveFunds: true });
}
export function HideBuyFunds() {
    return _jsx(Variant, { client: storyClient, hideBuyFunds: true });
}
export function HideAllTopButtons() {
    return (_jsx(Variant, { client: storyClient, hideSendFunds: true, hideReceiveFunds: true, hideBuyFunds: true }));
}
export function Chains() {
    return _jsx(Variant, { client: storyClient, chains: [ethereum, polygon, base] });
}
export function Locale() {
    return _jsx(Variant, { client: storyClient, locale: "ja_JP" });
}
export function ConnectedAccountAvatarUrl() {
    return (_jsx(Variant, { client: storyClient, connectedAccountAvatarUrl: "https://thirdweb.com/favicon.ico" }));
}
export function ConnectedAccountName() {
    return _jsx(Variant, { client: storyClient, connectedAccountName: "test" });
}
export function ShowBalanceInFiat() {
    return _jsx(Variant, { client: storyClient, showBalanceInFiat: "USD" });
}
export function AssetTabs() {
    return _jsx(Variant, { client: storyClient, assetTabs: ["nft", "token"] });
}
export function OnClose() {
    return (_jsx(Variant, { client: storyClient, onClose: () => {
            alert("onClose");
        } }));
}
export function Footer() {
    return (_jsx(Variant, { client: storyClient, footer: (props) => (_jsxs("div", { style: {
                outline: "1px solid red",
                padding: "16px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "10px",
            }, children: ["custom footer", _jsx("button", { onClick: props.close, type: "button", children: "close" })] })) }));
}
export function ConnectOptions() {
    return (_jsx(Variant, { client: storyClient, connectOptions: {
            showAllWallets: false,
        } }));
}
export function LightTheme() {
    return _jsx(Variant, { client: storyClient, theme: "light" });
}
export function CustomLightTheme() {
    return (_jsx(Variant, { client: storyClient, theme: lightTheme({
            colors: {
                modalBg: "#FFFFF0",
                tertiaryBg: "#DBE4C9",
                borderColor: "#8AA624",
                secondaryText: "#3E3F29",
                accentText: "#E43636",
            },
        }) }));
}
function Variant(params) {
    const account = useActiveAccount();
    const detailsModal = useWalletDetailsModal();
    if (!account) {
        return _jsx("p", { children: " no account " });
    }
    return (_jsx("button", { type: "button", onClick: () => {
            detailsModal.open(params);
        }, children: "test" }));
}
//# sourceMappingURL=useWalletDetailsModal.stories.js.map