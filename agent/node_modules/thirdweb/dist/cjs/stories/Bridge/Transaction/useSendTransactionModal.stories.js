"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepositAndExecuteTx = exports.BuyAndExecuteTx = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const base_js_1 = require("../../../chains/chain-definitions/base.js");
const sepolia_js_1 = require("../../../chains/chain-definitions/sepolia.js");
const useActiveAccount_js_1 = require("../../../react/core/hooks/wallets/useActiveAccount.js");
const useSendTransaction_js_1 = require("../../../react/web/hooks/transaction/useSendTransaction.js");
const ConnectButton_js_1 = require("../../../react/web/ui/ConnectWallet/ConnectButton.js");
const buttons_js_1 = require("../../../react/web/ui/components/buttons.js");
const Spinner_js_1 = require("../../../react/web/ui/components/Spinner.js");
const prepare_transaction_js_1 = require("../../../transaction/prepare-transaction.js");
const units_js_1 = require("../../../utils/units.js");
const utils_js_1 = require("../../utils.js");
const meta = {
    component: Variant,
    title: "Bridge/Transaction/useSendTransaction",
};
exports.default = meta;
const sendBase = (0, prepare_transaction_js_1.prepareTransaction)({
    chain: base_js_1.base,
    client: utils_js_1.storyClient,
    to: "0x83Dd93fA5D8343094f850f90B3fb90088C1bB425",
    value: (0, units_js_1.toWei)("100"),
});
// using an unsupported chain to popup deposit screen
const sendSepolia = (0, prepare_transaction_js_1.prepareTransaction)({
    chain: sepolia_js_1.sepolia,
    client: utils_js_1.storyClient,
    to: "0x83Dd93fA5D8343094f850f90B3fb90088C1bB425",
    value: (0, units_js_1.toWei)("100"),
});
exports.BuyAndExecuteTx = {
    args: {
        transaction: sendBase,
    },
};
exports.DepositAndExecuteTx = {
    args: {
        transaction: sendSepolia,
    },
};
function Variant(props) {
    const sendTx = (0, useSendTransaction_js_1.useSendTransaction)();
    const account = (0, useActiveAccount_js_1.useActiveAccount)();
    if (!account) {
        return (0, jsx_runtime_1.jsx)(ConnectButton_js_1.ConnectButton, { client: utils_js_1.storyClient });
    }
    return ((0, jsx_runtime_1.jsxs)(buttons_js_1.Button, { variant: "primary", gap: "xs", onClick: () => {
            sendTx.mutate(props.transaction);
        }, children: [sendTx.isPending && (0, jsx_runtime_1.jsx)(Spinner_js_1.Spinner, { size: "sm" }), "Execute"] }));
}
//# sourceMappingURL=useSendTransactionModal.stories.js.map