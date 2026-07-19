import { decodeErrorResult, stringify } from "viem";
import { isInsufficientFundsError } from "../analytics/track/helpers.js";
import { trackInsufficientFundsError } from "../analytics/track/transaction.js";
import { resolveContractAbi } from "../contract/actions/resolve-abi.js";
import { isHex } from "../utils/encoding/hex.js";
import { IS_DEV } from "../utils/process.js";
/**
 * @internal
 */
export async function extractError(args) {
    const { error, contract, fromAddress } = args;
    // Track insufficient funds errors during transaction preparation
    if (isInsufficientFundsError(error) && contract) {
        trackInsufficientFundsError({
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
export async function extractErrorResult(args) {
    const { error, contract } = args;
    if (typeof error === "object") {
        // try to parse RPC error
        const errorObj = error;
        if (errorObj.data) {
            if (errorObj.data !== "0x" && isHex(errorObj.data)) {
                let abi = contract?.abi;
                if (contract && !abi) {
                    abi = await resolveContractAbi(contract).catch(() => undefined);
                }
                const parsedError = decodeErrorResult({
                    abi,
                    data: errorObj.data,
                });
                return `${parsedError.errorName}${parsedError.args ? ` - ${parsedError.args}` : ""}`;
            }
        }
    }
    return `Execution Reverted: ${stringify(error)}`;
}
class TransactionError extends Error {
    constructor(reason, contract) {
        let message = reason;
        if (IS_DEV && contract) {
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