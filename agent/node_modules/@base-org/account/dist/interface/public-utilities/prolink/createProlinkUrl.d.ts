/**
 * Base App universal link utilities for prolinks
 */
/**
 * Create a link with an encoded prolink query parameter and additional query parameters
 *
 * @param prolink - Base64url-encoded prolink payload
 * @param url - URL to use for the link, defaults to https://base.app/base-pay
 * @param additionalQueryParams - Additional query parameters to add to the link
 * @returns string - The full link
 *
 * @example
 * ```typescript
 * const prolink = await encodeProlink(request);
 * const link = createProlinkUrl(prolink);
 * // Returns: 'https://base.app/base-pay?p=CAEQ...'
 *
 * const linkWithAdditionalParams = createProlinkUrl(prolink, 'https://base.app/base-pay', {
 *   foo: 'bar',
 *   baz: 'qux',
 * });
 * // Returns: 'https://base.app/base-pay?p=CAEQ...&foo=bar&baz=qux'
 * ```
 */
export declare function createProlinkUrl(prolink: string, url?: string, additionalQueryParams?: Record<string, string>): string;
//# sourceMappingURL=createProlinkUrl.d.ts.map