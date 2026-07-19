"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EndpointSupplier = void 0;
exports.EndpointSupplier = {
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