"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.autoConnect = autoConnect;
const webStorage_js_1 = require("../../utils/storage/webStorage.js");
const create_wallet_js_1 = require("../create-wallet.js");
const defaultWallets_js_1 = require("../defaultWallets.js");
const index_js_1 = require("../manager/index.js");
const autoConnectCore_js_1 = require("./autoConnectCore.js");
/**
 * Attempts to automatically connect to the last connected wallet.
 * It combines both specified wallets and installed wallet providers that aren't already specified.
 *
 * @example
 *
 * ```tsx
 * import { autoConnect } from "thirdweb/wallets";
 *
 * const autoConnected = await autoConnect({
 *  client,
 *  onConnect: (activeWallet, allConnectedWallets) => {
 *    console.log("active wallet", activeWallet);
 *    console.log("all connected wallets", allConnectedWallets);
 *  },
 * });
 * ```
 *
 * @param props - The auto-connect configuration properties
 * @param props.wallets - Array of wallet instances to consider for auto-connection
 * @returns {boolean} a promise resolving to true or false depending on whether the auto connect function connected to a wallet or not
 * @walletConnection
 */
async function autoConnect(props) {
    const wallets = props.wallets || (0, defaultWallets_js_1.getDefaultWallets)(props);
    const manager = (0, index_js_1.createConnectionManager)(webStorage_js_1.webLocalStorage);
    const result = await (0, autoConnectCore_js_1.autoConnectCore)({
        createWalletFn: create_wallet_js_1.createWallet,
        manager,
        props: {
            ...props,
            wallets,
        },
        storage: webStorage_js_1.webLocalStorage,
    });
    return result;
}
//# sourceMappingURL=autoConnect.js.map