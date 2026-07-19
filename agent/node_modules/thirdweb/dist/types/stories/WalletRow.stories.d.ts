import type { StoryObj } from "@storybook/react";
import type { ThirdwebClient } from "../client/client.js";
import type { Theme } from "../react/core/design-system/index.js";
interface WalletRowWithThemeProps {
    client: ThirdwebClient;
    address: string;
    iconSize?: "xs" | "sm" | "md" | "lg" | "xl";
    textSize?: "xs" | "sm" | "md" | "lg" | "xl";
    label?: string;
    theme: "light" | "dark" | Theme;
}
declare const meta: {
    args: {
        address: string;
        client: ThirdwebClient;
        theme: "dark";
    };
    argTypes: {
        address: {
            control: "text";
            description: string;
        };
        iconSize: {
            control: "select";
            description: string;
            options: string[];
        };
        label: {
            control: "text";
            description: string;
        };
        textSize: {
            control: "select";
            description: string;
            options: string[];
        };
        theme: {
            control: "select";
            description: string;
            options: string[];
        };
    };
    component: (props: WalletRowWithThemeProps) => import("react/jsx-runtime").JSX.Element;
    parameters: {
        docs: {
            description: {
                component: string;
            };
        };
        layout: string;
    };
    tags: string[];
    title: string;
};
type Story = StoryObj<typeof meta>;
export declare const Light: Story;
export declare const Dark: Story;
export declare const WithLabel: Story;
export declare const LargeSize: Story;
export declare const SmallSize: Story;
export declare const DifferentAddresses: Story;
export default meta;
//# sourceMappingURL=WalletRow.stories.d.ts.map