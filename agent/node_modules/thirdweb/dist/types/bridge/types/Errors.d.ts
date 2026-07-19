type ErrorCode = "INVALID_INPUT" | "ROUTE_NOT_FOUND" | "AMOUNT_TOO_LOW" | "AMOUNT_TOO_HIGH" | "INTERNAL_SERVER_ERROR" | "UNKNOWN_ERROR";
export declare class ApiError extends Error {
    code: ErrorCode;
    correlationId?: string;
    statusCode: number;
    constructor(args: {
        code: ErrorCode;
        message: string;
        statusCode: number;
        correlationId?: string;
    });
    toString(): string;
}
export {};
//# sourceMappingURL=Errors.d.ts.map