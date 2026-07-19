import { stringify } from "../../utils/json.js";
import { track } from "./index.js";
/**
 * @internal
 */
export async function trackLogin(event) {
    return trackSiweEvent({
        ...event,
        action: "login:attempt",
    });
}
/**
 * @internal
 */
async function trackSiweEvent(event) {
    return track({
        client: event.client,
        data: {
            action: event.action,
            chainId: event.chainId,
            clientId: event.client.clientId,
            errorCode: stringify(event.error),
            walletAddress: event.walletAddress,
            walletType: event.walletType,
        },
        ecosystem: event.ecosystem,
    });
}
//# sourceMappingURL=siwe.js.map