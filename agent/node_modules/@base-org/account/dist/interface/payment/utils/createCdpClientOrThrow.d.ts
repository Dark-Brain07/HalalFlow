import { CdpClient } from '@coinbase/cdp-sdk';
/**
 * Options for creating a CDP client
 */
export interface CreateCdpClientOptions {
    cdpApiKeyId?: string;
    cdpApiKeySecret?: string;
    cdpWalletSecret?: string;
}
/**
 * Creates and initializes a CDP client with provided credentials or environment variables.
 * Throws a detailed error if credentials are missing or invalid.
 *
 * @param options - CDP credential options
 * @param context - Context string for error messages (e.g., "subscription charge", "subscription revoke")
 * @returns Initialized CdpClient instance
 * @throws Error if credentials are missing or invalid
 */
export declare function createCdpClientOrThrow(options: CreateCdpClientOptions, context: string): CdpClient;
//# sourceMappingURL=createCdpClientOrThrow.d.ts.map