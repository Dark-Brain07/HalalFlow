"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConfig = exports.createInterceptors = exports.mergeHeaders = exports.mergeConfigs = exports.getUrl = exports.buildUrl = exports.setAuthParams = exports.getParseAs = exports.createQuerySerializer = void 0;
const auth_js_1 = require("../core/auth.js");
const bodySerializer_js_1 = require("../core/bodySerializer.js");
const pathSerializer_js_1 = require("../core/pathSerializer.js");
const PATH_PARAM_RE = /\{[^{}]+\}/g;
const defaultPathSerializer = ({ path, url: _url }) => {
    let url = _url;
    const matches = _url.match(PATH_PARAM_RE);
    if (matches) {
        for (const match of matches) {
            let explode = false;
            let name = match.substring(1, match.length - 1);
            let style = "simple";
            if (name.endsWith("*")) {
                explode = true;
                name = name.substring(0, name.length - 1);
            }
            if (name.startsWith(".")) {
                name = name.substring(1);
                style = "label";
            }
            else if (name.startsWith(";")) {
                name = name.substring(1);
                style = "matrix";
            }
            const value = path[name];
            if (value === undefined || value === null) {
                continue;
            }
            if (Array.isArray(value)) {
                url = url.replace(match, (0, pathSerializer_js_1.serializeArrayParam)({ explode, name, style, value }));
                continue;
            }
            if (typeof value === "object") {
                url = url.replace(match, (0, pathSerializer_js_1.serializeObjectParam)({
                    explode,
                    name,
                    style,
                    value: value,
                    valueOnly: true,
                }));
                continue;
            }
            if (style === "matrix") {
                url = url.replace(match, `;${(0, pathSerializer_js_1.serializePrimitiveParam)({
                    name,
                    value: value,
                })}`);
                continue;
            }
            const replaceValue = encodeURIComponent(style === "label" ? `.${value}` : value);
            url = url.replace(match, replaceValue);
        }
    }
    return url;
};
const createQuerySerializer = ({ allowReserved, array, object, } = {}) => {
    const querySerializer = (queryParams) => {
        const search = [];
        if (queryParams && typeof queryParams === "object") {
            for (const name in queryParams) {
                const value = queryParams[name];
                if (value === undefined || value === null) {
                    continue;
                }
                if (Array.isArray(value)) {
                    const serializedArray = (0, pathSerializer_js_1.serializeArrayParam)({
                        allowReserved,
                        explode: true,
                        name,
                        style: "form",
                        value,
                        ...array,
                    });
                    if (serializedArray)
                        search.push(serializedArray);
                }
                else if (typeof value === "object") {
                    const serializedObject = (0, pathSerializer_js_1.serializeObjectParam)({
                        allowReserved,
                        explode: true,
                        name,
                        style: "deepObject",
                        value: value,
                        ...object,
                    });
                    if (serializedObject)
                        search.push(serializedObject);
                }
                else {
                    const serializedPrimitive = (0, pathSerializer_js_1.serializePrimitiveParam)({
                        allowReserved,
                        name,
                        value: value,
                    });
                    if (serializedPrimitive)
                        search.push(serializedPrimitive);
                }
            }
        }
        return search.join("&");
    };
    return querySerializer;
};
exports.createQuerySerializer = createQuerySerializer;
/**
 * Infers parseAs value from provided Content-Type header.
 */
