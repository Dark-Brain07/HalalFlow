import type { ThirdwebClient } from "../../../../client/client.js";
import type { Account } from "../../../interfaces/wallet.js";
/**
 * Creates an EIP-7702 account that enables EOA (Externally Owned Account) delegation
 * to smart contract functionality. This allows an EOA to delegate its code execution
 * to a minimal account contract, enabling features like batch transactions and sponsored gas.
 *
 * The minimal account leverages EIP-7702 authorization to delegate the EOA's code to a
 * MinimalAccount contract, allowing the EOA to execute smart contract functions while
 * maintaining its original address and private key control.
 *
 * @param args - Configuration object for creating the minimal account
 * @param args.client - The thirdweb client instance for blockchain interactions
 * @param args.adminAccount - The EOA account that will be delegated to the minimal account contract
 * @param args.sponsorGas - Optional flag to enable sponsored gas transactions via bundler
 *
 * @returns An Account object with enhanced capabilities including batch transactions and EIP-5792 support
 *
 * @example
 * ```typescript
 * import { createThirdwebClient, sendBatchTransaction } from "thirdweb";
 * import { privateKeyToAccount } from "thirdweb/wallets";
 * import { create7702MinimalAccount } from "thirdweb/wallets/in-app";
 * import { sepolia } from "thirdweb/chains";
 *
 * // Create a client
 * const client = createThirdwebClient({
 *   clientId: "your-client-id"
 * });
 *
 * // Create an EOA account
 * const adminAccount = privateKeyToAccount({
 *   client,
 *   privateKey: "0x..."
 * });
 *
 * // Wrap it with a EIP-7702 account
 * const minimal7702Account = create7702MinimalAccount({
 *   client,
 *   adminAccount,
 *   sponsorGas: true // Enable sponsored transactions
 * });
 *
 * // Send a batch of transactions
 * const result = await sendBatchTransaction({
 *   account: minimal7702Account,
 *   transactions: [
 *   {
 *     to: "0x...",
 *     data: "0x...",
 *     value: 0n,
 *     chainId: sepolia.id
 *   },
 *   {
 *     to: "0x...",
 *     data: "0x...",
 *     value: 0n,
 *     chainId: sepolia.id
 *   }
 * ]});
 *
 * console.log("Batch transaction hash:", result.transactionHash);
 * ```
 *
 * @wallet
 */
export declare const create7702MinimalAccount: (args: {
    client: ThirdwebClient;
    adminAccount: Account;
    sponsorGas?: boolean;
}) => Account;
//# sourceMappingURL=minimal-account.d.ts.map