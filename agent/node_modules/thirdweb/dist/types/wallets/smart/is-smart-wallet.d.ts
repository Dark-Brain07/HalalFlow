import type { Wallet } from "../interfaces/wallet.js";
/**
 * Checks if the given wallet is a smart wallet.
 *
 * @param {Wallet} wallet - The wallet to check.
 * @returns {boolean} True if the wallet is a smart wallet, false otherwise.
 * @internal
 */
export declare function isSmartWallet(activeWallet?: Wallet): boolean;
/**
 * @internal
 */
export declare function hasSponsoredTransactionsEnabled(wallet: Wallet | undefined): boolean;
//# sourceMappingURL=is-smart-wallet.d.ts.map