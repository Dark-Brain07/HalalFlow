export const webLocalStorage = {
    async getItem(key) {
        try {
            if (typeof window !== "undefined" && window.localStorage) {
                return localStorage.getItem(key);
            }
        }
        catch {
            // ignore
        }
        return null;
    },
    async removeItem(key) {
        if (typeof window !== "undefined" && window.localStorage) {
            localStorage.removeItem(key);
        }
    },
    async setItem(key, value) {
        try {
            if (typeof window !== "undefined" && window.localStorage) {
                localStorage.setItem(key, value);
            }
        }
        catch {
            // ignore
        }
    },
};
//# sourceMappingURL=webStorage.js.map