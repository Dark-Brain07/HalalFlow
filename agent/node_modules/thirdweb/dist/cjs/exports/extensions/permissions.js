"use strict";
//--------------------------------------------------
// Permissions
// --------------------------------------------------------
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleMap = exports.getRoleHash = exports.isGetRoleMemberCountSupported = exports.getRoleMemberCount = exports.isGetRoleMemberSupported = exports.getRoleMember = exports.isGetAllRoleMembersSupported = exports.getAllRoleMembers = exports.revokeRole = exports.isRevokeRoleSupported = exports.renounceRole = exports.isRenounceRoleSupported = exports.isGrantRoleSupported = exports.grantRole = exports.isHasRoleSupported = exports.hasRole = exports.isGetRoleAdminSupported = exports.getRoleAdmin = exports.roleRevokedEvent = exports.roleGrantedEvent = exports.roleAdminChangedEvent = void 0;
var RoleAdminChanged_js_1 = require("../../extensions/permissions/__generated__/IPermissions/events/RoleAdminChanged.js");
Object.defineProperty(exports, "roleAdminChangedEvent", { enumerable: true, get: function () { return RoleAdminChanged_js_1.roleAdminChangedEvent; } });
// EVENTS
var RoleGranted_js_1 = require("../../extensions/permissions/__generated__/IPermissions/events/RoleGranted.js");
Object.defineProperty(exports, "roleGrantedEvent", { enumerable: true, get: function () { return RoleGranted_js_1.roleGrantedEvent; } });
var RoleRevoked_js_1 = require("../../extensions/permissions/__generated__/IPermissions/events/RoleRevoked.js");
Object.defineProperty(exports, "roleRevokedEvent", { enumerable: true, get: function () { return RoleRevoked_js_1.roleRevokedEvent; } });
var getRoleAdmin_js_1 = require("../../extensions/permissions/read/getRoleAdmin.js");
Object.defineProperty(exports, "getRoleAdmin", { enumerable: true, get: function () { return getRoleAdmin_js_1.getRoleAdmin; } });
Object.defineProperty(exports, "isGetRoleAdminSupported", { enumerable: true, get: function () { return getRoleAdmin_js_1.isGetRoleAdminSupported; } });
// READ
var hasRole_js_1 = require("../../extensions/permissions/read/hasRole.js");
Object.defineProperty(exports, "hasRole", { enumerable: true, get: function () { return hasRole_js_1.hasRole; } });
Object.defineProperty(exports, "isHasRoleSupported", { enumerable: true, get: function () { return hasRole_js_1.isHasRoleSupported; } });
// WRITE
var grantRole_js_1 = require("../../extensions/permissions/write/grantRole.js");
Object.defineProperty(exports, "grantRole", { enumerable: true, get: function () { return grantRole_js_1.grantRole; } });
Object.defineProperty(exports, "isGrantRoleSupported", { enumerable: true, get: function () { return grantRole_js_1.isGrantRoleSupported; } });
var renounceRole_js_1 = require("../../extensions/permissions/write/renounceRole.js");
Object.defineProperty(exports, "isRenounceRoleSupported", { enumerable: true, get: function () { return renounceRole_js_1.isRenounceRoleSupported; } });
Object.defineProperty(exports, "renounceRole", { enumerable: true, get: function () { return renounceRole_js_1.renounceRole; } });
var revokeRole_js_1 = require("../../extensions/permissions/write/revokeRole.js");
Object.defineProperty(exports, "isRevokeRoleSupported", { enumerable: true, get: function () { return revokeRole_js_1.isRevokeRoleSupported; } });
Object.defineProperty(exports, "revokeRole", { enumerable: true, get: function () { return revokeRole_js_1.revokeRole; } });
// --------------------------------------------------------
// PermissionsEnumerable
// --------------------------------------------------------
var getAllMembers_js_1 = require("../../extensions/permissions/read/getAllMembers.js");
Object.defineProperty(exports, "getAllRoleMembers", { enumerable: true, get: function () { return getAllMembers_js_1.getAllRoleMembers; } });
Object.defineProperty(exports, "isGetAllRoleMembersSupported", { enumerable: true, get: function () { return getAllMembers_js_1.isGetAllRoleMembersSupported; } });
// READ
var getRoleMember_js_1 = require("../../extensions/permissions/read/getRoleMember.js");
Object.defineProperty(exports, "getRoleMember", { enumerable: true, get: function () { return getRoleMember_js_1.getRoleMember; } });
Object.defineProperty(exports, "isGetRoleMemberSupported", { enumerable: true, get: function () { return getRoleMember_js_1.isGetRoleMemberSupported; } });
var getRoleMemberCount_js_1 = require("../../extensions/permissions/read/getRoleMemberCount.js");
Object.defineProperty(exports, "getRoleMemberCount", { enumerable: true, get: function () { return getRoleMemberCount_js_1.getRoleMemberCount; } });
Object.defineProperty(exports, "isGetRoleMemberCountSupported", { enumerable: true, get: function () { return getRoleMemberCount_js_1.isGetRoleMemberCountSupported; } });
// --------------------------------------------------------
// Utils
// --------------------------------------------------------
var utils_js_1 = require("../../extensions/permissions/utils.js");
Object.defineProperty(exports, "getRoleHash", { enumerable: true, get: function () { return utils_js_1.getRoleHash; } });
Object.defineProperty(exports, "roleMap", { enumerable: true, get: function () { return utils_js_1.roleMap; } });
//# sourceMappingURL=permissions.js.map