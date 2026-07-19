import type { Token } from "../../../../../bridge/index.js";
import type { ThirdwebClient } from "../../../../../client/client.js";
import type { SupportedFiatCurrency } from "../../../../../pay/convert/type.js";
export declare function TokenBalanceRow({ client, token, amount, onClick, style, currency, }: {
    client: ThirdwebClient;
    token: Token;
    amount: string;
    onClick: (token: Token) => void;
    style?: React.CSSProperties;
    currency?: SupportedFiatCurrency;
}): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=TokenBalanceRow.d.ts.map