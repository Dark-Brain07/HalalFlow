"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InAppWalletIframeCommunicator = void 0;
const webStorage_js_1 = require("../../../../../utils/storage/webStorage.js");
const client_scoped_storage_js_1 = require("../../../core/authentication/client-scoped-storage.js");
const settings_js_1 = require("../../../core/constants/settings.js");
const IframeCommunicator_js_1 = require("./IframeCommunicator.js");
/**
 * @internal
 */
class InAppWalletIframeCommunicator extends IframeCommunicator_js_1.IframeCommunicator {
    /**
     * @internal
     */
    constructor({ clientId, baseUrl, ecosystem, }) {
        super({
            baseUrl,
            clientId,
            container: typeof document === "undefined" ? undefined : document.body,
            ecosystem,
            iframeId: IN_APP_WALLET_IFRAME_ID + (ecosystem?.id || ""),
            link: createInAppWalletIframeLink({
                baseUrl,
                clientId,
                ecosystem,
                path: settings_js_1.IN_APP_WALLET_PATH,
            }).href,
            localStorage: new client_scoped_storage_js_1.ClientScopedStorage({
                clientId,
                ecosystem,
                storage: webStorage_js_1.webLocalStorage,
            }),
        });
        this.clientId = clientId;
        this.ecosystem = ecosystem;
    }
}
exports.InAppWalletIframeCommunicator = InAppWalletIframeCommunicator;
// This is the URL and ID tag of the iFrame that we communicate with
/**
 * @internal
 */
function createInAppWalletIframeLink({ clientId, baseUrl, path, ecosystem, queryParams, }) {
    const inAppWalletUrl = new URL(`${path}`, baseUrl);
    if (queryParams) {
        for (const queryKey of Object.keys(queryParams)) {
            inAppWalletUrl.searchParams.set(queryKey, queryParams[queryKey]?.toString() || "");
        }
    }
    inAppWalletUrl.searchParams.set("clientId", clientId);
    if (ecosystem?.partnerId !== undefined) {
        inAppWalletUrl.searchParams.set("partnerId", ecosystem.partnerId);
    }
    if (ecosystem?.id !== undefined) {
        inAppWalletUrl.searchParams.set("ecosystemId", ecosystem.id);
    }
    return inAppWalletUrl;
}
const IN_APP_WALLET_IFRAME_ID = "thirdweb-in-app-wallet-iframe";
//# sourceMappingURL=InAppWalletIframeCommunicator.js.map