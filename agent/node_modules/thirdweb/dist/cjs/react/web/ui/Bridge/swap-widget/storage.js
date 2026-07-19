"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLastUsedTokens = getLastUsedTokens;
exports.setLastUsedTokens = setLastUsedTokens;
const zod_1 = require("zod");
const tokenSelectionSchema = zod_1.z.object({
    tokenAddress: zod_1.z.string().min(1),
    chainId: zod_1.z.number().int().positive(),
});
const lastUsedTokensSchema = zod_1.z.object({
    buyToken: tokenSelectionSchema.optional(),
    sellToken: tokenSelectionSchema.optional(),
});
const STORAGE_KEY = "tw.swap.lastUsedTokens";
function isBrowser() {
    return (typeof window !== "undefined" && typeof window.localStorage !== "undefined");
}
function getLastUsedTokens() {
    if (!isBrowser()) {
        return undefined;
    }
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) {
            return undefined;
        }
        const parsed = JSON.parse(raw);
        const result = lastUsedTokensSchema.safeParse(parsed);
        if (!result.success) {
            return undefined;
        }
        return result.data;
    }
    catch {
        return undefined;
    }
}
function setLastUsedTokens(update) {
    if (!isBrowser()) {
        return;
    }
    try {
        const result = lastUsedTokensSchema.safeParse(update);
        if (!result.success) {
            return;
        }
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(result.data));
    }
    catch {
        // ignore write errors
    }
}
//# sourceMappingURL=storage.js.map