"use strict";
// bytecode
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringToBytes = exports.numberToBytes = exports.hexToBytes = exports.boolToBytes = exports.uint8ArrayToHex = exports.toHex = exports.stringToHex = exports.padHex = exports.numberToHex = exports.isHex = exports.hexToUint8Array = exports.hexToString = exports.hexToNumber = exports.hexToBool = exports.hexToBigInt = exports.fromHex = exports.boolToHex = exports.concatHex = exports.fromBytes = exports.bytesToString = exports.bytesToNumber = exports.bytesToBool = exports.bytesToBigInt = exports.toWei = exports.toUnits = exports.toTokens = exports.toEther = exports.fromGwei = exports.signatureToHex = exports.signTypedData = exports.signMessage = exports.sign = exports.resolveSignatures = exports.resolveSignature = exports.resolveImplementation = exports.ensureBytecodePrefix = exports.isContractDeployed = exports.extractMinimalProxyImplementationAddress = exports.extractIPFSUri = exports.detectMethod = exports.isZkSyncChain = exports.getKeylessTransaction = exports.keccakId = exports.isEIP155Enforced = exports.getSaltHash = exports.getInitBytecodeWithSalt = exports.computeDeploymentAddress = exports.getDeployedCreate2Factory = exports.deployCreate2Factory = exports.computeCreate2FactoryAddress = void 0;
exports.shortenLargeNumber = exports.resolvePromisedValue = exports.refreshJWT = exports.encodeJWT = exports.decodeJWT = exports.stringify = exports.sha256 = exports.keccak256 = exports.hashMessage = exports.formatNumber = exports.getClaimParams = exports.isValidENSName = exports.setThirdwebDomains = exports.setServiceKey = exports.parseAbiParams = exports.setTransactionDecorator = exports.getTransactionDecorator = exports.clearTransactionDecorator = exports.min = exports.max = exports.shortenHex = exports.shortenAddress = exports.isAddress = exports.getAddress = exports.checksumAddress = exports.encodeAbiParameters = exports.decodeFunctionResult = exports.decodeFunctionData = exports.decodeError = exports.toFunctionSelector = exports.toEventSelector = exports.isBytes = exports.encodePacked = exports.decodeAbiParameters = exports.maxUint256 = exports.toBytes = void 0;
const tslib_1 = require("tslib");
// any-evm utils
var create_2_factory_js_1 = require("../contract/deployment/utils/create-2-factory.js");
Object.defineProperty(exports, "computeCreate2FactoryAddress", { enumerable: true, get: function () { return create_2_factory_js_1.computeCreate2FactoryAddress; } });
Object.defineProperty(exports, "deployCreate2Factory", { enumerable: true, get: function () { return create_2_factory_js_1.deployCreate2Factory; } });
Object.defineProperty(exports, "getDeployedCreate2Factory", { enumerable: true, get: function () { return create_2_factory_js_1.getDeployedCreate2Factory; } });
var compute_deployment_address_js_1 = require("../utils/any-evm/compute-deployment-address.js");
Object.defineProperty(exports, "computeDeploymentAddress", { enumerable: true, get: function () { return compute_deployment_address_js_1.computeDeploymentAddress; } });
var get_init_bytecode_with_salt_js_1 = require("../utils/any-evm/get-init-bytecode-with-salt.js");
Object.defineProperty(exports, "getInitBytecodeWithSalt", { enumerable: true, get: function () { return get_init_bytecode_with_salt_js_1.getInitBytecodeWithSalt; } });
var get_salt_hash_js_1 = require("../utils/any-evm/get-salt-hash.js");
Object.defineProperty(exports, "getSaltHash", { enumerable: true, get: function () { return get_salt_hash_js_1.getSaltHash; } });
var is_eip155_enforced_js_1 = require("../utils/any-evm/is-eip155-enforced.js");
Object.defineProperty(exports, "isEIP155Enforced", { enumerable: true, get: function () { return is_eip155_enforced_js_1.isEIP155Enforced; } });
var keccak_id_js_1 = require("../utils/any-evm/keccak-id.js");
Object.defineProperty(exports, "keccakId", { enumerable: true, get: function () { return keccak_id_js_1.keccakId; } });
var keyless_transaction_js_1 = require("../utils/any-evm/keyless-transaction.js");
Object.defineProperty(exports, "getKeylessTransaction", { enumerable: true, get: function () { return keyless_transaction_js_1.getKeylessTransaction; } });
var isZkSyncChain_js_1 = require("../utils/any-evm/zksync/isZkSyncChain.js");
Object.defineProperty(exports, "isZkSyncChain", { enumerable: true, get: function () { return isZkSyncChain_js_1.isZkSyncChain; } });
var detectExtension_js_1 = require("../utils/bytecode/detectExtension.js");
Object.defineProperty(exports, "detectMethod", { enumerable: true, get: function () { return detectExtension_js_1.detectMethod; } });
var extractIPFS_js_1 = require("../utils/bytecode/extractIPFS.js");
Object.defineProperty(exports, "extractIPFSUri", { enumerable: true, get: function () { return extractIPFS_js_1.extractIPFSUri; } });
var extractMinimalProxyImplementationAddress_js_1 = require("../utils/bytecode/extractMinimalProxyImplementationAddress.js");
Object.defineProperty(exports, "extractMinimalProxyImplementationAddress", { enumerable: true, get: function () { return extractMinimalProxyImplementationAddress_js_1.extractMinimalProxyImplementationAddress; } });
var is_contract_deployed_js_1 = require("../utils/bytecode/is-contract-deployed.js");
Object.defineProperty(exports, "isContractDeployed", { enumerable: true, get: function () { return is_contract_deployed_js_1.isContractDeployed; } });
var prefix_js_1 = require("../utils/bytecode/prefix.js");
Object.defineProperty(exports, "ensureBytecodePrefix", { enumerable: true, get: function () { return prefix_js_1.ensureBytecodePrefix; } });
var resolveImplementation_js_1 = require("../utils/bytecode/resolveImplementation.js");
Object.defineProperty(exports, "resolveImplementation", { enumerable: true, get: function () { return resolveImplementation_js_1.resolveImplementation; } });
//signatures
var resolve_signature_js_1 = require("../utils/signatures/resolve-signature.js");
Object.defineProperty(exports, "resolveSignature", { enumerable: true, get: function () { return resolve_signature_js_1.resolveSignature; } });
Object.defineProperty(exports, "resolveSignatures", { enumerable: true, get: function () { return resolve_signature_js_1.resolveSignatures; } });
var sign_js_1 = require("../utils/signatures/sign.js");
Object.defineProperty(exports, "sign", { enumerable: true, get: function () { return sign_js_1.sign; } });
var sign_message_js_1 = require("../utils/signatures/sign-message.js");
Object.defineProperty(exports, "signMessage", { enumerable: true, get: function () { return sign_message_js_1.signMessage; } });
var sign_typed_data_js_1 = require("../utils/signatures/sign-typed-data.js");
Object.defineProperty(exports, "signTypedData", { enumerable: true, get: function () { return sign_typed_data_js_1.signTypedData; } });
var signature_to_hex_js_1 = require("../utils/signatures/signature-to-hex.js");
Object.defineProperty(exports, "signatureToHex", { enumerable: true, get: function () { return signature_to_hex_js_1.signatureToHex; } });
// units
var units_js_1 = require("../utils/units.js");
Object.defineProperty(exports, "fromGwei", { enumerable: true, get: function () { return units_js_1.fromGwei; } });
Object.defineProperty(exports, "toEther", { enumerable: true, get: function () { return units_js_1.toEther; } });
Object.defineProperty(exports, "toTokens", { enumerable: true, get: function () { return units_js_1.toTokens; } });
Object.defineProperty(exports, "toUnits", { enumerable: true, get: function () { return units_js_1.toUnits; } });
Object.defineProperty(exports, "toWei", { enumerable: true, get: function () { return units_js_1.toWei; } });
// ------------------------------------------------
// encoding
// ------------------------------------------------
// from
var from_bytes_js_1 = require("../utils/encoding/from-bytes.js");
Object.defineProperty(exports, "bytesToBigInt", { enumerable: true, get: function () { return from_bytes_js_1.bytesToBigInt; } });
Object.defineProperty(exports, "bytesToBool", { enumerable: true, get: function () { return from_bytes_js_1.bytesToBool; } });
Object.defineProperty(exports, "bytesToNumber", { enumerable: true, get: function () { return from_bytes_js_1.bytesToNumber; } });
Object.defineProperty(exports, "bytesToString", { enumerable: true, get: function () { return from_bytes_js_1.bytesToString; } });
Object.defineProperty(exports, "fromBytes", { enumerable: true, get: function () { return from_bytes_js_1.fromBytes; } });
var concat_hex_js_1 = require("../utils/encoding/helpers/concat-hex.js");
Object.defineProperty(exports, "concatHex", { enumerable: true, get: function () { return concat_hex_js_1.concatHex; } });
// hex
var hex_js_1 = require("../utils/encoding/hex.js");
Object.defineProperty(exports, "boolToHex", { enumerable: true, get: function () { return hex_js_1.boolToHex; } });
// from
Object.defineProperty(exports, "fromHex", { enumerable: true, get: function () { return hex_js_1.fromHex; } });
Object.defineProperty(exports, "hexToBigInt", { enumerable: true, get: function () { return hex_js_1.hexToBigInt; } });
Object.defineProperty(exports, "hexToBool", { enumerable: true, get: function () { return hex_js_1.hexToBool; } });
Object.defineProperty(exports, "hexToNumber", { enumerable: true, get: function () { return hex_js_1.hexToNumber; } });
Object.defineProperty(exports, "hexToString", { enumerable: true, get: function () { return hex_js_1.hexToString; } });
Object.defineProperty(exports, "hexToUint8Array", { enumerable: true, get: function () { return hex_js_1.hexToUint8Array; } });
// util
Object.defineProperty(exports, "isHex", { enumerable: true, get: function () { return hex_js_1.isHex; } });
Object.defineProperty(exports, "numberToHex", { enumerable: true, get: function () { return hex_js_1.numberToHex; } });
Object.defineProperty(exports, "padHex", { enumerable: true, get: function () { return hex_js_1.padHex; } });
Object.defineProperty(exports, "stringToHex", { enumerable: true, get: function () { return hex_js_1.stringToHex; } });
// to
Object.defineProperty(exports, "toHex", { enumerable: true, get: function () { return hex_js_1.toHex; } });
Object.defineProperty(exports, "uint8ArrayToHex", { enumerable: true, get: function () { return hex_js_1.uint8ArrayToHex; } });
// bytes
// to
var to_bytes_js_1 = require("../utils/encoding/to-bytes.js");
Object.defineProperty(exports, "boolToBytes", { enumerable: true, get: function () { return to_bytes_js_1.boolToBytes; } });
Object.defineProperty(exports, "hexToBytes", { enumerable: true, get: function () { return to_bytes_js_1.hexToBytes; } });
Object.defineProperty(exports, "numberToBytes", { enumerable: true, get: function () { return to_bytes_js_1.numberToBytes; } });
Object.defineProperty(exports, "stringToBytes", { enumerable: true, get: function () { return to_bytes_js_1.stringToBytes; } });
Object.defineProperty(exports, "toBytes", { enumerable: true, get: function () { return to_bytes_js_1.toBytes; } });
// ------------------------------------------------
// values
// ------------------------------------------------
var Solidity_1 = require("ox/Solidity");
Object.defineProperty(exports, "maxUint256", { enumerable: true, get: function () { return Solidity_1.maxUint256; } });
/**
 * @utils
 */
