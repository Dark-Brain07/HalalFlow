import z from "zod";
const supportedX402Versions = [1, 2];
export const x402Version = 2;
export const PaymentSchemeSchema = z.union([
    z.literal("exact"),
    z.literal("upto"),
]);
//# sourceMappingURL=types.js.map