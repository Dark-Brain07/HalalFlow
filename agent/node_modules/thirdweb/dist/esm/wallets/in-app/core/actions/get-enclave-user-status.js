import { getThirdwebBaseUrl } from "../../../../utils/domains.js";
import { getClientFetch } from "../../../../utils/fetch.js";
/**
 * Gets the user's status from the backend.
 *
 * @internal
 */
export async function getUserStatus({ authToken, client, ecosystem, }) {
    const clientFetch = getClientFetch(client, ecosystem);
    const response = await clientFetch(`${getThirdwebBaseUrl("inAppWallet")}/api/2024-05-05/accounts`, {
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