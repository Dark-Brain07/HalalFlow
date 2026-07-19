import type { Config } from "./client/client/index.js";
export type InsightClientOptions = {
    readonly clientId?: string;
    readonly secretKey?: string;
};
export declare function configure(options: InsightClientOptions & {
    override?: Config;
}): void;
//# sourceMappingURL=configure.d.ts.map