"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isInAppSigner = isInAppSigner;
const is_ecosystem_wallet_js_1 = require("../../../../wallets/ecosystem/is-ecosystem-wallet.js");
const index_js_1 = require("../../../smart/index.js");
const index_js_2 = require("./index.js");
function isInAppSigner(options) {
    const isInAppOrEcosystem = (w) => (0, index_js_2.isInAppWallet)(w) || (0, is_ecosystem_wallet_js_1.isEcosystemWallet)(w);
    const isSmartWalletWithAdmin = (0, index_js_1.isSmartWallet)(options.wallet) &&
        options.connectedWallets.some((w) => isInAppOrEcosystem(w) &&
            w.getAccount()?.address?.toLowerCase() ===
                options.wallet.getAdminAccount?.()?.address?.toLowerCase());
    return isInAppOrEcosystem(options.wallet) || isSmartWalletWithAdmin;
}
//# sourceMappingURL=is-in-app-signer.js.map