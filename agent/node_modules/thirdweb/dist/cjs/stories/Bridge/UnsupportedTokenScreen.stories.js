"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestnetNotSupported = exports.TokenNotSupported = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const utils_js_1 = require("../../chains/utils.js");
const addresses_js_1 = require("../../constants/addresses.js");
const UnsupportedTokenScreen_js_1 = require("../../react/web/ui/Bridge/UnsupportedTokenScreen.js");
const utils_js_2 = require("../utils.js");
const meta = {
    args: {
        client: utils_js_2.storyClient,
        chain: (0, utils_js_1.defineChain)(1),
        tokenAddress: addresses_js_1.NATIVE_TOKEN_ADDRESS,
    },
    component: UnsupportedTokenScreen_js_1.UnsupportedTokenScreen,
    title: "Bridge/screens/UnsupportedTokenScreen",
    decorators: [
        (Story) => ((0, jsx_runtime_1.jsx)(utils_js_2.ModalThemeWrapper, { children: (0, jsx_runtime_1.jsx)(Story, {}) })),
    ],
};
exports.default = meta;
exports.TokenNotSupported = {
    args: {
        chain: (0, utils_js_1.defineChain)(1),
    },
};
exports.TestnetNotSupported = {
    args: {
        chain: (0, utils_js_1.defineChain)(11155111), // Sepolia testnet
    },
};
//# sourceMappingURL=UnsupportedTokenScreen.stories.js.map