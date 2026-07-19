"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCallsStatus = getCallsStatus;
exports.toGetCallsStatusResponse = toGetCallsStatusResponse;
const hex_js_1 = require("../../utils/encoding/hex.js");
/**
 * Get the status of an [EIP-5792](https://eips.ethereum.org/EIPS/eip-5792) bundle.
 *
 *  This function is dependent on the wallet's support for EIP-5792 and could fail.
 *
 * @param {GetCallsStatusOptions} options
 * @param {Wallet} options.wallet - The wallet that send the original calls.
 * @param {ThirdwebClient} options.client - A {@link ThirdwebClient} instance.
 * @param {WalletSendCallsId} options.bundleId - The ID of the bundle to get the status of.
 * @throws an error if the wallet does not support EIP-5792.
 * @returns {Promise<GetCallsStatusResponse>} - A promise that resolves to the bundle's status and receipts (if available). {@link GetCallsStatusResponse}
 * @beta
 * @example
 * ```ts
 *  import { createThirdwebClient } from "thirdweb";
 *  import { sendCalls, getCallsStatus } from "thirdweb/wallets/eip5792";
 *
 *  const client = createThirdwebClient({ clientId: ... });
 *
 *  const result = await sendCalls({ wallet, client, calls });
 *
 *  let result;
 *  while (result.status !== "success") {
 *    result = await getCallsStatus(result);
 *  }
 * ```
 * @extension EIP5792
 */
async function getCallsStatus({ wallet, client, id, }) {
    const account = wallet.getAccount();
    if (!account) {
        throw new Error(`Failed to get call status, no account found for wallet ${wallet.id}`);
    }
    const chain = wallet.getChain();
    if (!chain) {
        throw new Error(`Failed to get call status, no chain found for wallet ${wallet.id}`);
    }
    if (account.getCallsStatus) {
        return account.getCallsStatus({ id, chain, client });
    }
    throw new Error(`Failed to get call status, wallet ${wallet.id} does not support EIP-5792`);
}
const receiptStatuses = {
    "0x0": "reverted",
    "0x1": "success",
};
function toGetCallsStatusResponse(response) {
    const [status, statusCode] = (() => {
        const statusCode = response.status;
        if (statusCode >= 100 && statusCode < 200)
            return ["pending", statusCode];
        if (statusCode >= 200 && statusCode < 300)
            return ["success", statusCode];
        if (statusCode >= 300 && statusCode < 700)
            return ["failure", statusCode];
        // @ts-expect-error: for backwards compatibility
        if (statusCode === "CONFIRMED")
            return ["success", 200];
        // @ts-expect-error: for backwards compatibility
        if (statusCode === "PENDING")
            return ["pending", 100];
        return [undefined, statusCode];
    })();
    return {
        ...response,
        atomic: response.atomic,
        // @ts-expect-error: for backwards compatibility
        chainId: response.chainId ? (0, hex_js_1.hexToNumber)(response.chainId) : undefined,
        receipts: response.receipts?.map((receipt) => ({
            ...receipt,
            blockNumber: (0, hex_js_1.hexToBigInt)(receipt.blockNumber),
            gasUsed: (0, hex_js_1.hexToBigInt)(receipt.gasUsed),
            status: receiptStatuses[receipt.status],
        })) ?? [],
        status,
        statusCode,
        version: response.version,
    };
}
//# sourceMappingURL=get-calls-status.js.map