"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.backendAuthenticate = backendAuthenticate;
const fetch_js_1 = require("../../../../utils/fetch.js");
const json_js_1 = require("../../../../utils/json.js");
const getLoginPath_js_1 = require("./getLoginPath.js");
/**
 * Authenticates via the wallet secret
 * @internal
 */
async function backendAuthenticate(args) {
    const clientFetch = (0, fetch_js_1.getClientFetch)(args.client, args.ecosystem);
    const path = (0, getLoginPath_js_1.getLoginUrl)({
        authOption: "backend",
        client: args.client,
        ecosystem: args.ecosystem,
    });
    const res = await clientFetch(`${path}`, {
        body: (0, json_js_1.stringify)({
            walletSecret: args.walletSecret,
        }),
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
    });
    if (!res.ok) {
        const error = await res.text();
        throw new Error(`Failed to generate backend account: ${error}`);
    }
    return (await res.json());
}
//# sourceMappingURL=backend.js.map