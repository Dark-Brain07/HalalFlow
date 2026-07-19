"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deployWithStylusConstructor = deployWithStylusConstructor;
const contract_js_1 = require("../../../contract/contract.js");
const stylus_constructor_js_1 = require("../../../extensions/stylus/__generated__/IStylusConstructor/write/stylus_constructor.js");
const encodeAbiParameters_js_1 = require("../../../utils/abi/encodeAbiParameters.js");
const normalizeFunctionParams_js_1 = require("../../../utils/abi/normalizeFunctionParams.js");
const hex_js_1 = require("../../../utils/encoding/hex.js");
const deploy_js_1 = require("../__generated__/IStylusDeployer/write/deploy.js");
const STYLUS_DEPLOYER = "0xcEcba2F1DC234f70Dd89F2041029807F8D03A990";
/**
 * Deploy stylus contract with constructor params
 * @param options - The options deploying contract with constructor
 * @returns Prepared transaction to call stylus deployer
 * @example
 * ```ts
 * import { deployWithStylusConstructor } from "thirdweb/stylus";
 * const transaction = deployWithStylusConstructor({
 *  client,
 *  chain,
 *  bytecode,
 *  constructorParams,
 *  abi
 * });
 * await sendTransaction({ transaction, account });
 * ```
 */
function deployWithStylusConstructor(options) {
    const { chain, client, constructorParams, abi, bytecode } = options;
    const bytecodeHex = bytecode.startsWith("0x")
        ? bytecode
        : `0x${bytecode}`;
    const stylusDeployer = (0, contract_js_1.getContract)({
        address: STYLUS_DEPLOYER,
        chain,
        client,
    });
    const constructorAbi = abi.find((a) => a.type === "constructor");
    const normalized = (0, normalizeFunctionParams_js_1.normalizeFunctionParams)(constructorAbi, constructorParams);
    const constructorCalldata = (stylus_constructor_js_1.FN_SELECTOR +
        (0, encodeAbiParameters_js_1.encodeAbiParameters)(constructorAbi?.inputs || [], // Leave an empty array if there's no constructor
        normalized).slice(2));
    return (0, deploy_js_1.deploy)({
        bytecode: bytecodeHex,
        contract: stylusDeployer,
        initData: constructorCalldata,
        initValue: 0n,
        salt: (0, hex_js_1.toHex)(0, { size: 32 }),
    });
}
//# sourceMappingURL=deployWithStylusConstructor.js.map