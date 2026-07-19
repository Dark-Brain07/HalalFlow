import type { SpendPermission } from '../../../core/rpc/coinbase_fetchSpendPermissions.js';
/**
 * Validates that a permission is for USDC on the expected Base network.
 * Throws detailed errors if validation fails.
 *
 * @param permission - The permission to validate
 * @param testnet - Whether this should be testnet (Base Sepolia) or mainnet (Base)
 * @throws Error if chainId or token address doesn't match expected values
 */
export declare function validateUSDCBasePermission(permission: SpendPermission, testnet: boolean): void;
//# sourceMappingURL=validateUSDCBasePermission.d.ts.map