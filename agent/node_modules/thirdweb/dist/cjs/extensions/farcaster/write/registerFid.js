"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerFid = registerFid;
const prepare_contract_call_js_1 = require("../../../transaction/prepare-contract-call.js");
const bigint_js_1 = require("../../../utils/bigint.js");
const getIdGateway_js_1 = require("../contracts/getIdGateway.js");
const getRegistrationPrice_js_1 = require("../read/getRegistrationPrice.js");
/**
 * Registers a Farcaster fid for the given wallet.
 * @param options - The options for registering an account.
 * @returns A prepared transaction object to register the account.
 * @extension FARCASTER
 * @example
 * ```ts
 * import { registerFid } from "thirdweb/extensions/farcaster";
 * import { sendTransaction } from "thirdweb";
 *
 * const transaction = registerFid({
 *  client,
 * 	recoveryAddress
 * });
 *
 * await sendTransaction({ transaction, account });
 * ```
 */
function registerFid(options) {
    const extraStorage = (0, bigint_js_1.toBigInt)(options.extraStorage ?? 0);
    if (extraStorage < 0n) {
        throw new Error(`Expected extraStorage to be greater than or equal to 0, got ${extraStorage}`);
    }
    return (0, prepare_contract_call_js_1.prepareContractCall)({
        contract: (0, getIdGateway_js_1.getIdGateway)({
            chain: options.chain,
            client: options.client,
        }),
        method: [
            "0x6d705ebb",
            [
                {
                    name: "recovery",
                    type: "address",
                },
                {
                    name: "extraStorage",
                    type: "uint256",
                },
            ],
            [
                {
                    name: "fid",
                    type: "uint256",
                },
                {
                    name: "overpayment",
                    type: "uint256",
                },
            ],
        ],
        params: [options.recoveryAddress, extraStorage],
        value: async () => {
            return await (0, getRegistrationPrice_js_1.getRegistrationPrice)({
                chain: options.chain,
                client: options.client,
                disableCache: options.disableCache,
                extraStorage: extraStorage,
            });
        },
    });
}
//# sourceMappingURL=registerFid.js.map