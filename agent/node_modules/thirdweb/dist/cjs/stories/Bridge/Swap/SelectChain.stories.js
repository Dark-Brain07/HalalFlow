"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WithDataDesktop = WithDataDesktop;
exports.LoadingDesktop = LoadingDesktop;
exports.WithDataMobile = WithDataMobile;
exports.LoadingMobile = LoadingMobile;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const SwapWidget_js_1 = require("../../../react/web/ui/Bridge/swap-widget/SwapWidget.js");
const select_chain_js_1 = require("../../../react/web/ui/Bridge/swap-widget/select-chain.js");
const utils_js_1 = require("../../utils.js");
const meta = {
    parameters: {
        layout: "centered",
    },
    title: "Bridge/Swap/screens/SelectChain",
};
exports.default = meta;
function WithDataDesktop() {
    const [selectedChain, setSelectedChain] = (0, react_1.useState)(undefined);
    return ((0, jsx_runtime_1.jsx)(SwapWidget_js_1.SwapWidgetContainer, { theme: "dark", className: "w-full", children: (0, jsx_runtime_1.jsx)(select_chain_js_1.SelectBridgeChain, { type: "buy", selections: {
                buyChainId: undefined,
                sellChainId: undefined,
            }, isMobile: false, client: utils_js_1.storyClient, onSelectChain: setSelectedChain, onBack: () => { }, selectedChain: selectedChain }) }));
}
function LoadingDesktop() {
    const [selectedChain, setSelectedChain] = (0, react_1.useState)(undefined);
    return ((0, jsx_runtime_1.jsx)(SwapWidget_js_1.SwapWidgetContainer, { theme: "dark", className: "w-full", children: (0, jsx_runtime_1.jsx)(select_chain_js_1.SelectBridgeChainUI, { type: "buy", selections: {
                buyChainId: undefined,
                sellChainId: undefined,
            }, isMobile: false, client: utils_js_1.storyClient, onSelectChain: setSelectedChain, onBack: () => { }, isPending: true, chains: [], selectedChain: selectedChain }) }));
}
function WithDataMobile() {
    const [selectedChain, setSelectedChain] = (0, react_1.useState)(undefined);
    return ((0, jsx_runtime_1.jsx)(SwapWidget_js_1.SwapWidgetContainer, { theme: "dark", className: "w-full", children: (0, jsx_runtime_1.jsx)(select_chain_js_1.SelectBridgeChain, { type: "buy", selections: {
                buyChainId: undefined,
                sellChainId: undefined,
            }, isMobile: true, client: utils_js_1.storyClient, onSelectChain: setSelectedChain, onBack: () => { }, selectedChain: selectedChain }) }));
}
function LoadingMobile() {
    const [selectedChain, setSelectedChain] = (0, react_1.useState)(undefined);
    return ((0, jsx_runtime_1.jsx)(SwapWidget_js_1.SwapWidgetContainer, { theme: "dark", className: "w-full", children: (0, jsx_runtime_1.jsx)(select_chain_js_1.SelectBridgeChainUI, { type: "buy", selections: {
                buyChainId: undefined,
                sellChainId: undefined,
            }, isMobile: true, client: utils_js_1.storyClient, onSelectChain: setSelectedChain, onBack: () => { }, isPending: true, chains: [], selectedChain: selectedChain }) }));
}
//# sourceMappingURL=SelectChain.stories.js.map