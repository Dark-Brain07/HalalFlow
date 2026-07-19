import type { ThirdwebClient } from "../../../../client/client.js";
import { type AuthOption } from "../../../../wallets/types.js";
import type { Ecosystem } from "../wallet/types.js";
export declare const getLoginUrl: ({ authOption, client, ecosystem, mode, redirectUrl, authFlow, }: {
    authOption: AuthOption;
    client: ThirdwebClient;
    ecosystem?: Ecosystem;
    mode?: "popup" | "redirect" | "window";
    redirectUrl?: string;
    authFlow?: "connect" | "link";
}) => string;
export declare const getLoginCallbackUrl: ({ authOption, client, ecosystem, }: {
    authOption: AuthOption;
    client: ThirdwebClient;
    ecosystem?: Ecosystem;
}) => string;
//# sourceMappingURL=getLoginPath.d.ts.map