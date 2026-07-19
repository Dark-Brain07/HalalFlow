import { ApiError } from "../../../bridge/types/Errors.js";
/**
 * Parameters for the useBridgeError hook
 */
interface UseBridgeErrorParams {
    /**
     * The error to process. Can be an ApiError or generic Error.
     */
    error: Error | ApiError | null | undefined;
}
/**
 * Result returned by the useBridgeError hook
 */
interface UseBridgeErrorResult {
    /**
     * The mapped/normalized error, null if no error provided
     */
    mappedError: ApiError | null;
    /**
     * Whether this error can be retried
     */
    isRetryable: boolean;
    /**
     * User-friendly error message
     */
    userMessage: string;
    /**
     * Technical error code for debugging
     */
    errorCode: string | null;
    /**
     * HTTP status code if available
     */
    statusCode: number | null;
    /**
     * Whether this is a client-side error (4xx)
     */
    isClientError: boolean;
    /**
     * Whether this is a server-side error (5xx)
     */
    isServerError: boolean;
}
/**
 * Hook that processes bridge errors using mapBridgeError and isRetryable
 *
 * @param params - Parameters containing the error to process
 * @returns Processed error information with retry logic and user-friendly messages
 *
 * @example
 * ```tsx
 * const { data, error } = useBridgeRoutes({ client, originChainId: 1 });
 * const {
 *   mappedError,
 *   isRetryable,
 *   userMessage,
 *   isClientError
 * } = useBridgeError({ error });
 *
 * if (error) {
 *   return (
 *     <div>
 *       <p>{userMessage}</p>
 *       {isRetryable && <button onClick={retry}>Try Again</button>}
 *     </div>
 *   );
 * }
 * ```
 */
export declare function useBridgeError(params: UseBridgeErrorParams): UseBridgeErrorResult;
export {};
//# sourceMappingURL=useBridgeError.d.ts.map