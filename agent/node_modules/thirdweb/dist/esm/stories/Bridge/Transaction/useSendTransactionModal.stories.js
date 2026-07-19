import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { base } from "../../../chains/chain-definitions/base.js";
import { sepolia } from "../../../chains/chain-definitions/sepolia.js";
import { useActiveAccount } from "../../../react/core/hooks/wallets/useActiveAccount.js";
import { useSendTransaction } from "../../../react/web/hooks/transaction/useSendTransaction.js";
import { ConnectButton } from "../../../react/web/ui/ConnectWallet/ConnectButton.js";
import { Button } from "../../../react/web/ui/components/buttons.js";
import { Spinner } from "../../../react/web/ui/components/Spinner.js";
import { prepareTransaction, } from "../../../transaction/prepare-transaction.js";
import { toWei } from "../../../utils/units.js";
import { storyClient } from "../../utils.js";
const meta = {
    component: Variant,
    title: "Bridge/Transaction/useSendTransaction",
};
export default meta;
const sendBase = prepareTransaction({
    chain: base,
    client: storyClient,
    to: "0x83Dd93fA5D8343094f850f90B3fb90088C1bB425",
    value: toWei("100"),
});
// using an unsupported chain to popup deposit screen
const sendSepolia = prepareTransaction({
    chain: sepolia,
    client: storyClient,
    to: "0x83Dd93fA5D8343094f850f90B3fb90088C1bB425",
    value: toWei("100"),
});
export const BuyAndExecuteTx = {
    args: {
        transaction: sendBase,
    },
};
export const DepositAndExecuteTx = {
    args: {
        transaction: sendSepolia,
    },
};
function Variant(props) {
    const sendTx = useSendTransaction();
    const account = useActiveAccount();
    if (!account) {
        return _jsx(ConnectButton, { client: storyClient });
    }
    return (_jsxs(Button, { variant: "primary", gap: "xs", onClick: () => {
            sendTx.mutate(props.transaction);
        }, children: [sendTx.isPending && _jsx(Spinner, { size: "sm" }), "Execute"] }));
}
//# sourceMappingURL=useSendTransactionModal.stories.js.map