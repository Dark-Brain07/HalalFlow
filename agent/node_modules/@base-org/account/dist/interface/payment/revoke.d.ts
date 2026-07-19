import type { RevokeOptions, RevokeResult } from './types.js';
/**
 * Prepares and executes a revoke for a given spend permission.
 *
 * Note: This function relies on Node.js APIs and is only available in Node.js environments.
 *
 * This function combines the functionality of getOrCreateSubscriptionOwnerWallet and prepareRevoke,
 * then executes the revoke using a CDP smart wallet. The smart wallet is controlled
 * by an EVM account and can leverage paymasters for gas sponsorship.
 *
 * The function will:
 * - Use the provided CDP credentials or fall back to environment variables
 * - Get the existing smart wallet that acts as the subscription owner
 * - Prepare the revoke call data using the subscription ID
 * - Execute the revoke transaction using the smart wallet
 * - Optionally use a paymaster for transaction sponsorship
 *
 * @param options - Options for revoking the subscription
 * @param options.id - The subscription ID (permission hash) to revoke
 * @param options.testnet - Whether this is on testnet (Base Sepolia). Defaults to false (mainnet)
 * @param options.cdpApiKeyId - CDP API key ID. Falls back to CDP_API_KEY_ID env var
 * @param options.cdpApiKeySecret - CDP API key secret. Falls back to CDP_API_KEY_SECRET env var
 * @param options.cdpWalletSecret - CDP wallet secret. Falls back to CDP_WALLET_SECRET env var
 * @param options.walletName - Custom wallet name. Defaults to "subscription owner"
 * @param options.paymasterUrl - Paymaster URL for sponsorship. Falls back to PAYMASTER_URL env var
 * @returns Promise<RevokeResult> - Result of the revoke transaction
 * @throws Error if CDP credentials are missing, subscription not found, or revoke fails
 *
 * @example
 * ```typescript
 * import { base } from '@base-org/account/payment';
 *
 * // Using environment variables for credentials and paymaster
 * const result = await base.subscription.revoke({
 *   id: '0x71319cd488f8e4f24687711ec5c95d9e0c1bacbf5c1064942937eba4c7cf2984',
 *   testnet: false
 * });
 * console.log(`Revoked subscription - Transaction: ${result.id}`);
 *
 * // Using explicit credentials and paymaster URL
 * const result = await base.subscription.revoke({
 *   id: '0x71319cd488f8e4f24687711ec5c95d9e0c1bacbf5c1064942937eba4c7cf2984',
 *   cdpApiKeyId: 'your-api-key-id',
 *   cdpApiKeySecret: 'your-api-key-secret',
 *   cdpWalletSecret: 'your-wallet-secret',
 *   paymasterUrl: 'https://your-paymaster.com',
 *   testnet: false
 * });
 *
 * // Using a custom wallet name
 * const result = await base.subscription.revoke({
 *   id: '0x71319cd488f8e4f24687711ec5c95d9e0c1bacbf5c1064942937eba4c7cf2984',
 *   walletName: 'my-app-charge-wallet',
 *   testnet: true
 * });
 * ```
 */
export declare function revoke(options: RevokeOptions): Promise<RevokeResult>;
//# sourceMappingURL=revoke.d.ts.map