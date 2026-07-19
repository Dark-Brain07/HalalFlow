"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { defineChain } from "../../../../chains/utils.js";
import { PoweredByThirdweb } from "../ConnectWallet/PoweredByTW.js";
import { FiatValue } from "../ConnectWallet/screens/Buy/swap/FiatValue.js";
import { Container, Line } from "../components/basic.js";
import { Button } from "../components/buttons.js";
import { ChainName } from "../components/ChainName.js";
import { Spacer } from "../components/Spacer.js";
import { Text } from "../components/text.js";
import { ChainIcon } from "./common/TokenAndChain.js";
import { WithHeader } from "./common/WithHeader.js";
export function DirectPayment({ paymentInfo, metadata, client, onContinue, showThirdwebBranding = true, buttonLabel, currency, }) {
    const chain = defineChain(paymentInfo.token.chainId);
    const handleContinue = () => {
        onContinue(paymentInfo.amount, paymentInfo.token, paymentInfo.sellerAddress);
    };
    return (_jsxs(WithHeader, { client: client, title: metadata.title || "Direct Payment", description: metadata.description, image: metadata.image, children: [_jsxs(Container, { flex: "row", gap: "3xs", style: {
                    justifyContent: "space-between",
                    alignItems: "end",
                }, children: [_jsx(FiatValue, { currency: currency, chain: chain, client: client, color: "primaryText", size: "xl", token: paymentInfo.token, tokenAmount: paymentInfo.amount, weight: 500 }), _jsx(Container, { flex: "row", gap: "3xs", children: _jsx(Text, { color: "secondaryText", size: "xs", style: {
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                textTransform: "uppercase",
                                letterSpacing: "0.07em",
                                opacity: 0.7,
                            }, children: "One-time payment" }) })] }), _jsx(Spacer, { y: "md+" }), _jsx(Line, { dashed: true }), _jsx(Spacer, { y: "md+" }), _jsxs(Container, { flex: "row", style: {
                    alignItems: "center",
                    justifyContent: "space-between",
                }, children: [_jsx(Text, { color: "secondaryText", size: "sm", children: "Price" }), _jsx(Text, { color: "primaryText", size: "sm", children: `${paymentInfo.amount} ${paymentInfo.token.symbol}` })] }), _jsx(Spacer, { y: "sm" }), _jsxs(Container, { flex: "row", style: {
                    alignItems: "center",
                    justifyContent: "space-between",
                }, children: [_jsx(Text, { color: "secondaryText", size: "sm", children: "Network" }), _jsxs(Container, { center: "y", flex: "row", gap: "3xs", children: [_jsx(ChainIcon, { chain: chain, client: client, size: "xs" }), _jsx(ChainName, { chain: chain, client: client, color: "primaryText", short: true, size: "sm" })] })] }), _jsx(Spacer, { y: "md+" }), _jsx(Line, { dashed: true }), _jsx(Spacer, { y: "md+" }), _jsxs(Container, { flex: "column", children: [_jsx(Button, { fullWidth: true, onClick: handleContinue, variant: "primary", children: buttonLabel || "Buy Now" }), showThirdwebBranding ? (_jsxs("div", { children: [_jsx(Spacer, { y: "md+" }), _jsx(PoweredByThirdweb, {})] })) : null, _jsx(Spacer, { y: "md+" })] })] }));
}
//# sourceMappingURL=DirectPayment.js.map