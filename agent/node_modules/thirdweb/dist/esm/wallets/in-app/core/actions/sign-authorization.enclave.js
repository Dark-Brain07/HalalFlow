import { getThirdwebBaseUrl } from "../../../../utils/domains.js";
import { getClientFetch } from "../../../../utils/fetch.js";
import { stringify } from "../../../../utils/json.js";
export async function signAuthorization({ client, payload, storage, }) {
    const authToken = await storage.getAuthCookie();
    const ecosystem = storage.ecosystem;
    const clientFetch = getClientFetch(client, ecosystem);
    if (!authToken) {
        throw new Error("No auth token found when signing message");
    }
    const body = {
        address: payload.address,
        chainId: payload.chainId,
        nonce: Number(payload.nonce),
    };
    const response = await clientFetch(`${getThirdwebBaseUrl("inAppWallet")}/api/v1/enclave-wallet/sign-authorization`, {
        body: stringify(body),
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