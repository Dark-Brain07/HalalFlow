import type { Token } from "../../../../../bridge/index.js";
import type { ThirdwebClient } from "../../../../../client/client.js";
import type { SupportedFiatCurrency } from "../../../../../pay/convert/type.js";
import type { ModeInfo, PaymentMethod } from "../types.js";
export declare function PaymentOverview(props: {
    currency: SupportedFiatCurrency;
    receiver: string;
    sender?: string;
    client: ThirdwebClient;
    paymentMethod: PaymentMethod;
    toToken: Token;
    fromAmount: string;
    toAmount: string;
    metadata: {
        title: string | undefined;
        description: string | undefined;
    };
    modeInfo: ModeInfo;
}): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=PaymentOverview.d.ts.map