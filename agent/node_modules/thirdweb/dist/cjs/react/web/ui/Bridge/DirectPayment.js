"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectPayment = DirectPayment;
const jsx_runtime_1 = require("react/jsx-runtime");
const utils_js_1 = require("../../../../chains/utils.js");
const PoweredByTW_js_1 = require("../ConnectWallet/PoweredByTW.js");
const FiatValue_js_1 = require("../ConnectWallet/screens/Buy/swap/FiatValue.js");
const basic_js_1 = require("../components/basic.js");
const buttons_js_1 = require("../components/buttons.js");
const ChainName_js_1 = require("../components/ChainName.js");
const Spacer_js_1 = require("../components/Spacer.js");
const text_js_1 = require("../components/text.js");
const TokenAndChain_js_1 = require("./common/TokenAndChain.js");
const WithHeader_js_1 = require("./common/WithHeader.js");
function DirectPayment({ paymentInfo, metadata, client, onContinue, showThirdwebBranding = true, buttonLabel, currency, }) {
    const chain = (0, utils_js_1.defineChain)(paymentInfo.token.chainId);
    const handleContinue = () => {
        onContinue(paymentInfo.amount, paymentInfo.token, paymentInfo.sellerAddress);
    };
    return ((0, jsx_runtime_1.jsxs)(WithHeader_js_1.WithHeader, { client: client, title: metadata.title || "Direct Payment", description: metadata.description, image: metadata.image, children: [(0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "row", gap: "3xs", style: {
                    justifyContent: "space-between",
                    alignItems: "end",
                }, children: [(0, jsx_runtime_1.jsx)(FiatValue_js_1.FiatValue, { currency: currency, chain: chain, client: client, color: "primaryText", size: "xl", token: paymentInfo.token, tokenAmount: paymentInfo.amount, weight: 500 }), (0, jsx_runtime_1.jsx)(basic_js_1.Container, { flex: "row", gap: "3xs", children: (0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "secondaryText", size: "xs", style: {
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                textTransform: "uppercase",
                                letterSpacing: "0.07em",
                                opacity: 0.7,
                            }, children: "One-time payment" }) })] }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "md+" }), (0, jsx_runtime_1.jsx)(basic_js_1.Line, { dashed: true }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "md+" }), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "row", style: {
                    alignItems: "center",
                    justifyContent: "space-between",
                }, children: [(0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "secondaryText", size: "sm", children: "Price" }), (0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "primaryText", size: "sm", children: `${paymentInfo.amount} ${paymentInfo.token.symbol}` })] }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "sm" }), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "row", style: {
                    alignItems: "center",
                    justifyContent: "space-between",
                }, children: [(0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "secondaryText", size: "sm", children: "Network" }), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { center: "y", flex: "row", gap: "3xs", children: [(0, jsx_runtime_1.jsx)(TokenAndChain_js_1.ChainIcon, { chain: chain, client: client, size: "xs" }), (0, jsx_runtime_1.jsx)(ChainName_js_1.ChainName, { chain: chain, client: client, color: "primaryText", short: true, size: "sm" })] })] }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "md+" }), (0, jsx_runtime_1.jsx)(basic_js_1.Line, { dashed: true }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "md+" }), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { flex: "column", children: [(0, jsx_runtime_1.jsx)(buttons_js_1.Button, { fullWidth: true, onClick: handleContinue, variant: "primary", children: buttonLabel || "Buy Now" }), showThirdwebBranding ? ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "md+" }), (0, jsx_runtime_1.jsx)(PoweredByTW_js_1.PoweredByThirdweb, {})] })) : null, (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "md+" })] })] }));
}
//# sourceMappingURL=DirectPayment.js.map