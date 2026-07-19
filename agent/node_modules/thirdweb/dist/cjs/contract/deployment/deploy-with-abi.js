"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareDirectDeployTransaction = prepareDirectDeployTransaction;
exports.deployContract = deployContract;
const parse_logs_js_1 = require("../../event/actions/parse-logs.js");
const ContractDeployed_js_1 = require("../../extensions/stylus/__generated__/IStylusDeployer/events/ContractDeployed.js");
const activateStylusContract_js_1 = require("../../extensions/stylus/write/activateStylusContract.js");
const deployWithStylusConstructor_js_1 = require("../../extensions/stylus/write/deployWithStylusConstructor.js");
const isContractActivated_js_1 = require("../../extensions/stylus/write/isContractActivated.js");
const send_and_confirm_transaction_js_1 = require("../../transaction/actions/send-and-confirm-transaction.js");
const send_transaction_js_1 = require("../../transaction/actions/send-transaction.js");
const prepare_transaction_js_1 = require("../../transaction/prepare-transaction.js");
const encodeAbiParameters_js_1 = require("../../utils/abi/encodeAbiParameters.js");
const normalizeFunctionParams_js_1 = require("../../utils/abi/normalizeFunctionParams.js");
const compute_deployment_address_js_1 = require("../../utils/any-evm/compute-deployment-address.js");
const compute_published_contract_deploy_info_js_1 = require("../../utils/any-evm/compute-published-contract-deploy-info.js");
const isZkSyncChain_js_1 = require("../../utils/any-evm/zksync/isZkSyncChain.js");
const is_contract_deployed_js_1 = require("../../utils/bytecode/is-contract-deployed.js");
const prefix_js_1 = require("../../utils/bytecode/prefix.js");
const concat_hex_js_1 = require("../../utils/encoding/helpers/concat-hex.js");
const hex_js_1 = require("../../utils/encoding/hex.js");
const contract_js_1 = require("../contract.js");
const zkDeployContract_js_1 = require("./zksync/zkDeployContract.js");
/**
 * Prepares a direct deploy transaction with ABI.
 * @template TConstructor - The type of the ABI constructor.
 * @param options - The options for preparing the transaction.
 * @returns - The prepared transaction.
 * @example
 * ```ts
 * import { prepareDirectDeployTransaction } from "thirdweb/deploys";
 * import { ethereum } from "thirdweb/chains";
 * const tx = prepareDirectDeployTransaction({
 *  client,
 *  chain: ethereum,
 *  bytecode: "0x...",
 *  constructorAbi: {
 *    inputs: [{ type: "uint256", name: "value" }],
 *    type: "constructor",
 *  },
 *  constructorParams: [123],
 * });
 * ```
 * @extension DEPLOY
 */
function prepareDirectDeployTransaction(options) {
    const bytecode = (0, prefix_js_1.ensureBytecodePrefix)(options.bytecode);
    if (!(0, hex_js_1.isHex)(bytecode)) {
        throw new Error(`Contract bytecode is invalid.\n\n${bytecode}`);
    }
    const constructorAbi = options.abi.find((abi) => abi.type === "constructor");
    // prepare the tx
    return (0, prepare_transaction_js_1.prepareTransaction)({
        chain: options.chain,
        client: options.client,
        // the data is the bytecode and the constructor parameters
        data: (0, concat_hex_js_1.concatHex)([
            bytecode,
            (0, encodeAbiParameters_js_1.encodeAbiParameters)(constructorAbi?.inputs || [], // Leave an empty array if there's no constructor
            (0, normalizeFunctionParams_js_1.normalizeFunctionParams)(constructorAbi, options.constructorParams)),
            options.extraDataWithUri || "0x",
        ]),
    });
}
/**
 * Deploy a contract on a given chain
 * @param options - the deploy options
 * @returns - a promise that resolves to the deployed contract address
 * @example
 *
 * ## Deploying a regular contract from ABI and bytecode
 *
 * ```ts
 * import { deployContract } from "thirdweb/deploys";
 *
 * const address = await deployContract({
 *  client,
 *  chain,
 *  bytecode: "0x...",
 *  abi: contractAbi,
 *  constructorParams: {
 *    param1: "value1",
 *    param2: 123,
 *  },
 *  salt, // optional: salt enables deterministic deploys
 * });
 * ```
 *
 * ## Deploying a contract deterministically
 *
 * ```ts
 * import { deployContract } from "thirdweb/deploys";
 *
 * const address = await deployContract({
 *  client,
 *  chain,
 *  bytecode: "0x...",
 *  abi: contractAbi,
 *  constructorParams: {
 *    param1: "value1",
 *    param2: 123,
 *  },
 *  salt, // passing a salt will enable deterministic deploys
 * });
 * ```
 * @extension DEPLOY
 */
