import type { ThirdwebClient } from "../../../../client/client.js";
import type { Profile } from "../../../../wallets/in-app/core/authentication/types.js";
/**
 * Unlinks a web2 or web3 profile currently connected in-app or ecosystem account.
 * **When a profile is unlinked from the account, it will no longer be able to be used to sign into the account.**
 *
 * @example
 *
 * ### Unlinking an email account
 *
 * ```jsx
 * import { useUnlinkProfile } from "thirdweb/react";
 *
 * const { data: connectedProfiles, isLoading } = useProfiles({
 *   client: props.client,
 * });
 * const { mutate: unlinkProfile } = useUnlinkProfile();
 *
 * const onClick = () => {
 *   unlinkProfile({
 *     client,
 *      // Select any other profile you want to unlink
 *     profileToUnlink: connectedProfiles[1]
 *   });
 * };
 * ```
 *
 * ### Unlinking an email account with account deletion
 *
 * ```jsx
 * import { useUnlinkProfile } from "thirdweb/react";
 *
 * const { mutate: unlinkProfile } = useUnlinkProfile();
 *
 * const onClick = () => {
 *   unlinkProfile({
 *     client,
 *      // Select the profile you want to unlink
 *     profileToUnlink: connectedProfiles[0],
 *     allowAccountDeletion: true, // This will delete the account if it's the last profile linked to the account
 *   });
 * };
 * ```
 *
 * @wallet
 */
export declare function useUnlinkProfile(): import("@tanstack/react-query").UseMutationResult<void, Error, {
    client: ThirdwebClient;
    profileToUnlink: Profile;
    allowAccountDeletion?: boolean;
}, unknown>;
//# sourceMappingURL=useUnlinkProfile.d.ts.map