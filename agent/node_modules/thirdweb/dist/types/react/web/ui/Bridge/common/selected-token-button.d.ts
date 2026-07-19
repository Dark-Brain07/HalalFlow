import type { TokenWithPrices } from "../../../../../bridge/index.js";
import type { BridgeChain } from "../../../../../bridge/types/Chain.js";
import type { ThirdwebClient } from "../../../../../client/client.js";
export declare function SelectedTokenButton(props: {
    selectedToken: {
        data: TokenWithPrices | undefined;
        isFetching: boolean;
        isError: boolean;
    } | undefined;
    client: ThirdwebClient;
    onSelectToken: () => void;
    chain: BridgeChain | undefined;
    disabled?: boolean;
}): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=selected-token-button.d.ts.map