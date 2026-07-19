import { getThirdwebBaseUrl } from "../../../../utils/domains.js";
import { getClientFetch } from "../../../../utils/fetch.js";
import { stringify } from "../../../../utils/json.js";
export async function signTransaction({ client, payload, storage, }) {
    const authToken = await storage.getAuthCookie();
    const ecosystem = storage.ecosystem;
    const clientFetch = getClientFetch(client, ecosystem);
    if (!authToken) {
        throw new Error("No auth token found when signing transaction");
    }
    const response = await clientFetch(`${getThirdwebBaseUrl("inAppWallet")}/api/v1/enclave-wallet/sign-transaction`, {
        body: stringify({
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