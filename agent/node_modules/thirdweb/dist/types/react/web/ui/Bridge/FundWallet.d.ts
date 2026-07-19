import type { TokenWithPrices } from "../../../../bridge/types/Token.js";
import type { ThirdwebClient } from "../../../../client/client.js";
import { type SupportedFiatCurrency } from "../../../../pay/convert/type.js";
import { type Address } from "../../../../utils/address.js";
import { type Theme } from "../../../core/design-system/index.js";
import type { PayEmbedConnectOptions } from "../PayEmbed.js";
type FundWalletProps = {
    /**
     * The receiver address, defaults to the connected wallet address
     */
    receiverAddress: Address | undefined;
    /**
     * ThirdwebClient for price fetching
     */
    client: ThirdwebClient;
    /**
     * Called when continue is clicked with the resolved requirements
     */
    onContinue: (amount: string, token: TokenWithPrices, receiverAddress: Address) => void;
    /**
     * Quick buy amounts
     */
    presetOptions: [number, number, number];
    /**
     * Connect options for wallet connection
     */
    connectOptions: PayEmbedConnectOptions | undefined;
    /**
     * Whether to show thirdweb branding in the widget.
     */
    showThirdwebBranding: boolean;
    selectedToken: SelectedToken | undefined;
    setSelectedToken: (token: SelectedToken | undefined) => void;
    amountSelection: AmountSelection;
    setAmountSelection: (amountSelection: AmountSelection) => void;
    /**
     * The currency to use for the payment.
     */
    currency: SupportedFiatCurrency;
    /**
     * Override label to display on the button
     */
    buttonLabel: string | undefined;
    theme: "light" | "dark" | Theme;
    onDisconnect: (() => void) | undefined;
    /**
     * The metadata to display in the widget.
     */
    metadata: {
        title: string | undefined;
        description: string | undefined;
        image: string | undefined;
    };
    /**
     * Whether the user can edit the amount. Defaults to true.
     */
    amountEditable: boolean;
    /**
     * Whether the user can edit the token selection. Defaults to true.
     */
    tokenEditable: boolean;
};
export type SelectedToken = {
    chainId: number;
    tokenAddress: string;
} | undefined;
export type AmountSelection = {
    type: "usd";
    value: string;
} | {
    type: "token";
    value: string;
};
export declare function FundWallet(props: FundWalletProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=FundWallet.d.ts.map