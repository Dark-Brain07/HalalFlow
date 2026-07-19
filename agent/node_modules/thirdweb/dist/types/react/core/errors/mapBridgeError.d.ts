import type { ApiError } from "../../../bridge/types/Errors.js";
/**
 * Maps raw ApiError instances from the Bridge SDK into UI-friendly domain errors.
 * Currently returns the same error; will evolve to provide better user-facing messages.
 *
 * @param e - The raw ApiError from the Bridge SDK
 * @returns The mapped ApiError (currently unchanged)
 */
export declare function mapBridgeError(e: ApiError): ApiError;
/**
 * Determines if an error code represents a retryable error condition.
 *
 * @param code - The error code from ApiError
 * @returns true if the error is retryable, false otherwise
 */
export declare function isRetryable(code: ApiError["code"]): boolean;
//# sourceMappingURL=mapBridgeError.d.ts.map