"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSmartWallet = isSmartWallet;
exports.hasSponsoredTransactionsEnabled = hasSponsoredTransactionsEnabled;
const is_ecosystem_wallet_js_1 = require("../ecosystem/is-ecosystem-wallet.js");
/**
 * Checks if the given wallet is a smart wallet.
 *
 * @param {Wallet} wallet - The wallet to check.
 * @returns {boolean} True if the wallet is a smart wallet, false otherwise.
 * @internal
 */
function isSmartWallet(activeWallet) {
    if (!activeWallet) {
        return false;
    }
    if (activeWallet.id === "smart") {
        return true;
    }
    if (activeWallet.id === "inApp" || (0, is_ecosystem_wallet_js_1.isEcosystemWallet)(activeWallet)) {
        const options = activeWallet.getConfig();
        if (options && "smartAccount" in options && options.smartAccount) {
            return true;
        }
        if (options?.executionMode) {
            const execMode = options.executionMode;
            return execMode.mode === "EIP4337" || execMode.mode === "EIP7702";
        }
    }
    return false;
}
/**
 * @internal
 */
function hasSponsoredTransactionsEnabled(wallet) {
    if (!wallet) {
        return false;
    }
    let sponsoredTransactionsEnabled = false;
    if (wallet && wallet.id === "smart") {
        const options = wallet.getConfig();
        if ("sponsorGas" in options) {
            sponsoredTransactionsEnabled = options.sponsorGas;
        }
        if ("gasless" in options) {
            sponsoredTransactionsEnabled = options.gasless;
        }
    }
    if (wallet && (wallet.id === "inApp" || (0, is_ecosystem_wallet_js_1.isEcosystemWallet)(wallet))) {
        const options = wallet.getConfig();
        if (options && "smartAccount" in options && options.smartAccount) {
            const smartOptions = options.smartAccount;
            if ("sponsorGas" in smartOptions) {
                sponsoredTransactionsEnabled = smartOptions.sponsorGas;
            }
            if ("gasless" in smartOptions) {
                sponsoredTransactionsEnabled = smartOptions.gasless;
            }
        }
        if (options?.executionMode) {
            const execMode = options.executionMode;
            if (execMode.mode === "EIP4337") {
                const smartOptions = execMode.smartAccount;
                if (smartOptions && "sponsorGas" in smartOptions) {
                    sponsoredTransactionsEnabled = smartOptions.sponsorGas;
                }
                if (smartOptions && "gasless" in smartOptions) {
                    sponsoredTransactionsEnabled = smartOptions.gasless;
                }
            }
            if (execMode.mode === "EIP7702") {
                sponsoredTransactionsEnabled = execMode.sponsorGas || false;
            }
        }
    }
    return sponsoredTransactionsEnabled;
}
//# sourceMappingURL=is-smart-wallet.js.map