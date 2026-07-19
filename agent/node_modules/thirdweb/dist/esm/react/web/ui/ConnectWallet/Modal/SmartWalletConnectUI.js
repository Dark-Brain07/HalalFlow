"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";
import { useConnectionManager } from "../../../../core/providers/connection-manager.js";
import { useWalletInfo } from "../../../../core/utils/wallet.js";
import { LoadingScreen } from "../../../wallets/shared/LoadingScreen.js";
import { getSmartWalletLocale } from "../../../wallets/smartWallet/locale/getSmartWalletLocale.js";
import { Container } from "../../components/basic.js";
import { Spacer } from "../../components/Spacer.js";
import { Spinner } from "../../components/Spinner.js";
import { Text } from "../../components/text.js";
import { AnyWalletConnectUI } from "./AnyWalletConnectUI.js";
/**
 * @internal
 */
export function SmartConnectUI(props) {
    const personalWalletInfo = useWalletInfo(props.personalWallet.id);
    const [keyConnected, setKeyConnected] = useState(false);
    if (!personalWalletInfo.data) {
        return _jsx(LoadingScreen, {});
    }
    // connect personal wallet
    if (!keyConnected) {
        return (_jsx(AnyWalletConnectUI, { chain: props.chain, chains: props.chains, client: props.client, connectLocale: props.connectLocale, done: () => {
                setKeyConnected(true);
            }, meta: props.meta, onBack: props.onBack, setModalVisibility: props.setModalVisibility, size: props.size, wallet: props.personalWallet, walletConnect: props.walletConnect }));
    }
    return (_jsx(SmartWalletConnecting, { accountAbstraction: props.accountAbstraction, client: props.client, done: props.done, localeId: props.connectLocale.id, onBack: props.onBack, personalWallet: props.personalWallet, personalWalletInfo: personalWalletInfo.data, size: props.size }));
}
function SmartWalletConnecting(props) {
    const localeQuery = useQuery({
        queryFn: () => getSmartWalletLocale(props.localeId),
        queryKey: ["getSmartWalletLocale", props.localeId],
    });
    const { personalWallet } = props;
    const { done } = props;
    const [smartWalletConnectionStatus, setSmartWalletConnectionStatus] = useState("idle");
    const connectionManager = useConnectionManager();
    const handleConnect = useCallback(async () => {
        if (!personalWallet) {
            throw new Error("No personal wallet");
        }
        setSmartWalletConnectionStatus("connecting");
        try {
            const connected = await connectionManager.handleConnection(personalWallet, {
                accountAbstraction: props.accountAbstraction,
                client: props.client,
            });
            done(connected);
            setSmartWalletConnectionStatus("idle");
        }
        catch (e) {
            console.error(e);
            setSmartWalletConnectionStatus("connect-error");
        }
    }, [
        done,
        personalWallet,
        props.client,
        props.accountAbstraction,
        connectionManager,
    ]);
    const connectStarted = useRef(false);
    useEffect(() => {
        if (!connectStarted.current) {
            handleConnect();
            connectStarted.current = true;
        }
    }, [handleConnect]);
    if (!localeQuery.data) {
        return _jsx(LoadingScreen, {});
    }
    if (smartWalletConnectionStatus === "connect-error") {
        return (_jsx(Container, { animate: "fadein", center: "both", flex: "column", fullHeight: true, p: "lg", style: {
                minHeight: "300px",
            }, children: _jsx(Text, { color: "danger", children: localeQuery.data.failedToConnect }) }));
    }
    return (_jsxs(Container, { center: "both", flex: "column", fullHeight: true, style: {
            minHeight: "300px",
        }, children: [_jsx(Text, { center: true, color: "primaryText", multiline: true, children: localeQuery.data.connecting }), _jsx(Spacer, { y: "lg" }), _jsx(Spinner, { color: "accentText", size: "lg" })] }));
}
//# sourceMappingURL=SmartWalletConnectUI.js.map