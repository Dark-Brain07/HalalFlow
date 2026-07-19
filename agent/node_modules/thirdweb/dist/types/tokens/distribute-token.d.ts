import type { ClientAndChain } from "../utils/types.js";
import type { DistributeContent } from "./types.js";
type DistrbuteTokenParams = ClientAndChain & {
    tokenAddress: string;
    contents: DistributeContent[];
};
export declare function distributeToken(options: DistrbuteTokenParams): Promise<import("../transaction/prepare-transaction.js").PreparedTransaction<any, import("abitype").AbiFunction, import("../transaction/prepare-transaction.js").PrepareTransactionOptions>>;
export {};
//# sourceMappingURL=distribute-token.d.ts.map