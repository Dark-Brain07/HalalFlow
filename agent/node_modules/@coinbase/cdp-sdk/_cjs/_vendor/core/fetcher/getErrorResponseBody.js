"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getErrorResponseBody = getErrorResponseBody;
const json_js_1 = require("../json.js");
const getResponseBody_js_1 = require("./getResponseBody.js");
async function getErrorResponseBody(response) {
    let contentType = response.headers.get("Content-Type")?.toLowerCase();
    if (contentType == null || contentType.length === 0) {
        return (0, getResponseBody_js_1.getResponseBody)(response);
    }
    if (contentType.indexOf(";") !== -1) {
        contentType = contentType.split(";")[0]?.trim() ?? "";
    }
    switch (contentType) {
        case "application/hal+json":
        case "application/json":
        case "application/ld+json":
        case "application/problem+json":
        case "application/vnd.api+json":
        case "text/json": {
            const text = await response.text();
            return text.length > 0 ? (0, json_js_1.fromJson)(text) : undefined;
        }
        default:
            if (contentType.startsWith("application/vnd.") && contentType.endsWith("+json")) {
                const text = await response.text();
                return text.length > 0 ? (0, json_js_1.fromJson)(text) : undefined;
            }
            // Fallback to plain text if content type is not recognized
            // Even if no body is present, the response will be an empty string
            return await response.text();
    }
}
//# sourceMappingURL=getErrorResponseBody.js.map