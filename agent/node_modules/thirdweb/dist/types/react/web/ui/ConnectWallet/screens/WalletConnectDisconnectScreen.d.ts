/** biome-ignore-all lint/nursery/useUniqueElementIds: "id" is not a html attribute here - TODO: stop using 'id' as a prop on JSX elements */
import type { ThirdwebClient } from "../../../../../client/client.js";
import type { WalletConnectSession } from "../../../../../wallets/wallet-connect/receiver/types.js";
/**
 * @internal
 */
export declare function WalletConnectDisconnectScreen(props: {
    onBack: () => void;
    client: ThirdwebClient;
    disconnect: () => Promise<void>;
    error: false | string;
    session: WalletConnectSession;
}): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=WalletConnectDisconnectScreen.d.ts.map