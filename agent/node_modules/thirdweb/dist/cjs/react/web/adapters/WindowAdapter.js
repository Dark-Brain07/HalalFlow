"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webWindowAdapter = exports.WebWindowAdapter = void 0;
/**
 * Web implementation of WindowAdapter using the browser's window.open API.
 * Opens URLs in a new tab/window.
 */
class WebWindowAdapter {
    /**
     * Opens a URL in a new browser tab/window.
     *
     * @param url - The URL to open
     * @returns Promise that resolves when the operation is initiated
     */
    async open(url) {
        // Use window.open to open URL in new tab
        window.open(url, "_blank", "noopener,noreferrer");
    }
}
exports.WebWindowAdapter = WebWindowAdapter;
/**
 * Default instance of the Web WindowAdapter.
 */
exports.webWindowAdapter = new WebWindowAdapter();
//# sourceMappingURL=WindowAdapter.js.map