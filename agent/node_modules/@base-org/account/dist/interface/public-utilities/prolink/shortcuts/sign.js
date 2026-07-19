// Copyright (c) 2018-2025 Coinbase, Inc. <https://www.coinbase.com/>
import { SignType } from '../types.js';
import { bytesToHex, decodeAddress, encodeAddress, encodeAmount, hexToBytes, } from '../utils/encoding.js';
/**
 * Normalize type field to canonical EIP-712 indicator
 */
function normalizeType(type) {
    if (type === undefined)
        return '0x01';
    if (typeof type === 'number')
        return `0x${type.toString(16)}`;
    if (type === '0x1')
        return '0x01';
    return type;
}
/**
 * Detect if typed data is a SpendPermission
 */
function detectSpendPermission(typedData) {
    return (typedData.primaryType === 'SpendPermission' && typedData.domain.verifyingContract !== undefined);
}
/**
 * Detect if typed data is a ReceiveWithAuthorization
 */
function detectReceiveWithAuthorization(typedData) {
    return (typedData.primaryType === 'ReceiveWithAuthorization' &&
        typedData.domain.verifyingContract !== undefined);
}
/**
 * Encode wallet_sign request
 * @param params - EIP-7871 wallet_sign parameters
 * @returns WalletSign message
 */
export function encodeWalletSign(params) {
    const normalizedType = normalizeType(params.type);
    // Validate it's EIP-712
    if (normalizedType !== '0x01') {
        throw new Error(`Unsupported sign type for prolink encoding: ${normalizedType}`);
    }
    // Validate chain ID consistency
    const paramsChainId = BigInt(params.chainId);
    const domainChainId = typeof params.data.domain.chainId === 'string'
        ? BigInt(params.data.domain.chainId)
        : BigInt(params.data.domain.chainId || 0);
    if (paramsChainId !== domainChainId) {
        throw new Error(`Chain ID mismatch: params has ${paramsChainId}, domain has ${domainChainId}`);
    }
    // Detect signature type
    if (detectSpendPermission(params.data)) {
        const msg = params.data.message;
        return {
            type: SignType.SPEND_PERMISSION,
            signatureData: {
                case: 'spendPermission',
                value: {
                    account: encodeAddress(msg.account),
                    spender: encodeAddress(msg.spender),
                    token: encodeAddress(msg.token),
                    allowance: encodeAmount(msg.allowance),
                    period: BigInt(msg.period),
                    start: BigInt(msg.start),
                    end: BigInt(msg.end),
                    salt: hexToBytes(msg.salt),
                    extraData: !msg.extraData || msg.extraData === '0x'
                        ? new Uint8Array()
                        : hexToBytes(msg.extraData),
                    verifyingContract: encodeAddress(params.data.domain.verifyingContract),
                    domainName: params.data.domain.name || '',
                    domainVersion: params.data.domain.version || '',
                },
            },
            version: params.version || '1',
        };
    }
    if (detectReceiveWithAuthorization(params.data)) {
        const msg = params.data.message;
        return {
            type: SignType.RECEIVE_WITH_AUTHORIZATION,
            signatureData: {
                case: 'receiveWithAuthorization',
                value: {
                    from: encodeAddress(msg.from),
                    to: encodeAddress(msg.to),
                    value: encodeAmount(msg.value),
                    validAfter: encodeAmount(msg.validAfter),
                    validBefore: encodeAmount(msg.validBefore),
                    nonce: hexToBytes(msg.nonce),
                    verifyingContract: encodeAddress(params.data.domain.verifyingContract),
                    domainName: params.data.domain.name || '',
                    domainVersion: params.data.domain.version || '',
                },
            },
            version: params.version || '1',
        };
    }
    // Generic typed data
    const typedDataJson = JSON.stringify(params.data);
    const typedDataBytes = new TextEncoder().encode(typedDataJson);
    return {
        type: SignType.GENERIC_TYPED_DATA,
        signatureData: {
            case: 'genericTypedData',
            value: {
                typedDataJson: typedDataBytes,
            },
        },
        version: params.version || '1',
    };
}
/**
 * Decode wallet_sign request
 * @param payload - WalletSign message
 * @param chainId - Chain ID from top-level payload
 * @returns EIP-7871 wallet_sign parameters
 */
