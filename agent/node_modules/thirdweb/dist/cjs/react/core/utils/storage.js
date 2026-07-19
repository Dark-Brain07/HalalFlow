"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LAST_AUTH_PROVIDER_STORAGE_KEY = void 0;
exports.setLastAuthProvider = setLastAuthProvider;
exports.getLastAuthProvider = getLastAuthProvider;
exports.LAST_AUTH_PROVIDER_STORAGE_KEY = "lastAuthProvider";
async function setLastAuthProvider(authProvider, storage) {
    await storage.setItem(exports.LAST_AUTH_PROVIDER_STORAGE_KEY, authProvider);
}
async function getLastAuthProvider(storage) {
    return (await storage.getItem(exports.LAST_AUTH_PROVIDER_STORAGE_KEY));
}
//# sourceMappingURL=storage.js.map