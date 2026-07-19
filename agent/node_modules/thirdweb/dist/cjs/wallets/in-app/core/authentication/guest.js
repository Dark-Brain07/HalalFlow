"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.guestAuthenticate = guestAuthenticate;
const fetch_js_1 = require("../../../../utils/fetch.js");
const json_js_1 = require("../../../../utils/json.js");
const random_js_1 = require("../../../../utils/random.js");
const getLoginPath_js_1 = require("./getLoginPath.js");
/**
 * Does no real authentication, just issues a temporary token for the user.
 * @internal
 */
async function guestAuthenticate(args) {
    let sessionId = await args.storage.getGuestSessionId();
    if (!sessionId) {
        sessionId = (0, random_js_1.randomBytesHex)(32);
        args.storage.saveGuestSessionId(sessionId);
    }
    const clientFetch = (0, fetch_js_1.getClientFetch)(args.client, args.ecosystem);
    const path = (0, getLoginPath_js_1.getLoginCallbackUrl)({
        authOption: "guest",
        client: args.client,
        ecosystem: args.ecosystem,
    });
    const res = await clientFetch(`${path}`, {
        body: (0, json_js_1.stringify)({
            sessionId,
        }),
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
    });
    if (!res.ok) {
        const error = await res.text();
        throw new Error(`Failed to generate guest account: ${res.status} ${res.statusText} ${error}`);
    }
    return (await res.json());
}
//# sourceMappingURL=guest.js.map