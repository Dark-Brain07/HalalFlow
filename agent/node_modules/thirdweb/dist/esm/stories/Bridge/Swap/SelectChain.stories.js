import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from "react";
import { SwapWidgetContainer } from "../../../react/web/ui/Bridge/swap-widget/SwapWidget.js";
import { SelectBridgeChain, SelectBridgeChainUI, } from "../../../react/web/ui/Bridge/swap-widget/select-chain.js";
import { storyClient } from "../../utils.js";
const meta = {
    parameters: {
        layout: "centered",
    },
    title: "Bridge/Swap/screens/SelectChain",
};
export default meta;
export function WithDataDesktop() {
    const [selectedChain, setSelectedChain] = useState(undefined);
    return (_jsx(SwapWidgetContainer, { theme: "dark", className: "w-full", children: _jsx(SelectBridgeChain, { type: "buy", selections: {
                buyChainId: undefined,
                sellChainId: undefined,
            }, isMobile: false, client: storyClient, onSelectChain: setSelectedChain, onBack: () => { }, selectedChain: selectedChain }) }));
}
export function LoadingDesktop() {
    const [selectedChain, setSelectedChain] = useState(undefined);
    return (_jsx(SwapWidgetContainer, { theme: "dark", className: "w-full", children: _jsx(SelectBridgeChainUI, { type: "buy", selections: {
                buyChainId: undefined,
                sellChainId: undefined,
            }, isMobile: false, client: storyClient, onSelectChain: setSelectedChain, onBack: () => { }, isPending: true, chains: [], selectedChain: selectedChain }) }));
}
export function WithDataMobile() {
    const [selectedChain, setSelectedChain] = useState(undefined);
    return (_jsx(SwapWidgetContainer, { theme: "dark", className: "w-full", children: _jsx(SelectBridgeChain, { type: "buy", selections: {
                buyChainId: undefined,
                sellChainId: undefined,
            }, isMobile: true, client: storyClient, onSelectChain: setSelectedChain, onBack: () => { }, selectedChain: selectedChain }) }));
}
export function LoadingMobile() {
    const [selectedChain, setSelectedChain] = useState(undefined);
    return (_jsx(SwapWidgetContainer, { theme: "dark", className: "w-full", children: _jsx(SelectBridgeChainUI, { type: "buy", selections: {
                buyChainId: undefined,
                sellChainId: undefined,
            }, isMobile: true, client: storyClient, onSelectChain: setSelectedChain, onBack: () => { }, isPending: true, chains: [], selectedChain: selectedChain }) }));
}
//# sourceMappingURL=SelectChain.stories.js.map