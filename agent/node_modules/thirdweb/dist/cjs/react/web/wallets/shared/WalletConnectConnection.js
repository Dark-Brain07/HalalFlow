"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletConnectStandaloneConnection = exports.WalletConnectConnection = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const wait_js_1 = require("../../../../utils/promise/wait.js");
const url_js_1 = require("../../../../utils/url.js");
const isMobile_js_1 = require("../../../../utils/web/isMobile.js");
const openWindow_js_1 = require("../../../../utils/web/openWindow.js");
const ConnectingScreen_js_1 = require("./ConnectingScreen.js");
const ScanScreen_js_1 = require("./ScanScreen.js");
/**
 * QR Scan UI for connecting a specific wallet on desktop.
 * shows a "Connecting" screen and opens the app on mobile.
 * @internal
 */
const WalletConnectConnection = (props) => {
    const { onBack, onGetStarted, wallet, walletInfo, locale, done } = props;
    const [qrCodeUri, setQrCodeUri] = (0, react_1.useState)();
    const [errorConnecting, setErrorConnecting] = (0, react_1.useState)(false);
    const connect = (0, react_1.useCallback)(() => {
        setErrorConnecting(false);
        wallet
            .connect({
            chain: props.chain,
            client: props.client,
            walletConnect: {
                onDisplayUri(uri) {
                    try {
                        if ((0, isMobile_js_1.isMobile)()) {
                            const mobileAppLink = walletInfo.mobile.native || walletInfo.mobile.universal;
                            if (mobileAppLink) {
                                (0, openWindow_js_1.openWindow)((0, url_js_1.formatWalletConnectUrl)(mobileAppLink, uri).redirect);
                            }
                            else {
                                // on android, wc:// links show the app picker
                                (0, openWindow_js_1.openWindow)(uri);
                            }
                        }
                        else {
                            setQrCodeUri(uri);
                        }
                    }
                    catch (e) {
                        console.error(e);
                        setErrorConnecting(true);
                    }
                },
                optionalChains: props.chains,
                projectId: props.walletConnect?.projectId,
                showQrModal: false,
            },
        })
            .then(() => {
            done();
        })
            .catch((e) => {
            setErrorConnecting(true);
            console.error(e);
        });
    }, [
        props.walletConnect,
        walletInfo.mobile.native,
        walletInfo.mobile.universal,
        wallet,
        props.chain,
        props.client,
        props.chains,
        done,
    ]);
    const scanStarted = (0, react_1.useRef)(false);
    (0, react_1.useEffect)(() => {
        if (scanStarted.current) {
            return;
        }
        scanStarted.current = true;
        connect();
    }, [connect]);
    if ((0, isMobile_js_1.isMobile)()) {
        return ((0, jsx_runtime_1.jsx)(ConnectingScreen_js_1.ConnectingScreen, { client: props.client, errorConnecting: errorConnecting, locale: {
                failed: locale.connectionScreen.failed,
                getStartedLink: locale.getStartedLink,
                inProgress: locale.connectionScreen.inProgress,
                instruction: locale.connectionScreen.instruction,
                tryAgain: locale.connectionScreen.retry,
            }, onBack: onBack, onGetStarted: onGetStarted, onRetry: connect, size: props.size, walletId: wallet.id, walletName: walletInfo.name }));
    }
    return ((0, jsx_runtime_1.jsx)(ScanScreen_js_1.ScanScreen, { client: props.client, connectModalSize: props.size, error: errorConnecting, getStartedLink: locale.getStartedLink, onBack: onBack, onGetStarted: onGetStarted, onRetry: connect, qrCodeUri: qrCodeUri, qrScanInstruction: locale.scanScreen.instruction, walletId: wallet.id, walletName: walletInfo.name }));
};
exports.WalletConnectConnection = WalletConnectConnection;
/**
 * QR Scan UI for connecting a specific wallet on desktop.
 * shows a "Connecting" screen and opens the app on mobile.
 * @internal
 */
const WalletConnectStandaloneConnection = (props) => {
    const { onBack, wallet, walletInfo, locale, done, setModalVisibility } = props;
    const [qrCodeUri, setQrCodeUri] = (0, react_1.useState)();
    const [errorConnecting, setErrorConnecting] = (0, react_1.useState)(false);
    const connect = (0, react_1.useCallback)(() => {
        setErrorConnecting(false);
        if ((0, isMobile_js_1.isMobile)()) {
            let wcModalClosed = false;
            // show spinner while the wallet connect modal loads in the background
            (0, wait_js_1.wait)(2000).then(() => {
                // don't hide the modal if wc closed already
                if (!wcModalClosed) {
                    setModalVisibility(false);
                }
            });
            wallet
                .connect({
                chain: props.chain,
                client: props.client,
                optionalChains: props.chains,
                projectId: props.walletConnect?.projectId,
                showQrModal: true,
            })
                .then(() => {
                wcModalClosed = true;
                setModalVisibility(true);
                done();
            })
                .catch((e) => {
                wcModalClosed = true;
                setModalVisibility(true);
                setErrorConnecting(true);
                console.error(e);
            });
        }
        else {
            wallet
                .connect({
                chain: props.chain,
                client: props.client,
                onDisplayUri(uri) {
                    setQrCodeUri(uri);
                },
                optionalChains: props.chains,
                projectId: props.walletConnect?.projectId,
                showQrModal: false,
            })
                .then(() => {
                done();
            })
                .catch((e) => {
                setErrorConnecting(true);
                console.error(e);
            });
        }
    }, [
        props.walletConnect,
        wallet,
        props.chain,
        props.client,
        props.chains,
        done,
        setModalVisibility,
    ]);
    const scanStarted = (0, react_1.useRef)(false);
    (0, react_1.useEffect)(() => {
        if (scanStarted.current) {
            return;
        }
        scanStarted.current = true;
        connect();
    }, [connect]);
    if ((0, isMobile_js_1.isMobile)()) {
        return ((0, jsx_runtime_1.jsx)(ConnectingScreen_js_1.ConnectingScreen, { client: props.client, errorConnecting: errorConnecting, locale: {
                failed: locale.connectionScreen.failed,
                getStartedLink: locale.getStartedLink,
                inProgress: locale.connectionScreen.inProgress,
                instruction: locale.connectionScreen.instruction,
                tryAgain: locale.connectionScreen.retry,
            }, onBack: onBack, onRetry: connect, size: props.size, walletId: wallet.id, walletName: walletInfo.name }));
    }
    return ((0, jsx_runtime_1.jsx)(ScanScreen_js_1.ScanScreen, { client: props.client, connectModalSize: props.size, error: errorConnecting, getStartedLink: locale.getStartedLink, onBack: onBack, onRetry: connect, qrCodeUri: qrCodeUri, qrScanInstruction: locale.scanScreen.instruction, walletId: wallet.id, walletName: walletInfo.name }));
};
exports.WalletConnectStandaloneConnection = WalletConnectStandaloneConnection;
//# sourceMappingURL=WalletConnectConnection.js.map