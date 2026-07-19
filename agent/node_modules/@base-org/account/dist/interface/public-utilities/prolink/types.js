// Copyright (c) 2018-2025 Coinbase, Inc. <https://www.coinbase.com/>
/**
 * Protocol Buffers message types for Prolink encoding
 * Based on the Compressed RPC Link Format ERC specification
 */
/**
 * Transaction type discriminator for wallet_sendCalls
 */
export var SendCallsType;
(function (SendCallsType) {
    SendCallsType[SendCallsType["SEND_CALLS_UNKNOWN"] = 0] = "SEND_CALLS_UNKNOWN";
    SendCallsType[SendCallsType["ERC20_TRANSFER"] = 1] = "ERC20_TRANSFER";
    SendCallsType[SendCallsType["NATIVE_TRANSFER"] = 2] = "NATIVE_TRANSFER";
    SendCallsType[SendCallsType["GENERIC_CALLS"] = 3] = "GENERIC_CALLS";
})(SendCallsType || (SendCallsType = {}));
/**
 * Signature type discriminator for wallet_sign
 */
export var SignType;
(function (SignType) {
    SignType[SignType["SIGN_UNKNOWN"] = 0] = "SIGN_UNKNOWN";
    SignType[SignType["SPEND_PERMISSION"] = 1] = "SPEND_PERMISSION";
    SignType[SignType["RECEIVE_WITH_AUTHORIZATION"] = 2] = "RECEIVE_WITH_AUTHORIZATION";
    SignType[SignType["GENERIC_TYPED_DATA"] = 3] = "GENERIC_TYPED_DATA";
})(SignType || (SignType = {}));
//# sourceMappingURL=types.js.map