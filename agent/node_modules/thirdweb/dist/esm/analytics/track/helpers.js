/**
 * @internal
 */
export function isInsufficientFundsError(error) {
    if (!error)
        return false;
    const errorMessage = typeof error === "string"
        ? error
        : error?.message ||
            error?.data?.message ||
            "";
    const message = errorMessage.toLowerCase();
    // Common patterns for insufficient funds errors
    return (message.includes("insufficient funds") ||
        message.includes("insufficient balance") ||
        (message.includes("insufficient") &&
            (message.includes("native") || message.includes("gas"))) ||
        // Common error codes from various wallets/providers
        error?.code === "INSUFFICIENT_FUNDS" ||
        error?.reason === "insufficient funds");
}
/**
 * @internal
 */
export function getErrorDetails(error) {
    if (!error)
        return { message: "Unknown error" };
    const message = typeof error === "string"
        ? error
        : error?.message ||
            error?.data?.message ||
            String(error);
    const code = error?.code ||
        error?.reason;
    return { code, message };
}
//# sourceMappingURL=helpers.js.map