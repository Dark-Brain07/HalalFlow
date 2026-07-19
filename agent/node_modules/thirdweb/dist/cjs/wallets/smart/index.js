"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSmartWallet = void 0;
exports.connectSmartAccount = connectSmartAccount;
exports.disconnectSmartAccount = disconnectSmartAccount;
exports.getEntrypointFromFactory = getEntrypointFromFactory;
const helpers_js_1 = require("../../analytics/track/helpers.js");
const transaction_js_1 = require("../../analytics/track/transaction.js");
const utils_js_1 = require("../../chains/utils.js");
const contract_js_1 = require("../../contract/contract.js");
const allowance_js_1 = require("../../extensions/erc20/__generated__/IERC20/read/allowance.js");
const approve_js_1 = require("../../extensions/erc20/write/approve.js");
const addSessionKey_js_1 = require("../../extensions/erc4337/account/addSessionKey.js");
const send_transaction_js_1 = require("../../transaction/actions/send-transaction.js");
const to_serializable_transaction_js_1 = require("../../transaction/actions/to-serializable-transaction.js");
const send_eip712_transaction_js_1 = require("../../transaction/actions/zksync/send-eip712-transaction.js");
const read_contract_js_1 = require("../../transaction/read-contract.js");
const address_js_1 = require("../../utils/address.js");
const isZkSyncChain_js_1 = require("../../utils/any-evm/zksync/isZkSyncChain.js");
const resolve_promised_value_js_1 = require("../../utils/promise/resolve-promised-value.js");
const parse_typed_data_js_1 = require("../../utils/signatures/helpers/parse-typed-data.js");
const types_js_1 = require("../../utils/types.js");
const bundler_js_1 = require("./lib/bundler.js");
const calls_js_1 = require("./lib/calls.js");
const constants_js_1 = require("./lib/constants.js");
const userop_js_1 = require("./lib/userop.js");
var is_smart_wallet_js_1 = require("./is-smart-wallet.js");
Object.defineProperty(exports, "isSmartWallet", { enumerable: true, get: function () { return is_smart_wallet_js_1.isSmartWallet; } });
/**
 * For in-app wallets, the smart wallet creation is implicit so we track these to be able to retrieve the personal account for a smart account on the wallet API.
 * Note: We have to go account to account here and NOT wallet to account because the smart wallet itself is never exposed to the in-app wallet, only the account.
 * @internal
 */
const adminAccountToSmartAccountMap = new WeakMap();
const smartAccountToAdminAccountMap = new WeakMap();
/**
 * @internal
 */
async function connectSmartAccount(connectionOptions, creationOptions) {
    const { personalAccount, client } = connectionOptions;
    if (!personalAccount) {
        throw new Error("No personal account provided for smart account connection");
    }
    const options = creationOptions;
    const chain = creationOptions.chain;
    const sponsorGas = "gasless" in options ? options.gasless : options.sponsorGas;
    if (await (0, isZkSyncChain_js_1.isZkSyncChain)(chain)) {
        return [
            createZkSyncAccount({
                chain,
                connectionOptions,
                creationOptions,
                sponsorGas,
            }),
            chain,
        ];
    }
    // if factory is passed, but no entrypoint, try to resolve entrypoint from factory
    if (options.factoryAddress && !options.overrides?.entrypointAddress) {
        const entrypointAddress = await getEntrypointFromFactory(options.factoryAddress, client, chain);
        if (entrypointAddress) {
            options.overrides = {
                ...options.overrides,
                entrypointAddress,
            };
        }
    }
    if (options.overrides?.tokenPaymaster &&
        !options.overrides?.entrypointAddress) {
        // if token paymaster is set, but no entrypoint address, set the entrypoint address to v0.7
        options.overrides = {
            ...options.overrides,
            entrypointAddress: constants_js_1.ENTRYPOINT_ADDRESS_v0_7,
        };
    }
    const factoryAddress = options.factoryAddress ??
        (0, constants_js_1.getDefaultAccountFactory)(options.overrides?.entrypointAddress);
    const factoryContract = (0, contract_js_1.getContract)({
        address: factoryAddress,
        chain: chain,
        client: client,
    });
    const accountAddress = await (0, calls_js_1.predictAddress)({
        accountAddress: options.overrides?.accountAddress,
        accountSalt: options.overrides?.accountSalt,
        adminAddress: personalAccount.address,
        factoryContract,
        predictAddressOverride: options.overrides?.predictAddress,
    })
        .then((address) => address)
        .catch((err) => {
        throw new Error(`Failed to get account address with factory contract ${factoryContract.address} on chain ID ${chain.id}: ${err?.message || "unknown error"}`, { cause: err });
    });
    const accountContract = (0, contract_js_1.getContract)({
        address: accountAddress,
        chain,
        client,
    });
    const account = await createSmartAccount({
        ...options,
        accountContract,
        chain,
        client,
        factoryContract,
        personalAccount,
        sponsorGas,
    });
    adminAccountToSmartAccountMap.set(personalAccount, account);
    smartAccountToAdminAccountMap.set(account, personalAccount);
    if (options.sessionKey) {
        if (await (0, addSessionKey_js_1.shouldUpdateSessionKey)({
            accountContract,
            newPermissions: options.sessionKey.permissions,
            sessionKeyAddress: options.sessionKey.address,
        })) {
            const transaction = (0, addSessionKey_js_1.addSessionKey)({
                account: personalAccount,
                contract: accountContract,
                permissions: options.sessionKey.permissions,
                sessionKeyAddress: options.sessionKey.address,
            });
            await (0, send_transaction_js_1.sendTransaction)({
                account: account,
                transaction,
            });
        }
    }
    return [account, chain];
}
/**
 * @internal
 */
