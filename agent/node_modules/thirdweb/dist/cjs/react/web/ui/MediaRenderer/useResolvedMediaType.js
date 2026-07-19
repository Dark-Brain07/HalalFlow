"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useResolvedMediaType = useResolvedMediaType;
exports.resolveMediaTypeFromUri = resolveMediaTypeFromUri;
const react_query_1 = require("@tanstack/react-query");
const react_1 = require("react");
const arweave_js_1 = require("../../../../utils/arweave.js");
const ipfs_js_1 = require("../../../../utils/ipfs.js");
const resolveMimeType_js_1 = require("../../utils/resolveMimeType.js");
/**
 * @internal
 */
function useResolvedMediaType(client, uri, mimeType, gatewayUrl) {
    const resolvedUrl = (0, react_1.useMemo)(() => {
        if (!uri) {
            return "";
        }
        if (uri.startsWith("ar://")) {
            return (0, arweave_js_1.resolveArweaveScheme)({ gatewayUrl, uri });
        }
        if (gatewayUrl) {
            return uri.replace("ipfs://", gatewayUrl);
        }
        try {
            return (0, ipfs_js_1.resolveScheme)({
                client,
                uri,
            });
        }
        catch {
            return uri.replace("ipfs://", "https://ipfs.io/ipfs/");
        }
    }, [uri, gatewayUrl, client]);
    const resolvedMimeType = (0, react_query_1.useQuery)({
        enabled: !!resolvedUrl && !mimeType,
        initialData: mimeType,
        queryFn: () => (0, resolveMimeType_js_1.resolveMimeType)(resolvedUrl),
        queryKey: ["mime-type", resolvedUrl],
    });
    return {
        isFetched: resolvedMimeType.isFetched || !!mimeType,
        mediaInfo: {
            mimeType: resolvedMimeType.data || "image/",
            url: resolvedUrl, // default to image if no mime type is found
        },
    };
}
/**
 * @internal Exported for tests
 */
function resolveMediaTypeFromUri(props) {
    const { uri, client, gatewayUrl } = props;
    if (!uri) {
        return "";
    }
    if (uri.startsWith("ar://")) {
        return (0, arweave_js_1.resolveArweaveScheme)({ gatewayUrl, uri });
    }
    if (gatewayUrl) {
        return uri.replace("ipfs://", gatewayUrl);
    }
    try {
        return (0, ipfs_js_1.resolveScheme)({
            client,
            uri,
        });
    }
    catch {
        return uri.replace("ipfs://", "https://ipfs.io/ipfs/");
    }
}
//# sourceMappingURL=useResolvedMediaType.js.map