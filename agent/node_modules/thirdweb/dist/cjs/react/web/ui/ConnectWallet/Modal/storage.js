"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLastUsedWalletId = getLastUsedWalletId;
exports.getLastUsedSocialAuth = getLastUsedSocialAuth;
const index_js_1 = require("../../../../../wallets/manager/index.js");
const storage_js_1 = require("../../../../core/utils/storage.js");
function getLastUsedWalletId() {
    try {
        if (typeof window !== "undefined" && window.localStorage) {
            return window.localStorage.getItem(index_js_1.LAST_USED_WALLET_ID);
        }
    }
    catch {
        // ignore
    }
    return null;
}
function getLastUsedSocialAuth() {
    try {
        if (typeof window !== "undefined" && window.localStorage) {
            return window.localStorage.getItem(storage_js_1.LAST_AUTH_PROVIDER_STORAGE_KEY);
        }
    }
    catch {
        // ignore
    }
    return null;
}
//# sourceMappingURL=storage.js.map