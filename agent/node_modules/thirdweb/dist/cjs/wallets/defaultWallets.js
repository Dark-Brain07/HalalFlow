"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultWallets = getDefaultWallets;
exports.getDefaultWalletsForBridgeComponents = getDefaultWalletsForBridgeComponents;
const constants_js_1 = require("./constants.js");
const create_wallet_js_1 = require("./create-wallet.js");
/**
 * @internal
 */
function getDefaultWallets(options) {
    return [
        (0, create_wallet_js_1.createWallet)("inApp", {
            executionMode: options?.executionMode,
        }),
        (0, create_wallet_js_1.createWallet)(constants_js_1.METAMASK),
        (0, create_wallet_js_1.createWallet)(constants_js_1.COINBASE, {
            appMetadata: options?.appMetadata,
            chains: options?.chains,
        }),
        (0, create_wallet_js_1.createWallet)(constants_js_1.RAINBOW),
        (0, create_wallet_js_1.createWallet)("io.rabby"),
        (0, create_wallet_js_1.createWallet)(constants_js_1.ZERION),
        (0, create_wallet_js_1.createWallet)("com.okex.wallet"),
    ];
}
/**
 * @internal
 */
function getDefaultWalletsForBridgeComponents(options) {
    return [
        (0, create_wallet_js_1.createWallet)(constants_js_1.METAMASK),
        (0, create_wallet_js_1.createWallet)(constants_js_1.COINBASE, {
            appMetadata: options?.appMetadata,
            chains: options?.chains,
        }),
        (0, create_wallet_js_1.createWallet)(constants_js_1.RAINBOW),
        (0, create_wallet_js_1.createWallet)("io.rabby"),
        (0, create_wallet_js_1.createWallet)(constants_js_1.ZERION),
        (0, create_wallet_js_1.createWallet)("com.okex.wallet"),
    ];
}
//# sourceMappingURL=defaultWallets.js.map