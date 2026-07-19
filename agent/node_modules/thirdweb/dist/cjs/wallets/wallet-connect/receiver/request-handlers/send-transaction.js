"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleSendTransactionRequest = handleSendTransactionRequest;
const utils_js_1 = require("../../../../chains/utils.js");
const send_transaction_js_1 = require("../../../../transaction/actions/send-transaction.js");
const prepare_transaction_js_1 = require("../../../../transaction/prepare-transaction.js");
const hex_js_1 = require("../../../../utils/encoding/hex.js");
const utils_js_2 = require("../utils.js");
/**
 * @internal
 */
async function handleSendTransactionRequest(options) {
    const { account, chainId, thirdwebClient, params: [transaction], } = options;
    if (transaction.from !== undefined) {
        (0, utils_js_2.validateAccountAddress)(account, transaction.from);
    }
    const preparedTransaction = (0, prepare_transaction_js_1.prepareTransaction)({
        chain: (0, utils_js_1.getCachedChain)(chainId),
        client: thirdwebClient,
        data: transaction.data,
        gas: transaction.gas ? (0, hex_js_1.hexToBigInt)(transaction.gas) : undefined,
        gasPrice: transaction.gasPrice
            ? (0, hex_js_1.hexToBigInt)(transaction.gasPrice)
            : undefined,
        to: transaction.to,
        value: transaction.value ? (0, hex_js_1.hexToBigInt)(transaction.value) : undefined,
    });
    const txResult = await (0, send_transaction_js_1.sendTransaction)({
        account,
        transaction: preparedTransaction,
    });
    return txResult.transactionHash;
}
//# sourceMappingURL=send-transaction.js.map