"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Basic = Basic;
exports.PayAnotherWallet = PayAnotherWallet;
exports.BuyBaseNativeToken = BuyBaseNativeToken;
exports.JPYCurrency = JPYCurrency;
exports.NoThirdwebBranding = NoThirdwebBranding;
exports.BuyBaseUSDC = BuyBaseUSDC;
exports.TokenNotEditable = TokenNotEditable;
exports.AmountNotEditable = AmountNotEditable;
exports.TokenAndAmountNotEditable = TokenAndAmountNotEditable;
exports.CustomTitleDescriptionAndButtonLabel = CustomTitleDescriptionAndButtonLabel;
exports.HideTitle = HideTitle;
exports.UnsupportedChain = UnsupportedChain;
exports.UnsupportedToken = UnsupportedToken;
exports.OnlyCardSupported = OnlyCardSupported;
exports.OnlyCryptoSupported = OnlyCryptoSupported;
exports.LargeAmount = LargeAmount;
exports.NoAutoConnect = NoAutoConnect;
exports.CustomWallets = CustomWallets;
const jsx_runtime_1 = require("react/jsx-runtime");
const base_js_1 = require("../chains/chain-definitions/base.js");
const ethereum_js_1 = require("../chains/chain-definitions/ethereum.js");
const utils_js_1 = require("../chains/utils.js");
const BuyWidget_js_1 = require("../react/web/ui/Bridge/BuyWidget.js");
const create_wallet_js_1 = require("../wallets/create-wallet.js");
const utils_js_2 = require("./utils.js");
const meta = {
    title: "Bridge/Buy/BuyWidget",
};
exports.default = meta;
function Basic() {
    return (0, jsx_runtime_1.jsx)(Variant, { client: utils_js_2.storyClient });
}
function PayAnotherWallet() {
    return ((0, jsx_runtime_1.jsx)(Variant, { client: utils_js_2.storyClient, amount: "10", chain: base_js_1.base, tokenAddress: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", receiverAddress: "0x83Dd93fA5D8343094f850f90B3fb90088C1bB425" }));
}
function BuyBaseNativeToken() {
    return (0, jsx_runtime_1.jsx)(Variant, { client: utils_js_2.storyClient, chain: base_js_1.base, amount: "0.1" });
}
function JPYCurrency() {
    return ((0, jsx_runtime_1.jsx)(Variant, { client: utils_js_2.storyClient, chain: base_js_1.base, amount: "0.1", currency: "JPY" }));
}
function NoThirdwebBranding() {
    return ((0, jsx_runtime_1.jsx)(Variant, { client: utils_js_2.storyClient, chain: base_js_1.base, amount: "0.1", currency: "JPY", showThirdwebBranding: false }));
}
function BuyBaseUSDC() {
    return ((0, jsx_runtime_1.jsx)(Variant, { client: utils_js_2.storyClient, chain: base_js_1.base, amount: "0.1", tokenAddress: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913" }));
}
function TokenNotEditable() {
    return ((0, jsx_runtime_1.jsx)(Variant, { client: utils_js_2.storyClient, chain: base_js_1.base, amount: "0.1", tokenAddress: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", tokenEditable: false }));
}
function AmountNotEditable() {
    return ((0, jsx_runtime_1.jsx)(Variant, { client: utils_js_2.storyClient, chain: base_js_1.base, amount: "0.1", tokenAddress: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", amountEditable: false }));
}
function TokenAndAmountNotEditable() {
    return ((0, jsx_runtime_1.jsx)(Variant, { client: utils_js_2.storyClient, chain: base_js_1.base, amount: "0.1", tokenAddress: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", tokenEditable: false, amountEditable: false }));
}
function CustomTitleDescriptionAndButtonLabel() {
    return ((0, jsx_runtime_1.jsx)(Variant, { client: utils_js_2.storyClient, title: "Custom Title", description: "Custom Description", chain: base_js_1.base, amount: "0.1", tokenAddress: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", buttonLabel: "Custom Button Label" }));
}
function HideTitle() {
    return ((0, jsx_runtime_1.jsx)(Variant, { client: utils_js_2.storyClient, title: "", chain: base_js_1.base, amount: "0.1", tokenAddress: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913" }));
}
function UnsupportedChain() {
    return ((0, jsx_runtime_1.jsx)(Variant, { client: utils_js_2.storyClient, chain: (0, utils_js_1.defineChain)(84532), amount: "0.1" }));
}
function UnsupportedToken() {
    return ((0, jsx_runtime_1.jsx)(Variant, { client: utils_js_2.storyClient, chain: base_js_1.base, amount: "0.1", tokenAddress: "0xc3e13Ecf3B6C2Aa0F2Eb5e898De02d704352Aa54" // this is actually NFT
     }));
}
function OnlyCardSupported() {
    return ((0, jsx_runtime_1.jsx)(Variant, { client: utils_js_2.storyClient, chain: base_js_1.base, amount: "0.1", paymentMethods: ["card"] }));
}
function OnlyCryptoSupported() {
    return ((0, jsx_runtime_1.jsx)(Variant, { client: utils_js_2.storyClient, chain: base_js_1.base, amount: "0.1", paymentMethods: ["crypto"] }));
}
function LargeAmount() {
    return ((0, jsx_runtime_1.jsx)(Variant, { client: utils_js_2.storyClient, chain: ethereum_js_1.ethereum, tokenAddress: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984", amount: "150000" }));
}
function NoAutoConnect() {
    return ((0, jsx_runtime_1.jsx)(Variant, { client: utils_js_2.storyClient, chain: ethereum_js_1.ethereum, tokenAddress: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984", amount: "150000", connectOptions: {
            autoConnect: false,
        } }));
}
function CustomWallets() {
    return ((0, jsx_runtime_1.jsx)(Variant, { client: utils_js_2.storyClient, connectOptions: {
            wallets: [(0, create_wallet_js_1.createWallet)("io.metamask"), (0, create_wallet_js_1.createWallet)("me.rainbow")],
        } }));
}
function Variant(props) {
    return ((0, jsx_runtime_1.jsxs)("div", { style: {
            display: "flex",
            flexDirection: "column",
            gap: "40px",
            alignItems: "center",
        }, children: [(0, jsx_runtime_1.jsx)(BuyWidget_js_1.BuyWidget, { ...props, theme: "dark" }), (0, jsx_runtime_1.jsx)(BuyWidget_js_1.BuyWidget, { ...props, theme: "light" })] }));
}
//# sourceMappingURL=BuyWidget.stories.js.map