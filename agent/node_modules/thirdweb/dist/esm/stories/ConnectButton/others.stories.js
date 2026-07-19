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
    title: "Connect/ConnectButton/others",
};
export const WideModal = {
    args: {
        connectModal: {
            size: "wide",
        },
    },
};
export const CompactModal = {
    args: {
        connectModal: {
            size: "compact",
        },
    },
};
export default meta;
//# sourceMappingURL=others.stories.js.map