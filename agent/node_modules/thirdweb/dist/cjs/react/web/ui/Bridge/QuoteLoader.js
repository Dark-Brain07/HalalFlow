"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuoteLoader = QuoteLoader;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const units_js_1 = require("../../../../utils/units.js");
const useBridgePrepare_js_1 = require("../../../core/hooks/useBridgePrepare.js");
const basic_js_1 = require("../components/basic.js");
const Spacer_js_1 = require("../components/Spacer.js");
const Spinner_js_1 = require("../components/Spinner.js");
const text_js_1 = require("../components/text.js");
function QuoteLoader({ destinationToken, paymentMethod, amount, sender, receiver, client, onQuoteReceived, onError, purchaseData, paymentLinkId, feePayer, mode: _mode, }) {
    const request = getBridgeParams({
        amount,
        client,
        destinationToken,
        feePayer,
        paymentLinkId,
        paymentMethod,
        purchaseData,
        receiver,
        sender,
    });
    const prepareQuery = (0, useBridgePrepare_js_1.useBridgePrepare)(request);
    // Handle successful quote
    (0, react_1.useEffect)(() => {
        if (prepareQuery.data) {
            onQuoteReceived(prepareQuery.data, request);
        }
    }, [prepareQuery.data, onQuoteReceived, request]);
    // Handle errors
    (0, react_1.useEffect)(() => {
        if (prepareQuery.error) {
            onError(prepareQuery.error);
        }
    }, [prepareQuery.error, onError]);
    return ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { center: "both", flex: "column", fullHeight: true, p: "lg", style: { minHeight: "350px" }, children: [(0, jsx_runtime_1.jsx)(Spinner_js_1.Spinner, { color: "secondaryText", size: "xl" }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "md" }), (0, jsx_runtime_1.jsx)(text_js_1.Text, { center: true, color: "primaryText", size: "lg", style: { fontWeight: 600 }, children: "Finding the best route" }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "sm" }), (0, jsx_runtime_1.jsx)(text_js_1.Text, { center: true, color: "secondaryText", size: "sm", children: "We're searching for the most efficient path for this payment." })] }));
}
function getBridgeParams(args) {
    const { paymentMethod, amount, destinationToken, receiver, client, sender } = args;
    switch (paymentMethod.type) {
        case "fiat":
            return {
                amount: (0, units_js_1.toUnits)(amount, destinationToken.decimals),
                chainId: destinationToken.chainId,
                client,
                currency: paymentMethod.currency,
                enabled: !!(destinationToken && amount && client),
                onramp: paymentMethod.onramp || "coinbase",
                paymentLinkId: args.paymentLinkId,
                purchaseData: args.purchaseData,
                receiver,
                sender, // always onramp to native token
                tokenAddress: destinationToken.address,
                type: "onramp",
            };
        case "wallet":
            // if the origin token is the same as the destination token, use transfer type
            if (paymentMethod.originToken.chainId === destinationToken.chainId &&
                paymentMethod.originToken.address.toLowerCase() ===
                    destinationToken.address.toLowerCase()) {
                return {
                    amount: (0, units_js_1.toUnits)(amount, destinationToken.decimals),
                    chainId: destinationToken.chainId,
                    client,
                    enabled: !!(destinationToken && amount && client),
                    feePayer: args.feePayer || "sender",
                    paymentLinkId: args.paymentLinkId,
                    purchaseData: args.purchaseData,
                    receiver,
                    sender: sender ||
                        paymentMethod.payerWallet.getAccount()?.address ||
                        receiver,
                    tokenAddress: destinationToken.address,
                    type: "transfer",
                };
            }
            return {
                amount: paymentMethod.action === "buy"
                    ? (0, units_js_1.toUnits)(amount, destinationToken.decimals)
                    : (0, units_js_1.toUnits)(amount, paymentMethod.originToken.decimals),
                client,
                destinationChainId: destinationToken.chainId,
                destinationTokenAddress: destinationToken.address,
                enabled: !!(destinationToken && amount && client),
                originChainId: paymentMethod.originToken.chainId,
                originTokenAddress: paymentMethod.originToken.address,
                paymentLinkId: args.paymentLinkId,
                purchaseData: args.purchaseData,
                receiver,
                sender: sender || paymentMethod.payerWallet.getAccount()?.address || receiver,
                type: paymentMethod.action,
            };
    }
}
//# sourceMappingURL=QuoteLoader.js.map