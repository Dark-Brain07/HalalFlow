"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NON_SEARCHABLE_WALLETS = exports.ZERION = exports.RAINBOW = exports.METAMASK = exports.BASE_ACCOUNT = exports.COINBASE = void 0;
// Constants for most common wallets
exports.COINBASE = "com.coinbase.wallet";
exports.BASE_ACCOUNT = "org.base.account";
exports.METAMASK = "io.metamask";
exports.RAINBOW = "me.rainbow";
exports.ZERION = "io.zerion.wallet";
// Wallet IDs that should not appear in searchable wallet lists
exports.NON_SEARCHABLE_WALLETS = [
    "inApp",
    "embedded",
    "smart",
    "xyz.abs",
];
//# sourceMappingURL=constants.js.map