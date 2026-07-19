"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deployPublishedContract = deployPublishedContract;
exports.deployContractfromDeployMetadata = deployContractfromDeployMetadata;
exports.getInitializeTransaction = getInitializeTransaction;
const contract_js_1 = require("../../contract/contract.js");
const publisher_js_1 = require("../../contract/deployment/publisher.js");
const send_and_confirm_transaction_js_1 = require("../../transaction/actions/send-and-confirm-transaction.js");
const simulate_js_1 = require("../../transaction/actions/simulate.js");
const prepare_contract_call_js_1 = require("../../transaction/prepare-contract-call.js");
const resolve_method_js_1 = require("../../transaction/resolve-method.js");
const encodeAbiParameters_js_1 = require("../../utils/abi/encodeAbiParameters.js");
const normalizeFunctionParams_js_1 = require("../../utils/abi/normalizeFunctionParams.js");
const address_js_1 = require("../../utils/address.js");
const deploy_metadata_js_1 = require("../../utils/any-evm/deploy-metadata.js");
const encode_extra_data_with_uri_js_1 = require("../../utils/any-evm/encode-extra-data-with-uri.js");
const isZkSyncChain_js_1 = require("../../utils/any-evm/zksync/isZkSyncChain.js");
const get_required_transactions_js_1 = require("./get-required-transactions.js");
const process_ref_deployments_js_1 = require("./process-ref-deployments.js");
/**
 * Deploy an instance of a published contract on a given chain
 * @param options - the deploy options
 * @returns a promise that resolves to the deployed contract address
 * @example
 *
 * ## Deploying a published contract
 *
 * ```ts
 * import { deployPublishedContract } from "thirdweb/deploys";
 *
 * const address = await deployPublishedContract({
 *   client,
 *   chain,
 *   account,
 *   contractId: "MyPublishedContract",
 *   contractParams: {
 *     param1: "value1",
 *     param2: 123,
 *   },
 *   publisher: "0x...", // optional, defaults to the thirdweb deployer
 * });
 * ```
 *
 *  ## Deploying a published contract deterministically
 *
 * ```ts
 * import { deployPublishedContract } from "thirdweb/deploys";
 *
 * const address = await deployPublishedContract({
 *   client,
 *   chain,
 *   account,
 *   contractId: "MyPublishedContract",
 *   contractParams: {
 *     param1: "value1",
 *     param2: 123,
 *   },
 *   publisher: "0x...",
 *   salt: "your-salt", // this will deterministically deploy the contract at the same address on all chains
 * });
 * ```
 * @extension DEPLOY
 */
async function deployPublishedContract(options) {
    const { client, account, chain, contractId, contractParams, publisher, version, implementationConstructorParams, salt, } = options;
    const deployMetadata = await (0, publisher_js_1.fetchPublishedContractMetadata)({
        client,
        contractId,
        publisher,
        version,
    });
    return deployContractfromDeployMetadata({
        account,
        chain,
        client,
        deployMetadata,
        implementationConstructorParams: {
            ...deployMetadata.implConstructorParams,
            ...implementationConstructorParams,
        },
        initializeParams: {
            ...deployMetadata.constructorParams,
            ...contractParams,
        },
        salt,
    });
}
/**
 * @internal
 */
