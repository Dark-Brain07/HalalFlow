"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = verifyJWT;
const json_js_1 = require("../../utils/json.js");
const decode_jwt_js_1 = require("../../utils/jwt/decode-jwt.js");
const verify_signature_js_1 = require("../verify-signature.js");
/**
 * Verifies a JSON Web Token (JWT) based on the provided options.
 * @param options - The authentication options.
 * @returns A function that verifies the JWT based on the provided parameters.
 * @throws An error if no admin account is provided.
 * @internal
 */
function verifyJWT(options) {
    return async (params) => {
        const { payload, signature } = (0, decode_jwt_js_1.decodeJWT)(params.jwt);
        if (!options.adminAccount) {
            throw new Error("No admin account provided. Cannot verify JWT.");
        }
        if (options.jwt?.jwtId) {
            const valid = await options.jwt.jwtId.validate(payload.jti);
            if (!valid) {
                return {
                    error: "Invalid JWT ID",
                    valid: false,
                };
            }
        }
        // check that the token audience matches the domain
        if (payload.aud !== options.domain) {
            return {
                error: `Expected token to be for the domain '${options.domain}', but found token with domain '${payload.aud}'`,
                valid: false,
            };
        }
        // Check that the token is past the invalid before time
        const currentTime = Math.floor(Date.now() / 1000);
        if (currentTime < payload.nbf) {
            return {
                error: `This token is invalid before epoch time '${payload.nbf}', current epoch time is '${currentTime}'`,
                valid: false,
            };
        }
        // Check that the token hasn't expired
        if (currentTime > payload.exp) {
            return {
                error: `This token expired at epoch time '${payload.exp}', current epoch time is '${currentTime}'`,
                valid: false,
            };
        }
        const issuerAddress = options.adminAccount.address;
        if (issuerAddress.toLowerCase() !== payload.iss.toLowerCase()) {
            return {
                error: `The expected issuer address '${issuerAddress}' did not match the token issuer address '${payload.iss}'`,
                valid: false,
            };
        }
        const verified = await (0, verify_signature_js_1.verifyEOASignature)({
            address: issuerAddress,
            message: (0, json_js_1.stringify)(payload),
            signature,
        });
        if (!verified) {
            return {
                error: `The expected issuer address '${issuerAddress}' did not sign this token.`,
                valid: false,
            };
        }
        return {
            parsedJWT: payload,
            valid: true,
        };
    };
}
//# sourceMappingURL=verify-jwt.js.map