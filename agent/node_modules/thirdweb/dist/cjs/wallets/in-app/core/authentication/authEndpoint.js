"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authEndpoint = authEndpoint;
const fetch_js_1 = require("../../../../utils/fetch.js");
const json_js_1 = require("../../../../utils/json.js");
const constants_js_1 = require("../../native/helpers/constants.js");
const errors_js_1 = require("../../native/helpers/errors.js");
async function authEndpoint(args) {
    const clientFetch = (0, fetch_js_1.getClientFetch)(args.client, args.ecosystem);
    const res = await clientFetch(constants_js_1.ROUTE_AUTH_ENDPOINT_CALLBACK, {
        body: (0, json_js_1.stringify)({
            developerClientId: args.client.clientId,
            payload: args.payload,
        }),
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
    });
    if (!res.ok) {
        const error = await res.json();
        throw new Error(`Custom auth endpoint authentication error: ${error.message}`);
    }
    try {
        const { verifiedToken } = await res.json();
        return { storedToken: verifiedToken };
    }
    catch (e) {
        throw new Error((0, errors_js_1.createErrorMessage)("Malformed response from post auth_endpoint authentication", e));
    }
}
//# sourceMappingURL=authEndpoint.js.map