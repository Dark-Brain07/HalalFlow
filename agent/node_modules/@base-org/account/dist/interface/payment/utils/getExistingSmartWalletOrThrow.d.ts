import type { EvmSmartAccount } from '@coinbase/cdp-sdk';
import { CdpClient } from '@coinbase/cdp-sdk';
/**
 * Retrieves an existing smart wallet from CDP by name.
 * Throws detailed errors if the EOA or smart wallet doesn't exist.
 *
 * @param cdpClient - Initialized CDP client
 * @param walletName - Name of the wallet to retrieve
 * @param context - Context string for error messages (e.g., "charge", "revoke")
 * @returns The smart wallet instance
 * @throws Error if EOA or smart wallet not found
 */
export declare function getExistingSmartWalletOrThrow(cdpClient: CdpClient, walletName: string, context: string): Promise<EvmSmartAccount>;
//# sourceMappingURL=getExistingSmartWalletOrThrow.d.ts.map