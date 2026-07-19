"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Custom = exports.Light = exports.Dark = void 0;
const index_js_1 = require("../../react/core/design-system/index.js");
const ConnectButton_js_1 = require("../../react/web/ui/ConnectWallet/ConnectButton.js");
const utils_js_1 = require("../utils.js");
const meta = {
    args: {
        client: utils_js_1.storyClient,
    },
    component: ConnectButton_js_1.ConnectButton,
    parameters: {
        layout: "centered",
    },
    title: "Connect/ConnectButton/themes",
};
exports.Dark = {
    args: {
        theme: "dark",
    },
};
exports.Light = {
    args: {
        theme: "light",
    },
};
exports.Custom = {
    args: {
        theme: (0, index_js_1.darkTheme)({
            colors: {
                modalBg: "#0c0a2e",
                borderColor: "#2f2987",
            },
        }),
    },
};
exports.default = meta;
//# sourceMappingURL=themes.stories.js.map