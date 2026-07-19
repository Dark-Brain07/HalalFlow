import type { TokenWithPrices } from "../../bridge/types/Token.js";
import type { BridgePrepareRequest, BridgePrepareResult } from "../../react/core/hooks/useBridgePrepare.js";
import type { DirectPaymentInfo } from "../../react/web/ui/Bridge/types.js";
import { type PreparedTransaction } from "../../transaction/prepare-transaction.js";
import type { Wallet } from "../../wallets/interfaces/wallet.js";
export declare const ETH: TokenWithPrices;
export declare const USDC: TokenWithPrices;
export declare const UNI: TokenWithPrices;
export declare const STORY_MOCK_WALLET: Wallet;
export declare const simpleOnrampQuote: BridgePrepareResult;
export declare const onrampWithSwapsQuote: BridgePrepareResult;
export declare const simpleBuyQuote: BridgePrepareResult;
export declare const longTextBuyQuote: BridgePrepareResult;
export declare const buyWithApprovalQuote: BridgePrepareResult;
export declare const complexBuyQuote: BridgePrepareResult;
export declare const simpleBuyRequest: BridgePrepareRequest;
type DirectPaymentUIOptions = {
    metadata: {
        description: string | undefined;
        title: string | undefined;
        image: string | undefined;
    };
    paymentInfo: DirectPaymentInfo;
    buttonLabel: string | undefined;
};
type TransactionUIOptions = {
    metadata: {
        description: string | undefined;
        title: string | undefined;
        image: string | undefined;
    };
    transaction: PreparedTransaction;
    buttonLabel: string | undefined;
};
export declare const DIRECT_PAYMENT_UI_OPTIONS: Record<"digitalArt" | "concertTicket" | "subscription" | "sneakers" | "credits" | "customButton", DirectPaymentUIOptions>;
export declare const TRANSACTION_UI_OPTIONS: Record<"ethTransfer" | "erc20Transfer" | "contractInteraction" | "customButton", TransactionUIOptions>;
export {};
//# sourceMappingURL=fixtures.d.ts.map