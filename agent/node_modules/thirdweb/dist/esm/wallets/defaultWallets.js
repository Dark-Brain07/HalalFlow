import { COINBASE, METAMASK, RAINBOW, ZERION } from "./constants.js";
import { createWallet } from "./create-wallet.js";
/**
 * @internal
 */
export function getDefaultWallets(options) {
    return [
        createWallet("inApp", {
            executionMode: options?.executionMode,
        }),
        createWallet(METAMASK),
        createWallet(COINBASE, {
            appMetadata: options?.appMetadata,
            chains: options?.chains,
        }),
        createWallet(RAINBOW),
        createWallet("io.rabby"),
        createWallet(ZERION),
        createWallet("com.okex.wallet"),
    ];
}
/**
 * @internal
 */
export function getDefaultWalletsForBridgeComponents(options) {
    return [
        createWallet(METAMASK),
        createWallet(COINBASE, {
            appMetadata: options?.appMetadata,
            chains: options?.chains,
        }),
        createWallet(RAINBOW),
        createWallet("io.rabby"),
        createWallet(ZERION),
        createWallet("com.okex.wallet"),
    ];
}
//# sourceMappingURL=defaultWallets.js.map