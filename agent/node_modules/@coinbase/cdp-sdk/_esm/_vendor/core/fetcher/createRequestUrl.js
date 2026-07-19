import { toQueryString } from "../url/qs.js";
export function createRequestUrl(baseUrl, queryParameters) {
    const queryString = toQueryString(queryParameters, { arrayFormat: "repeat" });
    return queryString ? `${baseUrl}?${queryString}` : baseUrl;
}
//# sourceMappingURL=createRequestUrl.js.map