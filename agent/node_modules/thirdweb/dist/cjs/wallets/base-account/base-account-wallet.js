"use strict";
/**
 * internal helper functions for Base Account SDK wallet
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseAccountWalletSDK = baseAccountWalletSDK;
const connect_js_1 = require("../../analytics/track/connect.js");
const utils_js_1 = require("../../chains/utils.js");
const constants_js_1 = require("../constants.js");
const wallet_emitter_js_1 = require("../wallet-emitter.js");
/**
 * @internal
 */
function baseAccountWalletSDK(args) {
    const { createOptions } = args;
    const emitter = (0, wallet_emitter_js_1.createWalletEmitter)();
    let account;
    let chain;
    function reset() {
        account = undefined;
        chain = undefined;
    }
    let handleDisconnect = async () => { };
    let handleSwitchChain = async (newChain) => {
        chain = newChain;
    };
    const unsubscribeChainChanged = emitter.subscribe("chainChanged", (newChain) => {
        chain = newChain;
    });
    const unsubscribeDisconnect = emitter.subscribe("disconnect", () => {
        reset();
        unsubscribeChainChanged();
        unsubscribeDisconnect();
    });
    emitter.subscribe("accountChanged", (_account) => {
        account = _account;
    });
    return {
        autoConnect: async (options) => {
            const { autoConnectBaseAccountSDK } = await Promise.resolve().then(() => require("./base-account-web.js"));
            const provider = await args.providerFactory();
            const [connectedAccount, connectedChain, doDisconnect, doSwitchChain] = await autoConnectBaseAccountSDK(options, emitter, provider);
            // set the states
            account = connectedAccount;
            chain = connectedChain;
            handleDisconnect = doDisconnect;
            handleSwitchChain = doSwitchChain;
            (0, connect_js_1.trackConnect)({
                chainId: chain.id,
                client: options.client,
                walletAddress: account.address,
                walletType: constants_js_1.BASE_ACCOUNT,
            });
            // return account
            return account;
        },
        connect: async (options) => {
            const { connectBaseAccountSDK } = await Promise.resolve().then(() => require("./base-account-web.js"));
            const provider = await args.providerFactory();
            const [connectedAccount, connectedChain, doDisconnect, doSwitchChain] = await connectBaseAccountSDK(options, emitter, provider);
            // set the states
            account = connectedAccount;
            chain = connectedChain;
            handleDisconnect = doDisconnect;
            handleSwitchChain = doSwitchChain;
            (0, connect_js_1.trackConnect)({
                chainId: chain.id,
                client: options.client,
                walletAddress: account.address,
                walletType: constants_js_1.BASE_ACCOUNT,
            });
            // return account
            return account;
        },
        disconnect: async () => {
            reset();
            await handleDisconnect();
        },
        getAccount: () => account,
        getChain() {
            if (!chain) {
                return undefined;
            }
            chain = (0, utils_js_1.getCachedChainIfExists)(chain.id) || chain;
            return chain;
        },
        getConfig: () => createOptions,
        id: constants_js_1.BASE_ACCOUNT,
        subscribe: emitter.subscribe,
        switchChain: async (newChain) => {
            await handleSwitchChain(newChain);
        },
    };
}
//# sourceMappingURL=base-account-wallet.js.map