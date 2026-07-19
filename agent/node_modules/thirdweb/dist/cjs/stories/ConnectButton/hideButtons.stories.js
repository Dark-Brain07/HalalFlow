"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HideSendReceiveBuy = exports.HideReceiveBuy = exports.HideSendBuy = exports.HideSendReceive = exports.HideBuy = exports.HideReceive = exports.HideSend = exports.Default = void 0;
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
    title: "Connect/ConnectButton/hide buttons",
};
exports.Default = {
    args: {},
};
exports.HideSend = {
    args: {
        detailsModal: {
            hideSendFunds: true,
        },
    },
};
exports.HideReceive = {
    args: {
        detailsModal: {
            hideReceiveFunds: true,
        },
    },
};
exports.HideBuy = {
    args: {
        detailsModal: {
            hideBuyFunds: true,
        },
    },
};
exports.HideSendReceive = {
    args: {
        detailsModal: {
            hideReceiveFunds: true,
            hideSendFunds: true,
        },
    },
};
exports.HideSendBuy = {
    args: {
        detailsModal: {
            hideBuyFunds: true,
            hideSendFunds: true,
        },
    },
};
exports.HideReceiveBuy = {
    args: {
        detailsModal: {
            hideBuyFunds: true,
            hideReceiveFunds: true,
        },
    },
};
exports.HideSendReceiveBuy = {
    args: {
        detailsModal: {
            hideBuyFunds: true,
            hideReceiveFunds: true,
            hideSendFunds: true,
        },
    },
};
exports.default = meta;
//# sourceMappingURL=hideButtons.stories.js.map