import type { ThirdwebClient } from "../../../../client/client.js";
import type { Ecosystem } from "../wallet/types.js";
import type { ClientScopedStorage } from "./client-scoped-storage.js";
import type { AuthStoredTokenWithCookieReturnType } from "./types.js";
/**
 * Does no real authentication, just issues a temporary token for the user.
 * @internal
 */
export declare function guestAuthenticate(args: {
    client: ThirdwebClient;
    storage: ClientScopedStorage;
    ecosystem?: Ecosystem;
}): Promise<AuthStoredTokenWithCookieReturnType>;
//# sourceMappingURL=guest.d.ts.map