import type { EvmSmartAccount } from '@coinbase/cdp-sdk';
import type { PrepareChargeCall } from '../types.js';
/**
 * Sends a user operation and waits for it to complete.
 * Handles error cases and provides consistent error messages.
 *
 * @param networkSmartWallet - Network-scoped smart wallet instance
 * @param calls - Array of calls to execute
 * @param paymasterUrl - Optional paymaster URL for gas sponsorship
 * @param timeoutSeconds - Timeout in seconds (default: 60)
 * @param context - Context string for error messages (e.g., "charge", "revoke")
 * @returns Transaction hash of the completed operation
 * @throws Error if operation fails or times out
 */
export declare function sendUserOpAndWait(networkSmartWallet: Awaited<ReturnType<EvmSmartAccount['useNetwork']>>, calls: PrepareChargeCall[], paymasterUrl: string | undefined, timeoutSeconds: number, context: string): Promise<string>;
//# sourceMappingURL=sendUserOpAndWait.d.ts.map