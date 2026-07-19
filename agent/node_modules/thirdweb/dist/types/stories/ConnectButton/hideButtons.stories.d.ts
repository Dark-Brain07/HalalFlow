import type { StoryObj } from "@storybook/react-vite";
import { ConnectButton } from "../../react/web/ui/ConnectWallet/ConnectButton.js";
declare const meta: {
    args: {
        client: import("../../client/client.js").ThirdwebClient;
    };
    component: typeof ConnectButton;
    parameters: {
        layout: string;
    };
    title: string;
};
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const HideSend: Story;
export declare const HideReceive: Story;
export declare const HideBuy: Story;
export declare const HideSendReceive: Story;
export declare const HideSendBuy: Story;
export declare const HideReceiveBuy: Story;
export declare const HideSendReceiveBuy: Story;
export default meta;
//# sourceMappingURL=hideButtons.stories.d.ts.map