import type { Abi } from "abitype";
import type { Chain } from "../../../chains/types.js";
import type { ThirdwebClient } from "../../../client/client.js";
export type DeployWithStylusConstructorOptions = {
    chain: Chain;
    client: ThirdwebClient;
    bytecode: `0x${string}`;
    constructorParams: Record<string, unknown>;
    abi: Abi;
};
/**
 * Deploy stylus contract with constructor params
 * @param options - The options deploying contract with constructor
 * @returns Prepared transaction to call stylus deployer
 * @example
 * ```ts
 * import { deployWithStylusConstructor } from "thirdweb/stylus";
 * const transaction = deployWithStylusConstructor({
 *  client,
 *  chain,
 *  bytecode,
 *  constructorParams,
 *  abi
 * });
 * await sendTransaction({ transaction, account });
 * ```
 */
export declare function deployWithStylusConstructor(options: DeployWithStylusConstructorOptions): import("../../../transaction/prepare-transaction.js").PreparedTransaction<any, import("abitype").AbiFunction, import("../../../transaction/prepare-transaction.js").PrepareTransactionOptions>;
//# sourceMappingURL=deployWithStylusConstructor.d.ts.map