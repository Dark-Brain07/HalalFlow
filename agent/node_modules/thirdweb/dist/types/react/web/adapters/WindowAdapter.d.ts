import type { WindowAdapter } from "../../core/adapters/WindowAdapter.js";
/**
 * Web implementation of WindowAdapter using the browser's window.open API.
 * Opens URLs in a new tab/window.
 */
export declare class WebWindowAdapter implements WindowAdapter {
    /**
     * Opens a URL in a new browser tab/window.
     *
     * @param url - The URL to open
     * @returns Promise that resolves when the operation is initiated
     */
    open(url: string): Promise<void>;
}
/**
 * Default instance of the Web WindowAdapter.
 */
export declare const webWindowAdapter: WebWindowAdapter;
//# sourceMappingURL=WindowAdapter.d.ts.map