const getParseAs = (contentType) => {
    if (!contentType) {
        // If no Content-Type header is provided, the best we can do is return the raw response body,
        // which is effectively the same as the 'stream' option.
        return "stream";
    }
    const cleanContent = contentType.split(";")[0]?.trim();
    if (!cleanContent) {
        return;
    }
    if (cleanContent.startsWith("application/json") ||
        cleanContent.endsWith("+json")) {
        return "json";
    }
    if (cleanContent === "multipart/form-data") {
        return "formData";
    }
    if (["application/", "audio/", "image/", "video/"].some((type) => cleanContent.startsWith(type))) {
        return "blob";
    }
    if (cleanContent.startsWith("text/")) {
        return "text";
    }
    return;
};
exports.getParseAs = getParseAs;
const setAuthParams = async ({ security, ...options }) => {
    for (const auth of security) {
        const token = await (0, auth_js_1.getAuthToken)(auth, options.auth);
        if (!token) {
            continue;
        }
        const name = auth.name ?? "Authorization";
        switch (auth.in) {
            case "query":
                if (!options.query) {
                    options.query = {};
                }
                options.query[name] = token;
                break;
            case "cookie":
                options.headers.append("Cookie", `${name}=${token}`);
                break;
            case "header":
            default:
                options.headers.set(name, token);
                break;
        }
        return;
    }
};
exports.setAuthParams = setAuthParams;
const buildUrl = (options) => {
    const url = (0, exports.getUrl)({
        baseUrl: options.baseUrl,
        path: options.path,
        query: options.query,
        querySerializer: typeof options.querySerializer === "function"
            ? options.querySerializer
            : (0, exports.createQuerySerializer)(options.querySerializer),
        url: options.url,
    });
    return url;
};
exports.buildUrl = buildUrl;
const getUrl = ({ baseUrl, path, query, querySerializer, url: _url, }) => {
    const pathUrl = _url.startsWith("/") ? _url : `/${_url}`;
    let url = (baseUrl ?? "") + pathUrl;
    if (path) {
        url = defaultPathSerializer({ path, url });
    }
    let search = query ? querySerializer(query) : "";
    if (search.startsWith("?")) {
        search = search.substring(1);
    }
    if (search) {
        url += `?${search}`;
    }
    return url;
};
exports.getUrl = getUrl;
const mergeConfigs = (a, b) => {
    const config = { ...a, ...b };
    if (config.baseUrl?.endsWith("/")) {
        config.baseUrl = config.baseUrl.substring(0, config.baseUrl.length - 1);
    }
    config.headers = (0, exports.mergeHeaders)(a.headers, b.headers);
    return config;
};
exports.mergeConfigs = mergeConfigs;
const mergeHeaders = (...headers) => {
    const mergedHeaders = new Headers();
    for (const header of headers) {
        if (!header || typeof header !== "object") {
            continue;
        }
        const iterator = header instanceof Headers ? header.entries() : Object.entries(header);
        for (const [key, value] of iterator) {
            if (value === null) {
                mergedHeaders.delete(key);
            }
            else if (Array.isArray(value)) {
                for (const v of value) {
                    mergedHeaders.append(key, v);
                }
            }
            else if (value !== undefined) {
                // assume object headers are meant to be JSON stringified, i.e. their
                // content value in OpenAPI specification is 'application/json'
                mergedHeaders.set(key, typeof value === "object" ? JSON.stringify(value) : value);
            }
        }
    }
    return mergedHeaders;
};
exports.mergeHeaders = mergeHeaders;
class Interceptors {
    constructor() {
        Object.defineProperty(this, "_fns", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this._fns = [];
    }
    clear() {
        this._fns = [];
    }
    getInterceptorIndex(id) {
        if (typeof id === "number") {
            return this._fns[id] ? id : -1;
        }
        else {
            return this._fns.indexOf(id);
        }
    }
    exists(id) {
        const index = this.getInterceptorIndex(id);
        return !!this._fns[index];
    }
    eject(id) {
        const index = this.getInterceptorIndex(id);
        if (this._fns[index]) {
            this._fns[index] = null;
        }
    }
    update(id, fn) {
        const index = this.getInterceptorIndex(id);
        if (this._fns[index]) {
            this._fns[index] = fn;
            return id;
        }
        else {
            return false;
        }
    }
    use(fn) {
        this._fns = [...this._fns, fn];
        return this._fns.length - 1;
    }
}
// do not add `Middleware` as return type so we can use _fns internally
const createInterceptors = () => ({
    error: new Interceptors(),
    request: new Interceptors(),
    response: new Interceptors(),
});
exports.createInterceptors = createInterceptors;
const defaultQuerySerializer = (0, exports.createQuerySerializer)({
    allowReserved: false,
    array: {
        explode: true,
        style: "form",
    },
    object: {
        explode: true,
        style: "deepObject",
    },
});
const defaultHeaders = {
    "Content-Type": "application/json",
};
const createConfig = (override = {}) => ({
    ...bodySerializer_js_1.jsonBodySerializer,
    headers: defaultHeaders,
    parseAs: "auto",
    querySerializer: defaultQuerySerializer,
    ...override,
});
exports.createConfig = createConfig;
//# sourceMappingURL=utils.js.map