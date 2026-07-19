export function formatUserOperationReceipt(userOpReceiptRaw) {
    const { receipt: transactionReceipt } = userOpReceiptRaw;
    const receipt = {
        ...transactionReceipt,
        blockNumber: transactionReceipt.blockNumber
            ? BigInt(transactionReceipt.blockNumber)
            : null,
        contractAddress: transactionReceipt.contractAddress
            ? transactionReceipt.contractAddress
            : null,
        cumulativeGasUsed: transactionReceipt.cumulativeGasUsed
            ? BigInt(transactionReceipt.cumulativeGasUsed)
            : null,
        effectiveGasPrice: transactionReceipt.effectiveGasPrice
            ? BigInt(transactionReceipt.effectiveGasPrice)
            : null,
        gasUsed: transactionReceipt.gasUsed
            ? BigInt(transactionReceipt.gasUsed)
            : null,
        logs: transactionReceipt.logs,
        status: transactionReceipt.status,
        to: transactionReceipt.to ? transactionReceipt.to : null,
        transactionHash: transactionReceipt.transactionHash,
        transactionIndex: transactionReceipt.transactionIndex,
        type: transactionReceipt.type,
    };
    if (transactionReceipt.blobGasPrice)
        receipt.blobGasPrice = BigInt(transactionReceipt.blobGasPrice);
    if (transactionReceipt.blobGasUsed)
        receipt.blobGasUsed = BigInt(transactionReceipt.blobGasUsed);
    const userOpReceipt = {
        ...userOpReceiptRaw,
        actualGasCost: BigInt(userOpReceiptRaw.actualGasCost),
        actualGasUsed: BigInt(userOpReceiptRaw.actualGasUsed),
        nonce: BigInt(userOpReceiptRaw.nonce),
        receipt,
        userOpHash: userOpReceiptRaw.userOpHash,
    };
    return userOpReceipt;
}
//# sourceMappingURL=types.js.map