async function deployContractfromDeployMetadata(options) {
    const { client, account, chain, initializeParams, initializeData, deployMetadata, isCrosschain, implementationConstructorParams, modules, salt, } = options;
    let processedImplParams;
    let processedInitializeParams;
    if (implementationConstructorParams) {
        processedImplParams = {};
        for (const key in implementationConstructorParams) {
            processedImplParams[key] = await (0, process_ref_deployments_js_1.processRefDeployments)({
                account,
                chain,
                client,
                paramValue: implementationConstructorParams[key],
            });
        }
    }
    if (initializeParams) {
        processedInitializeParams = {};
        for (const key in initializeParams) {
            processedInitializeParams[key] = await (0, process_ref_deployments_js_1.processRefDeployments)({
                account,
                chain,
                client,
                paramValue: initializeParams[key],
            });
        }
    }
    switch (deployMetadata?.deployType) {
        case "standard": {
            return directDeploy({
                account,
                chain,
                client,
                compilerMetadata: deployMetadata,
                contractParams: processedInitializeParams,
                metadataUri: deployMetadata.metadataUri,
                salt,
            });
        }
        case "autoFactory": {
            const [{ deployViaAutoFactory }, { getOrDeployInfraForPublishedContract },] = await Promise.all([
                Promise.resolve().then(() => require("../../contract/deployment/deploy-via-autofactory.js")),
                Promise.resolve().then(() => require("../../contract/deployment/utils/bootstrap.js")),
            ]);
            if (deployMetadata.routerType === "dynamic" &&
                deployMetadata.defaultExtensions &&
                !(await (0, isZkSyncChain_js_1.isZkSyncChain)(chain))) {
                for (const e of deployMetadata.defaultExtensions) {
                    await getOrDeployInfraForPublishedContract({
                        account,
                        chain,
                        client,
                        constructorParams: await (0, get_required_transactions_js_1.getAllDefaultConstructorParamsForImplementation)({
                            chain,
                            client,
                            contractId: e.extensionName,
                        }),
                        contractId: e.extensionName,
                        publisher: e.publisherAddress,
                        version: e.extensionVersion || "latest",
                    });
                }
            }
            const { cloneFactoryContract, implementationContract } = await getOrDeployInfraForPublishedContract({
                account,
                chain,
                client,
                constructorParams: {
                    ...(await (0, get_required_transactions_js_1.getAllDefaultConstructorParamsForImplementation)({
                        chain,
                        client,
                        contractId: deployMetadata.name,
                        defaultExtensions: deployMetadata.defaultExtensions,
                    })),
                    ...processedImplParams,
                },
                contractId: deployMetadata.name,
                publisher: deployMetadata.publisher,
                version: deployMetadata.version,
            });
            if (isCrosschain) {
                return deployViaAutoFactory({
                    account,
                    chain,
                    client,
                    cloneFactoryContract,
                    implementationAddress: implementationContract.address,
                    initializeData,
                    isCrosschain,
                    salt,
                });
            }
            const initializeTransaction = await getInitializeTransaction({
                account,
                chain,
                client,
                deployMetadata,
                implementationContract,
                initializeParams: processedInitializeParams,
                modules,
            });
            return deployViaAutoFactory({
                account,
                chain,
                client,
                cloneFactoryContract,
                initializeTransaction,
                salt,
            });
        }
        case "customFactory": {
            if (!deployMetadata?.factoryDeploymentData?.customFactoryInput) {
                throw new Error("No custom factory info found");
            }
            const factoryAddress = deployMetadata?.factoryDeploymentData?.customFactoryInput
                ?.customFactoryAddresses?.[chain.id];
            const factoryFunction = deployMetadata.factoryDeploymentData?.customFactoryInput
                ?.factoryFunction;
            if (!factoryAddress || !factoryFunction) {
                throw new Error(`No factory address found on chain ${chain.id}`);
            }
            const factory = (0, contract_js_1.getContract)({
                address: factoryAddress,
                chain,
                client,
            });
            const method = await (0, resolve_method_js_1.resolveMethod)(factoryFunction)(factory);
            const deployTx = (0, prepare_contract_call_js_1.prepareContractCall)({
                contract: factory,
                method,
                params: (0, normalizeFunctionParams_js_1.normalizeFunctionParams)(method, initializeParams),
            });
            // assumption here is that the factory address returns the deployed proxy address
            const address = await (0, simulate_js_1.simulateTransaction)({
                transaction: deployTx,
            });
            await (0, send_and_confirm_transaction_js_1.sendAndConfirmTransaction)({
                account,
                transaction: deployTx,
            });
            return address;
        }
        case undefined: {
            // Default to standard deployment if none was specified
            return directDeploy({
                account,
                chain,
                client,
                compilerMetadata: deployMetadata,
                contractParams: processedInitializeParams,
                metadataUri: deployMetadata.metadataUri,
                salt,
            });
        }
        default:
            // If a deployType was specified but we don't support it, throw an error
            throw new Error(`Unsupported deploy type: ${deployMetadata?.deployType}`);
    }
}
async function directDeploy(options) {
    const { account, client, chain, compilerMetadata, contractParams, salt } = options;
    const { deployContract } = await Promise.resolve().then(() => require("../../contract/deployment/deploy-with-abi.js"));
    const isStylus = options.compilerMetadata.metadata.language === "rust";
    return deployContract({
        abi: compilerMetadata.abi,
        account,
        bytecode: await (0, deploy_metadata_js_1.fetchBytecodeFromCompilerMetadata)({
            chain,
            client,
            compilerMetadata,
        }),
        chain,
        client,
        constructorParams: contractParams,
        extraDataWithUri: isStylus && options.metadataUri
            ? (0, encode_extra_data_with_uri_js_1.encodeExtraDataWithUri)({
                metadataUri: options.metadataUri,
            })
            : undefined,
        isStylus,
        salt,
    });
}
/**
 * Prepares the initialization transaction for a contract deployment
 * @param options - The options for generating the initialize transaction
 * @param options.client - The ThirdwebClient instance
 * @param options.chain - The blockchain network configuration
 * @param options.account - The account performing the initialization
 * @param options.implementationContract - The contract implementation to initialize
 * @param options.deployMetadata - The metadata for the contract deployment
 * @param options.initializeParams - Optional parameters to pass to the initialize function
 * @param options.modules - Optional array of modules to install during initialization
 * @param options.modules[].deployMetadata - The metadata for the module contract
 * @param options.modules[].initializeParams - Optional parameters for module initialization
 * @returns The prepared transaction for contract initialization
 * @contract
 */
