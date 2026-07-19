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
export declare const Dark: Story;
export declare const Light: Story;
export declare const Custom: Story;
export default meta;
//# sourceMappingURL=themes.stories.d.ts.map