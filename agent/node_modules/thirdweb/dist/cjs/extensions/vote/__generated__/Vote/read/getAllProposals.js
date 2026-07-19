"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FN_SELECTOR = void 0;
exports.isGetAllProposalsSupported = isGetAllProposalsSupported;
exports.decodeGetAllProposalsResult = decodeGetAllProposalsResult;
exports.getAllProposals = getAllProposals;
const viem_1 = require("viem");
const read_contract_js_1 = require("../../../../../transaction/read-contract.js");
const detectExtension_js_1 = require("../../../../../utils/bytecode/detectExtension.js");
exports.FN_SELECTOR = "0xcceb68f5";
const FN_INPUTS = [];
const FN_OUTPUTS = [
    {
        components: [
            {
                name: "proposalId",
                type: "uint256",
            },
            {
                name: "proposer",
                type: "address",
            },
            {
                name: "targets",
                type: "address[]",
            },
            {
                name: "values",
                type: "uint256[]",
            },
            {
                name: "signatures",
                type: "string[]",
            },
            {
                name: "calldatas",
                type: "bytes[]",
            },
            {
                name: "startBlock",
                type: "uint256",
            },
            {
                name: "endBlock",
                type: "uint256",
            },
            {
                name: "description",
                type: "string",
            },
        ],
        name: "allProposals",
        type: "tuple[]",
    },
];
/**
 * Checks if the `getAllProposals` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `getAllProposals` method is supported.
 * @extension VOTE
 * @example
 * ```ts
 * import { isGetAllProposalsSupported } from "thirdweb/extensions/vote";
 * const supported = isGetAllProposalsSupported(["0x..."]);
 * ```
 */
function isGetAllProposalsSupported(availableSelectors) {
    return (0, detectExtension_js_1.detectMethod)({
        availableSelectors,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
    });
}
/**
 * Decodes the result of the getAllProposals function call.
 * @param result - The hexadecimal result to decode.
 * @returns The decoded result as per the FN_OUTPUTS definition.
 * @extension VOTE
 * @example
 * ```ts
 * import { decodeGetAllProposalsResult } from "thirdweb/extensions/vote";
 * const result = decodeGetAllProposalsResultResult("...");
 * ```
 */
function decodeGetAllProposalsResult(result) {
    return (0, viem_1.decodeAbiParameters)(FN_OUTPUTS, result)[0];
}
/**
 * Calls the "getAllProposals" function on the contract.
 * @param options - The options for the getAllProposals function.
 * @returns The parsed result of the function call.
 * @extension VOTE
 * @example
 * ```ts
 * import { getAllProposals } from "thirdweb/extensions/vote";
 *
 * const result = await getAllProposals({
 *  contract,
 * });
 *
 * ```
 */
async function getAllProposals(options) {
    return (0, read_contract_js_1.readContract)({
        contract: options.contract,
        method: [exports.FN_SELECTOR, FN_INPUTS, FN_OUTPUTS],
        params: [],
    });
}
//# sourceMappingURL=getAllProposals.js.map