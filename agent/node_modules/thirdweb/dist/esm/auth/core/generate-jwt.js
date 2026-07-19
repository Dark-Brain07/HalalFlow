import { encodeJWT } from "../../utils/jwt/encode-jwt.js";
const DEFAULT_TOKEN_DURATION_SECONDS = 60 * 60 * 24;
/**
 * Generates a JSON Web Token (JWT) based on the provided options.
 * @param options - The authentication options.
 * @returns A function that generates a JWT based on the provided parameters.
 * @throws An error if no admin account is provided.
 * @internal
 *
 */
export function generateJWT(options) {
    return async (params) => {
        if (!options.adminAccount) {
            throw new Error("No admin account provided. Cannot generate JWT.");
        }
        const { payload, context } = params;
        const now = Date.now();
        return await encodeJWT({
            account: options.adminAccount,
            payload: {
                aud: payload.domain,
                ctx: context || {},
                exp: new Date(now +
                    (options.jwt?.expirationTimeSeconds ||
                        DEFAULT_TOKEN_DURATION_SECONDS) *
                        1000),
                iat: new Date(),
                iss: options.adminAccount.address,
                // if there is a jwtID generator, use it to generate a unique JWT ID
                jti: await options.jwt?.jwtId?.generate?.(),
                nbf: new Date(payload.invalid_before || now),
                sub: payload.address,
            },
        });
    };
}
//# sourceMappingURL=generate-jwt.js.map