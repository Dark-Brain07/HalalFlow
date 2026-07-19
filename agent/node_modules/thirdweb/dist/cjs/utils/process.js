"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IS_TEST = exports.IS_DEV = void 0;
// You must use typeof process !== "undefined" instead of just "process"
exports.IS_DEV = typeof process !== "undefined" &&
    process.env &&
    (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test");
exports.IS_TEST = typeof process !== "undefined" &&
    process.env &&
    process.env.NODE_ENV === "test";
//# sourceMappingURL=process.js.map