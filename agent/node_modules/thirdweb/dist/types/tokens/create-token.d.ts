import type { TransactionReceipt } from "../transaction/types.js";
import type { CreateTokenOptions } from "./types.js";
export declare function getTokenAddressFromReceipt(receipt: TransactionReceipt): Promise<`0x${string}`>;
export declare function prepareCreateToken(options: CreateTokenOptions): Promise<import("../transaction/prepare-transaction.js").PreparedTransaction<any, import("abitype").AbiFunction, import("../transaction/prepare-transaction.js").PrepareTransactionOptions>>;
//# sourceMappingURL=create-token.d.ts.map