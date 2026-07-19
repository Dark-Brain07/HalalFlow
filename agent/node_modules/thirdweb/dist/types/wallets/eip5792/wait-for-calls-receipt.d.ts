import type { Chain } from "../../chains/types.js";
import type { ThirdwebClient } from "../../client/client.js";
import type { Prettify } from "../../utils/type-utils.js";
import type { Wallet } from "../interfaces/wallet.js";
import type { GetCallsStatusResponse } from "./types.js";
export type WaitForCallsReceiptOptions = Prettify<{
    id: string;
    client: ThirdwebClient;
    chain: Chain;
    wallet: Wallet;
    maxBlocksWaitTime?: number;
}>;
/**
 * Waits for the [EIP-5792](https://eips.ethereum.org/EIPS/eip-5792) bundle to be confirmed.
 *
 *  This function is dependent on the wallet's support for EIP-5792 and could fail.
 *
 * @param options - The options for waiting for the bundle.
 * By default, the max wait time is 100 blocks.
 * @returns A promise that resolves with the final {@link getCallsStatus} result.
 * @throws an error if the wallet does not support EIP-5792.
 * @beta
 * @example
 * ```ts
 * import { waitForCallsReceipt } from "thirdweb/wallets/eip5792";
 * const result = await waitForCallsReceipt({
 *   client,
 *   chain,
 *   wallet,
 *   id: "0x123...",
 * });
 * ```
 *
 * Example with useSendCalls:
 * ```ts
 * const sendResult = await sendCalls({
 *   client,
 *   chain,
 *   wallet,
 *   calls: [...],
 * });
 * const confirmResult = await waitForCallsReceipt(sendResult);
 * console.log("Transaction confirmed: ", confirmResult.receipts?.[0].transactionHash);
 * ```
 * @extension EIP5792
 */
export declare function waitForCallsReceipt(options: WaitForCallsReceiptOptions): Promise<GetCallsStatusResponse>;
//# sourceMappingURL=wait-for-calls-receipt.d.ts.map