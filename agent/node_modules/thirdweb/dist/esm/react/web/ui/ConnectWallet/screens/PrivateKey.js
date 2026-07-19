"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { getThirdwebBaseUrl } from "../../../../../utils/domains.js";
import { webLocalStorage } from "../../../../../utils/storage/webStorage.js";
import { isEcosystemWallet } from "../../../../../wallets/ecosystem/is-ecosystem-wallet.js";
import { ClientScopedStorage } from "../../../../../wallets/in-app/core/authentication/client-scoped-storage.js";
import { Container, Line, ModalHeader } from "../../components/basic.js";
import { Spacer } from "../../components/Spacer.js";
import { Spinner } from "../../components/Spinner.js";
/**
 * @internal
 */
export function PrivateKey(props) {
    const [isLoading, setLoading] = useState(true);
    const baseDomain = getThirdwebBaseUrl("inAppWallet");
    useEffect(() => {
        const loginReady = async (e) => {
            if (typeof e.data === "object" &&
                "eventType" in e.data &&
                e.origin === baseDomain) {
                if (e.data.eventType === "exportPrivateKeyIframeLoaded") {
                    const iframe = document.getElementById(`export-wallet-${props.wallet?.id}`);
                    if (!(iframe instanceof HTMLIFrameElement)) {
                        return;
                    }
                    if (!props.wallet) {
                        return;
                    }
                    const clientStorage = new ClientScopedStorage({
                        clientId: props.client.clientId,
                        ecosystem: isEcosystemWallet(props.wallet)
                            ? {
                                id: props.wallet.id,
                                partnerId: props.wallet.getConfig()?.partnerId,
                            }
                            : undefined,
                        storage: webLocalStorage,
                    });
                    if (iframe?.contentWindow) {
                        iframe.contentWindow.postMessage({
                            authToken: await clientStorage.getAuthCookie(),
                            eventType: "initExportPrivateKey",
                        }, e.origin);
                    }
                }
            }
        };
        window.addEventListener("message", loginReady);
        return () => {
            window.removeEventListener("message", loginReady);
        };
    }, [props.wallet, props.client.clientId, baseDomain]);
    if (!props.wallet) {
        throw new Error("[PrivateKey] No wallet found");
    }
    const ecosystem = isEcosystemWallet(props.wallet)
        ? { id: props.wallet.id, partnerId: props.wallet.getConfig()?.partnerId }
        : undefined;
    return (_jsxs(Container, { style: {
            minHeight: "300px",
        }, children: [_jsx(Container, { p: "lg", children: _jsx(ModalHeader, { onBack: props.onBack, title: props.connectLocale.manageWallet.exportPrivateKey }) }), _jsx(Line, {}), _jsxs(Container, { px: "sm", scrollY: true, style: {
                    maxHeight: "500px",
                }, children: [_jsx(Spacer, { y: "md" }), _jsxs(Container, { style: { height: "250px", position: "relative" }, children: [isLoading ? (_jsx(Container, { center: "both", flex: "column", style: { height: "100%", position: "absolute", width: "100%" }, children: _jsx(Spinner, { color: "primaryButtonBg", size: "lg" }) })) : null, _jsx(Container, { style: {
                                    height: "100%",
                                    position: "absolute",
                                    width: "100%",
                                    zIndex: 11,
                                }, children: _jsx("iframe", { allow: "clipboard-read; clipboard-write", id: `export-wallet-${props.wallet.id}`, onLoad: () => {
                                        setLoading(false);
                                    }, src: `${baseDomain}/sdk/2022-08-12/embedded-wallet/export-private-key?clientId=${props.client.clientId}&theme=${typeof props.theme === "string" ? props.theme : props.theme.type}${ecosystem ? `&ecosystemId=${ecosystem.id}` : ""}${ecosystem?.partnerId ? `&partnerId=${ecosystem.partnerId}` : ""}`, style: {
                                        height: "250px",
                                        visibility: isLoading ? "hidden" : "unset",
                                        width: "100%",
                                    }, title: "Export In-App Wallet" }) })] }), _jsx(Spacer, { y: "lg" })] })] }));
}
//# sourceMappingURL=PrivateKey.js.map