import type { AsyncStorage } from "../../../utils/storage/AsyncStorage.js";
import type { AuthArgsType } from "../../../wallets/in-app/core/authentication/types.js";
export declare const LAST_AUTH_PROVIDER_STORAGE_KEY = "lastAuthProvider";
export declare function setLastAuthProvider(authProvider: AuthArgsType["strategy"], storage: AsyncStorage): Promise<void>;
export declare function getLastAuthProvider(storage: AsyncStorage): Promise<"wallet" | import("../../../wallets/types.js").OAuthOption | "backend" | "email" | "phone" | "passkey" | "jwt" | "auth_endpoint" | "iframe_email_verification" | "iframe" | null>;
//# sourceMappingURL=storage.d.ts.map