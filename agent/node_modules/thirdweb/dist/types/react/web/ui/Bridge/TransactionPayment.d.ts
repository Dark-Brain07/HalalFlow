import type { TokenWithPrices } from "../../../../bridge/types/Token.js";
import type { ThirdwebClient } from "../../../../client/client.js";
import type { SupportedFiatCurrency } from "../../../../pay/convert/type.js";
import type { PreparedTransaction } from "../../../../transaction/prepare-transaction.js";
import { type Address } from "../../../../utils/address.js";
import type { PayEmbedConnectOptions } from "../PayEmbed.js";
type TransactionPaymentProps = {
    /**
     * UI configuration and mode
     */
    transaction: PreparedTransaction;
    currency: SupportedFiatCurrency;
    buttonLabel: string | undefined;
    metadata: {
        title: string | undefined;
        description: string | undefined;
        image: string | undefined;
    };
    /**
     * ThirdwebClient for blockchain interactions
     */
    client: ThirdwebClient;
    /**
     * Called when user confirms transaction execution
     */
    onContinue: (amount: string, token: TokenWithPrices, receiverAddress: Address) => void;
    /**
     * Request to execute the transaction immediately (skips funding flow)
     */
    onExecuteTransaction: () => void;
    /**
     * Connect options for wallet connection
     */
    connectOptions?: PayEmbedConnectOptions;
    /**
     * Whether to show thirdweb branding in the widget.
     * @default true
     */
    showThirdwebBranding?: boolean;
};
export declare function TransactionPayment({ transaction, client, onContinue, onExecuteTransaction, connectOptions, currency, showThirdwebBranding, buttonLabel: _buttonLabel, metadata, }: TransactionPaymentProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=TransactionPayment.d.ts.map