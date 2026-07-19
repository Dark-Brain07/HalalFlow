"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentSchemeSchema = exports.x402Version = void 0;
const zod_1 = require("zod");
const supportedX402Versions = [1, 2];
exports.x402Version = 2;
exports.PaymentSchemeSchema = zod_1.default.union([
    zod_1.default.literal("exact"),
    zod_1.default.literal("upto"),
]);
//# sourceMappingURL=types.js.map