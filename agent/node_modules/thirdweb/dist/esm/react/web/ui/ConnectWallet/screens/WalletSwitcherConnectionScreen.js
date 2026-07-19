import { jsx as _jsx } from "react/jsx-runtime";
import { getDefaultWallets } from "../../../../../wallets/defaultWallets.js";
import { useActiveWalletChain } from "../../../../core/hooks/wallets/useActiveWalletChain.js";
import { useConnectedWallets } from "../../../../core/hooks/wallets/useConnectedWallets.js";
import { ConnectModalContent } from "../Modal/ConnectModalContent.js";
import { useSetupScreen } from "../Modal/screen.js";
export function WalletSwitcherConnectionScreen(props) {
    const walletChain = useActiveWalletChain();
    const connectedWallets = useConnectedWallets();
    const wallets = props.wallets ||
        getDefaultWallets({
            appMetadata: props.appMetadata,
            chains: props.chains,
        }).filter((w) => w.id !== "inApp");
    const screenSetup = useSetupScreen({
        size: "compact",
        wallets: wallets,
        welcomeScreen: undefined,
    });
    return (_jsx(ConnectModalContent, { accountAbstraction: props.accountAbstraction, auth: undefined, chain: props.chain || walletChain, chains: props.chains, client: props.client, connectLocale: props.connectLocale, hideHeader: props.isEmbed, isOpen: true, meta: {
            showThirdwebBranding: false,
        }, modalHeader: {
            onBack: props.onBack,
            title: "Connect",
        }, onClose: () => { }, onConnect: (w) => {
            props.onSelect(w);
        }, recommendedWallets: props.recommendedWallets, screenSetup: screenSetup, setModalVisibility: () => { }, shouldSetActive: false, showAllWallets: props.showAllWallets, size: "compact", walletConnect: props.walletConnect, walletIdsToHide: connectedWallets.map((x) => x.id), wallets: wallets, welcomeScreen: undefined }));
}
//# sourceMappingURL=WalletSwitcherConnectionScreen.js.map