"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inMemoryStorage = void 0;
const store = new Map();
exports.inMemoryStorage = {
    getItem: async (key) => {
        return store.get(key) ?? null;
    },
    removeItem: async (key) => {
        store.delete(key);
    },
    setItem: async (key, value) => {
        store.set(key, value);
    },
};
//# sourceMappingURL=inMemoryStorage.js.map