import type { Chain as BridgeChain } from "../../../../../bridge/index.js";
import type { ThirdwebClient } from "../../../../../client/client.js";
type SelectBuyTokenProps = {
    onBack: () => void;
    client: ThirdwebClient;
    onSelectChain: (chain: BridgeChain) => void;
    selectedChain: BridgeChain | undefined;
    isMobile: boolean;
    type: "buy" | "sell";
    selections: {
        buyChainId: number | undefined;
        sellChainId: number | undefined;
    };
};
/**
 * @internal
 */
export declare function SelectBridgeChain(props: SelectBuyTokenProps): import("react/jsx-runtime").JSX.Element;
/**
 * @internal
 */
export declare function SelectBridgeChainUI(props: SelectBuyTokenProps & {
    isPending: boolean;
    chains: BridgeChain[];
    onSelectChain: (chain: BridgeChain) => void;
    selectedChain: BridgeChain | undefined;
}): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=select-chain.d.ts.map