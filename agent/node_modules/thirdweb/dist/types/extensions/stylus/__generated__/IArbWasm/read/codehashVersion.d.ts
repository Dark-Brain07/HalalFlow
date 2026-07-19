import type { AbiParameterToPrimitiveType } from "abitype";
import type { BaseTransactionOptions } from "../../../../../transaction/types.js";
import type { Hex } from "../../../../../utils/encoding/hex.js";
/**
 * Represents the parameters for the "codehashVersion" function.
 */
export type CodehashVersionParams = {
    codehash: AbiParameterToPrimitiveType<{
        type: "bytes32";
        name: "codehash";
    }>;
};
export declare const FN_SELECTOR: "0xd70c0ca7";
/**
 * Checks if the `codehashVersion` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `codehashVersion` method is supported.
 * @extension STYLUS
 * @example
 * ```ts
 * import { isCodehashVersionSupported } from "thirdweb/extensions/stylus";
 * const supported = isCodehashVersionSupported(["0x..."]);
 * ```
 */
export declare function isCodehashVersionSupported(availableSelectors: string[]): boolean;
/**
 * Encodes the parameters for the "codehashVersion" function.
 * @param options - The options for the codehashVersion function.
 * @returns The encoded ABI parameters.
 * @extension STYLUS
 * @example
 * ```ts
 * import { encodeCodehashVersionParams } from "thirdweb/extensions/stylus";
 * const result = encodeCodehashVersionParams({
 *  codehash: ...,
 * });
 * ```
 */
export declare function encodeCodehashVersionParams(options: CodehashVersionParams): `0x${string}`;
/**
 * Encodes the "codehashVersion" function into a Hex string with its parameters.
 * @param options - The options for the codehashVersion function.
 * @returns The encoded hexadecimal string.
 * @extension STYLUS
 * @example
 * ```ts
 * import { encodeCodehashVersion } from "thirdweb/extensions/stylus";
 * const result = encodeCodehashVersion({
 *  codehash: ...,
 * });
 * ```
 */
export declare function encodeCodehashVersion(options: CodehashVersionParams): `${typeof FN_SELECTOR}${string}`;
/**
 * Decodes the result of the codehashVersion function call.
 * @param result - The hexadecimal result to decode.
 * @returns The decoded result as per the FN_OUTPUTS definition.
 * @extension STYLUS
 * @example
 * ```ts
 * import { decodeCodehashVersionResult } from "thirdweb/extensions/stylus";
 * const result = decodeCodehashVersionResultResult("...");
 * ```
 */
export declare function decodeCodehashVersionResult(result: Hex): number;
/**
 * Calls the "codehashVersion" function on the contract.
 * @param options - The options for the codehashVersion function.
 * @returns The parsed result of the function call.
 * @extension STYLUS
 * @example
 * ```ts
 * import { codehashVersion } from "thirdweb/extensions/stylus";
 *
 * const result = await codehashVersion({
 *  contract,
 *  codehash: ...,
 * });
 *
 * ```
 */
export declare function codehashVersion(options: BaseTransactionOptions<CodehashVersionParams>): Promise<number>;
//# sourceMappingURL=codehashVersion.d.ts.map