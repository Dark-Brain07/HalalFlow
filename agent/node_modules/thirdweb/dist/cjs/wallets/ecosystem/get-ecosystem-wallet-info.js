"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEcosystemWalletInfo = getEcosystemWalletInfo;
const get_ecosystem_wallet_auth_options_js_1 = require("./get-ecosystem-wallet-auth-options.js");
/**
 * Fetches metadata for a given ecosystem wallet.
 *
 * @param {EcosystemWalletId} walletId - The ecosystem wallet ID.
 * @returns {Promise<{ imageUrl: string | undefined, name: string | undefined }>} A promise that resolves to an object containing the wallet's image URL and name.
 * @throws {Error} Throws an error if no partner ID is provided in the wallet configuration.
 * @internal
 */
async function getEcosystemWalletInfo(walletId) {
    const data = await (0, get_ecosystem_wallet_auth_options_js_1.getEcosystemInfo)(walletId);
    return {
        app: {
            android: null,
            browser: null,
            chrome: null,
            edge: null,
            firefox: null,
            ios: null,
            linux: null,
            mac: null,
            opera: null,
            safari: null,
            windows: null,
        },
        desktop: {
            native: null,
            universal: null,
        },
        homepage: data.homepage || "",
        id: walletId,
        image_id: data.imageUrl || "",
        mobile: {
            native: null,
            universal: null,
        },
        name: data.name,
        rdns: null,
    };
}
//# sourceMappingURL=get-ecosystem-wallet-info.js.map