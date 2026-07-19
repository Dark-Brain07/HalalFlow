import { keccakId } from "../../utils/any-evm/keccak-id.js";
import { LruMap } from "../../utils/caching/lru.js";
import { isHex, padHex } from "../../utils/encoding/hex.js";
/**
 * A map of all current thirdweb's smart contract roles
 */
export const roleMap = {
    admin: "",
    asset: "ASSET_ROLE",
    factory: "FACTORY_ROLE",
    lister: "LISTER_ROLE",
    metadata: "METADATA_ROLE",
    migration: "MIGRATION_ROLE",
    minter: "MINTER_ROLE",
    pauser: "PAUSER_ROLE",
    revoke: "REVOKE_ROLE",
    signer: "SIGNER_ROLE",
    transfer: "TRANSFER_ROLE",
    unwrap: "UNWRAP_ROLE",
};
function isThirdwebContractRole(role) {
    return role in roleMap;
}
const roleCache = new LruMap(128);
/**
 * Get a hex value of a smart contract role
 * You need the hex value to interact with the smart contracts.
 * @param role string
 * @returns hex value of the contract role
 *
 * @example
 * ```ts
 * const adminRoleHash = getRoleHash("admin"); // 0x0000000...000000
 * ```
 * @extension PERMISSIONS
 */
export function getRoleHash(role) {
    if (roleCache.has(role)) {
        // biome-ignore lint/style/noNonNullAssertion: we know it's in the cache
        return roleCache.get(role);
    }
    const roleHash = (() => {
        // if it's hex we pass it through as is -- assume it's a role has already
        if (isHex(role)) {
            return role;
        }
        // if it's a known thirdweb role, we convert it to the role hash
        if (isThirdwebContractRole(role)) {
            if (role === "admin") {
                return padHex("0x", { size: 32 });
            }
            return keccakId(roleMap[role]);
        }
        // otherwise we assume it's some other role and we pass it to keccakId to compute the role hash
        return keccakId(role);
    })();
    roleCache.set(role, roleHash);
    return roleHash;
}
//# sourceMappingURL=utils.js.map