import type { Meta, StoryObj } from "@storybook/react";
import { type TransactionWidgetProps } from "../../../react/web/ui/Bridge/TransactionWidget.js";
declare const meta: Meta<typeof StoryVariant>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const BaseEthTransfer: Story;
export declare const BaseEthTransferWithDescription: Story;
export declare const BaseEthTransferWithImage: Story;
export declare const EthereumTransferCustomWallets: Story;
export declare const ERC20TokenTransfer: Story;
export declare const ContractInteraction: Story;
export declare const CustomButtonLabel: Story;
declare function StoryVariant(props: TransactionWidgetProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=TransactionWidget.stories.d.ts.map