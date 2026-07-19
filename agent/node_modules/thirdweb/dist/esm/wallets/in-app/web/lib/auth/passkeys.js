import { client, parsers } from "@passwordless-id/webauthn";
import { webLocalStorage } from "../../../../../utils/storage/webStorage.js";
import { base64ToString, base64UrlToBase64, } from "../../../../../utils/uint8-array.js";
import { ClientScopedStorage } from "../../../core/authentication/client-scoped-storage.js";
export class PasskeyWebClient {
    isAvailable() {
        return client.isAvailable();
    }
    async register(args) {
        const { name, challenge, rp } = args;
        const registration = await client.register({
            attestation: true,
            challenge,
            domain: rp.id,
            user: name,
            userVerification: "required",
        });
        const clientDataB64 = base64UrlToBase64(registration.response.clientDataJSON);
        const clientDataParsed = JSON.parse(base64ToString(clientDataB64));
        return {
            authenticatorData: registration.response.authenticatorData,
            clientData: registration.response.clientDataJSON,
            credential: {
                algorithm: parsers.getAlgoName(registration.response.publicKeyAlgorithm),
                publicKey: registration.response.publicKey,
            },
            credentialId: registration.id,
            origin: clientDataParsed.origin,
        };
    }
    async authenticate(args) {
        const { credentialId, challenge, rp } = args;
        const result = await client.authenticate({
            allowCredentials: credentialId ? [credentialId] : [],
            challenge,
            domain: rp.id,
            userVerification: "required",
        });
        const clientDataB64 = base64UrlToBase64(result.response.clientDataJSON);
        const clientDataParsed = JSON.parse(base64ToString(clientDataB64));
        return {
            authenticatorData: result.response.authenticatorData,
            clientData: result.response.clientDataJSON,
            credentialId: result.id,
            origin: clientDataParsed.origin,
            signature: result.response.signature,
        };
    }
}
/**
 * Returns whether this device has a stored passkey ready to be used for sign-in
 * @param client - the thirdweb client
 * @returns whether the device has a stored passkey
 * @walletUtils
 */
export async function hasStoredPasskey(client, ecosystemId, storage) {
    const clientStorage = new ClientScopedStorage({
        clientId: client.clientId, // TODO (passkey) react native variant of this fn
        ecosystem: ecosystemId ? { id: ecosystemId } : undefined,
        storage: storage ?? webLocalStorage,
    });
    const credId = await clientStorage.getPasskeyCredentialId();
    return !!credId;
}
//# sourceMappingURL=passkeys.js.map