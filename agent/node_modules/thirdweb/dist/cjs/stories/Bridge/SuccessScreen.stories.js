"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentId = exports.TransactionPayment = exports.ComplexPayment = exports.OnrampPayment = exports.BasicSwapSuccess = exports.Basic = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const viem_1 = require("viem");
const WindowAdapter_js_1 = require("../../react/web/adapters/WindowAdapter.js");
const SuccessScreen_js_1 = require("../../react/web/ui/Bridge/payment-success/SuccessScreen.js");
const utils_js_1 = require("../utils.js");
const fixtures_js_1 = require("./fixtures.js");
const mockBuyCompletedStatuses = JSON.parse((0, viem_1.stringify)([
    {
        destinationAmount: 100000000n,
        destinationChainId: 1,
        destinationToken: {
            address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
            chainId: 1,
            decimals: 6,
            name: "USD Coin",
            priceUsd: 1,
            symbol: "USDC",
        },
        destinationTokenAddress: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
        originAmount: 1000000000000000000n,
        originChainId: 1,
        originToken: {
            address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
            chainId: 1,
            decimals: 18,
            name: "Ethereum",
            priceUsd: 2500,
            symbol: "ETH",
        },
        originTokenAddress: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
        paymentId: "payment-12345",
        receiver: "0xa3841994009B4fEabb01ebcC62062F9E56F701CD",
        sender: "0xa3841994009B4fEabb01ebcC62062F9E56F701CD",
        status: "COMPLETED",
        transactions: [
            {
                chainId: 1,
                transactionHash: "0x1234567890abcdef1234567890abcdef12345678901234567890abcdef123456",
            },
        ],
        type: "buy",
    },
]));
const mockOnrampCompletedStatuses = JSON.parse((0, viem_1.stringify)([
    {
        purchaseData: {
            orderId: "stripe-order-abc123",
        },
        status: "COMPLETED",
        transactions: [
            {
                chainId: 137,
                transactionHash: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
            },
        ],
        type: "onramp",
    },
]));
const meta = {
    args: {
        completedStatuses: mockBuyCompletedStatuses,
        onDone: () => { },
        preparedQuote: fixtures_js_1.simpleBuyQuote,
        showContinueWithTx: false,
        windowAdapter: WindowAdapter_js_1.webWindowAdapter,
        client: utils_js_1.storyClient,
        hasPaymentId: false,
        type: "payment-success",
    },
    component: SuccessScreen_js_1.SuccessScreen,
    decorators: [
        (Story) => ((0, jsx_runtime_1.jsx)(utils_js_1.ModalThemeWrapper, { children: (0, jsx_runtime_1.jsx)(Story, {}) })),
    ],
    title: "Bridge/screens/SuccessScreen",
};
exports.default = meta;
exports.Basic = {
    args: {},
};
exports.BasicSwapSuccess = {
    args: {
        type: "swap-success",
    },
};
exports.OnrampPayment = {
    args: {
        completedStatuses: mockOnrampCompletedStatuses,
        preparedQuote: fixtures_js_1.simpleOnrampQuote,
    },
};
exports.ComplexPayment = {
    args: {
        completedStatuses: [
            ...mockOnrampCompletedStatuses,
            ...mockBuyCompletedStatuses,
        ],
        preparedQuote: fixtures_js_1.simpleOnrampQuote,
    },
};
exports.TransactionPayment = {
    args: {
        completedStatuses: mockBuyCompletedStatuses,
        preparedQuote: fixtures_js_1.simpleBuyQuote,
        showContinueWithTx: true,
    },
};
exports.PaymentId = {
    args: {
        completedStatuses: mockBuyCompletedStatuses,
        hasPaymentId: true,
        preparedQuote: fixtures_js_1.simpleBuyQuote,
        showContinueWithTx: true,
    },
};
//# sourceMappingURL=SuccessScreen.stories.js.map