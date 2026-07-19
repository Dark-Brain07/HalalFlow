import type { ThirdwebClient } from "../../../../client/client.js";
/**
 * @internal
 */
export declare function useResolvedMediaType(client: ThirdwebClient, uri?: string, mimeType?: string, gatewayUrl?: string): {
    isFetched: boolean;
    mediaInfo: {
        mimeType: string;
        url: string;
    };
};
/**
 * @internal Exported for tests
 */
export declare function resolveMediaTypeFromUri(props: {
    uri?: string;
    client: ThirdwebClient;
    gatewayUrl?: string;
}): string;
//# sourceMappingURL=useResolvedMediaType.d.ts.map