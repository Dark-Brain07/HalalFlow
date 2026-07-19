"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomButtonLabel = exports.ContractInteraction = exports.ERC20TokenTransfer = exports.EthereumTransferCustomWallets = exports.BaseEthTransferWithImage = exports.BaseEthTransferWithDescription = exports.BaseEthTransfer = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const TransactionWidget_js_1 = require("../../../react/web/ui/Bridge/TransactionWidget.js");
const create_wallet_js_1 = require("../../../wallets/create-wallet.js");
const utils_js_1 = require("../../utils.js");
const fixtures_js_1 = require("../fixtures.js");
const meta = {
    args: {
        client: utils_js_1.storyClient,
        onSuccess: () => { },
        onError: () => { },
        onCancel: () => { },
        currency: "USD",
    },
    component: StoryVariant,
    title: "Bridge/Transaction/TransactionWidget",
};
exports.default = meta;
exports.BaseEthTransfer = {
    args: {
        ...fixtures_js_1.TRANSACTION_UI_OPTIONS.ethTransfer,
    },
};
exports.BaseEthTransferWithDescription = {
    args: {
        ...fixtures_js_1.TRANSACTION_UI_OPTIONS.ethTransfer,
        description: "This is a description of the transaction",
    },
};
exports.BaseEthTransferWithImage = {
    args: {
        ...fixtures_js_1.TRANSACTION_UI_OPTIONS.ethTransfer,
        description: "This is a description of the transaction",
        image: "https://picsum.photos/400/600",
    },
};
exports.EthereumTransferCustomWallets = {
    args: {
        ...fixtures_js_1.TRANSACTION_UI_OPTIONS.ethTransfer,
        connectOptions: {
            wallets: [(0, create_wallet_js_1.createWallet)("io.metamask"), (0, create_wallet_js_1.createWallet)("me.rainbow")],
        },
    },
};
exports.ERC20TokenTransfer = {
    args: {
        ...fixtures_js_1.TRANSACTION_UI_OPTIONS.erc20Transfer,
    },
};
exports.ContractInteraction = {
    args: {
        ...fixtures_js_1.TRANSACTION_UI_OPTIONS.contractInteraction,
    },
};
exports.CustomButtonLabel = {
    args: {
        ...fixtures_js_1.TRANSACTION_UI_OPTIONS.customButton,
    },
};
function StoryVariant(props) {
    return ((0, jsx_runtime_1.jsxs)("div", { style: {
            display: "flex",
            flexDirection: "column",
            gap: "40px",
            alignItems: "center",
        }, children: [(0, jsx_runtime_1.jsx)(TransactionWidget_js_1.TransactionWidget, { ...props, theme: "dark" }), (0, jsx_runtime_1.jsx)(TransactionWidget_js_1.TransactionWidget, { ...props, theme: "light" })] }));
}
//# sourceMappingURL=TransactionWidget.stories.js.map