var viem_1 = require("viem");
Object.defineProperty(exports, "decodeAbiParameters", { enumerable: true, get: function () { return viem_1.decodeAbiParameters; } });
Object.defineProperty(exports, "encodePacked", { enumerable: true, get: function () { return viem_1.encodePacked; } });
Object.defineProperty(exports, "isBytes", { enumerable: true, get: function () { return viem_1.isBytes; } });
Object.defineProperty(exports, "toEventSelector", { enumerable: true, get: function () { return viem_1.toEventSelector; } });
Object.defineProperty(exports, "toFunctionSelector", { enumerable: true, get: function () { return viem_1.toFunctionSelector; } });
var decodeError_js_1 = require("../utils/abi/decodeError.js");
Object.defineProperty(exports, "decodeError", { enumerable: true, get: function () { return decodeError_js_1.decodeError; } });
var decodeFunctionData_js_1 = require("../utils/abi/decodeFunctionData.js");
Object.defineProperty(exports, "decodeFunctionData", { enumerable: true, get: function () { return decodeFunctionData_js_1.decodeFunctionData; } });
var decodeFunctionResult_js_1 = require("../utils/abi/decodeFunctionResult.js");
Object.defineProperty(exports, "decodeFunctionResult", { enumerable: true, get: function () { return decodeFunctionResult_js_1.decodeFunctionResult; } });
// ------------------------------------------------
// abi
// ------------------------------------------------
var encodeAbiParameters_js_1 = require("../utils/abi/encodeAbiParameters.js");
Object.defineProperty(exports, "encodeAbiParameters", { enumerable: true, get: function () { return encodeAbiParameters_js_1.encodeAbiParameters; } });
// ------------------------------------------------
// address
// ------------------------------------------------
var address_js_1 = require("../utils/address.js");
Object.defineProperty(exports, "checksumAddress", { enumerable: true, get: function () { return address_js_1.checksumAddress; } });
Object.defineProperty(exports, "getAddress", { enumerable: true, get: function () { return address_js_1.getAddress; } });
Object.defineProperty(exports, "isAddress", { enumerable: true, get: function () { return address_js_1.isAddress; } });
Object.defineProperty(exports, "shortenAddress", { enumerable: true, get: function () { return address_js_1.shortenAddress; } });
Object.defineProperty(exports, "shortenHex", { enumerable: true, get: function () { return address_js_1.shortenHex; } });
// ------------------------------------------------
// bigint
// ------------------------------------------------
var bigint_js_1 = require("../utils/bigint.js");
Object.defineProperty(exports, "max", { enumerable: true, get: function () { return bigint_js_1.max; } });
Object.defineProperty(exports, "min", { enumerable: true, get: function () { return bigint_js_1.min; } });
var config_js_1 = require("../utils/config.js");
Object.defineProperty(exports, "clearTransactionDecorator", { enumerable: true, get: function () { return config_js_1.clearTransactionDecorator; } });
Object.defineProperty(exports, "getTransactionDecorator", { enumerable: true, get: function () { return config_js_1.getTransactionDecorator; } });
Object.defineProperty(exports, "setTransactionDecorator", { enumerable: true, get: function () { return config_js_1.setTransactionDecorator; } });
var parse_abi_params_js_1 = require("../utils/contract/parse-abi-params.js");
Object.defineProperty(exports, "parseAbiParams", { enumerable: true, get: function () { return parse_abi_params_js_1.parseAbiParams; } });
// Useful helpers
var domains_js_1 = require("../utils/domains.js");
Object.defineProperty(exports, "setServiceKey", { enumerable: true, get: function () { return domains_js_1.setServiceKey; } });
Object.defineProperty(exports, "setThirdwebDomains", { enumerable: true, get: function () { return domains_js_1.setThirdwebDomains; } });
// ENS
var isValidENSName_js_1 = require("../utils/ens/isValidENSName.js");
Object.defineProperty(exports, "isValidENSName", { enumerable: true, get: function () { return isValidENSName_js_1.isValidENSName; } });
// ------------------------------------------------
// thirdweb Drop contracts
// ------------------------------------------------
var get_claim_params_js_1 = require("../utils/extensions/drops/get-claim-params.js");
Object.defineProperty(exports, "getClaimParams", { enumerable: true, get: function () { return get_claim_params_js_1.getClaimParams; } });
var formatNumber_js_1 = require("../utils/formatNumber.js");
Object.defineProperty(exports, "formatNumber", { enumerable: true, get: function () { return formatNumber_js_1.formatNumber; } });
// Ethereum Signed Message hashing
var hashMessage_js_1 = require("../utils/hashing/hashMessage.js");
Object.defineProperty(exports, "hashMessage", { enumerable: true, get: function () { return hashMessage_js_1.hashMessage; } });
// keccak256
var keccak256_js_1 = require("../utils/hashing/keccak256.js");
Object.defineProperty(exports, "keccak256", { enumerable: true, get: function () { return keccak256_js_1.keccak256; } });
// sha256
var sha256_js_1 = require("../utils/hashing/sha256.js");
Object.defineProperty(exports, "sha256", { enumerable: true, get: function () { return sha256_js_1.sha256; } });
// ------------------------------------------------
// json
// ------------------------------------------------
var json_js_1 = require("../utils/json.js");
Object.defineProperty(exports, "stringify", { enumerable: true, get: function () { return json_js_1.stringify; } });
// ------------------------------------------------
// jwt
// ------------------------------------------------
var decode_jwt_js_1 = require("../utils/jwt/decode-jwt.js");
Object.defineProperty(exports, "decodeJWT", { enumerable: true, get: function () { return decode_jwt_js_1.decodeJWT; } });
var encode_jwt_js_1 = require("../utils/jwt/encode-jwt.js");
Object.defineProperty(exports, "encodeJWT", { enumerable: true, get: function () { return encode_jwt_js_1.encodeJWT; } });
var refresh_jwt_js_1 = require("../utils/jwt/refresh-jwt.js");
Object.defineProperty(exports, "refreshJWT", { enumerable: true, get: function () { return refresh_jwt_js_1.refreshJWT; } });
var resolve_promised_value_js_1 = require("../utils/promise/resolve-promised-value.js");
Object.defineProperty(exports, "resolvePromisedValue", { enumerable: true, get: function () { return resolve_promised_value_js_1.resolvePromisedValue; } });
var shortenLargeNumber_js_1 = require("../utils/shortenLargeNumber.js");
Object.defineProperty(exports, "shortenLargeNumber", { enumerable: true, get: function () { return shortenLargeNumber_js_1.shortenLargeNumber; } });
// ------------------------------------------------
// type guards
// ------------------------------------------------
tslib_1.__exportStar(require("../utils/type-guards.js"), exports);
//# sourceMappingURL=utils.js.map