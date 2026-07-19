"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasskeyWebClient = void 0;
exports.hasStoredPasskey = hasStoredPasskey;
const webauthn_1 = require("@passwordless-id/webauthn");
const webStorage_js_1 = require("../../../../../utils/storage/webStorage.js");
const uint8_array_js_1 = require("../../../../../utils/uint8-array.js");
const client_scoped_storage_js_1 = require("../../../core/authentication/client-scoped-storage.js");
class PasskeyWebClient {
    isAvailable() {
        return webauthn_1.client.isAvailable();
    }
    async register(args) {
        const { name, challenge, rp } = args;
        const registration = await webauthn_1.client.register({
            attestation: true,
            challenge,
            domain: rp.id,
            user: name,
            userVerification: "required",
        });
        const clientDataB64 = (0, uint8_array_js_1.base64UrlToBase64)(registration.response.clientDataJSON);
        const clientDataParsed = JSON.parse((0, uint8_array_js_1.base64ToString)(clientDataB64));
        return {
            authenticatorData: registration.response.authenticatorData,
            clientData: registration.response.clientDataJSON,
            credential: {
                algorithm: webauthn_1.parsers.getAlgoName(registration.response.publicKeyAlgorithm),
                publicKey: registration.response.publicKey,
            },
            credentialId: registration.id,
            origin: clientDataParsed.origin,
        };
    }
    async authenticate(args) {
        const { credentialId, challenge, rp } = args;
        const result = await webauthn_1.client.authenticate({
            allowCredentials: credentialId ? [credentialId] : [],
            challenge,
            domain: rp.id,
            userVerification: "required",
        });
        const clientDataB64 = (0, uint8_array_js_1.base64UrlToBase64)(result.response.clientDataJSON);
        const clientDataParsed = JSON.parse((0, uint8_array_js_1.base64ToString)(clientDataB64));
        return {
            authenticatorData: result.response.authenticatorData,
            clientData: result.response.clientDataJSON,
            credentialId: result.id,
            origin: clientDataParsed.origin,
            signature: result.response.signature,
        };
    }
}
exports.PasskeyWebClient = PasskeyWebClient;
/**
 * Returns whether this device has a stored passkey ready to be used for sign-in
 * @param client - the thirdweb client
 * @returns whether the device has a stored passkey
 * @walletUtils
 */
async function hasStoredPasskey(client, ecosystemId, storage) {
    const clientStorage = new client_scoped_storage_js_1.ClientScopedStorage({
        clientId: client.clientId, // TODO (passkey) react native variant of this fn
        ecosystem: ecosystemId ? { id: ecosystemId } : undefined,
        storage: storage ?? webStorage_js_1.webLocalStorage,
    });
    const credId = await clientStorage.getPasskeyCredentialId();
    return !!credId;
}
//# sourceMappingURL=passkeys.js.map