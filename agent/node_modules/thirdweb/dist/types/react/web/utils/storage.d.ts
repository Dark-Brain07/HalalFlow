/**
 * Retrieves the last authentication provider used from local storage.
 *
 * This function is designed to work only in a browser environment.
 *
 * @returns {Promise<AuthArgsType["strategy"] | null>} A promise that resolves to the last
 * authentication provider strategy used, or `null` if none is found.
 *
 * @example
 * ```typescript
 * import { getLastAuthProvider } from "thirdweb/react";
 *
 * const lastAuthProvider = await getLastAuthProvider();
 * ```
 *
 * @utils
 */
export declare function getLastAuthProvider(): Promise<"wallet" | import("../../../wallets/types.js").OAuthOption | "backend" | "email" | "phone" | "passkey" | "jwt" | "auth_endpoint" | "iframe_email_verification" | "iframe" | null>;
//# sourceMappingURL=storage.d.ts.map