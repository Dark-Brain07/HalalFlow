"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmallAmount = exports.CustomButtonLabel = exports.NoImage = exports.PhysicalProduct = exports.SubscriptionService = exports.ConcertTicket = exports.DigitalArtJPCurrency = exports.DigitalArt = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const polygon_js_1 = require("../../chains/chain-definitions/polygon.js");
const utils_js_1 = require("../../chains/utils.js");
const CheckoutWidget_js_1 = require("../../react/web/ui/Bridge/CheckoutWidget.js");
const utils_js_2 = require("../utils.js");
const fixtures_js_1 = require("./fixtures.js");
const meta = {
    args: {
        client: utils_js_2.storyClient,
        onCancel: () => { },
        onError: () => { },
        onSuccess: () => { },
        currency: "USD",
    },
    component: StoryVariant,
    title: "Bridge/Checkout/CheckoutWidget",
};
exports.default = meta;
exports.DigitalArt = {
    args: {
        amount: fixtures_js_1.DIRECT_PAYMENT_UI_OPTIONS.digitalArt.paymentInfo.amount,
        chain: (0, utils_js_1.defineChain)(fixtures_js_1.DIRECT_PAYMENT_UI_OPTIONS.digitalArt.paymentInfo.token.chainId),
        seller: fixtures_js_1.DIRECT_PAYMENT_UI_OPTIONS.digitalArt.paymentInfo.sellerAddress,
        name: fixtures_js_1.DIRECT_PAYMENT_UI_OPTIONS.digitalArt.metadata?.title,
        description: fixtures_js_1.DIRECT_PAYMENT_UI_OPTIONS.digitalArt.metadata?.description,
        image: fixtures_js_1.DIRECT_PAYMENT_UI_OPTIONS.digitalArt.metadata?.image,
        buttonLabel: fixtures_js_1.DIRECT_PAYMENT_UI_OPTIONS.digitalArt.buttonLabel,
    },
};
exports.DigitalArtJPCurrency = {
    args: {
        amount: fixtures_js_1.DIRECT_PAYMENT_UI_OPTIONS.digitalArt.paymentInfo.amount,
        chain: (0, utils_js_1.defineChain)(fixtures_js_1.DIRECT_PAYMENT_UI_OPTIONS.digitalArt.paymentInfo.token.chainId),
        currency: "JPY",
        seller: fixtures_js_1.DIRECT_PAYMENT_UI_OPTIONS.digitalArt.paymentInfo.sellerAddress,
        name: fixtures_js_1.DIRECT_PAYMENT_UI_OPTIONS.digitalArt.metadata?.title,
        description: fixtures_js_1.DIRECT_PAYMENT_UI_OPTIONS.digitalArt.metadata?.description,
        image: fixtures_js_1.DIRECT_PAYMENT_UI_OPTIONS.digitalArt.metadata?.image,
        buttonLabel: fixtures_js_1.DIRECT_PAYMENT_UI_OPTIONS.digitalArt.buttonLabel,
    },
};
exports.ConcertTicket = {
    args: {
        amount: fixtures_js_1.DIRECT_PAYMENT_UI_OPTIONS.concertTicket.paymentInfo.amount,
        chain: (0, utils_js_1.defineChain)(fixtures_js_1.DIRECT_PAYMENT_UI_OPTIONS.concertTicket.paymentInfo.token.chainId),
        seller: fixtures_js_1.DIRECT_PAYMENT_UI_OPTIONS.concertTicket.paymentInfo.sellerAddress,
        name: fixtures_js_1.DIRECT_PAYMENT_UI_OPTIONS.concertTicket.metadata?.title,
        description: fixtures_js_1.DIRECT_PAYMENT_UI_OPTIONS.concertTicket.metadata?.description,
        image: fixtures_js_1.DIRECT_PAYMENT_UI_OPTIONS.concertTicket.metadata?.image,
        buttonLabel: fixtures_js_1.DIRECT_PAYMENT_UI_OPTIONS.concertTicket.buttonLabel,
    },
};
exports.SubscriptionService = {
    args: {
        amount: fixtures_js_1.DIRECT_PAYMENT_UI_OPTIONS.subscription.paymentInfo.amount,
        chain: (0, utils_js_1.defineChain)(fixtures_js_1.DIRECT_PAYMENT_UI_OPTIONS.subscription.paymentInfo.token.chainId),
        seller: fixtures_js_1.DIRECT_PAYMENT_UI_OPTIONS.subscription.paymentInfo.sellerAddress,
        name: fixtures_js_1.DIRECT_PAYMENT_UI_OPTIONS.subscription.metadata?.title,
        description: fixtures_js_1.DIRECT_PAYMENT_UI_OPTIONS.subscription.metadata?.description,
        image: fixtures_js_1.DIRECT_PAYMENT_UI_OPTIONS.subscription.metadata?.image,
        buttonLabel: fixtures_js_1.DIRECT_PAYMENT_UI_OPTIONS.subscription.buttonLabel,
    },
};
exports.PhysicalProduct = {
    args: {
        amount: fixtures_js_1.DIRECT_PAYMENT_UI_OPTIONS.sneakers.paymentInfo.amount,
        chain: (0, utils_js_1.defineChain)(fixtures_js_1.DIRECT_PAYMENT_UI_OPTIONS.sneakers.paymentInfo.token.chainId),
        seller: fixtures_js_1.DIRECT_PAYMENT_UI_OPTIONS.sneakers.paymentInfo.sellerAddress,
        name: fixtures_js_1.DIRECT_PAYMENT_UI_OPTIONS.sneakers.metadata?.title,
        description: fixtures_js_1.DIRECT_PAYMENT_UI_OPTIONS.sneakers.metadata?.description,
        image: fixtures_js_1.DIRECT_PAYMENT_UI_OPTIONS.sneakers.metadata?.image,
        buttonLabel: fixtures_js_1.DIRECT_PAYMENT_UI_OPTIONS.sneakers.buttonLabel,
    },
};
exports.NoImage = {
    args: {
        amount: fixtures_js_1.DIRECT_PAYMENT_UI_OPTIONS.credits.paymentInfo.amount,
        chain: (0, utils_js_1.defineChain)(fixtures_js_1.DIRECT_PAYMENT_UI_OPTIONS.credits.paymentInfo.token.chainId),
        seller: fixtures_js_1.DIRECT_PAYMENT_UI_OPTIONS.credits.paymentInfo.sellerAddress,
        name: fixtures_js_1.DIRECT_PAYMENT_UI_OPTIONS.credits.metadata?.title,
        description: fixtures_js_1.DIRECT_PAYMENT_UI_OPTIONS.credits.metadata?.description,
        image: fixtures_js_1.DIRECT_PAYMENT_UI_OPTIONS.credits.metadata?.image,
        buttonLabel: fixtures_js_1.DIRECT_PAYMENT_UI_OPTIONS.credits.buttonLabel,
    },
};
exports.CustomButtonLabel = {
    args: {
        amount: fixtures_js_1.DIRECT_PAYMENT_UI_OPTIONS.customButton.paymentInfo.amount,
        chain: (0, utils_js_1.defineChain)(fixtures_js_1.DIRECT_PAYMENT_UI_OPTIONS.customButton.paymentInfo.token.chainId),
        seller: fixtures_js_1.DIRECT_PAYMENT_UI_OPTIONS.customButton.paymentInfo.sellerAddress,
        name: fixtures_js_1.DIRECT_PAYMENT_UI_OPTIONS.customButton.metadata?.title,
        description: fixtures_js_1.DIRECT_PAYMENT_UI_OPTIONS.customButton.metadata?.description,
        image: fixtures_js_1.DIRECT_PAYMENT_UI_OPTIONS.customButton.metadata?.image,
        buttonLabel: fixtures_js_1.DIRECT_PAYMENT_UI_OPTIONS.customButton.buttonLabel,
    },
};
exports.SmallAmount = {
    args: {
        amount: "0.01",
        chain: polygon_js_1.polygon,
        seller: "0x83Dd93fA5D8343094f850f90B3fb90088C1bB425",
    },
};
function StoryVariant(props) {
    return ((0, jsx_runtime_1.jsxs)("div", { style: {
            display: "flex",
            flexDirection: "column",
            gap: "40px",
            alignItems: "center",
        }, children: [(0, jsx_runtime_1.jsx)(CheckoutWidget_js_1.CheckoutWidget, { ...props, theme: "dark" }), (0, jsx_runtime_1.jsx)(CheckoutWidget_js_1.CheckoutWidget, { ...props, theme: "light" })] }));
}
//# sourceMappingURL=CheckoutWidget.stories.js.map