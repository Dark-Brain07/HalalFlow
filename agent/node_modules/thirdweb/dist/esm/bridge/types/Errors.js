import { stringify } from "../../utils/json.js";
export class ApiError extends Error {
    constructor(args) {
        super(args.message);
        Object.defineProperty(this, "code", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "correlationId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "statusCode", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.code = args.code;
        this.correlationId = args.correlationId;
        this.statusCode = args.statusCode;
    }
    toString() {
        return stringify({
            code: this.code,
            correlationId: this.correlationId,
            message: this.message,
            statusCode: this.statusCode,
        });
    }
}
//# sourceMappingURL=Errors.js.map