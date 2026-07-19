import type { AbiEventParameter, AbiParameter } from '../abi.js';
import type { Join } from '../types.js';
import { type FormatAbiParameter } from './formatAbiParameter.js';
/**
 * Formats {@link AbiParameter}s to human-readable ABI parameter.
 *
 * @param abiParameters - ABI parameters
 * @returns Human-readable ABI parameters
 *
 * @deprecated Human-readable ABI utilities are moving to Ox.
 * Install [`ox`](https://oxlib.sh) and use [`AbiParameters.format.ReturnType`](https://oxlib.sh/api/AbiParameters/format#return-type) instead:
 * `import { AbiParameters } from 'ox'`.
 *
 * @example
 * type Result = FormatAbiParameters<[
 *   // ^? type Result = 'address from, uint256 tokenId'
 *   { type: 'address'; name: 'from'; },
 *   { type: 'uint256'; name: 'tokenId'; },
 * ]>
 */
export type FormatAbiParameters<abiParameters extends readonly [
    AbiParameter | AbiEventParameter,
    ...(readonly (AbiParameter | AbiEventParameter)[])
]> = Join<{
    [key in keyof abiParameters]: FormatAbiParameter<abiParameters[key]>;
}, ', '>;
/**
 * Formats {@link AbiParameter}s to human-readable ABI parameters.
 *
 * @param abiParameters - ABI parameters
 * @returns Human-readable ABI parameters
 *
 * @deprecated Human-readable ABI utilities are moving to Ox.
 * Install [`ox`](https://oxlib.sh) and use [`AbiParameters.format`](https://oxlib.sh/api/AbiParameters/format) instead:
 * `import { AbiParameters } from 'ox'`.
 *
 * @example
 * const result = formatAbiParameters([
 *   //  ^? const result: 'address from, uint256 tokenId'
 *   { type: 'address', name: 'from' },
 *   { type: 'uint256', name: 'tokenId' },
 * ])
 */
export declare function formatAbiParameters<const abiParameters extends readonly [
    AbiParameter | AbiEventParameter,
    ...(readonly (AbiParameter | AbiEventParameter)[])
]>(abiParameters: abiParameters): FormatAbiParameters<abiParameters>;
//# sourceMappingURL=formatAbiParameters.d.ts.map