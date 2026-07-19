"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
const json_js_1 = require("../../utils/json.js");
class ApiError extends Error {
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
        return (0, json_js_1.stringify)({
            code: this.code,
            correlationId: this.correlationId,
            message: this.message,
            statusCode: this.statusCode,
        });
    }
}
exports.ApiError = ApiError;
//# sourceMappingURL=Errors.js.map