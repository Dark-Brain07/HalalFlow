"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isContractActivated = isContractActivated;
const viem_1 = require("viem");
const contract_js_1 = require("../../../contract/contract.js");
const codehashVersion_js_1 = require("../__generated__/IArbWasm/read/codehashVersion.js");
const activateStylusContract_js_1 = require("./activateStylusContract.js");
async function isContractActivated(options) {
    const { chain, client, bytecode } = options;
    const arbWasmPrecompile = (0, contract_js_1.getContract)({
        address: activateStylusContract_js_1.ARB_WASM_ADDRESS,
        chain,
        client,
    });
    try {
        await (0, codehashVersion_js_1.codehashVersion)({
            codehash: (0, viem_1.keccak256)(extractRuntimeBytecode(bytecode)),
            contract: arbWasmPrecompile,
        });
        return true;
    }
    catch {
        return false;
    }
}
function extractRuntimeBytecode(deployInput) {
    // normalise input
    const deploy = typeof deployInput === "string" ? hexToBytes(deployInput) : deployInput;
    // the contract_deployment_calldata helper emits 42-byte prelude + 1-byte version  =>  43 bytes total
    // ref: https://github.com/OffchainLabs/cargo-stylus/blob/main/main/src/deploy/mod.rs#L305
    const PRELUDE_LEN = 42;
    const TOTAL_FIXED = PRELUDE_LEN + 1; // +1 version byte
    if (deploy.length < TOTAL_FIXED) {
        throw new Error("Deployment bytecode too short");
    }
    if (deploy[0] !== 0x7f) {
        throw new Error("Missing 0x7f PUSH32 - not produced by contract_deployment_calldata");
    }
    // read length
    const codeLenBytes = deploy.slice(1, 33);
    let codeLen = 0n;
    for (const b of codeLenBytes)
        codeLen = (codeLen << 8n) | BigInt(b);
    if (codeLen > BigInt(Number.MAX_SAFE_INTEGER)) {
        throw new Error("Runtime code length exceeds JS safe integer range");
    }
    // pattern sanity-check
    const EXPECTED = [
        0x80, // DUP1
        0x60,
        0x2b, // PUSH1 0x2b (42 + 1)
        0x60,
        0x00, // PUSH1 0
        0x39, // CODECOPY
        0x60,
        0x00, // PUSH1 0
        0xf3, // RETURN
        0x00, // version
    ];
    for (let i = 0; i < EXPECTED.length; i++) {
        if (deploy[33 + i] !== EXPECTED[i]) {
            throw new Error("Prelude bytes do not match expected pattern");
        }
    }
    // slice out runtime code
    const start = TOTAL_FIXED;
    const end = start + Number(codeLen);
    if (deploy.length < end) {
        throw new Error("Deployment bytecode truncated - runtime code incomplete");
    }
    return deploy.slice(start, end);
}
function hexToBytes(hex) {
    const normalized = hex.startsWith("0x") ? hex.slice(2) : hex;
    if (normalized.length % 2 !== 0) {
        throw new Error("Hex string must have an even length");
    }
    const bytes = new Uint8Array(normalized.length / 2);
    for (let i = 0; i < bytes.length; i++) {
        bytes[i] = parseInt(normalized.slice(i * 2, i * 2 + 2), 16);
    }
    return bytes;
}
//# sourceMappingURL=isContractActivated.js.map