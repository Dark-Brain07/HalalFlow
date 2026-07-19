"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmptyMessage = exports.WithoutCancelButton = exports.InsufficientFundsError = exports.UserRejectedError = exports.NetworkError = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const ErrorBanner_js_1 = require("../../react/web/ui/Bridge/ErrorBanner.js");
const utils_js_1 = require("../utils.js");
const mockNetworkError = new Error("Network connection failed. Please check your internet connection and try again.");
const mockUserRejectedError = new Error("Transaction was rejected by user.");
const mockInsufficientFundsError = new Error("Insufficient funds to complete this transaction.");
const mockGenericError = new Error("An unexpected error occurred.");
const meta = {
    args: {
        onCancel: () => { },
        onRetry: () => { },
        client: utils_js_1.storyClient,
    },
    component: ErrorBanner_js_1.ErrorBanner,
    decorators: [
        (Story) => ((0, jsx_runtime_1.jsx)(utils_js_1.ModalThemeWrapper, { children: (0, jsx_runtime_1.jsx)(Story, {}) })),
    ],
    title: "Bridge/screens/ErrorBanner",
};
exports.default = meta;
exports.NetworkError = {
    args: {
        error: mockNetworkError,
    },
};
exports.UserRejectedError = {
    args: {
        error: mockUserRejectedError,
    },
};
exports.InsufficientFundsError = {
    args: {
        error: mockInsufficientFundsError,
    },
};
exports.WithoutCancelButton = {
    args: {
        error: mockGenericError,
        onCancel: undefined,
    },
};
exports.EmptyMessage = {
    args: {
        error: new Error(""),
    },
};
//# sourceMappingURL=ErrorBanner.stories.js.map