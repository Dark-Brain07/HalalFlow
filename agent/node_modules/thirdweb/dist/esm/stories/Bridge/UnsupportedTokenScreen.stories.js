import { jsx as _jsx } from "react/jsx-runtime";
import { defineChain } from "../../chains/utils.js";
import { NATIVE_TOKEN_ADDRESS } from "../../constants/addresses.js";
import { UnsupportedTokenScreen } from "../../react/web/ui/Bridge/UnsupportedTokenScreen.js";
import { ModalThemeWrapper, storyClient } from "../utils.js";
const meta = {
    args: {
        client: storyClient,
        chain: defineChain(1),
        tokenAddress: NATIVE_TOKEN_ADDRESS,
    },
    component: UnsupportedTokenScreen,
    title: "Bridge/screens/UnsupportedTokenScreen",
    decorators: [
        (Story) => (_jsx(ModalThemeWrapper, { children: _jsx(Story, {}) })),
    ],
};
export default meta;
export const TokenNotSupported = {
    args: {
        chain: defineChain(1),
    },
};
export const TestnetNotSupported = {
    args: {
        chain: defineChain(11155111), // Sepolia testnet
    },
};
//# sourceMappingURL=UnsupportedTokenScreen.stories.js.map