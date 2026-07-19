import { z } from "zod";
declare const lastUsedTokensSchema: z.ZodObject<{
    buyToken: z.ZodOptional<z.ZodObject<{
        tokenAddress: z.ZodString;
        chainId: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        chainId: number;
        tokenAddress: string;
    }, {
        chainId: number;
        tokenAddress: string;
    }>>;
    sellToken: z.ZodOptional<z.ZodObject<{
        tokenAddress: z.ZodString;
        chainId: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        chainId: number;
        tokenAddress: string;
    }, {
        chainId: number;
        tokenAddress: string;
    }>>;
}, "strip", z.ZodTypeAny, {
    buyToken?: {
        chainId: number;
        tokenAddress: string;
    } | undefined;
    sellToken?: {
        chainId: number;
        tokenAddress: string;
    } | undefined;
}, {
    buyToken?: {
        chainId: number;
        tokenAddress: string;
    } | undefined;
    sellToken?: {
        chainId: number;
        tokenAddress: string;
    } | undefined;
}>;
type LastUsedTokens = z.infer<typeof lastUsedTokensSchema>;
export declare function getLastUsedTokens(): LastUsedTokens | undefined;
export declare function setLastUsedTokens(update: LastUsedTokens): void;
export {};
//# sourceMappingURL=storage.d.ts.map