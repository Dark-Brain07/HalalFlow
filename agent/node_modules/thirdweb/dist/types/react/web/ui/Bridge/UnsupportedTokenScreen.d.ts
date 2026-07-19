import type { Chain } from "../../../../chains/types.js";
import type { ThirdwebClient } from "../../../../client/client.js";
type UnsupportedTokenScreenProps = {
    /**
     * The chain the token is on
     */
    chain: Chain;
    client: ThirdwebClient;
    tokenAddress: string;
};
/**
 * Screen displayed when a specified token is not supported by the Bridge API
 * @internal
 */
export declare function UnsupportedTokenScreen(props: UnsupportedTokenScreenProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=UnsupportedTokenScreen.d.ts.map