export function decodeWalletSign(payload, chainId) {
    if (payload.signatureData.case === 'spendPermission') {
        const sp = payload.signatureData.value;
        const typedData = {
            types: {
                EIP712Domain: [
                    { name: 'name', type: 'string' },
                    { name: 'version', type: 'string' },
                    { name: 'chainId', type: 'uint256' },
                    { name: 'verifyingContract', type: 'address' },
                ],
                SpendPermission: [
                    { name: 'account', type: 'address' },
                    { name: 'spender', type: 'address' },
                    { name: 'token', type: 'address' },
                    { name: 'allowance', type: 'uint160' },
                    { name: 'period', type: 'uint48' },
                    { name: 'start', type: 'uint48' },
                    { name: 'end', type: 'uint48' },
                    { name: 'salt', type: 'uint256' },
                    { name: 'extraData', type: 'bytes' },
                ],
            },
            domain: {
                name: sp.domainName,
                version: sp.domainVersion,
                chainId,
                verifyingContract: decodeAddress(sp.verifyingContract),
            },
            primaryType: 'SpendPermission',
            message: {
                account: decodeAddress(sp.account),
                spender: decodeAddress(sp.spender),
                token: decodeAddress(sp.token),
                allowance: bytesToHex(sp.allowance.length > 0 ? sp.allowance : new Uint8Array([0])),
                period: Number(sp.period),
                start: Number(sp.start),
                end: Number(sp.end),
                salt: bytesToHex(sp.salt),
                extraData: sp.extraData.length > 0 ? bytesToHex(sp.extraData) : '0x',
            },
        };
        return {
            version: payload.version || '1',
            chainId: `0x${chainId.toString(16)}`,
            type: '0x01',
            data: typedData,
        };
    }
    if (payload.signatureData.case === 'receiveWithAuthorization') {
        const rwa = payload.signatureData.value;
        const typedData = {
            types: {
                EIP712Domain: [
                    { name: 'name', type: 'string' },
                    { name: 'version', type: 'string' },
                    { name: 'chainId', type: 'uint256' },
                    { name: 'verifyingContract', type: 'address' },
                ],
                ReceiveWithAuthorization: [
                    { name: 'from', type: 'address' },
                    { name: 'to', type: 'address' },
                    { name: 'value', type: 'uint256' },
                    { name: 'validAfter', type: 'uint256' },
                    { name: 'validBefore', type: 'uint256' },
                    { name: 'nonce', type: 'bytes32' },
                ],
            },
            domain: {
                name: rwa.domainName,
                version: rwa.domainVersion,
                chainId,
                verifyingContract: decodeAddress(rwa.verifyingContract),
            },
            primaryType: 'ReceiveWithAuthorization',
            message: {
                from: decodeAddress(rwa.from),
                to: decodeAddress(rwa.to),
                value: bytesToHex(rwa.value.length > 0 ? rwa.value : new Uint8Array([0])),
                validAfter: bytesToHex(rwa.validAfter.length > 0 ? rwa.validAfter : new Uint8Array([0])),
                validBefore: bytesToHex(rwa.validBefore.length > 0 ? rwa.validBefore : new Uint8Array([0])),
                nonce: bytesToHex(rwa.nonce),
            },
        };
        return {
            version: payload.version || '1',
            chainId: `0x${chainId.toString(16)}`,
            type: '0x01',
            data: typedData,
        };
    }
    if (payload.signatureData.case === 'genericTypedData') {
        const gtd = payload.signatureData.value;
        const typedDataJson = new TextDecoder().decode(gtd.typedDataJson);
        let typedData;
        try {
            typedData = JSON.parse(typedDataJson);
        }
        catch (error) {
            throw new Error(`Failed to parse typed data JSON: ${error instanceof Error ? error.message : 'unknown error'}`);
        }
        return {
            version: payload.version || '1',
            chainId: `0x${chainId.toString(16)}`,
            type: '0x01',
            data: typedData,
        };
    }
    throw new Error('Unknown signature data type');
}
//# sourceMappingURL=sign.js.map