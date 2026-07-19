import { getClientFetch } from "../../../../utils/fetch.js";
import { stringify } from "../../../../utils/json.js";
import { ROUTE_AUTH_JWT_CALLBACK } from "../../native/helpers/constants.js";
import { createErrorMessage } from "../../native/helpers/errors.js";
export async function customJwt(args) {
    const clientFetch = getClientFetch(args.client, args.ecosystem);
    const res = await clientFetch(ROUTE_AUTH_JWT_CALLBACK, {
        body: stringify({
            developerClientId: args.client.clientId,
            jwt: args.jwt,
        }),
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
    });
    if (!res.ok) {
        const error = await res.json();
        throw new Error(`JWT authentication error: ${error.message}`);
    }
    try {
        const { verifiedToken } = await res.json();
        return { storedToken: verifiedToken };
    }
    catch (e) {
        throw new Error(createErrorMessage("Malformed response from post jwt authentication", e));
    }
}
//# sourceMappingURL=jwt.js.map