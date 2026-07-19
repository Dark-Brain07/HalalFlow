import { jsx as _jsx } from "react/jsx-runtime";
import { useCallback, useEffect, useRef, useState } from "react";
import { ConnectingScreen } from "./ConnectingScreen.js";
/**
 * @internal
 */
function ExternalWalletConnectUI(props) {
    const { onBack, done, wallet, walletInfo, onGetStarted, locale } = props;
    const [errorConnecting, setErrorConnecting] = useState(false);
    const connect = useCallback(() => {
        setErrorConnecting(false);
        wallet
            .connect({
            chain: props.chain,
            client: props.client,
        })
            .then(() => {
            done();
        })
            .catch((e) => {
            console.error(e);
            setErrorConnecting(true);
        });
    }, [props.client, wallet, props.chain, done]);
    const scanStarted = useRef(false);
    useEffect(() => {
        if (scanStarted.current) {
            return;
        }
        scanStarted.current = true;
        connect();
    }, [connect]);
    return (_jsx(ConnectingScreen, { client: props.client, errorConnecting: errorConnecting, locale: {
            failed: locale.connectionScreen.failed,
            getStartedLink: locale.getStartedLink,
            inProgress: locale.connectionScreen.inProgress,
            instruction: locale.connectionScreen.instruction,
            tryAgain: locale.connectionScreen.retry,
        }, onBack: onBack, onGetStarted: onGetStarted, onRetry: connect, size: props.size, walletId: wallet.id, walletName: walletInfo.name }));
}
export default ExternalWalletConnectUI;
//# sourceMappingURL=CoinbaseSDKConnection.js.map