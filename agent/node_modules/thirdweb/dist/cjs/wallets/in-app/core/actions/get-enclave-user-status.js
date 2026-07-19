"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserStatus = getUserStatus;
const domains_js_1 = require("../../../../utils/domains.js");
const fetch_js_1 = require("../../../../utils/fetch.js");
/**
 * Gets the user's status from the backend.
 *
 * @internal
 */
async function getUserStatus({ authToken, client, ecosystem, }) {
    const clientFetch = (0, fetch_js_1.getClientFetch)(client, ecosystem);
    const response = await clientFetch(`${(0, domains_js_1.getThirdwebBaseUrl)("inAppWallet")}/api/2024-05-05/accounts`, {
        headers: {
            Authorization: `Bearer embedded-wallet-token:${authToken}`,
            "Content-Type": "application/json",
        },
        method: "GET",
    });
    if (!response.ok) {
        const result = await response.text().catch(() => {
            return "Unknown error";
        });
        throw new Error(`Failed to get user info: ${result}`);
    }
    return (await response.json());
}
//# sourceMappingURL=get-enclave-user-status.js.map