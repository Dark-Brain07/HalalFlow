"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOtp = exports.sendOtp = void 0;
const json_js_1 = require("../../../../../utils/json.js");
const getLoginPath_js_1 = require("../../../core/authentication/getLoginPath.js");
/**
 * @internal
 */
const sendOtp = async (args) => {
    const { client, ecosystem } = args;
    const url = (0, getLoginPath_js_1.getLoginUrl)({ authOption: args.strategy, client, ecosystem });
    const headers = {
        "Content-Type": "application/json",
        "x-client-id": client.clientId,
    };
    if (ecosystem?.id) {
        headers["x-ecosystem-id"] = ecosystem.id;
    }
    if (ecosystem?.partnerId) {
        headers["x-ecosystem-partner-id"] = ecosystem.partnerId;
    }
    const body = (() => {
        switch (args.strategy) {
            case "email":
                return {
                    email: args.email,
                };
            case "phone":
                return {
                    phone: args.phoneNumber,
                };
        }
    })();
    const response = await fetch(url, {
        body: (0, json_js_1.stringify)(body),
        headers,
        method: "POST",
    });
    if (!response.ok) {
        const raw = await response.text();
        let message;
        try {
            const parsed = JSON.parse(raw);
            if (parsed && typeof parsed.message === "string") {
                message = parsed.message;
            }
        }
        catch {
            // ignore parse errors
        }
        throw new Error(message || "Failed to send verification code");
    }
    return await response.json();
};
exports.sendOtp = sendOtp;
/**
 * @internal
 */
const verifyOtp = async (args) => {
    const { client, ecosystem } = args;
    const url = (0, getLoginPath_js_1.getLoginCallbackUrl)({
        authOption: args.strategy,
        client: args.client,
        ecosystem: args.ecosystem,
    });
    const headers = {
        "Content-Type": "application/json",
        "x-client-id": client.clientId,
    };
    if (ecosystem?.id) {
        headers["x-ecosystem-id"] = ecosystem.id;
    }
    if (ecosystem?.partnerId) {
        headers["x-ecosystem-partner-id"] = ecosystem.partnerId;
    }
    const body = (() => {
        switch (args.strategy) {
            case "email":
                return {
                    code: args.verificationCode,
                    email: args.email,
                };
            case "phone":
                return {
                    code: args.verificationCode,
                    phone: args.phoneNumber,
                };
        }
    })();
    const response = await fetch(url, {
        body: (0, json_js_1.stringify)(body),
        headers,
        method: "POST",
    });
    if (!response.ok) {
        throw new Error("Failed to verify verification code");
    }
    return await response.json();
};
exports.verifyOtp = verifyOtp;
//# sourceMappingURL=otp.js.map