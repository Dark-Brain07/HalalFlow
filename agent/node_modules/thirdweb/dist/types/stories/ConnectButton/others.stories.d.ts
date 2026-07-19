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
export declare const WideModal: Story;
export declare const CompactModal: Story;
export default meta;
//# sourceMappingURL=others.stories.d.ts.map