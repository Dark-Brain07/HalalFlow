import { toJson } from "../json.js";
import { toQueryString } from "../url/qs.js";
export async function getRequestBody({ body, type }) {
    if (type === "form") {
        return toQueryString(body, { arrayFormat: "repeat", encode: true });
    }
    if (type.includes("json")) {
        return toJson(body);
    }
    else {
        return body;
    }
}
//# sourceMappingURL=getRequestBody.js.map