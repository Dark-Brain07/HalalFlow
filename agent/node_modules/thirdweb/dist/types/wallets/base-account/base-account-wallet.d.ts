/**
 * internal helper functions for Base Account SDK wallet
 */
import type { ProviderInterface } from "@base-org/account";
import { BASE_ACCOUNT } from "../constants.js";
import type { Wallet } from "../interfaces/wallet.js";
import type { CreateWalletArgs } from "../wallet-types.js";
/**
 * @internal
 */
export declare function baseAccountWalletSDK(args: {
    createOptions?: CreateWalletArgs<typeof BASE_ACCOUNT>[1];
    providerFactory: () => Promise<ProviderInterface>;
}): Wallet<typeof BASE_ACCOUNT>;
//# sourceMappingURL=base-account-wallet.d.ts.map