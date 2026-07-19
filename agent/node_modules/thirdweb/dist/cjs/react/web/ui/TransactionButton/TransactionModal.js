"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionModal = TransactionModal;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_query_1 = require("@tanstack/react-query");
const react_1 = require("react");
const pay_js_1 = require("../../../../analytics/track/pay.js");
const resolve_promised_value_js_1 = require("../../../../utils/promise/resolve-promised-value.js");
const CustomThemeProvider_js_1 = require("../../../core/design-system/CustomThemeProvider.js");
const useActiveAccount_js_1 = require("../../../core/hooks/wallets/useActiveAccount.js");
const useActiveWallet_js_1 = require("../../../core/hooks/wallets/useActiveWallet.js");
const WindowAdapter_js_1 = require("../../adapters/WindowAdapter.js");
const LoadingScreen_js_1 = require("../../wallets/shared/LoadingScreen.js");
const TransactionWidget_js_1 = require("../Bridge/TransactionWidget.js");
const getConnectLocale_js_1 = require("../ConnectWallet/locale/getConnectLocale.js");
const Modal_js_1 = require("../components/Modal.js");
const DepositScreen_js_1 = require("./DepositScreen.js");
const ExecutingScreen_js_1 = require("./ExecutingScreen.js");
function TransactionModal(props) {
    const account = (0, useActiveAccount_js_1.useActiveAccount)();
    const wallet = (0, useActiveWallet_js_1.useActiveWallet)();
    (0, react_query_1.useQuery)({
        enabled: !!wallet && !!account,
        queryFn: async () => {
            if (!account || !wallet) {
                throw new Error(); // never happens, because enabled is false
            }
            (0, pay_js_1.trackPayEvent)({
                client: props.client,
                event: props.modalMode === "buy"
                    ? "open_pay_transaction_modal"
                    : "open_pay_deposit_modal",
                toChainId: props.tx.chain.id,
                toToken: props.tx.erc20Value
                    ? (await (0, resolve_promised_value_js_1.resolvePromisedValue)(props.tx.erc20Value))?.tokenAddress
                    : undefined,
                walletAddress: account.address,
                walletType: wallet.id,
            });
            return null;
        },
        queryKey: ["transaction-modal-event", props.txId],
    });
    return ((0, jsx_runtime_1.jsx)(CustomThemeProvider_js_1.CustomThemeProvider, { theme: props.theme, children: (0, jsx_runtime_1.jsx)(Modal_js_1.Modal, { className: "tw-modal__view-transaction", title: "View Transaction", open: true, setOpen: (_open) => {
                if (!_open) {
                    props.onClose();
                }
            }, size: "compact", children: (0, jsx_runtime_1.jsx)(TransactionModalContent, { ...props }) }) }));
}
function TransactionModalContent(props) {
    if (props.modalMode === "deposit") {
        return (0, jsx_runtime_1.jsx)(DepositAndExecuteTx, { ...props });
    }
    return ((0, jsx_runtime_1.jsx)(TransactionWidget_js_1.TransactionWidgetContentWrapper, { client: props.client, country: props.country, currency: props.currency, transaction: props.tx, onCancel: props.onClose, locale: props.localeId, onSuccess: (data) => {
            props.onTxSent(data);
        }, title: props.payOptions.metadata?.name, description: props.payOptions.metadata?.description, image: props.payOptions.metadata?.image, paymentMethods: props.payOptions.buyWithCrypto === false
            ? ["card"]
            : props.payOptions.buyWithFiat === false
                ? ["crypto"]
                : ["crypto", "card"], showThirdwebBranding: props.payOptions.showThirdwebBranding, supportedTokens: props.supportedTokens, onError: undefined, paymentLinkId: undefined, buttonLabel: undefined, purchaseData: undefined }));
}
function DepositAndExecuteTx(props) {
    const localeQuery = (0, getConnectLocale_js_1.useConnectLocale)(props.localeId);
    const [screen, setScreen] = (0, react_1.useState)("deposit");
    if (!localeQuery.data) {
        return (0, jsx_runtime_1.jsx)(LoadingScreen_js_1.LoadingScreen, {});
    }
    if (screen === "execute-tx") {
        return ((0, jsx_runtime_1.jsx)(ExecutingScreen_js_1.ExecutingTxScreen, { onBack: () => {
                setScreen("deposit");
            }, closeModal: props.onClose, onTxSent: props.onTxSent, tx: props.tx, windowAdapter: WindowAdapter_js_1.webWindowAdapter }));
    }
    if (screen === "deposit") {
        return ((0, jsx_runtime_1.jsx)(DepositScreen_js_1.DepositScreen, { client: props.client, connectLocale: localeQuery.data, onDone: () => {
                setScreen("execute-tx");
            }, tx: props.tx }));
    }
    return null;
}
//# sourceMappingURL=TransactionModal.js.map