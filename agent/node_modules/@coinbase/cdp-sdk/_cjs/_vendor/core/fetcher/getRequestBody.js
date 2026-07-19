"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRequestBody = getRequestBody;
const json_js_1 = require("../json.js");
const qs_js_1 = require("../url/qs.js");
async function getRequestBody({ body, type }) {
    if (type === "form") {
        return (0, qs_js_1.toQueryString)(body, { arrayFormat: "repeat", encode: true });
    }
    if (type.includes("json")) {
        return (0, json_js_1.toJson)(body);
    }
    else {
        return body;
    }
}
//# sourceMappingURL=getRequestBody.js.map