"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signAuthorization = signAuthorization;
const domains_js_1 = require("../../../../utils/domains.js");
const fetch_js_1 = require("../../../../utils/fetch.js");
const json_js_1 = require("../../../../utils/json.js");
async function signAuthorization({ client, payload, storage, }) {
    const authToken = await storage.getAuthCookie();
    const ecosystem = storage.ecosystem;
    const clientFetch = (0, fetch_js_1.getClientFetch)(client, ecosystem);
    if (!authToken) {
        throw new Error("No auth token found when signing message");
    }
    const body = {
        address: payload.address,
        chainId: payload.chainId,
        nonce: Number(payload.nonce),
    };
    const response = await clientFetch(`${(0, domains_js_1.getThirdwebBaseUrl)("inAppWallet")}/api/v1/enclave-wallet/sign-authorization`, {
        body: (0, json_js_1.stringify)(body),
        headers: {
            Authorization: `Bearer embedded-wallet-token:${authToken}`,
            "Content-Type": "application/json",
            "x-thirdweb-client-id": client.clientId,
        },
        method: "POST",
    });
    if (!response.ok) {
        throw new Error(`Failed to sign message - ${response.status} ${response.statusText}`);
    }
    const signedAuthorization = (await response.json());
    return signedAuthorization;
}
//# sourceMappingURL=sign-authorization.enclave.js.map