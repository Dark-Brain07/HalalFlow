import { jsx as _jsx } from "react/jsx-runtime";
import { useCallback, useContext, useMemo, useState } from "react";
import { getDefaultWallets } from "../../../../wallets/defaultWallets.js";
import { SetRootElementContext } from "../../../core/providers/RootElementContext.js";
import { WalletUIStatesProvider } from "../../providers/wallet-ui-states-provider.js";
import { canFitWideModal } from "../../utils/canFitWideModal.js";
import { getConnectLocale } from "./locale/getConnectLocale.js";
import ConnectModal from "./Modal/ConnectModal.js";
/**
 * hook that allows you to open the Connect UI in a Modal to prompt the user to connect wallet.
 * @example
 * ```tsx
 * import { createThirdwebClient } from "thirdweb";
 * import { useConnectModal } from "thirdweb/react";
 *
 * const client = createThirdwebClient({
 *  clientId: "<your_client_id>",
 * });
 *
 * function Example() {
 *   const { connect, isConnecting } = useConnectModal();
 *
 *   async function handleConnect() {
 *      const wallet = await connect({ client }); // opens the connect modal
 *      console.log('connected to', wallet);
 *   }
 *
 *   return <button onClick={handleConnect}> Connect </button>
 * }
 * ```
 *
 * The returned `connect` method takes an object of type [UseConnectModalOptions](https://portal.thirdweb.com/references/typescript/v5/ConnectButtonProps)
 * as an argument to customize the Connect Modal UI. Refer to [UseConnectModalOptions](https://portal.thirdweb.com/references/typescript/v5/ConnectButtonProps) to see the available options.
 *
 * @walletConnection
 */
export function useConnectModal() {
    const setRootEl = useContext(SetRootElementContext);
    const [isConnecting, setIsConnecting] = useState(false);
    const connect = useCallback((props) => {
        function cleanup() {
            setIsConnecting(false);
            setRootEl(undefined);
        }
        return new Promise((resolve, reject) => {
            setIsConnecting(true);
            getConnectLocale(props.locale || "en_US")
                .then((locale) => {
                setRootEl(_jsx(Modal, { ...props, connectLocale: locale, onClose: () => {
                        reject();
                        cleanup();
                    }, onConnect: (w) => {
                        if (props.auth)
                            return;
                        resolve(w);
                        cleanup();
                    } }));
            })
                .catch(() => {
                reject();
                cleanup();
            });
        });
    }, [setRootEl]);
    return { connect, isConnecting };
}
function Modal(props) {
    const wallets = useMemo(() => props.wallets ||
        getDefaultWallets({
            appMetadata: props.appMetadata,
            chains: props.chains,
        }), [props.wallets, props.appMetadata, props.chains]);
    const size = useMemo(() => {
        return !canFitWideModal() || wallets.length === 1
            ? "compact"
            : props.size || "wide";
    }, [props.size, wallets.length]);
    const meta = useMemo(() => {
        return {
            privacyPolicyUrl: props.privacyPolicyUrl,
            showThirdwebBranding: props.showThirdwebBranding,
            termsOfServiceUrl: props.termsOfServiceUrl,
            title: props.title,
            titleIconUrl: props.titleIcon,
            requireApproval: props.requireApproval,
        };
    }, [
        props.privacyPolicyUrl,
        props.showThirdwebBranding,
        props.termsOfServiceUrl,
        props.title,
        props.titleIcon,
        props.requireApproval,
    ]);
    return (_jsx(WalletUIStatesProvider, { isOpen: true, theme: props.theme, children: _jsx(ConnectModal, { accountAbstraction: props.accountAbstraction, auth: props.auth, chain: props.chain, chains: props.chains, client: props.client, connectLocale: props.connectLocale, hiddenWallets: props.hiddenWallets, localeId: props.locale || "en_US", meta: meta, onClose: props.onClose, onConnect: props.onConnect, recommendedWallets: props.recommendedWallets, shouldSetActive: props.setActive === undefined ? true : props.setActive, showAllWallets: props.showAllWallets, size: size, walletConnect: props.walletConnect, wallets: wallets, welcomeScreen: props.welcomeScreen }) }));
}
//# sourceMappingURL=useConnectModal.js.map