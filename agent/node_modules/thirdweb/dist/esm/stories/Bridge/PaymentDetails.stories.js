import { jsx as _jsx } from "react/jsx-runtime";
import { PaymentDetails } from "../../react/web/ui/Bridge/payment-details/PaymentDetails.js";
import { ModalThemeWrapper, storyClient } from "../utils.js";
import { buyWithApprovalQuote, complexBuyQuote, DIRECT_PAYMENT_UI_OPTIONS, longTextBuyQuote, onrampWithSwapsQuote, STORY_MOCK_WALLET, simpleBuyQuote, simpleOnrampQuote, TRANSACTION_UI_OPTIONS, } from "./fixtures.js";
const fiatPaymentMethod = {
    currency: "USD",
    onramp: "coinbase",
    payerWallet: STORY_MOCK_WALLET,
    type: "fiat",
};
const cryptoPaymentMethod = {
    action: "buy",
    balance: 100000000n,
    hasEnoughBalance: true,
    originToken: {
        address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
        chainId: 1,
        decimals: 6,
        iconUri: "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png",
        name: "USD Coin",
        prices: {
            USD: 1.0,
        },
        symbol: "USDC",
    },
    payerWallet: STORY_MOCK_WALLET,
    type: "wallet",
};
const ethCryptoPaymentMethod = {
    action: "buy",
    balance: 1000000000000000000n,
    hasEnoughBalance: true,
    originToken: {
        address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
        chainId: 1,
        decimals: 18,
        iconUri: "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png",
        name: "Ethereum",
        prices: {
            USD: 2500.0,
        },
        symbol: "ETH",
    },
    payerWallet: STORY_MOCK_WALLET,
    type: "wallet",
};
const meta = {
    args: {
        onBack: () => { },
        onConfirm: () => { },
        onError: (error) => console.error("Error:", error),
        preparedQuote: simpleOnrampQuote,
        modeInfo: {
            mode: "fund_wallet",
        },
        currency: "USD",
        metadata: {
            title: undefined,
            description: undefined,
        },
        client: storyClient,
        confirmButtonLabel: undefined,
    },
    decorators: [
        (Story) => (_jsx(ModalThemeWrapper, { children: _jsx(Story, {}) })),
    ],
    component: PaymentDetails,
    title: "Bridge/screens/PaymentDetails",
};
export default meta;
export const OnrampSimple = {
    args: {
        paymentMethod: fiatPaymentMethod,
        preparedQuote: simpleOnrampQuote,
    },
};
export const OnrampSimpleDirectPayment = {
    args: {
        paymentMethod: fiatPaymentMethod,
        preparedQuote: simpleOnrampQuote,
        ...DIRECT_PAYMENT_UI_OPTIONS.credits,
    },
};
export const OnrampWithSwaps = {
    args: {
        paymentMethod: fiatPaymentMethod,
        preparedQuote: onrampWithSwapsQuote,
    },
};
export const BuySimple = {
    args: {
        paymentMethod: ethCryptoPaymentMethod,
        preparedQuote: simpleBuyQuote,
    },
};
export const BuySimpleDirectPayment = {
    args: {
        paymentMethod: ethCryptoPaymentMethod,
        preparedQuote: simpleBuyQuote,
        ...DIRECT_PAYMENT_UI_OPTIONS.digitalArt,
    },
};
export const BuyWithLongText = {
    args: {
        paymentMethod: ethCryptoPaymentMethod,
        preparedQuote: longTextBuyQuote,
    },
};
export const BuyWithApproval = {
    args: {
        paymentMethod: cryptoPaymentMethod,
        preparedQuote: buyWithApprovalQuote,
    },
};
export const BuyComplex = {
    args: {
        paymentMethod: ethCryptoPaymentMethod,
        preparedQuote: complexBuyQuote,
    },
};
// ========== TRANSACTION MODE STORIES ========== //
export const TransactionEthTransfer = {
    args: {
        paymentMethod: ethCryptoPaymentMethod,
        preparedQuote: simpleBuyQuote,
        modeInfo: {
            mode: "transaction",
            transaction: TRANSACTION_UI_OPTIONS.ethTransfer.transaction,
        },
        ...TRANSACTION_UI_OPTIONS.ethTransfer,
    },
};
export const TransactionERC20Transfer = {
    args: {
        paymentMethod: cryptoPaymentMethod,
        preparedQuote: simpleBuyQuote,
        modeInfo: {
            mode: "transaction",
            transaction: TRANSACTION_UI_OPTIONS.erc20Transfer.transaction,
        },
        ...TRANSACTION_UI_OPTIONS.erc20Transfer,
    },
};
export const TransactionContractInteraction = {
    args: {
        paymentMethod: ethCryptoPaymentMethod,
        preparedQuote: simpleBuyQuote,
        modeInfo: {
            mode: "transaction",
            transaction: TRANSACTION_UI_OPTIONS.contractInteraction.transaction,
        },
        ...TRANSACTION_UI_OPTIONS.contractInteraction,
    },
};
//# sourceMappingURL=PaymentDetails.stories.js.map