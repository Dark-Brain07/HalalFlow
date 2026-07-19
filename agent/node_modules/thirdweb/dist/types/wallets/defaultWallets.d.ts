import type { Chain } from "../chains/types.js";
import type { ExecutionModeOptions } from "./in-app/core/wallet/types.js";
import type { Wallet } from "./interfaces/wallet.js";
import type { AppMetadata } from "./types.js";
/**
 * @internal
 */
export declare function getDefaultWallets(options?: {
    appMetadata?: AppMetadata;
    chains?: Chain[];
    executionMode?: ExecutionModeOptions;
}): Wallet[];
/**
 * @internal
 */
export declare function getDefaultWalletsForBridgeComponents(options?: {
    appMetadata?: AppMetadata;
    chains?: Chain[];
    executionMode?: ExecutionModeOptions;
}): Wallet[];
//# sourceMappingURL=defaultWallets.d.ts.map