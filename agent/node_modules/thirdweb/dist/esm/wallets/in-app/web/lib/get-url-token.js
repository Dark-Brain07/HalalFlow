/**
 * Checks for an auth token and associated metadata in the current URL
 */
export function getUrlToken() {
    if (typeof document === "undefined") {
        // Not in web
        return undefined;
    }
    // Read params from the standard query string
    const params = new URLSearchParams(window.location.search);
    // Also check for params embedded inside the hash fragment (e.g. #/route?walletId=...)
    // This supports hash-routed apps where params may be placed after the hash path
    let hashParams;
    const hash = window.location.hash || "";
    let cleanHash = hash;
    const hashQueryIndex = hash.indexOf("?");
    if (hashQueryIndex !== -1) {
        hashParams = new URLSearchParams(hash.substring(hashQueryIndex));
        cleanHash = hash.substring(0, hashQueryIndex);
    }
    const walletId = (params.get("walletId") ??
        hashParams?.get("walletId") ??
        undefined);
    const authResultString = params.get("authResult") ?? hashParams?.get("authResult") ?? undefined;
    const authProvider = (params.get("authProvider") ??
        hashParams?.get("authProvider") ??
        undefined);
    const authCookie = (params.get("authCookie") ??
        hashParams?.get("authCookie") ??
        undefined);
    const authFlow = (params.get("authFlow") ??
        hashParams?.get("authFlow") ??
        undefined);
    if ((authCookie || authResultString) && walletId) {
        const authResult = (() => {
            if (authResultString) {
                params.delete("authResult");
                hashParams?.delete("authResult");
                return JSON.parse(decodeURIComponent(authResultString));
            }
        })();
        params.delete("walletId");
        params.delete("authProvider");
        params.delete("authCookie");
        params.delete("authFlow");
        hashParams?.delete("walletId");
        hashParams?.delete("authProvider");
        hashParams?.delete("authCookie");
        hashParams?.delete("authFlow");
        const remainingSearch = params.toString();
        const searchString = remainingSearch ? `?${remainingSearch}` : "";
        // Reconstruct hash, preserving the hash path and any remaining non-auth params
        let hashString = cleanHash;
        if (hashParams) {
            const remainingHashParams = hashParams.toString();
            if (remainingHashParams) {
                hashString = `${cleanHash}?${remainingHashParams}`;
            }
        }
        window.history.pushState({}, "", `${window.location.pathname}${searchString}${hashString}`);
        return { authCookie, authFlow, authProvider, authResult, walletId };
    }
    return undefined;
}
//# sourceMappingURL=get-url-token.js.map