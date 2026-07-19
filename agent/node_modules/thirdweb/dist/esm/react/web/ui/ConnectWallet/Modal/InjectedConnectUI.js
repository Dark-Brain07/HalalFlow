"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { useCallback, useEffect, useRef, useState } from "react";
import { wait } from "../../../../core/utils/wait.js";
import { ConnectingScreen } from "../../../wallets/shared/ConnectingScreen.js";
/**
 * @internal
 */
export const InjectedConnectUI = (props) => {
    const { wallet, done } = props;
    const [errorConnecting, setErrorConnecting] = useState(false);
    const locale = props.locale;
    const connectToExtension = useCallback(async () => {
        try {
            connectPrompted.current = true;
            setErrorConnecting(false);
            await wait(1000);
            await wallet.connect({
                chain: props.chain,
                client: props.client,
            });
            done();
        }
        catch (e) {
            setErrorConnecting(true);
            console.error(e);
        }
    }, [props.client, props.chain, done, wallet]);
    const connectPrompted = useRef(false);
    useEffect(() => {
        if (connectPrompted.current) {
            return;
        }
        connectToExtension();
    }, [connectToExtension]);
    return (_jsx(ConnectingScreen, { client: props.client, errorConnecting: errorConnecting, locale: {
            failed: locale.connectionScreen.failed,
            getStartedLink: locale.getStartedLink,
            inProgress: locale.connectionScreen.inProgress,
            instruction: locale.connectionScreen.instruction,
            tryAgain: locale.connectionScreen.retry,
        }, onBack: props.onBack, onGetStarted: props.onGetStarted, onRetry: () => {
            connectToExtension();
        }, size: props.size, walletId: props.wallet.id, walletName: props.walletName }));
};
//# sourceMappingURL=InjectedConnectUI.js.map