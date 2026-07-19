import type { Chain } from "../../../../chains/types.js";
import type { ThirdwebClient } from "../../../../client/client.js";
/**
 * @internal
 */
export declare const ChainName: React.FC<{
    chain: Chain;
    size: "xs" | "sm" | "md" | "lg";
    color?: "primaryText" | "secondaryText";
    client: ThirdwebClient;
    short?: boolean;
    style?: React.CSSProperties;
}>;
export declare function shorterChainName(name: string): string;
//# sourceMappingURL=ChainName.d.ts.map