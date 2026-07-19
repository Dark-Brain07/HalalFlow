import type { ThirdwebClient } from "../../../../../client/client.js";
import type { Wallet } from "../../../../../wallets/interfaces/wallet.js";
interface WalletFiatSelectionProps {
    connectedWallets: Wallet[];
    client: ThirdwebClient;
    onWalletSelected: (wallet: Wallet) => void;
    onFiatSelected: () => void;
    onConnectWallet: () => void;
    paymentMethods?: ("crypto" | "card")[];
}
export declare function WalletFiatSelection({ connectedWallets, client, onWalletSelected, onFiatSelected, onConnectWallet, paymentMethods, }: WalletFiatSelectionProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=WalletFiatSelection.d.ts.map