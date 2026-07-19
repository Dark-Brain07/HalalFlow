import type { Config } from "./client/client/index.js";
export type EngineClientOptions = {
    readonly clientId?: string;
    readonly secretKey?: string;
};
export declare function configure(options: EngineClientOptions & {
    override?: Config;
}): void;
export type MaybeErrorResponse<D, E> = {
    result: D;
} | {
    error: E;
};
export declare function isErrorResponse<D, E>(res: MaybeErrorResponse<D, E>): res is {
    error: E;
};
export declare function isSuccessResponse<D, E>(res: MaybeErrorResponse<D, E>): res is {
    result: D;
};
//# sourceMappingURL=configure.d.ts.map