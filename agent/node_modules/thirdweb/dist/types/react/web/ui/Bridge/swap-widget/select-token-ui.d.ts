import type { ThirdwebClient } from "../../../../../client/client.js";
import type { SupportedFiatCurrency } from "../../../../../pay/convert/type.js";
import type { ActiveWalletInfo, TokenSelection } from "./types.js";
/**
 * @internal
 */
type SelectTokenUIProps = {
    onClose: () => void;
    client: ThirdwebClient;
    selectedToken: TokenSelection | undefined;
    setSelectedToken: (token: TokenSelection) => void;
    activeWalletInfo: ActiveWalletInfo | undefined;
    type: "buy" | "sell";
    selections: {
        buyChainId: number | undefined;
        sellChainId: number | undefined;
    };
    currency: SupportedFiatCurrency;
};
/**
 * @internal
 */
export declare function SelectToken(props: SelectTokenUIProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=select-token-ui.d.ts.map