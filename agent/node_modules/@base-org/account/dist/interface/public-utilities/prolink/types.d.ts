/**
 * Protocol Buffers message types for Prolink encoding
 * Based on the Compressed RPC Link Format ERC specification
 */
/**
 * Transaction type discriminator for wallet_sendCalls
 */
export declare enum SendCallsType {
    SEND_CALLS_UNKNOWN = 0,
    ERC20_TRANSFER = 1,
    NATIVE_TRANSFER = 2,
    GENERIC_CALLS = 3
}
/**
 * Signature type discriminator for wallet_sign
 */
export declare enum SignType {
    SIGN_UNKNOWN = 0,
    SPEND_PERMISSION = 1,
    RECEIVE_WITH_AUTHORIZATION = 2,
    GENERIC_TYPED_DATA = 3
}
/**
 * ERC20 transfer data
 */
export type Erc20Transfer = {
    token: Uint8Array;
    recipient: Uint8Array;
    amount: Uint8Array;
};
/**
 * Native transfer data
 */
export type NativeTransfer = {
    recipient: Uint8Array;
    amount: Uint8Array;
};
/**
 * Generic call data
 */
export type Call = {
    to: Uint8Array;
    data: Uint8Array;
    value: Uint8Array;
};
/**
 * Generic calls data
 */
export type GenericCalls = {
    calls: Call[];
};
/**
 * wallet_sendCalls message
 */
export type WalletSendCalls = {
    type: SendCallsType;
    transactionData: {
        case: 'erc20Transfer';
        value: Erc20Transfer;
    } | {
        case: 'nativeTransfer';
        value: NativeTransfer;
    } | {
        case: 'genericCalls';
        value: GenericCalls;
    } | {
        case: undefined;
        value?: undefined;
    };
    from?: Uint8Array;
    version?: string;
};
/**
 * Spend permission data
 */
export type SpendPermission = {
    account: Uint8Array;
    spender: Uint8Array;
    token: Uint8Array;
    allowance: Uint8Array;
    period: bigint;
    start: bigint;
    end: bigint;
    salt: Uint8Array;
    extraData: Uint8Array;
    verifyingContract: Uint8Array;
    domainName: string;
    domainVersion: string;
};
/**
 * Receive with authorization data
 */
export type ReceiveWithAuthorization = {
    from: Uint8Array;
    to: Uint8Array;
    value: Uint8Array;
    validAfter: Uint8Array;
    validBefore: Uint8Array;
    nonce: Uint8Array;
    verifyingContract: Uint8Array;
    domainName: string;
    domainVersion: string;
};
/**
 * Generic typed data
 */
export type GenericTypedData = {
    typedDataJson: Uint8Array;
};
/**
 * wallet_sign message
 */
export type WalletSign = {
    type: SignType;
    signatureData: {
        case: 'spendPermission';
        value: SpendPermission;
    } | {
        case: 'receiveWithAuthorization';
        value: ReceiveWithAuthorization;
    } | {
        case: 'genericTypedData';
        value: GenericTypedData;
    } | {
        case: undefined;
        value?: undefined;
    };
    version?: string;
};
/**
 * Generic JSON-RPC message
 */
export type GenericJsonRpc = {
    method: string;
    paramsJson: Uint8Array;
    rpcVersion?: string;
};
/**
 * Core RPC link payload
 */
export type RpcLinkPayload = {
    protocolVersion: number;
    chainId?: number;
    shortcutId: number;
    shortcutVersion: number;
    body: {
        case: 'generic';
        value: GenericJsonRpc;
    } | {
        case: 'walletSendCalls';
        value: WalletSendCalls;
    } | {
        case: 'walletSign';
        value: WalletSign;
    } | {
        case: undefined;
        value?: undefined;
    };
    capabilities?: Map<string, Uint8Array>;
};
/**
 * High-level request type for encoding
 */
export type ProlinkRequest = {
    method: string;
    params: unknown;
    chainId?: number;
    capabilities?: Record<string, unknown>;
};
/**
 * High-level decoded type
 */
export type ProlinkDecoded = {
    method: string;
    params: unknown;
    chainId?: number;
    capabilities?: Record<string, unknown>;
};
//# sourceMappingURL=types.d.ts.map