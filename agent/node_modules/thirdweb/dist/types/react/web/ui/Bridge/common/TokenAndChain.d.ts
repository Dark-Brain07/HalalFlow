import type { Token } from "../../../../../bridge/index.js";
import type { Chain } from "../../../../../chains/types.js";
import type { ThirdwebClient } from "../../../../../client/client.js";
import { iconSize } from "../../../../core/design-system/index.js";
export declare function TokenAndChain({ token, client, size, style, }: {
    token: Omit<Token, "priceUsd">;
    client: ThirdwebClient;
    size: keyof typeof iconSize;
    style?: React.CSSProperties;
}): import("react/jsx-runtime").JSX.Element;
export declare const ChainIcon: React.FC<{
    chain: Chain;
    size: keyof typeof iconSize;
    client: ThirdwebClient;
}>;
//# sourceMappingURL=TokenAndChain.d.ts.map