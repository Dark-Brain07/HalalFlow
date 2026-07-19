import type { TokenWithPrices } from "../../../../../bridge/types/Token.js";
import type { ThirdwebClient } from "../../../../../client/client.js";
import type { SupportedFiatCurrency } from "../../../../../pay/convert/type.js";
import { type Theme } from "../../../../core/design-system/index.js";
import type { BridgePrepareRequest } from "../../../../core/hooks/useBridgePrepare.js";
import type { ActiveWalletInfo, SwapPreparedQuote, SwapWidgetConnectOptions, TokenSelection } from "./types.js";
type SwapUIProps = {
    activeWalletInfo: ActiveWalletInfo | undefined;
    client: ThirdwebClient;
    theme: Theme | "light" | "dark";
    connectOptions: SwapWidgetConnectOptions | undefined;
    currency: SupportedFiatCurrency;
    showThirdwebBranding: boolean;
    onSwap: (data: {
        result: SwapPreparedQuote;
        request: BridgePrepareRequest;
        buyToken: TokenWithPrices;
        sellTokenBalance: bigint;
        sellToken: TokenWithPrices;
        mode: "buy" | "sell";
    }) => void;
    buyToken: TokenSelection | undefined;
    sellToken: TokenSelection | undefined;
    setBuyToken: (token: TokenSelection | undefined) => void;
    setSellToken: (token: TokenSelection | undefined) => void;
    amountSelection: {
        type: "buy" | "sell";
        amount: string;
    };
    setAmountSelection: (amountSelection: {
        type: "buy" | "sell";
        amount: string;
    }) => void;
    onDisconnect: (() => void) | undefined;
};
/**
 * @internal
 */
export declare function SwapUI(props: SwapUIProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=swap-ui.d.ts.map