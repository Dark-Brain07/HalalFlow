"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaymasterAndData = getPaymasterAndData;
const hex_js_1 = require("../../../utils/encoding/hex.js");
const fetch_js_1 = require("../../../utils/fetch.js");
const json_js_1 = require("../../../utils/json.js");
const constants_js_1 = require("./constants.js");
const utils_js_1 = require("./utils.js");
/**
 * Get paymaster and data details for a user operation.
 * @param args - The userOp and options
 * @returns - The paymaster and data details for the user operation.
 * @example
 * ```ts
 * import { getPaymasterAndData } from "thirdweb/wallets/smart";
 *
 * const userOp = createUnsignedUserOp(...);
 *
 * const paymasterAndData = await getPaymasterAndData({
 *  userOp,
 *  client,
 *  chain,
 * });
 * ```
 * @walletUtils
 */
async function getPaymasterAndData(args) {
    const { userOp, paymasterOverride, client, chain, entrypointAddress } = args;
    if (paymasterOverride) {
        return paymasterOverride(userOp);
    }
    const headers = {
        "Content-Type": "application/json",
    };
    const entrypoint = entrypointAddress ?? constants_js_1.ENTRYPOINT_ADDRESS_v0_6;
    const paymasterUrl = (0, constants_js_1.getDefaultBundlerUrl)(chain);
    const body = {
        id: 1,
        jsonrpc: "2.0",
        method: "pm_sponsorUserOperation",
        params: [(0, utils_js_1.hexlifyUserOp)(userOp), entrypoint],
    };
    // Ask the paymaster to sign the transaction and return a valid paymasterAndData value.
    const fetchWithHeaders = (0, fetch_js_1.getClientFetch)(client);
    const response = await fetchWithHeaders(paymasterUrl, {
        body: (0, json_js_1.stringify)(body),
        headers,
        method: "POST",
    });
    if (!response.ok) {
        const error = (await response.text()) || response.statusText;
        throw new Error(`Paymaster error: ${response.status} - ${error}`);
    }
    const res = await response.json();
    if (res.result) {
        // some paymasters return a string, some return an object with more data
        if (typeof res.result === "string") {
            return {
                paymasterAndData: res.result,
            };
        }
        // check for policy errors
        if (res.result.reason) {
            console.warn(`Paymaster policy rejected this transaction with reason: ${res.result.reason} ${res.result.policyId ? `(policyId: ${res.result.policyId})` : ""}`);
        }
        return {
            callGasLimit: res.result.callGasLimit
                ? (0, hex_js_1.hexToBigInt)(res.result.callGasLimit)
                : undefined,
            paymaster: res.result.paymaster,
            paymasterAndData: res.result.paymasterAndData,
            paymasterData: res.result.paymasterData,
            paymasterPostOpGasLimit: res.result.paymasterPostOpGasLimit
                ? (0, hex_js_1.hexToBigInt)(res.result.paymasterPostOpGasLimit)
                : undefined,
            paymasterVerificationGasLimit: res.result.paymasterVerificationGasLimit
                ? (0, hex_js_1.hexToBigInt)(res.result.paymasterVerificationGasLimit)
                : undefined,
            preVerificationGas: res.result.preVerificationGas
                ? (0, hex_js_1.hexToBigInt)(res.result.preVerificationGas)
                : undefined,
            verificationGasLimit: res.result.verificationGasLimit
                ? (0, hex_js_1.hexToBigInt)(res.result.verificationGasLimit)
                : undefined,
        };
    }
    const error = res.error?.message || res.error || response.statusText || "unknown error";
    throw new Error(`Paymaster error from ${paymasterUrl}: ${error}`);
}
//# sourceMappingURL=paymaster.js.map