"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Buy_NativeToken = Buy_NativeToken;
exports.Buy_Base_USDC = Buy_Base_USDC;
exports.Buy_NativeToken_With_Amount = Buy_NativeToken_With_Amount;
exports.Sell_NativeToken = Sell_NativeToken;
exports.Sell_Base_USDC = Sell_Base_USDC;
exports.Sell_NativeToken_With_Amount = Sell_NativeToken_With_Amount;
exports.Buy_And_Sell_NativeToken = Buy_And_Sell_NativeToken;
const jsx_runtime_1 = require("react/jsx-runtime");
const addresses_js_1 = require("../../../constants/addresses.js");
const SwapWidget_js_1 = require("../../../react/web/ui/Bridge/swap-widget/SwapWidget.js");
const utils_js_1 = require("../../utils.js");
const meta = {
    title: "Bridge/Swap/SwapWidget/Prefill",
};
exports.default = meta;
function Buy_NativeToken() {
    return ((0, jsx_runtime_1.jsx)(Variant, { client: utils_js_1.storyClient, prefill: {
            buyToken: {
                chainId: 8453,
            },
        } }));
}
function Buy_Base_USDC() {
    return ((0, jsx_runtime_1.jsx)(Variant, { client: utils_js_1.storyClient, prefill: {
            buyToken: {
                chainId: 8453,
                tokenAddress: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
            },
        } }));
}
function Buy_NativeToken_With_Amount() {
    return ((0, jsx_runtime_1.jsx)(Variant, { client: utils_js_1.storyClient, prefill: {
            buyToken: {
                chainId: 8453,
                amount: "0.1",
                tokenAddress: addresses_js_1.NATIVE_TOKEN_ADDRESS,
            },
        } }));
}
function Sell_NativeToken() {
    return ((0, jsx_runtime_1.jsx)(Variant, { client: utils_js_1.storyClient, prefill: {
            sellToken: {
                chainId: 8453,
            },
        } }));
}
function Sell_Base_USDC() {
    return ((0, jsx_runtime_1.jsx)(SwapWidget_js_1.SwapWidget, { client: utils_js_1.storyClient, prefill: {
            sellToken: {
                chainId: 8453,
                tokenAddress: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
            },
        } }));
}
function Sell_NativeToken_With_Amount() {
    return ((0, jsx_runtime_1.jsx)(Variant, { client: utils_js_1.storyClient, prefill: {
            sellToken: {
                chainId: 8453,
                amount: "0.1",
                tokenAddress: addresses_js_1.NATIVE_TOKEN_ADDRESS,
            },
        } }));
}
function Buy_And_Sell_NativeToken() {
    return ((0, jsx_runtime_1.jsx)(Variant, { client: utils_js_1.storyClient, prefill: {
            // base native token
            buyToken: {
                chainId: 8453,
                tokenAddress: addresses_js_1.NATIVE_TOKEN_ADDRESS,
            },
            // base usdc
            sellToken: {
                chainId: 8453,
                tokenAddress: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
            },
        } }));
}
function Variant(props) {
    return ((0, jsx_runtime_1.jsxs)("div", { style: {
            display: "flex",
            flexDirection: "column",
            gap: "40px",
            alignItems: "center",
        }, children: [(0, jsx_runtime_1.jsx)(SwapWidget_js_1.SwapWidget, { ...props, theme: "dark" }), (0, jsx_runtime_1.jsx)(SwapWidget_js_1.SwapWidget, { ...props, theme: "light" })] }));
}
//# sourceMappingURL=SwapWidget.Prefill.stories.js.map