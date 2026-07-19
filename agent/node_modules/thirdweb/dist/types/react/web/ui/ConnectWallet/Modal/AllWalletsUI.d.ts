import type { ThirdwebClient } from "../../../../../client/client.js";
import type { Wallet } from "../../../../../wallets/interfaces/wallet.js";
import type { WalletId } from "../../../../../wallets/wallet-types.js";
import type { ConnectLocale } from "../locale/types.js";
/**
 *
 * @internal
 */
declare function AllWalletsUI(props: {
    onBack: () => void;
    onSelect: (wallet: Wallet) => void;
    size: "compact" | "wide";
    client: ThirdwebClient;
    recommendedWallets: Wallet[] | undefined;
    connectLocale: ConnectLocale;
    disableSelectionDataReset?: boolean;
    walletIdsToHide?: WalletId[];
}): import("react/jsx-runtime").JSX.Element;
export default AllWalletsUI;
//# sourceMappingURL=AllWalletsUI.d.ts.map