import { jsx as _jsx } from "react/jsx-runtime";
import { ErrorBanner } from "../../react/web/ui/Bridge/ErrorBanner.js";
import { ModalThemeWrapper, storyClient } from "../utils.js";
const mockNetworkError = new Error("Network connection failed. Please check your internet connection and try again.");
const mockUserRejectedError = new Error("Transaction was rejected by user.");
const mockInsufficientFundsError = new Error("Insufficient funds to complete this transaction.");
const mockGenericError = new Error("An unexpected error occurred.");
const meta = {
    args: {
        onCancel: () => { },
        onRetry: () => { },
        client: storyClient,
    },
    component: ErrorBanner,
    decorators: [
        (Story) => (_jsx(ModalThemeWrapper, { children: _jsx(Story, {}) })),
    ],
    title: "Bridge/screens/ErrorBanner",
};
export default meta;
export const NetworkError = {
    args: {
        error: mockNetworkError,
    },
};
export const UserRejectedError = {
    args: {
        error: mockUserRejectedError,
    },
};
export const InsufficientFundsError = {
    args: {
        error: mockInsufficientFundsError,
    },
};
export const WithoutCancelButton = {
    args: {
        error: mockGenericError,
        onCancel: undefined,
    },
};
export const EmptyMessage = {
    args: {
        error: new Error(""),
    },
};
//# sourceMappingURL=ErrorBanner.stories.js.map