/**
 * Vanilla JavaScript QR Code overlay utility for WalletConnect URIs
 * Works in any browser context without requiring React or other frameworks
 */
interface QROverlayOptions {
    /**
     * Custom styles to apply to the overlay
     */
    overlayStyles?: Partial<CSSStyleDeclaration>;
    /**
     * Custom styles to apply to the modal container
     */
    modalStyles?: Partial<CSSStyleDeclaration>;
    /**
     * QR code size in pixels
     */
    qrSize?: number;
    /**
     * Show close button
     */
    showCloseButton?: boolean;
    /**
     * Custom close button text
     */
    closeButtonText?: string;
    /**
     * Theme preference
     */
    theme?: "light" | "dark";
    /**
     * Custom container element to append the overlay to
     */
    container?: HTMLElement;
    /**
     * Callback called when user cancels the overlay (closes without connecting)
     */
    onCancel?: () => void;
}
export interface QROverlay {
    /**
     * Remove the overlay from the DOM
     */
    destroy: () => void;
    /**
     * Hide the overlay (without removing from DOM)
     */
    hide: () => void;
    /**
     * Show the overlay
     */
    show: () => void;
}
/**
 * Creates a QR code overlay for the given WalletConnect URI
 */
export declare function createQROverlay(uri: string, options?: QROverlayOptions): QROverlay;
export {};
//# sourceMappingURL=qr-overlay.d.ts.map