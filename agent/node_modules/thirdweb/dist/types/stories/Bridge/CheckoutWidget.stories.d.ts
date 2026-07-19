import type { StoryObj } from "@storybook/react";
import { type CheckoutWidgetProps } from "../../react/web/ui/Bridge/CheckoutWidget.js";
declare const meta: {
    args: {
        client: import("../../client/client.js").ThirdwebClient;
        onCancel: () => void;
        onError: () => void;
        onSuccess: () => void;
        currency: "USD";
    };
    component: typeof StoryVariant;
    title: string;
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const DigitalArt: Story;
export declare const DigitalArtJPCurrency: Story;
export declare const ConcertTicket: Story;
export declare const SubscriptionService: Story;
export declare const PhysicalProduct: Story;
export declare const NoImage: Story;
export declare const CustomButtonLabel: Story;
export declare const SmallAmount: Story;
declare function StoryVariant(props: CheckoutWidgetProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=CheckoutWidget.stories.d.ts.map