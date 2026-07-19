import { hexToBigInt, hexToNumber, } from "../../../../utils/encoding/hex.js";
import { validateAccountAddress } from "../utils.js";
/**
 * @internal
 */
export async function handleSignTransactionRequest(options) {
    const { account, params: [transaction], } = options;
    if (!account.signTransaction) {
        throw new Error("The current account does not support signing transactions");
    }
    if (transaction.from !== undefined) {
        validateAccountAddress(account, transaction.from);
    }
    return account.signTransaction({
        data: transaction.data,
        gas: transaction.gas ? hexToBigInt(transaction.gas) : undefined,
        gasPrice: transaction.gasPrice
            ? hexToBigInt(transaction.gasPrice)
            : undefined,
        nonce: transaction.nonce ? hexToNumber(transaction.nonce) : undefined,
        to: transaction.to,
        value: transaction.value ? hexToBigInt(transaction.value) : undefined,
    });
}
//# sourceMappingURL=sign-transaction.js.map