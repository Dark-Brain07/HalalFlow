import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef } from "react";
import { trackPayEvent } from "../../../../analytics/track/pay.js";
import { iconSize } from "../../../core/design-system/index.js";
import { useChainMetadata } from "../../../core/hooks/others/useChainQuery.js";
import { AccentFailIcon } from "../ConnectWallet/icons/AccentFailIcon.js";
import { Container } from "../components/basic.js";
import { Spacer } from "../components/Spacer.js";
import { Text } from "../components/text.js";
/**
 * Screen displayed when a specified token is not supported by the Bridge API
 * @internal
 */
export function UnsupportedTokenScreen(props) {
    const { chain, tokenAddress, client } = props;
    const { data: chainMetadata } = useChainMetadata(chain);
    const hasFiredUnsupportedEvent = useRef(false);
    useEffect(() => {
        if (hasFiredUnsupportedEvent.current)
            return;
        hasFiredUnsupportedEvent.current = true;
        trackPayEvent({
            chainId: chain.id,
            client,
            event: "ub:ui:unsupported_token",
            fromToken: tokenAddress,
        });
    }, [chain.id, client, tokenAddress]);
    if (chainMetadata?.testnet) {
        return (_jsxs(Container, { animate: "fadein", center: "both", flex: "column", style: { minHeight: "350px" }, children: [_jsx(AccentFailIcon, { size: iconSize["3xl"] }), _jsx(Spacer, { y: "lg" }), _jsx(Text, { center: true, color: "primaryText", size: "lg", weight: 600, children: "Testnet Not Supported" }), _jsx(Spacer, { y: "sm" }), _jsx(Text, { center: true, color: "secondaryText", size: "sm", style: { lineHeight: 1.5, maxWidth: "280px" }, children: "Bridge does not support testnets at this time." })] }));
    }
    return (_jsxs(Container, { animate: "fadein", center: "both", flex: "column", style: { minHeight: "350px" }, children: [_jsx(AccentFailIcon, { size: iconSize["3xl"] }), _jsx(Spacer, { y: "lg" }), _jsx(Text, { center: true, color: "primaryText", size: "lg", weight: 600, children: "Token Not Supported" }), _jsx(Spacer, { y: "sm" }), _jsx(Text, { center: true, color: "secondaryText", size: "sm", style: { lineHeight: 1.5, maxWidth: "280px" }, children: "This token or chain is not supported by the Bridge" })] }));
}
//# sourceMappingURL=UnsupportedTokenScreen.js.map