async function getInitializeTransaction(options) {
    const { account, client, chain, deployMetadata: metadata, initializeParams = {}, implementationContract, modules = [], } = options;
    const initializeFunction = metadata.abi.find((i) => i.type === "function" &&
        i.name ===
            (metadata.factoryDeploymentData?.implementationInitializerFunction ||
                "initialize"));
    if (!initializeFunction) {
        throw new Error(`Could not find initialize function for ${metadata.name}`);
    }
    const hasModules = initializeFunction.inputs.find((i) => i.name === "modules" || i.name === "_modules") &&
        initializeFunction.inputs.find((i) => i.name === "moduleInstallData" || i.name === "_moduleInstallData");
    if (hasModules) {
        const moduleAddresses = [];
        const moduleInstallData = [];
        for (const module of modules) {
            // deploy the module if not already deployed
            const contractAddress = await deployContractfromDeployMetadata({
                account,
                chain,
                client,
                deployMetadata: module.deployMetadata,
                implementationConstructorParams: module.deployMetadata.implConstructorParams,
                salt: "",
            });
            const installFunction = module.deployMetadata.abi.find((i) => i.type === "function" && i.name === "encodeBytesOnInstall");
            moduleAddresses.push((0, address_js_1.getAddress)(contractAddress));
            moduleInstallData.push(installFunction
                ? (0, encodeAbiParameters_js_1.encodeAbiParameters)(installFunction.inputs, (0, normalizeFunctionParams_js_1.normalizeFunctionParams)(installFunction, module.initializeParams))
                : "0x");
        }
        initializeParams.modules = moduleAddresses;
        initializeParams.moduleInstallData = moduleInstallData;
    }
    const initializeTransaction = (0, prepare_contract_call_js_1.prepareContractCall)({
        contract: (0, contract_js_1.getContract)({
            address: implementationContract.address,
            chain,
            client,
        }),
        method: initializeFunction,
        params: (0, normalizeFunctionParams_js_1.normalizeFunctionParams)(initializeFunction, initializeParams),
    });
    return initializeTransaction;
}
//# sourceMappingURL=deploy-published.js.map