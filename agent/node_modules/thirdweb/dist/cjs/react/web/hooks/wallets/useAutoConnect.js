"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAutoConnect = useAutoConnect;
const webStorage_js_1 = require("../../../../utils/storage/webStorage.js");
const create_wallet_js_1 = require("../../../../wallets/create-wallet.js");
const defaultWallets_js_1 = require("../../../../wallets/defaultWallets.js");
const useAutoConnect_js_1 = require("../../../core/hooks/wallets/useAutoConnect.js");
/**
 * Autoconnect the last previously connected wallet.
 *
 * @example
 * ```tsx
 * import { useAutoConnect } from "thirdweb/react";
 *
 * const { data: autoConnected, isLoading } = useAutoConnect({
 *  client,
 *  accountAbstraction,
 *  wallets,
 *  onConnect,
 *  timeout,
 * });
 * ```
 * @walletConnection
 * @param props - The props for auto connect.
 * @returns whether the auto connect was successful.
 */
function useAutoConnect(props) {
    const wallets = props.wallets || (0, defaultWallets_js_1.getDefaultWallets)(props);
    return (0, useAutoConnect_js_1.useAutoConnectCore)(webStorage_js_1.webLocalStorage, {
        ...props,
        wallets,
    }, create_wallet_js_1.createWallet);
}
//# sourceMappingURL=useAutoConnect.js.map