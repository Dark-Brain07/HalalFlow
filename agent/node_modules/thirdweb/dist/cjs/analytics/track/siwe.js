"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackLogin = trackLogin;
const json_js_1 = require("../../utils/json.js");
const index_js_1 = require("./index.js");
/**
 * @internal
 */
async function trackLogin(event) {
    return trackSiweEvent({
        ...event,
        action: "login:attempt",
    });
}
/**
 * @internal
 */
async function trackSiweEvent(event) {
    return (0, index_js_1.track)({
        client: event.client,
        data: {
            action: event.action,
            chainId: event.chainId,
            clientId: event.client.clientId,
            errorCode: (0, json_js_1.stringify)(event.error),
            walletAddress: event.walletAddress,
            walletType: event.walletType,
        },
        ecosystem: event.ecosystem,
    });
}
//# sourceMappingURL=siwe.js.map