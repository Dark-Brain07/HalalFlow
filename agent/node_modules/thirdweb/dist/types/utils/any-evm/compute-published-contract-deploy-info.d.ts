import type { Abi } from "abitype";
import type { Chain } from "../../chains/types.js";
import type { ThirdwebClient } from "../../client/client.js";
import type { Hex } from "../encoding/hex.js";
import { type FetchDeployMetadataResult } from "./deploy-metadata.js";
/**
 * @internal
 */
export declare function computeDeploymentInfoFromContractId(args: {
    client: ThirdwebClient;
    chain: Chain;
    contractId: string;
    constructorParams?: Record<string, unknown>;
    publisher?: string;
    version?: string;
    salt?: string;
}): Promise<{
    bytecode: `0x${string}`;
    create2FactoryAddress: string;
    encodedArgs: `0x${string}`;
    extraDataWithUri: `0x${string}` | undefined;
    initCalldata: `0x${string}`;
    salt: string | undefined;
}>;
/**
 * @internal
 */
export declare function computeDeploymentInfoFromMetadata(args: {
    client: ThirdwebClient;
    chain: Chain;
    contractMetadata: FetchDeployMetadataResult;
    constructorParams?: Record<string, unknown>;
    salt?: string;
}): Promise<{
    bytecode: `0x${string}`;
    create2FactoryAddress: string;
    encodedArgs: `0x${string}`;
    extraDataWithUri: `0x${string}` | undefined;
    initCalldata: `0x${string}`;
    salt: string | undefined;
}>;
export declare function computeDeploymentInfoFromBytecode(args: {
    client: ThirdwebClient;
    chain: Chain;
    abi: Abi;
    bytecode: Hex;
    constructorParams?: Record<string, unknown>;
    salt?: string;
    extraDataWithUri?: Hex;
}): Promise<{
    bytecode: `0x${string}`;
    create2FactoryAddress: string;
    encodedArgs: `0x${string}`;
    extraDataWithUri: `0x${string}` | undefined;
    initCalldata: `0x${string}`;
    salt: string | undefined;
}>;
//# sourceMappingURL=compute-published-contract-deploy-info.d.ts.map