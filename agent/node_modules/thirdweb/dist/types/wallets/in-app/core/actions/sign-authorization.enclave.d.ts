import type { ThirdwebClient } from "../../../../client/client.js";
import type { AuthorizationRequest } from "../../../../transaction/actions/eip7702/authorization.js";
import type { ClientScopedStorage } from "../authentication/client-scoped-storage.js";
export declare function signAuthorization({ client, payload, storage, }: {
    client: ThirdwebClient;
    payload: AuthorizationRequest;
    storage: ClientScopedStorage;
}): Promise<{
    r: string;
    s: string;
    yParity: string;
    nonce: string;
    address: string;
    chainId: string;
}>;
//# sourceMappingURL=sign-authorization.enclave.d.ts.map