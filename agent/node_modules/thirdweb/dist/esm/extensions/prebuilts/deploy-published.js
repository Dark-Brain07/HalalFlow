import { getContract } from "../../contract/contract.js";
import { fetchPublishedContractMetadata } from "../../contract/deployment/publisher.js";
import { sendAndConfirmTransaction } from "../../transaction/actions/send-and-confirm-transaction.js";
import { simulateTransaction } from "../../transaction/actions/simulate.js";
import { prepareContractCall } from "../../transaction/prepare-contract-call.js";
import { resolveMethod } from "../../transaction/resolve-method.js";
import { encodeAbiParameters } from "../../utils/abi/encodeAbiParameters.js";
import { normalizeFunctionParams } from "../../utils/abi/normalizeFunctionParams.js";
import { getAddress } from "../../utils/address.js";
import { fetchBytecodeFromCompilerMetadata, } from "../../utils/any-evm/deploy-metadata.js";
import { encodeExtraDataWithUri } from "../../utils/any-evm/encode-extra-data-with-uri.js";
import { isZkSyncChain } from "../../utils/any-evm/zksync/isZkSyncChain.js";
import { getAllDefaultConstructorParamsForImplementation } from "./get-required-transactions.js";
import { processRefDeployments, } from "./process-ref-deployments.js";
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
export async function deployPublishedContract(options) {
    const { client, account, chain, contractId, contractParams, publisher, version, implementationConstructorParams, salt, } = options;
    const deployMetadata = await fetchPublishedContractMetadata({
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
export async function deployContractfromDeployMetadata(options) {
    const { client, account, chain, initializeParams, initializeData, deployMetadata, isCrosschain, implementationConstructorParams, modules, salt, } = options;
    let processedImplParams;
    let processedInitializeParams;
    if (implementationConstructorParams) {
        processedImplParams = {};
        for (const key in implementationConstructorParams) {
            processedImplParams[key] = await processRefDeployments({
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
            processedInitializeParams[key] = await processRefDeployments({
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
                import("../../contract/deployment/deploy-via-autofactory.js"),
                import("../../contract/deployment/utils/bootstrap.js"),
            ]);
            if (deployMetadata.routerType === "dynamic" &&
                deployMetadata.defaultExtensions &&
                !(await isZkSyncChain(chain))) {
                for (const e of deployMetadata.defaultExtensions) {
                    await getOrDeployInfraForPublishedContract({
                        account,
                        chain,
                        client,
                        constructorParams: await getAllDefaultConstructorParamsForImplementation({
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
                    ...(await getAllDefaultConstructorParamsForImplementation({
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
            const factory = getContract({
                address: factoryAddress,
                chain,
                client,
            });
            const method = await resolveMethod(factoryFunction)(factory);
            const deployTx = prepareContractCall({
                contract: factory,
                method,
                params: normalizeFunctionParams(method, initializeParams),
            });
            // assumption here is that the factory address returns the deployed proxy address
            const address = await simulateTransaction({
                transaction: deployTx,
            });
            await sendAndConfirmTransaction({
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
    const { deployContract } = await import("../../contract/deployment/deploy-with-abi.js");
    const isStylus = options.compilerMetadata.metadata.language === "rust";
    return deployContract({
        abi: compilerMetadata.abi,
        account,
        bytecode: await fetchBytecodeFromCompilerMetadata({
            chain,
            client,
            compilerMetadata,
        }),
        chain,
        client,
        constructorParams: contractParams,
        extraDataWithUri: isStylus && options.metadataUri
            ? encodeExtraDataWithUri({
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
export async function getInitializeTransaction(options) {
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
            moduleAddresses.push(getAddress(contractAddress));
            moduleInstallData.push(installFunction
                ? encodeAbiParameters(installFunction.inputs, normalizeFunctionParams(installFunction, module.initializeParams))
                : "0x");
        }
        initializeParams.modules = moduleAddresses;
        initializeParams.moduleInstallData = moduleInstallData;
    }
    const initializeTransaction = prepareContractCall({
        contract: getContract({
            address: implementationContract.address,
            chain,
            client,
        }),
        method: initializeFunction,
        params: normalizeFunctionParams(initializeFunction, initializeParams),
    });
    return initializeTransaction;
}
//# sourceMappingURL=deploy-published.js.map