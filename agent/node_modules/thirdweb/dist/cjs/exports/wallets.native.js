"use strict";
// --- KEEEP IN SYNC with exports/wallets.ts ---
Object.defineProperty(exports, "__esModule", { value: true });
exports.injectedProvider = exports.getActiveWalletConnectSessions = exports.disconnectWalletConnectSession = exports.DefaultWalletConnectRequestHandlers = exports.createWalletConnectSession = exports.createWalletConnectClient = exports.getAllWalletsList = exports.getWalletInfo = exports.createWalletAdapter = exports.EIP1193 = exports.authenticateWithRedirect = exports.getWalletBalance = exports.generateAccount = exports.smartWallet = exports.privateKeyAccount = exports.privateKeyToAccount = exports.walletConnect = exports.createWallet = exports.inAppWallet = exports.ecosystemWallet = exports.unlinkProfile = exports.preAuthenticate = exports.linkProfile = exports.getUserPhoneNumber = exports.getUserEmail = exports.getProfiles = exports.authenticate = void 0;
var index_js_1 = require("../wallets/in-app/native/auth/index.js");
Object.defineProperty(exports, "authenticate", { enumerable: true, get: function () { return index_js_1.authenticate; } });
Object.defineProperty(exports, "getProfiles", { enumerable: true, get: function () { return index_js_1.getProfiles; } });
Object.defineProperty(exports, "getUserEmail", { enumerable: true, get: function () { return index_js_1.getUserEmail; } });
Object.defineProperty(exports, "getUserPhoneNumber", { enumerable: true, get: function () { return index_js_1.getUserPhoneNumber; } });
Object.defineProperty(exports, "linkProfile", { enumerable: true, get: function () { return index_js_1.linkProfile; } });
Object.defineProperty(exports, "preAuthenticate", { enumerable: true, get: function () { return index_js_1.preAuthenticate; } });
Object.defineProperty(exports, "unlinkProfile", { enumerable: true, get: function () { return index_js_1.unlinkProfile; } });
var ecosystem_js_1 = require("../wallets/in-app/native/ecosystem.js");
Object.defineProperty(exports, "ecosystemWallet", { enumerable: true, get: function () { return ecosystem_js_1.ecosystemWallet; } });
var in_app_js_1 = require("../wallets/in-app/native/in-app.js");
Object.defineProperty(exports, "inAppWallet", { enumerable: true, get: function () { return in_app_js_1.inAppWallet; } });
var create_wallet_js_1 = require("../wallets/native/create-wallet.js");
Object.defineProperty(exports, "createWallet", { enumerable: true, get: function () { return create_wallet_js_1.createWallet; } });
Object.defineProperty(exports, "walletConnect", { enumerable: true, get: function () { return create_wallet_js_1.walletConnect; } });
// private-key
var private_key_js_1 = require("../wallets/private-key.js");
Object.defineProperty(exports, "privateKeyToAccount", { enumerable: true, get: function () { return private_key_js_1.privateKeyToAccount; } });
/**
 * @internal
 * @deprecated - use {@link privateKeyToAccount} instead
 */
Object.defineProperty(exports, "privateKeyAccount", { enumerable: true, get: function () { return private_key_js_1.privateKeyToAccount; } });
var smart_wallet_js_1 = require("../wallets/smart/smart-wallet.js");
Object.defineProperty(exports, "smartWallet", { enumerable: true, get: function () { return smart_wallet_js_1.smartWallet; } });
var generateAccount_js_1 = require("../wallets/utils/generateAccount.js");
Object.defineProperty(exports, "generateAccount", { enumerable: true, get: function () { return generateAccount_js_1.generateAccount; } });
// utils
var getWalletBalance_js_1 = require("../wallets/utils/getWalletBalance.js");
Object.defineProperty(exports, "getWalletBalance", { enumerable: true, get: function () { return getWalletBalance_js_1.getWalletBalance; } });
const authenticateWithRedirect = () => {
    throw new Error("Not supported in native");
};
exports.authenticateWithRedirect = authenticateWithRedirect;
// eip1193
exports.EIP1193 = require("../adapters/eip1193/index.js");
var wallet_adapter_js_1 = require("../adapters/wallet-adapter.js");
Object.defineProperty(exports, "createWalletAdapter", { enumerable: true, get: function () { return wallet_adapter_js_1.createWalletAdapter; } });
var getWalletInfo_js_1 = require("../wallets/__generated__/getWalletInfo.js");
Object.defineProperty(exports, "getWalletInfo", { enumerable: true, get: function () { return getWalletInfo_js_1.getWalletInfo; } });
var getAllWalletsList_js_1 = require("../wallets/getAllWalletsList.js");
Object.defineProperty(exports, "getAllWalletsList", { enumerable: true, get: function () { return getAllWalletsList_js_1.getAllWalletsList; } });
// wallet connect
var index_js_2 = require("../wallets/wallet-connect/receiver/index.js");
Object.defineProperty(exports, "createWalletConnectClient", { enumerable: true, get: function () { return index_js_2.createWalletConnectClient; } });
Object.defineProperty(exports, "createWalletConnectSession", { enumerable: true, get: function () { return index_js_2.createWalletConnectSession; } });
Object.defineProperty(exports, "DefaultWalletConnectRequestHandlers", { enumerable: true, get: function () { return index_js_2.DefaultWalletConnectRequestHandlers; } });
Object.defineProperty(exports, "disconnectWalletConnectSession", { enumerable: true, get: function () { return index_js_2.disconnectWalletConnectSession; } });
Object.defineProperty(exports, "getActiveWalletConnectSessions", { enumerable: true, get: function () { return index_js_2.getActiveWalletConnectSessions; } });
// NOT SUPPORTED
const injectedProvider = () => {
    throw new Error("Not supported in native");
};
exports.injectedProvider = injectedProvider;
//# sourceMappingURL=wallets.native.js.map