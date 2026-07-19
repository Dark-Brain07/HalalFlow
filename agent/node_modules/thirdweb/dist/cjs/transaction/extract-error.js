"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractError = extractError;
exports.extractErrorResult = extractErrorResult;
const viem_1 = require("viem");
const helpers_js_1 = require("../analytics/track/helpers.js");
const transaction_js_1 = require("../analytics/track/transaction.js");
const resolve_abi_js_1 = require("../contract/actions/resolve-abi.js");
const hex_js_1 = require("../utils/encoding/hex.js");
const process_js_1 = require("../utils/process.js");
/**
 * @internal
 */
async function extractError(args) {
    const { error, contract, fromAddress } = args;
    // Track insufficient funds errors during transaction preparation
    if ((0, helpers_js_1.isInsufficientFundsError)(error) && contract) {
        (0, transaction_js_1.trackInsufficientFundsError)({
            chainId: contract.chain?.id,
            client: contract.client,
            contractAddress: contract.address,
            error,
            walletAddress: fromAddress,
        });
    }
    const result = await extractErrorResult({ contract, error });
    if (result) {
        return new TransactionError(result, contract);
    }
    return error;
}
async function extractErrorResult(args) {
    const { error, contract } = args;
    if (typeof error === "object") {
        // try to parse RPC error
        const errorObj = error;
        if (errorObj.data) {
            if (errorObj.data !== "0x" && (0, hex_js_1.isHex)(errorObj.data)) {
                let abi = contract?.abi;
                if (contract && !abi) {
                    abi = await (0, resolve_abi_js_1.resolveContractAbi)(contract).catch(() => undefined);
                }
                const parsedError = (0, viem_1.decodeErrorResult)({
                    abi,
                    data: errorObj.data,
                });
                return `${parsedError.errorName}${parsedError.args ? ` - ${parsedError.args}` : ""}`;
            }
        }
    }
    return `Execution Reverted: ${(0, viem_1.stringify)(error)}`;
}
class TransactionError extends Error {
    constructor(reason, contract) {
        let message = reason;
        if (process_js_1.IS_DEV && contract) {
            // show more infor in dev
            message = [
                reason,
                "",
                `contract: ${contract.address}`,
                `chainId: ${contract.chain?.id}`,
            ].join("\n");
        }
        super(message);
        Object.defineProperty(this, "contractAddress", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "chainId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.name = "TransactionError";
        this.contractAddress = contract?.address;
        this.chainId = contract?.chain?.id;
        this.message = message;
    }
}
//# sourceMappingURL=extract-error.js.map