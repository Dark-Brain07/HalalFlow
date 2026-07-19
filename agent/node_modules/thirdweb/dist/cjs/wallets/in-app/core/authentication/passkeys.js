"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerPasskey = registerPasskey;
exports.loginWithPasskey = loginWithPasskey;
const domains_js_1 = require("../../../../utils/domains.js");
const fetch_js_1 = require("../../../../utils/fetch.js");
const json_js_1 = require("../../../../utils/json.js");
function getVerificationPath() {
    return `${(0, domains_js_1.getThirdwebBaseUrl)("inAppWallet")}/api/2024-05-05/login/passkey/callback`;
}
function getChallengePath(type, username) {
    return `${(0, domains_js_1.getThirdwebBaseUrl)("inAppWallet")}/api/2024-05-05/login/passkey?type=${type}${username ? `&username=${username}` : ""}`;
}
async function registerPasskey(options) {
    if (!options.passkeyClient.isAvailable()) {
        throw new Error("Passkeys are not available on this device");
    }
    const fetchWithId = (0, fetch_js_1.getClientFetch)(options.client, options.ecosystem);
    const generatedName = options.username ?? generateUsername(options.ecosystem);
    // 1. request challenge from  server
    const res = await fetchWithId(getChallengePath("sign-up", generatedName));
    const challengeData = await res.json();
    if (!challengeData.challenge) {
        throw new Error("No challenge received");
    }
    const challenge = challengeData.challenge;
    // 2. initiate registration
    const registration = await options.passkeyClient.register({
        challenge,
        name: generatedName,
        rp: options.rp,
    });
    const customHeaders = {};
    if (options.ecosystem?.partnerId) {
        customHeaders["x-ecosystem-partner-id"] = options.ecosystem.partnerId;
    }
    if (options.ecosystem?.id) {
        customHeaders["x-ecosystem-id"] = options.ecosystem.id;
    }
    // 3. send the registration object to the server
    const verifRes = await fetchWithId(getVerificationPath(), {
        body: (0, json_js_1.stringify)({
            authenticatorData: registration.authenticatorData,
            clientData: registration.clientData,
            credential: {
                algorithm: registration.credential.algorithm,
                publicKey: registration.credential.publicKey,
            },
            credentialId: registration.credentialId,
            origin: registration.origin,
            rpId: options.rp.id,
            serverVerificationId: challengeData.serverVerificationId,
            type: "sign-up",
            username: generatedName,
        }),
        headers: {
            "Content-Type": "application/json",
            ...customHeaders,
        },
        method: "POST",
    });
    const verifData = await verifRes.json();
    if (!verifData || !verifData.storedToken) {
        throw new Error(`Error verifying passkey: ${verifData.message ?? "unknown error"}`);
    }
    // 4. store the credentialId in local storage
    await options.storage?.savePasskeyCredentialId(registration.credentialId);
    // 5. returns back the IAW authentication token
    return verifData;
}
async function loginWithPasskey(options) {
    if (!options.passkeyClient.isAvailable()) {
        throw new Error("Passkeys are not available on this device");
    }
    const fetchWithId = (0, fetch_js_1.getClientFetch)(options.client, options.ecosystem);
    // 1. request challenge from  server/iframe
    const [challengeData, credentialId] = await Promise.all([
        fetchWithId(getChallengePath("sign-in")).then((r) => r.json()),
        options.storage?.getPasskeyCredentialId(),
    ]);
    if (!challengeData.challenge) {
        throw new Error("No challenge received");
    }
    const challenge = challengeData.challenge;
    // 2. initiate login
    const authentication = await options.passkeyClient.authenticate({
        challenge,
        credentialId: credentialId ?? undefined,
        rp: options.rp,
    });
    const customHeaders = {};
    if (options.ecosystem?.partnerId) {
        customHeaders["x-ecosystem-partner-id"] = options.ecosystem.partnerId;
    }
    if (options.ecosystem?.id) {
        customHeaders["x-ecosystem-id"] = options.ecosystem.id;
    }
    const verifRes = await fetchWithId(getVerificationPath(), {
        body: (0, json_js_1.stringify)({
            authenticatorData: authentication.authenticatorData,
            clientData: authentication.clientData,
            credentialId: authentication.credentialId,
            origin: authentication.origin,
            rpId: options.rp.id,
            serverVerificationId: challengeData.serverVerificationId,
            signature: authentication.signature,
            type: "sign-in",
        }),
        headers: {
            "Content-Type": "application/json",
            ...customHeaders,
        },
        method: "POST",
    });
    const verifData = await verifRes.json();
    if (!verifData || !verifData.storedToken) {
        throw new Error(`Error verifying passkey: ${verifData.message ?? "unknown error"}`);
    }
    // 5. store the credentialId in local storage
    await options.storage?.savePasskeyCredentialId(authentication.credentialId);
    // 6. return the auth'd user type
    return verifData;
}
function generateUsername(ecosystem) {
    return `${ecosystem?.id ?? "wallet"}-${new Date().toISOString()}`;
}
//# sourceMappingURL=passkeys.js.map