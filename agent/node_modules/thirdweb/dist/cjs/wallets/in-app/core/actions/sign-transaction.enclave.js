"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signTransaction = signTransaction;
const domains_js_1 = require("../../../../utils/domains.js");
const fetch_js_1 = require("../../../../utils/fetch.js");
const json_js_1 = require("../../../../utils/json.js");
async function signTransaction({ client, payload, storage, }) {
    const authToken = await storage.getAuthCookie();
    const ecosystem = storage.ecosystem;
    const clientFetch = (0, fetch_js_1.getClientFetch)(client, ecosystem);
    if (!authToken) {
        throw new Error("No auth token found when signing transaction");
    }
    const response = await clientFetch(`${(0, domains_js_1.getThirdwebBaseUrl)("inAppWallet")}/api/v1/enclave-wallet/sign-transaction`, {
        body: (0, json_js_1.stringify)({
            transactionPayload: payload,
        }),
        headers: {
            Authorization: `Bearer embedded-wallet-token:${authToken}`,
            "Content-Type": "application/json",
            "x-thirdweb-client-id": client.clientId,
        },
        method: "POST",
    });
    if (!response.ok) {
        throw new Error(`Failed to sign transaction - ${response.status} ${response.statusText}`);
    }
    const signedTransaction = (await response.json());
    return signedTransaction.signature;
}
//# sourceMappingURL=sign-transaction.enclave.js.map