"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.smartAccountSignMessage = smartAccountSignMessage;
exports.smartAccountSignTypedData = smartAccountSignTypedData;
exports.confirmContractDeployment = confirmContractDeployment;
exports.deploySmartAccount = deploySmartAccount;
const serialize_erc6492_signature_js_1 = require("../../../auth/serialize-erc6492-signature.js");
const verify_hash_js_1 = require("../../../auth/verify-hash.js");
const encode_js_1 = require("../../../transaction/actions/encode.js");
const encodeAbiParameters_js_1 = require("../../../utils/abi/encodeAbiParameters.js");
const is_contract_deployed_js_1 = require("../../../utils/bytecode/is-contract-deployed.js");
const hashMessage_js_1 = require("../../../utils/hashing/hashMessage.js");
const hashTypedData_js_1 = require("../../../utils/hashing/hashTypedData.js");
const calls_js_1 = require("./calls.js");
/**
 * If the account is already deployed, generate an ERC-1271 signature.
 * If the account is not deployed, generate an ERC-6492 signature unless otherwise specified.
 *
 * @internal
 */
async function smartAccountSignMessage({ accountContract, factoryContract, options, message, }) {
    const originalMsgHash = (0, hashMessage_js_1.hashMessage)(message);
    let sig;
    const wrappedMessageHash = (0, encodeAbiParameters_js_1.encodeAbiParameters)([{ type: "bytes32" }], [originalMsgHash]);
    sig = await options.personalAccount.signTypedData({
        domain: {
            chainId: options.chain.id,
            name: "Account",
            verifyingContract: accountContract.address,
            version: "1",
        },
        message: { message: wrappedMessageHash },
        primaryType: "AccountMessage",
        types: { AccountMessage: [{ name: "message", type: "bytes" }] },
    });
    const isDeployed = await (0, is_contract_deployed_js_1.isContractDeployed)(accountContract);
    if (isDeployed) {
        const isValid = await (0, verify_hash_js_1.verifyEip1271Signature)({
            contract: accountContract,
            hash: originalMsgHash,
            signature: sig,
        });
        if (isValid) {
            return sig;
        }
        throw new Error("Failed to verify signature");
    }
    else {
        const deployTx = (0, calls_js_1.prepareCreateAccount)({
            accountSalt: options.overrides?.accountSalt,
            adminAddress: options.personalAccount.address,
            createAccountOverride: options.overrides?.createAccount,
            factoryContract,
        });
        if (!deployTx) {
            throw new Error("Create account override not provided");
        }
        const initCode = await (0, encode_js_1.encode)(deployTx);
        const erc6492Sig = (0, serialize_erc6492_signature_js_1.serializeErc6492Signature)({
            address: factoryContract.address,
            data: initCode,
            signature: sig,
        });
        return erc6492Sig;
    }
}
async function smartAccountSignTypedData({ accountContract, factoryContract, options, typedData, }) {
    const isSelfVerifyingContract = typedData.domain?.verifyingContract?.toLowerCase() ===
        accountContract.address?.toLowerCase();
    if (isSelfVerifyingContract) {
        // if the contract is self-verifying, we can just sign the message with the EOA (ie. adding a session key)
        return options.personalAccount.signTypedData(typedData);
    }
    const originalMsgHash = (0, hashTypedData_js_1.hashTypedData)(typedData);
    let sig;
    const wrappedMessageHash = (0, encodeAbiParameters_js_1.encodeAbiParameters)([{ type: "bytes32" }], [originalMsgHash]);
    sig = await options.personalAccount.signTypedData({
        domain: {
            chainId: options.chain.id,
            name: "Account",
            verifyingContract: accountContract.address,
            version: "1",
        },
        message: { message: wrappedMessageHash },
        primaryType: "AccountMessage",
        types: { AccountMessage: [{ name: "message", type: "bytes" }] },
    });
    const isDeployed = await (0, is_contract_deployed_js_1.isContractDeployed)(accountContract);
    if (isDeployed) {
        const isValid = await (0, verify_hash_js_1.verifyEip1271Signature)({
            contract: accountContract,
            hash: originalMsgHash,
            signature: sig,
        });
        if (isValid) {
            return sig;
        }
        throw new Error("Failed to verify signature");
    }
    else {
        const deployTx = (0, calls_js_1.prepareCreateAccount)({
            accountSalt: options.overrides?.accountSalt,
            adminAddress: options.personalAccount.address,
            createAccountOverride: options.overrides?.createAccount,
            factoryContract,
        });
        if (!deployTx) {
            throw new Error("Create account override not provided");
        }
        const initCode = await (0, encode_js_1.encode)(deployTx);
        const erc6492Sig = (0, serialize_erc6492_signature_js_1.serializeErc6492Signature)({
            address: factoryContract.address,
            data: initCode,
            signature: sig,
        });
        return erc6492Sig;
    }
}
async function confirmContractDeployment(args) {
    const { accountContract } = args;
    const startTime = Date.now();
    const timeout = 60000; // wait 1 minute max
    const { isContractDeployed } = await Promise.resolve().then(() => require("../../../utils/bytecode/is-contract-deployed.js"));
    let isDeployed = await isContractDeployed(accountContract);
    while (!isDeployed) {
        if (Date.now() - startTime > timeout) {
            throw new Error("Timeout: Smart account deployment not confirmed after 1 minute");
        }
        await new Promise((resolve) => setTimeout(resolve, 500));
        isDeployed = await isContractDeployed(accountContract);
    }
}
/**
 * Deployes a smart account via a dummy transaction. If the account is already deployed, this will do nothing.
 *
 * @param args - Arguments for the deployment.
 * @param args.smartAccount - The smart account to deploy.
 * @param args.chain - The chain to deploy on.
 * @param args.client - The client to use for the deployment.
 * @param args.accountContract - The account contract to deploy.
 *
 * @example
 * ```ts
 * import { deploySmartAccount } from "thirdweb";
 *
 * const account = await deploySmartAccount({
 *   smartAccount,
 *   chain,
 *   client,
 *   accountContract,
 * });
 * ```
 *
 * @wallet
 */
async function deploySmartAccount(args) {
    const { chain, client, smartAccount, accountContract } = args;
    const isDeployed = await (0, is_contract_deployed_js_1.isContractDeployed)(accountContract);
    if (isDeployed) {
        return;
    }
    const [{ sendTransaction }, { prepareTransaction }] = await Promise.all([
        Promise.resolve().then(() => require("../../../transaction/actions/send-transaction.js")),
        Promise.resolve().then(() => require("../../../transaction/prepare-transaction.js")),
    ]);
    const dummyTx = prepareTransaction({
        chain: chain,
        client: client,
        gas: 50000n,
        to: accountContract.address,
        value: 0n, // force gas to avoid simulation error
    });
    const deployResult = await sendTransaction({
        account: smartAccount,
        transaction: dummyTx,
    });
    await confirmContractDeployment({
        accountContract,
    });
    return deployResult;
}
//# sourceMappingURL=signing.js.map