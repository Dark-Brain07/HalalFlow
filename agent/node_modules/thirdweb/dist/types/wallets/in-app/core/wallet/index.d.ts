import type { Chain } from "../../../../chains/types.js";
import type { EcosystemWalletConnectionOptions, EcosystemWalletCreationOptions } from "../../../ecosystem/types.js";
import type { Account, Wallet } from "../../../interfaces/wallet.js";
import type { CreateWalletArgs, EcosystemWalletId, WalletAutoConnectionOption, WalletId } from "../../../wallet-types.js";
import type { InAppConnector } from "../interfaces/connector.js";
import type { InAppWalletConnectionOptions, InAppWalletCreationOptions } from "./types.js";
/**
 * Checks if the provided wallet is an in-app wallet.
 *
 * @param wallet - The wallet to check.
 * @returns True if the wallet is an in-app wallet, false otherwise.
 */
export declare function isInAppWallet(wallet: Wallet<WalletId>): wallet is Wallet<"inApp" | "embedded">;
/**
 * @internal
 */
export declare function connectInAppWallet(options: InAppWalletConnectionOptions | EcosystemWalletConnectionOptions, createOptions: InAppWalletCreationOptions | EcosystemWalletCreationOptions, connector: InAppConnector): Promise<{
    account: Account;
    chain: Chain;
    adminAccount?: Account;
}>;
/**
 * @internal
 */
export declare function autoConnectInAppWallet(options: WalletAutoConnectionOption<"inApp"> | WalletAutoConnectionOption<EcosystemWalletId>, createOptions: CreateWalletArgs<"inApp">[1] | CreateWalletArgs<EcosystemWalletId>[1], connector: InAppConnector): Promise<{
    account: Account;
    chain: Chain;
    adminAccount?: Account;
}>;
//# sourceMappingURL=index.d.ts.map