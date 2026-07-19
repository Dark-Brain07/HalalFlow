export const Supplier = {
    get: async (supplier) => {
        if (typeof supplier === "function") {
            return supplier();
        }
        else {
            return supplier;
        }
    },
};
//# sourceMappingURL=Supplier.js.map