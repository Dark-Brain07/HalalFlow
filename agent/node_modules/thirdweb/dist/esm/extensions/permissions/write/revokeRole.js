import { revokeRole as generatedRevokeRole } from "../__generated__/IPermissions/write/revokeRole.js";
import { getRoleHash } from "../utils.js";
export { isRevokeRoleSupported } from "../__generated__/IPermissions/write/revokeRole.js";
/**
 * Revokes a role from a target account.
 *
 * @param options - The options for revoking the role.
 * @returns A transaction that revokes the role when sent.
 * @extension PERMISSIONS
 * @example
 * ```ts
 * import { revokeRole } from "thirdweb/extensions/permissions";
 * import { sendTransaction } from "thirdweb";
 *
 * const transaction = revokeRole({
 *  contract,
 *  role: "admin",
 *  targetAccountAddress: "0x1234567890123456789012345678901234567890",
 * });
 *
 * await sendTransaction({ transaction, account });
 * ```
 */
export function revokeRole(options) {
    return generatedRevokeRole({
        account: options.targetAccountAddress,
        contract: options.contract,
        role: getRoleHash(options.role),
    });
}
//# sourceMappingURL=revokeRole.js.map