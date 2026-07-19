import type { AbiParameterToPrimitiveType } from "abitype";
import type { BaseTransactionOptions } from "../../../../../transaction/types.js";
import type { Hex } from "../../../../../utils/encoding/hex.js";
/**
 * Represents the parameters for the "getDeployment" function.
 */
export type GetDeploymentParams = {
    id: AbiParameterToPrimitiveType<{
        type: "bytes32";
        name: "id";
    }>;
    version: AbiParameterToPrimitiveType<{
        type: "uint256";
        name: "version";
    }>;
};
export declare const FN_SELECTOR: "0x0a29517f";
/**
 * Checks if the `getDeployment` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `getDeployment` method is supported.
 * @extension TOKENS
 * @example
 * ```ts
 * import { isGetDeploymentSupported } from "thirdweb/extensions/tokens";
 * const supported = isGetDeploymentSupported(["0x..."]);
 * ```
 */
export declare function isGetDeploymentSupported(availableSelectors: string[]): boolean;
/**
 * Encodes the parameters for the "getDeployment" function.
 * @param options - The options for the getDeployment function.
 * @returns The encoded ABI parameters.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeGetDeploymentParams } from "thirdweb/extensions/tokens";
 * const result = encodeGetDeploymentParams({
 *  id: ...,
 *  version: ...,
 * });
 * ```
 */
export declare function encodeGetDeploymentParams(options: GetDeploymentParams): `0x${string}`;
/**
 * Encodes the "getDeployment" function into a Hex string with its parameters.
 * @param options - The options for the getDeployment function.
 * @returns The encoded hexadecimal string.
 * @extension TOKENS
 * @example
 * ```ts
 * import { encodeGetDeployment } from "thirdweb/extensions/tokens";
 * const result = encodeGetDeployment({
 *  id: ...,
 *  version: ...,
 * });
 * ```
 */
export declare function encodeGetDeployment(options: GetDeploymentParams): `${typeof FN_SELECTOR}${string}`;
/**
 * Decodes the result of the getDeployment function call.
 * @param result - The hexadecimal result to decode.
 * @returns The decoded result as per the FN_OUTPUTS definition.
 * @extension TOKENS
 * @example
 * ```ts
 * import { decodeGetDeploymentResult } from "thirdweb/extensions/tokens";
 * const result = decodeGetDeploymentResultResult("...");
 * ```
 */
export declare function decodeGetDeploymentResult(result: Hex): `0x${string}`;
/**
 * Calls the "getDeployment" function on the contract.
 * @param options - The options for the getDeployment function.
 * @returns The parsed result of the function call.
 * @extension TOKENS
 * @example
 * ```ts
 * import { getDeployment } from "thirdweb/extensions/tokens";
 *
 * const result = await getDeployment({
 *  contract,
 *  id: ...,
 *  version: ...,
 * });
 *
 * ```
 */
export declare function getDeployment(options: BaseTransactionOptions<GetDeploymentParams>): Promise<string>;
//# sourceMappingURL=getDeployment.d.ts.map