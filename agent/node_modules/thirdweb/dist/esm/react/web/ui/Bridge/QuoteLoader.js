"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { toUnits } from "../../../../utils/units.js";
import { useBridgePrepare, } from "../../../core/hooks/useBridgePrepare.js";
import { Container } from "../components/basic.js";
import { Spacer } from "../components/Spacer.js";
import { Spinner } from "../components/Spinner.js";
import { Text } from "../components/text.js";
export function QuoteLoader({ destinationToken, paymentMethod, amount, sender, receiver, client, onQuoteReceived, onError, purchaseData, paymentLinkId, feePayer, mode: _mode, }) {
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
    const prepareQuery = useBridgePrepare(request);
    // Handle successful quote
    useEffect(() => {
        if (prepareQuery.data) {
            onQuoteReceived(prepareQuery.data, request);
        }
    }, [prepareQuery.data, onQuoteReceived, request]);
    // Handle errors
    useEffect(() => {
        if (prepareQuery.error) {
            onError(prepareQuery.error);
        }
    }, [prepareQuery.error, onError]);
    return (_jsxs(Container, { center: "both", flex: "column", fullHeight: true, p: "lg", style: { minHeight: "350px" }, children: [_jsx(Spinner, { color: "secondaryText", size: "xl" }), _jsx(Spacer, { y: "md" }), _jsx(Text, { center: true, color: "primaryText", size: "lg", style: { fontWeight: 600 }, children: "Finding the best route" }), _jsx(Spacer, { y: "sm" }), _jsx(Text, { center: true, color: "secondaryText", size: "sm", children: "We're searching for the most efficient path for this payment." })] }));
}
function getBridgeParams(args) {
    const { paymentMethod, amount, destinationToken, receiver, client, sender } = args;
    switch (paymentMethod.type) {
        case "fiat":
            return {
                amount: toUnits(amount, destinationToken.decimals),
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
                    amount: toUnits(amount, destinationToken.decimals),
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
                    ? toUnits(amount, destinationToken.decimals)
                    : toUnits(amount, paymentMethod.originToken.decimals),
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