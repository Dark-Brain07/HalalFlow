"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnsupportedTokenScreen = UnsupportedTokenScreen;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const pay_js_1 = require("../../../../analytics/track/pay.js");
const index_js_1 = require("../../../core/design-system/index.js");
const useChainQuery_js_1 = require("../../../core/hooks/others/useChainQuery.js");
const AccentFailIcon_js_1 = require("../ConnectWallet/icons/AccentFailIcon.js");
const basic_js_1 = require("../components/basic.js");
const Spacer_js_1 = require("../components/Spacer.js");
const text_js_1 = require("../components/text.js");
/**
 * Screen displayed when a specified token is not supported by the Bridge API
 * @internal
 */
function UnsupportedTokenScreen(props) {
    const { chain, tokenAddress, client } = props;
    const { data: chainMetadata } = (0, useChainQuery_js_1.useChainMetadata)(chain);
    const hasFiredUnsupportedEvent = (0, react_1.useRef)(false);
    (0, react_1.useEffect)(() => {
        if (hasFiredUnsupportedEvent.current)
            return;
        hasFiredUnsupportedEvent.current = true;
        (0, pay_js_1.trackPayEvent)({
            chainId: chain.id,
            client,
            event: "ub:ui:unsupported_token",
            fromToken: tokenAddress,
        });
    }, [chain.id, client, tokenAddress]);
    if (chainMetadata?.testnet) {
        return ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { animate: "fadein", center: "both", flex: "column", style: { minHeight: "350px" }, children: [(0, jsx_runtime_1.jsx)(AccentFailIcon_js_1.AccentFailIcon, { size: index_js_1.iconSize["3xl"] }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "lg" }), (0, jsx_runtime_1.jsx)(text_js_1.Text, { center: true, color: "primaryText", size: "lg", weight: 600, children: "Testnet Not Supported" }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "sm" }), (0, jsx_runtime_1.jsx)(text_js_1.Text, { center: true, color: "secondaryText", size: "sm", style: { lineHeight: 1.5, maxWidth: "280px" }, children: "Bridge does not support testnets at this time." })] }));
    }
    return ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { animate: "fadein", center: "both", flex: "column", style: { minHeight: "350px" }, children: [(0, jsx_runtime_1.jsx)(AccentFailIcon_js_1.AccentFailIcon, { size: index_js_1.iconSize["3xl"] }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "lg" }), (0, jsx_runtime_1.jsx)(text_js_1.Text, { center: true, color: "primaryText", size: "lg", weight: 600, children: "Token Not Supported" }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "sm" }), (0, jsx_runtime_1.jsx)(text_js_1.Text, { center: true, color: "secondaryText", size: "sm", style: { lineHeight: 1.5, maxWidth: "280px" }, children: "This token or chain is not supported by the Bridge" })] }));
}
//# sourceMappingURL=UnsupportedTokenScreen.js.map