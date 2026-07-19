"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthToken = void 0;
const getAuthToken = async (auth, callback) => {
    const token = typeof callback === "function" ? await callback(auth) : callback;
    if (!token) {
        return;
    }
    if (auth.scheme === "bearer") {
        return `Bearer ${token}`;
    }
    if (auth.scheme === "basic") {
        return `Basic ${btoa(token)}`;
    }
    return token;
};
exports.getAuthToken = getAuthToken;
//# sourceMappingURL=auth.js.map