"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FN_SELECTOR = void 0;
exports.isEip712DomainSupported = isEip712DomainSupported;
exports.decodeEip712DomainResult = decodeEip712DomainResult;
exports.eip712Domain = eip712Domain;
const viem_1 = require("viem");
const read_contract_js_1 = require("../../../../../transaction/read-contract.js");
const detectExtension_js_1 = require("../../../../../utils/bytecode/detectExtension.js");
exports.FN_SELECTOR = "0x84b0196e";
const FN_INPUTS = [];
const FN_OUTPUTS = [
    {
        name: "fields",
        type: "bytes1",
    },
    {
        name: "name",
        type: "string",
    },
    {
        name: "version",
        type: "string",
    },
    {
        name: "chainId",
        type: "uint256",
    },
    {
        name: "verifyingContract",
        type: "address",
    },
    {
        name: "salt",
        type: "bytes32",
    },
    {
        name: "extensions",
        type: "uint256[]",
    },
];
/**
 * Checks if the `eip712Domain` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `eip712Domain` method is supported.
 * @extension AIRDROP
 * @example
 * ```ts
 * import { isEip712DomainSupported } from "thirdweb/extensions/airdrop";
 * const supported = isEip712DomainSupported(["0x..."]);
 * ```
 */
function isEip712DomainSupported(availableSelectors) {
    return (0, detectExtension_js_1.detectMethod)({
        availableSelectors,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Decodes the result of the eip712Domain function call.
 * @param result - The hexadecimal result to decode.
 * @returns The decoded result as per the FN_OUTPUTS definition.
 * @extension AIRDROP
 * @example
 * ```ts
 * import { decodeEip712DomainResult } from "thirdweb/extensions/airdrop";
 * const result = decodeEip712DomainResultResult("...");
 * ```
 */
function decodeEip712DomainResult(result) {
    return (0, viem_1.decodeAbiParameters)(FN_OUTPUTS, result);
}
/**
 * Calls the "eip712Domain" function on the contract.
 * @param options - The options for the eip712Domain function.
 * @returns The parsed result of the function call.
 * @extension AIRDROP
 * @example
 * ```ts
 * import { eip712Domain } from "thirdweb/extensions/airdrop";
 *
 * const result = await eip712Domain({
 *  contract,
 * });
 *
 * ```
 */
async function eip712Domain(options) {
    return (0, read_contract_js_1.readContract)({
        contract: options.contract,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
        params: [],
    });
}
//# sourceMappingURL=eip712Domain.js.map