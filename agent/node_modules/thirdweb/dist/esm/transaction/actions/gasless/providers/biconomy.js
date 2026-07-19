import { encodeAbiParameters } from "viem";
import { ZERO_ADDRESS } from "../../../../constants/addresses.js";
import { getContract } from "../../../../contract/contract.js";
import { getAddress } from "../../../../utils/address.js";
import { isHex } from "../../../../utils/encoding/helpers/is-hex.js";
import { keccak256 } from "../../../../utils/hashing/keccak256.js";
import { stringify } from "../../../../utils/json.js";
import { readContract } from "../../../read-contract.js";
// we do not send multiple batches so this stays consistent
const BATCH_ID = 0n;
/**
 * @internal - only exported for testing
 */
export async function prepareBiconomyTransaction({ account, serializableTransaction, transaction, gasless, }) {
    const forwarderContract = getContract({
        address: gasless.relayerForwarderAddress,
        chain: transaction.chain,
        client: transaction.client,
    });
    // get the nonce
    const nonce = await readContract({
        contract: forwarderContract,
        method: "function getNonce(address,uint256) view returns (uint256)",
        params: [account.address, BATCH_ID],
    });
    const deadline = Math.floor(Date.now() / 1000) + (gasless.deadlineSeconds ?? 3600);
    const request = {
        batchId: BATCH_ID,
        batchNonce: nonce,
        data: serializableTransaction.data,
        deadline: deadline,
        from: account.address,
        to: serializableTransaction.to,
        token: ZERO_ADDRESS,
        tokenGasPrice: 0n,
        txGas: serializableTransaction.gas,
    };
    if (!request.to) {
        throw new Error("Cannot send a transaction without a `to` address");
    }
    if (!request.txGas) {
        throw new Error("Cannot send a transaction without a `gas` value");
    }
    if (!request.data) {
        throw new Error("Cannot send a transaction without a `data` value");
    }
    // create the hash
    const message = encodeAbiParameters([
        { type: "address" },
        { type: "address" },
        { type: "address" },
        { type: "uint256" },
        { type: "uint256" },
        { type: "uint256" },
        { type: "uint256" },
        { type: "bytes32" },
    ], [
        getAddress(request.from),
        getAddress(request.to),
        getAddress(request.token),
        request.txGas,
        request.tokenGasPrice,
        request.batchId,
        request.batchNonce,
        keccak256(request.data),
    ]);
    const signature = await account.signMessage({ message });
    return [request, signature];
}
/**
 * @internal
 */
export async function relayBiconomyTransaction(options) {
    const [request, signature] = await prepareBiconomyTransaction(options);
    // send the transaction to the biconomy api
    const response = await fetch("https://api.biconomy.io/api/v2/meta-tx/native", {
        body: stringify({
            apiId: options.gasless.apiId,
            from: request.from,
            gasLimit: request.txGas,
            params: [request, signature],
            to: request.to,
        }),
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            "x-api-key": options.gasless.apiKey,
        },
        method: "POST",
    });
    if (!response.ok) {
        throw new Error(`Failed to send transaction: ${await response.text()}`);
    }
    const json = await response.json();
    const transactionHash = json.txHash;
    if (isHex(transactionHash)) {
        return {
            chain: options.transaction.chain,
            client: options.transaction.client,
            transactionHash: transactionHash,
        };
    }
    throw new Error(`Failed to send transaction: ${stringify(json)}`);
}
//# sourceMappingURL=biconomy.js.map