async function deployContract(options) {
    if (await (0, isZkSyncChain_js_1.isZkSyncChain)(options.chain)) {
        return (0, zkDeployContract_js_1.zkDeployContract)({
            abi: options.abi,
            account: options.account,
            bytecode: options.bytecode,
            chain: options.chain,
            client: options.client,
            params: options.constructorParams,
            salt: options.salt,
        });
    }
    let address;
    if (options.salt !== undefined) {
        // Deploy with CREATE2 if salt is provided
        const info = await (0, compute_published_contract_deploy_info_js_1.computeDeploymentInfoFromBytecode)(options);
        address = (0, compute_deployment_address_js_1.computeDeploymentAddress)({
            bytecode: options.bytecode,
            create2FactoryAddress: info.create2FactoryAddress,
            encodedArgs: info.encodedArgs,
            extraDataWithUri: options.extraDataWithUri,
            salt: options.salt,
        });
        const isDeployed = await (0, is_contract_deployed_js_1.isContractDeployed)((0, contract_js_1.getContract)({
            address,
            chain: options.chain,
            client: options.client,
        }));
        if (isDeployed) {
            return address;
        }
        await (0, send_and_confirm_transaction_js_1.sendAndConfirmTransaction)({
            account: options.account,
            transaction: (0, prepare_transaction_js_1.prepareTransaction)({
                chain: options.chain,
                client: options.client,
                data: info.initCalldata,
                to: info.create2FactoryAddress,
            }),
        });
    }
    else if (options.isStylus && options.constructorParams) {
        const isActivated = await (0, isContractActivated_js_1.isContractActivated)(options);
        if (!isActivated) {
            // one time deploy to activate the new codehash
            const impl = await deployContract({
                ...options,
                abi: [],
                constructorParams: undefined,
            });
            // fetch metadata
            await fetch(`https://contract.thirdweb.com/metadata/${options.chain.id}/${impl}`, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "GET",
            });
        }
        const deployTx = (0, deployWithStylusConstructor_js_1.deployWithStylusConstructor)({
            abi: options.abi,
            bytecode: options.bytecode,
            chain: options.chain,
            client: options.client,
            constructorParams: options.constructorParams,
        });
        const receipt = await (0, send_and_confirm_transaction_js_1.sendAndConfirmTransaction)({
            account: options.account,
            transaction: deployTx,
        });
        const deployEvent = (0, ContractDeployed_js_1.contractDeployedEvent)();
        const decodedEvent = (0, parse_logs_js_1.parseEventLogs)({
            events: [deployEvent],
            logs: receipt.logs,
        });
        if (decodedEvent.length === 0 || !decodedEvent[0]) {
            throw new Error(`No ContractDeployed event found in transaction: ${receipt.transactionHash}`);
        }
        address = decodedEvent[0]?.args.deployedContract;
    }
    else {
        const deployTx = prepareDirectDeployTransaction(options);
        const receipt = await (0, send_and_confirm_transaction_js_1.sendAndConfirmTransaction)({
            account: options.account,
            transaction: deployTx,
        });
        address = receipt.contractAddress;
        if (!address) {
            throw new Error(`Could not find deployed contract address in transaction: ${receipt.transactionHash}`);
        }
    }
    if (options.isStylus) {
        try {
            const activationTransaction = await (0, activateStylusContract_js_1.activateStylusContract)({
                chain: options.chain,
                client: options.client,
                contractAddress: address,
            });
            await (0, send_transaction_js_1.sendTransaction)({
                account: options.account,
                transaction: activationTransaction,
            });
        }
        catch {
            console.error("Error: Contract could not be activated.");
        }
    }
    return address;
}
//# sourceMappingURL=deploy-with-abi.js.map