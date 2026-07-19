import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NATIVE_TOKEN_ADDRESS } from "../../../constants/addresses.js";
import { SwapWidget, } from "../../../react/web/ui/Bridge/swap-widget/SwapWidget.js";
import { storyClient } from "../../utils.js";
const meta = {
    title: "Bridge/Swap/SwapWidget/Prefill",
};
export default meta;
export function Buy_NativeToken() {
    return (_jsx(Variant, { client: storyClient, prefill: {
            buyToken: {
                chainId: 8453,
            },
        } }));
}
export function Buy_Base_USDC() {
    return (_jsx(Variant, { client: storyClient, prefill: {
            buyToken: {
                chainId: 8453,
                tokenAddress: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
            },
        } }));
}
export function Buy_NativeToken_With_Amount() {
    return (_jsx(Variant, { client: storyClient, prefill: {
            buyToken: {
                chainId: 8453,
                amount: "0.1",
                tokenAddress: NATIVE_TOKEN_ADDRESS,
            },
        } }));
}
export function Sell_NativeToken() {
    return (_jsx(Variant, { client: storyClient, prefill: {
            sellToken: {
                chainId: 8453,
            },
        } }));
}
export function Sell_Base_USDC() {
    return (_jsx(SwapWidget, { client: storyClient, prefill: {
            sellToken: {
                chainId: 8453,
                tokenAddress: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
            },
        } }));
}
export function Sell_NativeToken_With_Amount() {
    return (_jsx(Variant, { client: storyClient, prefill: {
            sellToken: {
                chainId: 8453,
                amount: "0.1",
                tokenAddress: NATIVE_TOKEN_ADDRESS,
            },
        } }));
}
export function Buy_And_Sell_NativeToken() {
    return (_jsx(Variant, { client: storyClient, prefill: {
            // base native token
            buyToken: {
                chainId: 8453,
                tokenAddress: NATIVE_TOKEN_ADDRESS,
            },
            // base usdc
            sellToken: {
                chainId: 8453,
                tokenAddress: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
            },
        } }));
}
function Variant(props) {
    return (_jsxs("div", { style: {
            display: "flex",
            flexDirection: "column",
            gap: "40px",
            alignItems: "center",
        }, children: [_jsx(SwapWidget, { ...props, theme: "dark" }), _jsx(SwapWidget, { ...props, theme: "light" })] }));
}
//# sourceMappingURL=SwapWidget.Prefill.stories.js.map