async function disconnectSmartAccount(account) {
    // look up the personalAccount for the smart wallet
    const personalAccount = smartAccountToAdminAccountMap.get(account);
    if (personalAccount) {
        // remove the mappings
        adminAccountToSmartAccountMap.delete(personalAccount);
        smartAccountToAdminAccountMap.delete(account);
    }
}
async function createSmartAccount(options) {
    const erc20Paymaster = options.overrides?.tokenPaymaster;
    if (erc20Paymaster) {
        if ((0, constants_js_1.getEntryPointVersion)(options.overrides?.entrypointAddress || constants_js_1.ENTRYPOINT_ADDRESS_v0_6) !== "v0.7") {
            throw new Error("Token paymaster is only supported for entrypoint version v0.7");
        }
    }
    const sponsorGas = options.sponsorGas;
    let accountContract = options.accountContract;
    const account = {
        address: (0, address_js_1.getAddress)(accountContract.address),
        async onTransactionRequested(transaction) {
            return options.personalAccount.onTransactionRequested?.(transaction);
        },
        async sendBatchTransaction(transactions) {
            const executeTx = (0, calls_js_1.prepareBatchExecute)({
                accountContract,
                executeBatchOverride: options.overrides?.executeBatch,
                transactions,
            });
            if (transactions.length === 0) {
                throw new Error("No transactions to send");
            }
            const firstTx = transactions[0];
            if (!firstTx) {
                throw new Error("No transactions to send");
            }
            const chain = (0, utils_js_1.getCachedChain)(firstTx.chainId);
            const result = await _sendUserOp({
                executeTx,
                options: {
                    ...options,
                    accountContract,
                    chain,
                },
            });
            (0, transaction_js_1.trackTransaction)({
                chainId: chain.id,
                client: options.client,
                contractAddress: transactions[0]?.to ?? undefined,
                transactionHash: result.transactionHash,
                walletAddress: options.accountContract.address,
                walletType: "smart",
            });
            return result;
        },
        async sendTransaction(transaction) {
            // if erc20 paymaster - check allowance and approve if needed
            let paymasterOverride;
            if (erc20Paymaster) {
                await approveERC20({
                    accountContract,
                    erc20Paymaster,
                    options,
                });
                const paymasterCallback = async () => {
                    return {
                        paymaster: erc20Paymaster.paymasterAddress,
                        paymasterData: "0x",
                    };
                };
                paymasterOverride = options.overrides?.paymaster || paymasterCallback;
            }
            else {
                paymasterOverride = options.overrides?.paymaster;
            }
            // If this transaction is for a different chain than the initial one, get the account contract for that chain
            if (transaction.chainId !== accountContract.chain.id) {
                accountContract = (0, contract_js_1.getContract)({
                    address: account.address,
                    chain: (0, utils_js_1.getCachedChain)(transaction.chainId),
                    client: options.client,
                });
            }
            const executeTx = (0, calls_js_1.prepareExecute)({
                accountContract: accountContract,
                executeOverride: options.overrides?.execute,
                transaction,
            });
            const chain = (0, utils_js_1.getCachedChain)(transaction.chainId);
            const result = await _sendUserOp({
                executeTx,
                options: {
                    ...options,
                    accountContract,
                    chain,
                    overrides: {
                        ...options.overrides,
                        paymaster: paymasterOverride,
                    },
                },
            });
            (0, transaction_js_1.trackTransaction)({
                chainId: chain.id,
                client: options.client,
                contractAddress: transaction.to ?? undefined,
                transactionHash: result.transactionHash,
                walletAddress: options.accountContract.address,
                walletType: "smart",
            });
            return result;
        },
        async signMessage({ message }) {
            if (options.overrides?.signMessage) {
                return options.overrides.signMessage({
                    accountContract,
                    adminAccount: options.personalAccount,
                    factoryContract: options.factoryContract,
                    message,
                });
            }
            const { smartAccountSignMessage } = await Promise.resolve().then(() => require("./lib/signing.js"));
            return smartAccountSignMessage({
                accountContract,
                factoryContract: options.factoryContract,
                message,
                options,
            });
        },
        async signTypedData(typedData) {
            if (options.overrides?.signTypedData) {
                return options.overrides.signTypedData({
                    accountContract,
                    adminAccount: options.personalAccount,
                    factoryContract: options.factoryContract,
                    typedData,
                });
            }
            const { smartAccountSignTypedData } = await Promise.resolve().then(() => require("./lib/signing.js"));
            return smartAccountSignTypedData({
                accountContract,
                factoryContract: options.factoryContract,
                options,
                typedData,
            });
        },
        sendCalls: async (options) => {
            const { inAppWalletSendCalls } = await Promise.resolve().then(() => require("../in-app/core/eip5792/in-app-wallet-calls.js"));
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
            const { inAppWalletGetCallsStatus } = await Promise.resolve().then(() => require("../in-app/core/eip5792/in-app-wallet-calls.js"));
            return inAppWalletGetCallsStatus(options);
        },
        getCallsStatusRaw: async (options) => {
            const { inAppWalletGetCallsStatusRaw } = await Promise.resolve().then(() => require("../in-app/core/eip5792/in-app-wallet-calls.js"));
            return inAppWalletGetCallsStatusRaw(options);
        },
        getCapabilities: async (options) => {
            return {
                [options.chainId ?? 1]: {
                    atomic: {
                        status: "supported",
                    },
                    paymasterService: {
                        supported: sponsorGas ?? false,
                    },
                },
            };
        },
    };
    return account;
}
async function approveERC20(args) {
    const { accountContract, erc20Paymaster, options } = args;
    const tokenAddress = erc20Paymaster.tokenAddress;
    const tokenContract = (0, contract_js_1.getContract)({
        address: tokenAddress,
        chain: accountContract.chain,
        client: accountContract.client,
    });
    const accountAllowance = await (0, allowance_js_1.allowance)({
        contract: tokenContract,
        owner: accountContract.address,
        spender: erc20Paymaster.paymasterAddress,
    });
    if (accountAllowance > 0n) {
        return;
    }
    const approveTx = (0, approve_js_1.approve)({
        amountWei: types_js_1.maxUint96 - 1n,
        contract: tokenContract,
        spender: erc20Paymaster.paymasterAddress,
    });
    const transaction = await (0, to_serializable_transaction_js_1.toSerializableTransaction)({
        from: accountContract.address,
        transaction: approveTx,
    });
    const executeTx = (0, calls_js_1.prepareExecute)({
        accountContract,
        executeOverride: options.overrides?.execute,
        transaction,
    });
    await _sendUserOp({
        executeTx,
        options: {
            ...options,
            overrides: {
                ...options.overrides,
                tokenPaymaster: undefined,
            },
        },
    });
}
function createZkSyncAccount(args) {
    const { creationOptions, connectionOptions, chain } = args;
    const account = {
        address: (0, address_js_1.getAddress)(connectionOptions.personalAccount.address),
        async onTransactionRequested(transaction) {
            return connectionOptions.personalAccount.onTransactionRequested?.(transaction);
        },
        async sendTransaction(transaction) {
            // override passed tx, we have to refetch gas and fees always
            const prepTx = {
                chain: (0, utils_js_1.getCachedChain)(transaction.chainId),
                client: connectionOptions.client,
                data: transaction.data,
                eip712: transaction.eip712,
                to: transaction.to ?? undefined,
                value: transaction.value ?? 0n,
            };
            let serializableTransaction = await (0, send_eip712_transaction_js_1.populateEip712Transaction)({
                account,
                transaction: prepTx,
            });
            if (args.sponsorGas && !serializableTransaction.paymaster) {
                // get paymaster input
                const pmData = await (0, bundler_js_1.getZkPaymasterData)({
                    options: {
                        bundlerUrl: creationOptions.overrides?.bundlerUrl,
                        chain,
                        client: connectionOptions.client,
                        entrypointAddress: creationOptions.overrides?.entrypointAddress,
                    },
                    transaction: serializableTransaction,
                });
                serializableTransaction = {
                    ...serializableTransaction,
                    ...pmData,
                };
            }
            // sign
            const signedTransaction = await (0, send_eip712_transaction_js_1.signEip712Transaction)({
                account,
                chainId: chain.id,
                eip712Transaction: serializableTransaction,
            });
            // broadcast via bundler
            const txHash = await (0, bundler_js_1.broadcastZkTransaction)({
                options: {
                    bundlerUrl: creationOptions.overrides?.bundlerUrl,
                    chain,
                    client: connectionOptions.client,
                    entrypointAddress: creationOptions.overrides?.entrypointAddress,
                },
                signedTransaction,
                transaction: serializableTransaction,
            });
            (0, transaction_js_1.trackTransaction)({
                chainId: chain.id,
                client: connectionOptions.client,
                contractAddress: transaction.to ?? undefined,
                transactionHash: txHash.transactionHash,
                walletAddress: account.address,
                walletType: "smart",
            });
            return {
                chain: chain,
                client: connectionOptions.client,
                transactionHash: txHash.transactionHash,
            };
        },
        async signMessage({ message }) {
            return connectionOptions.personalAccount.signMessage({ message });
        },
        async signTypedData(_typedData) {
            const typedData = (0, parse_typed_data_js_1.parseTypedData)(_typedData);
            return connectionOptions.personalAccount.signTypedData(typedData);
        },
        sendCalls: async (options) => {
            const { inAppWalletSendCalls } = await Promise.resolve().then(() => require("../in-app/core/eip5792/in-app-wallet-calls.js"));
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
            const { inAppWalletGetCallsStatus } = await Promise.resolve().then(() => require("../in-app/core/eip5792/in-app-wallet-calls.js"));
            return inAppWalletGetCallsStatus(options);
        },
        getCallsStatusRaw: async (options) => {
            const { inAppWalletGetCallsStatusRaw } = await Promise.resolve().then(() => require("../in-app/core/eip5792/in-app-wallet-calls.js"));
            return inAppWalletGetCallsStatusRaw(options);
        },
        getCapabilities: async (options) => {
            return {
                [options.chainId ?? 1]: {
                    atomic: {
                        status: "unsupported",
                    },
                    paymasterService: {
                        supported: args.sponsorGas ?? false,
                    },
                },
            };
        },
    };
    return account;
}
async function _sendUserOp(args) {
    const { executeTx, options } = args;
    try {
        const unsignedUserOp = await (0, userop_js_1.createUnsignedUserOp)({
            accountContract: options.accountContract,
            adminAddress: options.personalAccount.address,
            factoryContract: options.factoryContract,
            overrides: options.overrides,
            sponsorGas: options.sponsorGas,
            transaction: executeTx,
        });
        const signedUserOp = await (0, userop_js_1.signUserOp)({
            adminAccount: options.personalAccount,
            chain: options.chain,
            client: options.client,
            entrypointAddress: options.overrides?.entrypointAddress,
            userOp: unsignedUserOp,
        });
        const bundlerOptions = {
            bundlerUrl: options.overrides?.bundlerUrl,
            chain: options.chain,
            client: options.client,
            entrypointAddress: options.overrides?.entrypointAddress,
        };
        const userOpHash = await (0, bundler_js_1.bundleUserOp)({
            options: bundlerOptions,
            userOp: signedUserOp,
        });
        // wait for tx receipt rather than return the userOp hash
        const receipt = await (0, userop_js_1.waitForUserOpReceipt)({
            ...bundlerOptions,
            userOpHash,
        });
        (0, transaction_js_1.trackTransaction)({
            chainId: options.chain.id,
            client: options.client,
            contractAddress: await (0, resolve_promised_value_js_1.resolvePromisedValue)(executeTx.to ?? undefined),
            transactionHash: receipt.transactionHash,
            walletAddress: options.accountContract.address,
            walletType: "smart",
        });
        return {
            chain: options.chain,
            client: options.client,
            transactionHash: receipt.transactionHash,
        };
    }
    catch (error) {
        // Track insufficient funds errors
        if ((0, helpers_js_1.isInsufficientFundsError)(error)) {
            (0, transaction_js_1.trackInsufficientFundsError)({
                chainId: options.chain.id,
                client: options.client,
                contractAddress: await (0, resolve_promised_value_js_1.resolvePromisedValue)(executeTx.to ?? undefined),
                error,
                transactionValue: await (0, resolve_promised_value_js_1.resolvePromisedValue)(executeTx.value),
                walletAddress: options.accountContract.address,
            });
        }
        throw error;
    }
    finally {
        // reset the isDeploying flag after every transaction or error
        (0, userop_js_1.clearAccountDeploying)(options.accountContract);
    }
}
async function getEntrypointFromFactory(factoryAddress, client, chain) {
    const factoryContract = (0, contract_js_1.getContract)({
        address: factoryAddress,
        chain,
        client,
    });
    try {
        const entrypointAddress = await (0, read_contract_js_1.readContract)({
            contract: factoryContract,
            method: "function entrypoint() public view returns (address)",
        });
        return entrypointAddress;
    }
    catch {
        return undefined;
    }
}
//# sourceMappingURL=index.js.map