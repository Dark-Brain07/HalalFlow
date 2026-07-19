import type { SocialAuthOption } from "../../../../wallets/types.js";
import type { Account } from "../../../interfaces/wallet.js";
import type { ClientScopedStorage } from "../authentication/client-scoped-storage.js";
import type { AuthArgsType, AuthLoginReturnType, AuthStoredTokenWithCookieReturnType, GetUser, LogoutReturnType, MultiStepAuthArgsType, PreAuthArgsType, Profile, SingleStepAuthArgsType } from "../authentication/types.js";
export interface InAppConnector {
    getUser(): Promise<GetUser>;
    getAccount(): Promise<Account>;
    preAuthenticate(args: PreAuthArgsType): Promise<void>;
    authenticateWithRedirect?(strategy: SocialAuthOption, mode?: "redirect" | "popup" | "window", redirectUrl?: string): Promise<void>;
    linkProfileWithRedirect?(strategy: SocialAuthOption, mode?: "redirect" | "window", redirectUrl?: string): Promise<void>;
    loginWithAuthToken?(authResult: AuthStoredTokenWithCookieReturnType): Promise<AuthLoginReturnType>;
    authenticate(args: MultiStepAuthArgsType | SingleStepAuthArgsType): Promise<AuthStoredTokenWithCookieReturnType>;
    connect(args: MultiStepAuthArgsType | SingleStepAuthArgsType): Promise<AuthLoginReturnType>;
    logout(): Promise<LogoutReturnType>;
    linkProfile(args: AuthArgsType): Promise<Profile[]>;
    unlinkProfile(args: Profile, allowAccountDeletion?: boolean): Promise<Profile[]>;
    getProfiles(): Promise<Profile[]>;
    storage: ClientScopedStorage;
}
//# sourceMappingURL=connector.d.ts.map