/**
 * A hook that returns the authentication token (JWT) for the currently active wallet.
 * This token can be used to authorize API calls to your backend server.
 *
 * @returns The JWT string if the active wallet is an in-app wallet and matches the active account, null otherwise
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const authToken = useAuthToken();
 *
 *   const fetchData = async () => {
 *     const response = await fetch('https://api.example.com/data', {
 *       headers: {
 *         'Authorization': `Bearer ${authToken}`
 *       }
 *     });
 *     // ... handle response
 *   };
 * }
 * ```
 *
 * @wallet
 */
export declare function useAuthToken(): string | null;
//# sourceMappingURL=useAuthToken.d.ts.map