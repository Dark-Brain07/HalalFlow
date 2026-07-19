import type { ThirdwebClient } from "../../../../client/client.js";
import type { PreparedTransaction } from "../../../../transaction/prepare-transaction.js";
import type { ConnectLocale } from "../ConnectWallet/locale/types.js";
/**
 *
 * @internal
 */
export declare function DepositScreen(props: {
    connectLocale: ConnectLocale;
    client: ThirdwebClient;
    tx: PreparedTransaction;
    onDone: () => void;
}): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=DepositScreen.d.ts.map