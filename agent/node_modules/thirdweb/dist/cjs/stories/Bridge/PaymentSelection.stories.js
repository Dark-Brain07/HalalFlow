"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnlyFiatMethodEnabled = exports.OnlyCryptoMethodEnabled = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const PaymentSelection_js_1 = require("../../react/web/ui/Bridge/payment-selection/PaymentSelection.js");
const en_js_1 = require("../../react/web/ui/ConnectWallet/locale/en.js");
const utils_js_1 = require("../utils.js");
const fixtures_js_1 = require("./fixtures.js");
const meta = {
    args: {
        client: utils_js_1.storyClient,
        onBack: () => {
            alert("Back");
        },
        connectLocale: en_js_1.default,
        destinationAmount: "1",
        destinationToken: fixtures_js_1.USDC,
        onError: (error) => console.error("Error:", error),
        onPaymentMethodSelected: () => { },
        country: "US",
        connectOptions: undefined,
        currency: "USD",
        paymentMethods: ["crypto", "card"],
        receiverAddress: "0x0000000000000000000000000000000000000000",
        feePayer: undefined,
        supportedTokens: undefined,
    },
    decorators: [
        (Story) => ((0, jsx_runtime_1.jsx)(utils_js_1.ModalThemeWrapper, { children: (0, jsx_runtime_1.jsx)(Story, {}) })),
    ],
    component: PaymentSelection_js_1.PaymentSelection,
    title: "Bridge/screens/PaymentSelection",
};
exports.default = meta;
exports.OnlyCryptoMethodEnabled = {
    args: {
        paymentMethods: ["crypto"],
    },
};
exports.OnlyFiatMethodEnabled = {
    args: {
        paymentMethods: ["card"],
    },
};
//# sourceMappingURL=PaymentSelection.stories.js.map