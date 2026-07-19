"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompactModal = exports.WideModal = void 0;
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
    title: "Connect/ConnectButton/others",
};
exports.WideModal = {
    args: {
        connectModal: {
            size: "wide",
        },
    },
};
exports.CompactModal = {
    args: {
        connectModal: {
            size: "compact",
        },
    },
};
exports.default = meta;
//# sourceMappingURL=others.stories.js.map