import { darkTheme } from "../../react/core/design-system/index.js";
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
    title: "Connect/ConnectButton/themes",
};
export const Dark = {
    args: {
        theme: "dark",
    },
};
export const Light = {
    args: {
        theme: "light",
    },
};
export const Custom = {
    args: {
        theme: darkTheme({
            colors: {
                modalBg: "#0c0a2e",
                borderColor: "#2f2987",
            },
        }),
    },
};
export default meta;
//# sourceMappingURL=themes.stories.js.map