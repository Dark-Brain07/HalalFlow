import { ConnectButton } from "../../react/web/ui/ConnectWallet/ConnectButton.js";
import { storyClient } from "../utils.js";
const meta = {
    args: {
        client: storyClient,
    },
    component: ConnectButton,
    parameters: {
        layout: "centered",
    },
    title: "Connect/ConnectButton/hide buttons",
};
export const Default = {
    args: {},
};
export const HideSend = {
    args: {
        detailsModal: {
            hideSendFunds: true,
        },
    },
};
export const HideReceive = {
    args: {
        detailsModal: {
            hideReceiveFunds: true,
        },
    },
};
export const HideBuy = {
    args: {
        detailsModal: {
            hideBuyFunds: true,
        },
    },
};
export const HideSendReceive = {
    args: {
        detailsModal: {
            hideReceiveFunds: true,
            hideSendFunds: true,
        },
    },
};
export const HideSendBuy = {
    args: {
        detailsModal: {
            hideBuyFunds: true,
            hideSendFunds: true,
        },
    },
};
export const HideReceiveBuy = {
    args: {
        detailsModal: {
            hideBuyFunds: true,
            hideReceiveFunds: true,
        },
    },
};
export const HideSendReceiveBuy = {
    args: {
        detailsModal: {
            hideBuyFunds: true,
            hideReceiveFunds: true,
            hideSendFunds: true,
        },
    },
};
export default meta;
//# sourceMappingURL=hideButtons.stories.js.map