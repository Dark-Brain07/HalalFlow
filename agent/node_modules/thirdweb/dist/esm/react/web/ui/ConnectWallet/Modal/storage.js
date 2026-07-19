import { LAST_USED_WALLET_ID } from "../../../../../wallets/manager/index.js";
import { LAST_AUTH_PROVIDER_STORAGE_KEY } from "../../../../core/utils/storage.js";
export function getLastUsedWalletId() {
    try {
        if (typeof window !== "undefined" && window.localStorage) {
            return window.localStorage.getItem(LAST_USED_WALLET_ID);
        }
    }
    catch {
        // ignore
    }
    return null;
}
export function getLastUsedSocialAuth() {
    try {
        if (typeof window !== "undefined" && window.localStorage) {
            return window.localStorage.getItem(LAST_AUTH_PROVIDER_STORAGE_KEY);
        }
    }
    catch {
        // ignore
    }
    return null;
}
//# sourceMappingURL=storage.js.map