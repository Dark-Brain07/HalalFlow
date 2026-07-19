import type { StoryObj } from "@storybook/react";
import type { Token } from "../bridge/index.js";
import type { Chain } from "../chains/types.js";
import type { ThirdwebClient } from "../client/client.js";
import type { Theme } from "../react/core/design-system/index.js";
interface TokenBalanceRowWithThemeProps {
    client: ThirdwebClient;
    token: Token;
    chain: Chain;
    amount: string;
    onClick: (token: Token) => void;
    style?: React.CSSProperties;
    theme: "light" | "dark" | Theme;
}
declare const meta: {
    args: {
        amount: string;
        chain: Readonly<import("../chains/types.js").ChainOptions & {
            rpc: string;
        }>;
        client: ThirdwebClient;
        onClick: (_token: Token) => void;
        theme: "dark";
        token: import("../bridge/index.js").TokenWithPrices;
    };
    argTypes: {
        onClick: {
            action: string;
            description: string;
        };
        theme: {
            control: "select";
            description: string;
            options: string[];
        };
    };
    component: (props: TokenBalanceRowWithThemeProps) => import("react/jsx-runtime").JSX.Element;
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
export declare const TokenList: Story;
export declare const DarkTokenList: Story;
export default meta;
//# sourceMappingURL=TokenBalanceRow.stories.d.ts.map