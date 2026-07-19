"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionContractInteraction = exports.TransactionERC20Transfer = exports.TransactionEthTransfer = exports.BuyComplex = exports.BuyWithApproval = exports.BuyWithLongText = exports.BuySimpleDirectPayment = exports.BuySimple = exports.OnrampWithSwaps = exports.OnrampSimpleDirectPayment = exports.OnrampSimple = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const PaymentDetails_js_1 = require("../../react/web/ui/Bridge/payment-details/PaymentDetails.js");
const utils_js_1 = require("../utils.js");
const fixtures_js_1 = require("./fixtures.js");
const fiatPaymentMethod = {
    currency: "USD",
    onramp: "coinbase",
    payerWallet: fixtures_js_1.STORY_MOCK_WALLET,
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
    payerWallet: fixtures_js_1.STORY_MOCK_WALLET,
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
    payerWallet: fixtures_js_1.STORY_MOCK_WALLET,
    type: "wallet",
};
const meta = {
    args: {
        onBack: () => { },
        onConfirm: () => { },
        onError: (error) => console.error("Error:", error),
        preparedQuote: fixtures_js_1.simpleOnrampQuote,
        modeInfo: {
            mode: "fund_wallet",
        },
        currency: "USD",
        metadata: {
            title: undefined,
            description: undefined,
        },
        client: utils_js_1.storyClient,
        confirmButtonLabel: undefined,
    },
    decorators: [
        (Story) => ((0, jsx_runtime_1.jsx)(utils_js_1.ModalThemeWrapper, { children: (0, jsx_runtime_1.jsx)(Story, {}) })),
    ],
    component: PaymentDetails_js_1.PaymentDetails,
    title: "Bridge/screens/PaymentDetails",
};
exports.default = meta;
exports.OnrampSimple = {
    args: {
        paymentMethod: fiatPaymentMethod,
        preparedQuote: fixtures_js_1.simpleOnrampQuote,
    },
};
exports.OnrampSimpleDirectPayment = {
    args: {
        paymentMethod: fiatPaymentMethod,
        preparedQuote: fixtures_js_1.simpleOnrampQuote,
        ...fixtures_js_1.DIRECT_PAYMENT_UI_OPTIONS.credits,
    },
};
exports.OnrampWithSwaps = {
    args: {
        paymentMethod: fiatPaymentMethod,
        preparedQuote: fixtures_js_1.onrampWithSwapsQuote,
    },
};
exports.BuySimple = {
    args: {
        paymentMethod: ethCryptoPaymentMethod,
        preparedQuote: fixtures_js_1.simpleBuyQuote,
    },
};
exports.BuySimpleDirectPayment = {
    args: {
        paymentMethod: ethCryptoPaymentMethod,
        preparedQuote: fixtures_js_1.simpleBuyQuote,
        ...fixtures_js_1.DIRECT_PAYMENT_UI_OPTIONS.digitalArt,
    },
};
exports.BuyWithLongText = {
    args: {
        paymentMethod: ethCryptoPaymentMethod,
        preparedQuote: fixtures_js_1.longTextBuyQuote,
    },
};
exports.BuyWithApproval = {
    args: {
        paymentMethod: cryptoPaymentMethod,
        preparedQuote: fixtures_js_1.buyWithApprovalQuote,
    },
};
exports.BuyComplex = {
    args: {
        paymentMethod: ethCryptoPaymentMethod,
        preparedQuote: fixtures_js_1.complexBuyQuote,
    },
};
// ========== TRANSACTION MODE STORIES ========== //
exports.TransactionEthTransfer = {
    args: {
        paymentMethod: ethCryptoPaymentMethod,
        preparedQuote: fixtures_js_1.simpleBuyQuote,
        modeInfo: {
            mode: "transaction",
            transaction: fixtures_js_1.TRANSACTION_UI_OPTIONS.ethTransfer.transaction,
        },
        ...fixtures_js_1.TRANSACTION_UI_OPTIONS.ethTransfer,
    },
};
exports.TransactionERC20Transfer = {
    args: {
        paymentMethod: cryptoPaymentMethod,
        preparedQuote: fixtures_js_1.simpleBuyQuote,
        modeInfo: {
            mode: "transaction",
            transaction: fixtures_js_1.TRANSACTION_UI_OPTIONS.erc20Transfer.transaction,
        },
        ...fixtures_js_1.TRANSACTION_UI_OPTIONS.erc20Transfer,
    },
};
exports.TransactionContractInteraction = {
    args: {
        paymentMethod: ethCryptoPaymentMethod,
        preparedQuote: fixtures_js_1.simpleBuyQuote,
        modeInfo: {
            mode: "transaction",
            transaction: fixtures_js_1.TRANSACTION_UI_OPTIONS.contractInteraction.transaction,
        },
        ...fixtures_js_1.TRANSACTION_UI_OPTIONS.contractInteraction,
    },
};
//# sourceMappingURL=PaymentDetails.stories.js.map