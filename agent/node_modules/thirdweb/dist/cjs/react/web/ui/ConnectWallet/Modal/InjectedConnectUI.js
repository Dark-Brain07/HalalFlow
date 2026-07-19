"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectedConnectUI = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const wait_js_1 = require("../../../../core/utils/wait.js");
const ConnectingScreen_js_1 = require("../../../wallets/shared/ConnectingScreen.js");
/**
 * @internal
 */
const InjectedConnectUI = (props) => {
    const { wallet, done } = props;
    const [errorConnecting, setErrorConnecting] = (0, react_1.useState)(false);
    const locale = props.locale;
    const connectToExtension = (0, react_1.useCallback)(async () => {
        try {
            connectPrompted.current = true;
            setErrorConnecting(false);
            await (0, wait_js_1.wait)(1000);
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
    const connectPrompted = (0, react_1.useRef)(false);
    (0, react_1.useEffect)(() => {
        if (connectPrompted.current) {
            return;
        }
        connectToExtension();
    }, [connectToExtension]);
    return ((0, jsx_runtime_1.jsx)(ConnectingScreen_js_1.ConnectingScreen, { client: props.client, errorConnecting: errorConnecting, locale: {
            failed: locale.connectionScreen.failed,
            getStartedLink: locale.getStartedLink,
            inProgress: locale.connectionScreen.inProgress,
            instruction: locale.connectionScreen.instruction,
            tryAgain: locale.connectionScreen.retry,
        }, onBack: props.onBack, onGetStarted: props.onGetStarted, onRetry: () => {
            connectToExtension();
        }, size: props.size, walletId: props.wallet.id, walletName: props.walletName }));
};
exports.InjectedConnectUI = InjectedConnectUI;
//# sourceMappingURL=InjectedConnectUI.js.map