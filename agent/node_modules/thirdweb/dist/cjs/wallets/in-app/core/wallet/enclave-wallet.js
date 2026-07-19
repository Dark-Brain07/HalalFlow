"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnclaveWallet = void 0;
const viem_1 = require("viem");
const transaction_js_1 = require("../../../../analytics/track/transaction.js");
const utils_js_1 = require("../../../../chains/utils.js");
const eth_sendRawTransaction_js_1 = require("../../../../rpc/actions/eth_sendRawTransaction.js");
const rpc_js_1 = require("../../../../rpc/rpc.js");
const address_js_1 = require("../../../../utils/address.js");
const hex_js_1 = require("../../../../utils/encoding/hex.js");
const parse_typed_data_js_1 = require("../../../../utils/signatures/helpers/parse-typed-data.js");
const get_enclave_user_status_js_1 = require("../actions/get-enclave-user-status.js");
const sign_authorization_enclave_js_1 = require("../actions/sign-authorization.enclave.js");
const sign_message_enclave_js_1 = require("../actions/sign-message.enclave.js");
const sign_transaction_enclave_js_1 = require("../actions/sign-transaction.enclave.js");
const sign_typed_data_enclave_js_1 = require("../actions/sign-typed-data.enclave.js");
class EnclaveWallet {
    constructor({ client, ecosystem, address, storage, }) {
        Object.defineProperty(this, "client", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "ecosystem", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "address", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "localStorage", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.client = client;
        this.ecosystem = ecosystem;
        this.address = address;
        this.localStorage = storage;
    }
    /**
     * Store the auth token for use
     * @returns `{walletAddress: string }` The user's wallet details
     * @internal
     */
    async postWalletSetUp(authResult) {
        await this.localStorage.saveAuthCookie(authResult.storedToken.cookieString);
    }
    /**
     * Gets the current user's details
     * @internal
     */
    async getUserWalletStatus() {
        const token = await this.localStorage.getAuthCookie();
        if (!token) {
            return { status: "Logged Out" };
        }
        const userStatus = await (0, get_enclave_user_status_js_1.getUserStatus)({
            authToken: token,
            client: this.client,
            ecosystem: this.ecosystem,
        });
        if (!userStatus) {
            return { status: "Logged Out" };
        }
        const wallet = userStatus.wallets[0];
        const authDetails = {
            email: userStatus.linkedAccounts.find((account) => account.details.email !== undefined)?.details.email,
            phoneNumber: userStatus.linkedAccounts.find((account) => account.details.phone !== undefined)?.details.phone,
            recoveryShareManagement: "ENCLAVE",
            userWalletId: userStatus.id || "",
        };
        if (!wallet) {
            return {
                authDetails,
                status: "Logged In, Wallet Uninitialized",
            };
        }
        return {
            account: await this.getAccount(),
            authDetails,
            status: "Logged In, Wallet Initialized",
            walletAddress: wallet.address,
        };
    }
    /**
     * Returns an account to perform wallet operations
     * @internal
     */
    async getAccount() {
        const client = this.client;
        const storage = this.localStorage;
        const address = this.address;
        const ecosystem = this.ecosystem;
        const _signTransaction = async (tx) => {
            const rpcRequest = (0, rpc_js_1.getRpcClient)({
                chain: (0, utils_js_1.getCachedChain)(tx.chainId),
                client,
            });
            const transaction = {
                chainId: (0, hex_js_1.toHex)(tx.chainId),
                data: tx.data,
                gas: hexlify(tx.gas),
                nonce: hexlify(tx.nonce) ||
                    (0, hex_js_1.toHex)(await Promise.resolve().then(() => require("../../../../rpc/actions/eth_getTransactionCount.js")).then(({ eth_getTransactionCount }) => eth_getTransactionCount(rpcRequest, {
                        address: (0, address_js_1.getAddress)(this.address),
                        blockTag: "pending",
                    }))),
                to: tx.to ? (0, address_js_1.getAddress)(tx.to) : undefined,
                value: hexlify(tx.value),
            };
            if (tx.authorizationList && tx.authorizationList.length > 0) {
                transaction.type = 4;
                transaction.authorizationList = tx.authorizationList;
                transaction.maxFeePerGas = hexlify(tx.maxFeePerGas);
                transaction.maxPriorityFeePerGas = hexlify(tx.maxPriorityFeePerGas);
            }
            else if (hexlify(tx.maxFeePerGas)) {
                transaction.maxFeePerGas = hexlify(tx.maxFeePerGas);
                transaction.maxPriorityFeePerGas = hexlify(tx.maxPriorityFeePerGas);
                transaction.type = 2;
            }
            else {
                transaction.gasPrice = hexlify(tx.gasPrice);
                transaction.type = 0;
            }
            return (0, sign_transaction_enclave_js_1.signTransaction)({
                client,
                payload: transaction,
                storage,
            });
        };
        const account = {
            address: (0, address_js_1.getAddress)(address),
            async sendTransaction(tx) {
                const rpcRequest = (0, rpc_js_1.getRpcClient)({
                    chain: (0, utils_js_1.getCachedChain)(tx.chainId),
                    client,
                });
                const signedTx = await _signTransaction(tx);
                const transactionHash = await (0, eth_sendRawTransaction_js_1.eth_sendRawTransaction)(rpcRequest, signedTx);
                (0, transaction_js_1.trackTransaction)({
                    chainId: tx.chainId,
                    client,
                    contractAddress: tx.to ?? undefined,
                    ecosystem,
                    gasPrice: tx.gasPrice,
                    transactionHash,
                    walletAddress: address,
                    walletType: "inApp",
                });
                return { transactionHash };
            },
            async signAuthorization(payload) {
                const authorization = await (0, sign_authorization_enclave_js_1.signAuthorization)({
                    client,
                    payload,
                    storage,
                });
                return {
                    address: (0, address_js_1.getAddress)(authorization.address),
                    chainId: Number.parseInt(authorization.chainId),
                    nonce: BigInt(authorization.nonce),
                    r: BigInt(authorization.r),
                    s: BigInt(authorization.s),
                    yParity: Number.parseInt(authorization.yParity),
                };
            },
            async signMessage({ message, originalMessage, chainId }) {
                const messagePayload = (() => {
                    if (typeof message === "string") {
                        return { chainId, isRaw: false, message, originalMessage };
                    }
                    return {
                        chainId,
                        isRaw: true,
                        message: typeof message.raw === "string"
                            ? message.raw
                            : (0, viem_1.bytesToHex)(message.raw),
                        originalMessage,
                    };
                })();
                const { signature } = await (0, sign_message_enclave_js_1.signMessage)({
                    client,
                    payload: messagePayload,
                    storage,
                });
                return signature;
            },
            async signTransaction(tx) {
                if (!tx.chainId) {
                    throw new Error("chainId required in tx to sign");
                }
                return _signTransaction({
                    chainId: tx.chainId,
                    ...tx,
                });
            },
            async signTypedData(_typedData) {
                const parsedTypedData = (0, parse_typed_data_js_1.parseTypedData)(_typedData);
                const { signature } = await (0, sign_typed_data_enclave_js_1.signTypedData)({
                    client,
                    payload: parsedTypedData,
                    storage,
                });
                return signature;
            },
            sendCalls: async (options) => {
                const { inAppWalletSendCalls } = await Promise.resolve().then(() => require("../eip5792/in-app-wallet-calls.js"));
                const firstCall = options.calls[0];
                if (!firstCall) {
                    throw new Error("No calls to send");
                }
                const client = firstCall.client;
                const chain = firstCall.chain || options.chain;
                const id = await inAppWalletSendCalls({
                    account: account,
                    calls: options.calls,
                    chain,
                });
                return { chain, client, id };
            },
            getCallsStatus: async (options) => {
                const { inAppWalletGetCallsStatus } = await Promise.resolve().then(() => require("../eip5792/in-app-wallet-calls.js"));
                return inAppWalletGetCallsStatus(options);
            },
            getCallsStatusRaw: async (options) => {
                const { inAppWalletGetCallsStatusRaw } = await Promise.resolve().then(() => require("../eip5792/in-app-wallet-calls.js"));
                return inAppWalletGetCallsStatusRaw(options);
            },
            getCapabilities: async (options) => {
                return {
                    [options.chainId ?? 1]: {
                        atomic: {
                            status: "unsupported",
                        },
                        paymasterService: {
                            supported: false,
                        },
                    },
                };
            },
        };
        return account;
    }
}
exports.EnclaveWallet = EnclaveWallet;
function hexlify(value) {
    return value === undefined || (0, hex_js_1.isHex)(value) ? value : (0, hex_js_1.toHex)(value);
}
//# sourceMappingURL=enclave-wallet.js.map