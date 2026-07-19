import { concat, pad, toHex } from "viem";
function getInitCode(unpackedUserOperation) {
    return unpackedUserOperation.factory
        ? concat([
            unpackedUserOperation.factory,
            unpackedUserOperation.factoryData || "0x",
        ])
        : "0x";
}
function getAccountGasLimits(unpackedUserOperation) {
    return concat([
        pad(toHex(BigInt(unpackedUserOperation.verificationGasLimit)), {
            size: 16,
        }),
        pad(toHex(BigInt(unpackedUserOperation.callGasLimit)), { size: 16 }),
    ]);
}
function getGasLimits(unpackedUserOperation) {
    return concat([
        pad(toHex(BigInt(unpackedUserOperation.maxPriorityFeePerGas)), {
            size: 16,
        }),
        pad(toHex(BigInt(unpackedUserOperation.maxFeePerGas)), { size: 16 }),
    ]);
}
function getPaymasterAndData(unpackedUserOperation) {
    return unpackedUserOperation.paymaster
        ? concat([
            unpackedUserOperation.paymaster,
            pad(toHex(BigInt(unpackedUserOperation.paymasterVerificationGasLimit || 0)), {
                size: 16,
            }),
            pad(toHex(BigInt(unpackedUserOperation.paymasterPostOpGasLimit || 0)), {
                size: 16,
            }),
            unpackedUserOperation.paymasterData || "0x",
        ])
        : "0x";
}
export const getPackedUserOperation = (userOperation) => {
    return {
        accountGasLimits: getAccountGasLimits(userOperation),
        callData: userOperation.callData,
        gasFees: getGasLimits(userOperation),
        initCode: getInitCode(userOperation),
        nonce: BigInt(userOperation.nonce),
        paymasterAndData: getPaymasterAndData(userOperation),
        preVerificationGas: BigInt(userOperation.preVerificationGas),
        sender: userOperation.sender,
        signature: userOperation.signature,
    };
};
//# sourceMappingURL=packUserOp.js.map