"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signPermissionRequest = signPermissionRequest;
exports.toContractPermissions = toContractPermissions;
exports.defaultPermissionsForAdmin = defaultPermissionsForAdmin;
const addresses_js_1 = require("../../../constants/addresses.js");
const date_js_1 = require("../../../utils/date.js");
const random_js_1 = require("../../../utils/random.js");
const units_js_1 = require("../../../utils/units.js");
const types_js_1 = require("./types.js");
/**
 * @internal
 */
async function signPermissionRequest(options) {
    const { account, contract, req } = options;
    const signature = await account.signTypedData({
        domain: {
            chainId: contract.chain.id,
            name: "Account",
            verifyingContract: contract.address,
            version: "1",
        },
        message: req,
        primaryType: "SignerPermissionRequest",
        types: { SignerPermissionRequest: types_js_1.SignerPermissionRequest },
    });
    return { req, signature };
}
/**
 * @internal
 */
async function toContractPermissions(options) {
    const { target, permissions } = options;
    return {
        approvedTargets: permissions.approvedTargets === "*"
            ? [addresses_js_1.ZERO_ADDRESS]
            : permissions.approvedTargets,
        isAdmin: 0,
        nativeTokenLimitPerTransaction: (0, units_js_1.toWei)(permissions.nativeTokenLimitPerTransaction?.toString() || "0"),
        permissionEndTimestamp: (0, date_js_1.dateToSeconds)(permissions.permissionEndTimestamp || (0, date_js_1.tenYearsFromNow)()),
        permissionStartTimestamp: (0, date_js_1.dateToSeconds)(permissions.permissionStartTimestamp || new Date(0)),
        reqValidityEndTimestamp: (0, date_js_1.dateToSeconds)((0, date_js_1.tenYearsFromNow)()),
        reqValidityStartTimestamp: 0n,
        signer: target, // session key flag
        uid: await (0, random_js_1.randomBytesHex)(),
    };
}
/**
 * @internal
 */
async function defaultPermissionsForAdmin(options) {
    const { target, action } = options;
    return {
        approvedTargets: [],
        isAdmin: action === "add-admin" ? 1 : action === "remove-admin" ? 2 : 0,
        nativeTokenLimitPerTransaction: 0n,
        permissionEndTimestamp: 0n,
        permissionStartTimestamp: 0n,
        reqValidityEndTimestamp: (0, date_js_1.dateToSeconds)((0, date_js_1.tenYearsFromNow)()),
        reqValidityStartTimestamp: 0n,
        signer: target,
        uid: await (0, random_js_1.randomBytesHex)(),
    };
}
//# sourceMappingURL=common.js.map