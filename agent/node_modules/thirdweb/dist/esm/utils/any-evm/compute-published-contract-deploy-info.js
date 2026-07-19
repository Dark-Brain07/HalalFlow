import { encodePacked } from "viem";
import { fetchPublishedContractMetadata } from "../../contract/deployment/publisher.js";
import { computeCreate2FactoryAddress } from "../../contract/deployment/utils/create-2-factory.js";
import { computeRefDeployments } from "../../extensions/prebuilts/compute-ref-deployments.js";
import { encodeAbiParameters } from "../abi/encodeAbiParameters.js";
import { normalizeFunctionParams } from "../abi/normalizeFunctionParams.js";
import { ensureBytecodePrefix } from "../bytecode/prefix.js";
import { fetchBytecodeFromCompilerMetadata, } from "./deploy-metadata.js";
import { encodeExtraDataWithUri } from "./encode-extra-data-with-uri.js";
import { getInitBytecodeWithSalt } from "./get-init-bytecode-with-salt.js";
/**
 * @internal
 */
export async function computeDeploymentInfoFromContractId(args) {
    const { client, chain, contractId, constructorParams, salt } = args;
    const contractMetadata = await fetchPublishedContractMetadata({
        client,
        contractId,
        publisher: args.publisher,
        version: args.version,
    });
    return computeDeploymentInfoFromMetadata({
        chain,
        client,
        constructorParams,
        contractMetadata,
        salt,
    });
}
/**
 * @internal
 */
export async function computeDeploymentInfoFromMetadata(args) {
    const { client, chain, constructorParams, contractMetadata } = args;
    const definedConstructorParams = constructorParams || contractMetadata.constructorParams;
    let processedConstructorParams;
    if (definedConstructorParams) {
        processedConstructorParams = {};
        for (const key in definedConstructorParams) {
            processedConstructorParams[key] = await computeRefDeployments({
                chain,
                client,
                paramValue: definedConstructorParams[key],
            });
        }
    }
    const isStylus = contractMetadata.metadata.language === "rust";
    return computeDeploymentInfoFromBytecode({
        abi: args.contractMetadata.abi,
        bytecode: await fetchBytecodeFromCompilerMetadata({
            chain: args.chain,
            client: args.client,
            compilerMetadata: args.contractMetadata,
        }),
        chain: args.chain,
        client: args.client,
        constructorParams: processedConstructorParams,
        extraDataWithUri: isStylus
            ? encodeExtraDataWithUri({
                metadataUri: contractMetadata.metadataUri,
            })
            : undefined,
        salt: args.salt,
    });
}
export async function computeDeploymentInfoFromBytecode(args) {
    const { client, chain, constructorParams, salt, extraDataWithUri } = args;
    const create2FactoryAddress = await computeCreate2FactoryAddress({
        chain,
        client,
    });
    const bytecode = ensureBytecodePrefix(args.bytecode);
    const constructorAbi = args.abi.find((abi) => abi.type === "constructor");
    const encodedArgs = encodeAbiParameters(constructorAbi?.inputs ?? [], normalizeFunctionParams(constructorAbi, constructorParams));
    const initBytecodeWithsalt = getInitBytecodeWithSalt({
        bytecode,
        encodedArgs,
        salt,
    });
    const initCalldata = extraDataWithUri
        ? encodePacked(["bytes", "bytes"], [initBytecodeWithsalt, extraDataWithUri])
        : initBytecodeWithsalt;
    return {
        bytecode,
        create2FactoryAddress,
        encodedArgs,
        extraDataWithUri,
        initCalldata,
        salt,
    };
}
//# sourceMappingURL=compute-published-contract-deploy-info.js.map