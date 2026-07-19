import type { BaseTransactionOptions, WithOverrides } from "../../../transaction/types.js";
import type { Account } from "../../../wallets/interfaces/wallet.js";
import { type CallSpecInput, type TransferSpecInput } from "./types.js";
/**
 * @extension ERC7702
 */
export type CreateSessionKeyOptions = {
    /**
     * The admin account that will perform the operation.
     */
    account: Account;
    /**
     * The address to add as a session key.
     */
    sessionKeyAddress: string;
    /**
     * How long the session key should be valid for, in seconds.
     */
    durationInSeconds: number;
    /**
     * Whether to grant full execution permissions to the session key.
     */
    grantFullPermissions?: boolean;
    /**
     * Smart contract interaction policies to apply to the session key, ignored if grantFullPermissions is true.
     */
    callPolicies?: CallSpecInput[];
    /**
     * Value transfer policies to apply to the session key, ignored if grantFullPermissions is true.
     */
    transferPolicies?: TransferSpecInput[];
};
/**
 * Creates  session key permissions for a specified address.
 * @param options - The options for the createSessionKey function.
 * @param {Contract} options.contract - The EIP-7702 smart EOA contract to create the session key from
 * @returns The transaction object to be sent.
 * @example
 * ```ts
 * import { createSessionKey } from 'thirdweb/wallets/in-app';
 * import { sendTransaction } from 'thirdweb';
 *
 * const transaction = createSessionKey({
 *  account: account,
 *  contract: accountContract,
 *  sessionKeyAddress: TEST_ACCOUNT_A.address,
 *  durationInSeconds: 86400, // 1 day
 *  grantFullPermissions: true
 *})
 *
 * await sendTransaction({ transaction, account });
 * ```
 * @extension ERC7702
 */
export declare function createSessionKey(options: BaseTransactionOptions<WithOverrides<CreateSessionKeyOptions>>): import("../../../transaction/prepare-transaction.js").PreparedTransaction<any, import("abitype").AbiFunction, import("../../../transaction/prepare-transaction.js").PrepareTransactionOptions>;
/**
 * Checks if the `isCreateSessionKeySupported` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `isAddSessionKeySupported` method is supported.
 * @extension ERC7702
 * @example
 * ```ts
 * import { isCreateSessionKeySupported } from "thirdweb/extensions/erc7702";
 *
 * const supported = isCreateSessionKeySupported(["0x..."]);
 * ```
 */
export declare function isCreateSessionKeySupported(availableSelectors: string[]): boolean;
//# sourceMappingURL=createSessionKey.d.ts.map