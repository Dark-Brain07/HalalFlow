import { grantRoles } from "../__generated__/OwnableRoles/write/grantRoles.js";
const MINTER_ROLE = 1n;
/**
 * Grants the minter role to a user.
 * @param options - The transaction options.
 * @returns The transaction to send.
 * @modules
 *
 * @example
 * ```ts
 * import { grantMinterRole } from "thirdweb/modules";
 *
 * const tx = await grantMinterRole({
 *   contract,
 *   user: userAddress,
 * });
 * ```
 */
export function grantMinterRole(options) {
    return grantRoles({
        contract: options.contract,
        roles: MINTER_ROLE,
        user: options.user,
    });
}
//# sourceMappingURL=grantMinterRole.js.map