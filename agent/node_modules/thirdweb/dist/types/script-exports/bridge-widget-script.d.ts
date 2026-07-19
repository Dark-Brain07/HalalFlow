import type { SupportedFiatCurrency } from "../pay/convert/type.js";
import type { PurchaseData } from "../pay/types.js";
import { type ThemeOverrides } from "../react/core/design-system/index.js";
import type { CompletedStatusResult } from "../react/core/hooks/useStepExecutor.js";
import type { BuyOrOnrampPrepareResult } from "../react/web/ui/Bridge/BuyWidget.js";
import type { SwapPreparedQuote } from "../react/web/ui/Bridge/swap-widget/types.js";
export type BridgeWidgetScriptProps = {
    clientId: string;
    theme?: "light" | "dark" | ({
        type: "light" | "dark";
    } & ThemeOverrides);
    showThirdwebBranding?: boolean;
    currency?: SupportedFiatCurrency;
    swap?: {
        className?: string;
        style?: React.CSSProperties;
        onSuccess?: (data: {
            quote: SwapPreparedQuote;
            statuses: CompletedStatusResult[];
        }) => void;
        onError?: (error: Error, quote: SwapPreparedQuote) => void;
        onCancel?: (quote: SwapPreparedQuote) => void;
        onDisconnect?: () => void;
        persistTokenSelections?: boolean;
        prefill?: {
            buyToken?: {
                tokenAddress?: string;
                chainId: number;
                amount?: string;
            };
            sellToken?: {
                tokenAddress?: string;
                chainId: number;
                amount?: string;
            };
        };
    };
    buy?: {
        amount?: string;
        chainId?: number;
        tokenAddress?: string;
        buttonLabel?: string;
        onCancel?: (quote: BuyOrOnrampPrepareResult | undefined) => void;
        onError?: (error: Error, quote: BuyOrOnrampPrepareResult | undefined) => void;
        onSuccess?: (data: {
            quote: BuyOrOnrampPrepareResult;
            statuses: CompletedStatusResult[];
        }) => void;
        className?: string;
        country?: string;
        presetOptions?: [number, number, number];
        purchaseData?: PurchaseData;
    };
};
export declare function BridgeWidgetScript(props: BridgeWidgetScriptProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=bridge-widget-script.d.ts.map