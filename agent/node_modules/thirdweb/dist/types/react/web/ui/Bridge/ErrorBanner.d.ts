import type { ThirdwebClient } from "../../../../client/client.js";
interface ErrorBannerProps {
    /**
     * The error to display
     */
    error: Error;
    /**
     * Called when user wants to retry
     */
    onRetry: () => void;
    /**
     * Called when user wants to cancel
     */
    onCancel?: () => void;
    client: ThirdwebClient;
}
export declare function ErrorBanner({ error, onRetry, onCancel, client, }: ErrorBannerProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=ErrorBanner.d.ts.map