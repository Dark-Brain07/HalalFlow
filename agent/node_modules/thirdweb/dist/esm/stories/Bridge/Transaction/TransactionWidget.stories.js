import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TransactionWidget, } from "../../../react/web/ui/Bridge/TransactionWidget.js";
import { createWallet } from "../../../wallets/create-wallet.js";
import { storyClient } from "../../utils.js";
import { TRANSACTION_UI_OPTIONS } from "../fixtures.js";
const meta = {
    args: {
        client: storyClient,
        onSuccess: () => { },
        onError: () => { },
        onCancel: () => { },
        currency: "USD",
    },
    component: StoryVariant,
    title: "Bridge/Transaction/TransactionWidget",
};
export default meta;
export const BaseEthTransfer = {
    args: {
        ...TRANSACTION_UI_OPTIONS.ethTransfer,
    },
};
export const BaseEthTransferWithDescription = {
    args: {
        ...TRANSACTION_UI_OPTIONS.ethTransfer,
        description: "This is a description of the transaction",
    },
};
export const BaseEthTransferWithImage = {
    args: {
        ...TRANSACTION_UI_OPTIONS.ethTransfer,
        description: "This is a description of the transaction",
        image: "https://picsum.photos/400/600",
    },
};
export const EthereumTransferCustomWallets = {
    args: {
        ...TRANSACTION_UI_OPTIONS.ethTransfer,
        connectOptions: {
            wallets: [createWallet("io.metamask"), createWallet("me.rainbow")],
        },
    },
};
export const ERC20TokenTransfer = {
    args: {
        ...TRANSACTION_UI_OPTIONS.erc20Transfer,
    },
};
export const ContractInteraction = {
    args: {
        ...TRANSACTION_UI_OPTIONS.contractInteraction,
    },
};
export const CustomButtonLabel = {
    args: {
        ...TRANSACTION_UI_OPTIONS.customButton,
    },
};
function StoryVariant(props) {
    return (_jsxs("div", { style: {
            display: "flex",
            flexDirection: "column",
            gap: "40px",
            alignItems: "center",
        }, children: [_jsx(TransactionWidget, { ...props, theme: "dark" }), _jsx(TransactionWidget, { ...props, theme: "light" })] }));
}
//# sourceMappingURL=TransactionWidget.stories.js.map