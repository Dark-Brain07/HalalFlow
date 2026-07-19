export const EndpointSupplier = {
    get: async (supplier, arg) => {
        if (typeof supplier === "function") {
            return supplier(arg);
        }
        else {
            return supplier;
        }
    },
};
//# sourceMappingURL=EndpointSupplier.js.map