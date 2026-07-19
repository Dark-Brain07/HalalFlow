"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmartConnectUI = SmartConnectUI;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_query_1 = require("@tanstack/react-query");
const react_1 = require("react");
const connection_manager_js_1 = require("../../../../core/providers/connection-manager.js");
const wallet_js_1 = require("../../../../core/utils/wallet.js");
const LoadingScreen_js_1 = require("../../../wallets/shared/LoadingScreen.js");
const getSmartWalletLocale_js_1 = require("../../../wallets/smartWallet/locale/getSmartWalletLocale.js");
const basic_js_1 = require("../../components/basic.js");
const Spacer_js_1 = require("../../components/Spacer.js");
const Spinner_js_1 = require("../../components/Spinner.js");
const text_js_1 = require("../../components/text.js");
const AnyWalletConnectUI_js_1 = require("./AnyWalletConnectUI.js");
/**
 * @internal
 */
function SmartConnectUI(props) {
    const personalWalletInfo = (0, wallet_js_1.useWalletInfo)(props.personalWallet.id);
    const [keyConnected, setKeyConnected] = (0, react_1.useState)(false);
    if (!personalWalletInfo.data) {
        return (0, jsx_runtime_1.jsx)(LoadingScreen_js_1.LoadingScreen, {});
    }
    // connect personal wallet
    if (!keyConnected) {
        return ((0, jsx_runtime_1.jsx)(AnyWalletConnectUI_js_1.AnyWalletConnectUI, { chain: props.chain, chains: props.chains, client: props.client, connectLocale: props.connectLocale, done: () => {
                setKeyConnected(true);
            }, meta: props.meta, onBack: props.onBack, setModalVisibility: props.setModalVisibility, size: props.size, wallet: props.personalWallet, walletConnect: props.walletConnect }));
    }
    return ((0, jsx_runtime_1.jsx)(SmartWalletConnecting, { accountAbstraction: props.accountAbstraction, client: props.client, done: props.done, localeId: props.connectLocale.id, onBack: props.onBack, personalWallet: props.personalWallet, personalWalletInfo: personalWalletInfo.data, size: props.size }));
}
function SmartWalletConnecting(props) {
    const localeQuery = (0, react_query_1.useQuery)({
        queryFn: () => (0, getSmartWalletLocale_js_1.getSmartWalletLocale)(props.localeId),
        queryKey: ["getSmartWalletLocale", props.localeId],
    });
    const { personalWallet } = props;
    const { done } = props;
    const [smartWalletConnectionStatus, setSmartWalletConnectionStatus] = (0, react_1.useState)("idle");
    const connectionManager = (0, connection_manager_js_1.useConnectionManager)();
    const handleConnect = (0, react_1.useCallback)(async () => {
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
    const connectStarted = (0, react_1.useRef)(false);
    (0, react_1.useEffect)(() => {
        if (!connectStarted.current) {
            handleConnect();
            connectStarted.current = true;
        }
    }, [handleConnect]);
    if (!localeQuery.data) {
        return (0, jsx_runtime_1.jsx)(LoadingScreen_js_1.LoadingScreen, {});
    }
    if (smartWalletConnectionStatus === "connect-error") {
        return ((0, jsx_runtime_1.jsx)(basic_js_1.Container, { animate: "fadein", center: "both", flex: "column", fullHeight: true, p: "lg", style: {
                minHeight: "300px",
            }, children: (0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "danger", children: localeQuery.data.failedToConnect }) }));
    }
    return ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { center: "both", flex: "column", fullHeight: true, style: {
            minHeight: "300px",
        }, children: [(0, jsx_runtime_1.jsx)(text_js_1.Text, { center: true, color: "primaryText", multiline: true, children: localeQuery.data.connecting }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "lg" }), (0, jsx_runtime_1.jsx)(Spinner_js_1.Spinner, { color: "accentText", size: "lg" })] }));
}
//# sourceMappingURL=SmartWalletConnectUI.js.map