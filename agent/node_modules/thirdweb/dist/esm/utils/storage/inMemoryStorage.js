const store = new Map();
export const inMemoryStorage = {
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