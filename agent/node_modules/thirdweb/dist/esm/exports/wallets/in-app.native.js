// --- KEEEP IN SYNC with exports/wallets/in-app.ts ---
export { executedEvent } from "../../extensions/erc7702/__generated__/MinimalAccount/events/Executed.js";
export { sessionCreatedEvent } from "../../extensions/erc7702/__generated__/MinimalAccount/events/SessionCreated.js";
export { valueReceivedEvent } from "../../extensions/erc7702/__generated__/MinimalAccount/events/ValueReceived.js";
// ERC7702 generated helpers
export { eip712Domain, isEip712DomainSupported, } from "../../extensions/erc7702/__generated__/MinimalAccount/read/eip712Domain.js";
export { getCallPoliciesForSigner, isGetCallPoliciesForSignerSupported, } from "../../extensions/erc7702/__generated__/MinimalAccount/read/getCallPoliciesForSigner.js";
export { getSessionExpirationForSigner, isGetSessionExpirationForSignerSupported, } from "../../extensions/erc7702/__generated__/MinimalAccount/read/getSessionExpirationForSigner.js";
export { getSessionStateForSigner, isGetSessionStateForSignerSupported, } from "../../extensions/erc7702/__generated__/MinimalAccount/read/getSessionStateForSigner.js";
export { getTransferPoliciesForSigner, isGetTransferPoliciesForSignerSupported, } from "../../extensions/erc7702/__generated__/MinimalAccount/read/getTransferPoliciesForSigner.js";
export { isIsWildcardSignerSupported, isWildcardSigner, } from "../../extensions/erc7702/__generated__/MinimalAccount/read/isWildcardSigner.js";
export { createSessionWithSig, isCreateSessionWithSigSupported, } from "../../extensions/erc7702/__generated__/MinimalAccount/write/createSessionWithSig.js";
export { execute, isExecuteSupported, } from "../../extensions/erc7702/__generated__/MinimalAccount/write/execute.js";
export { executeWithSig, isExecuteWithSigSupported, } from "../../extensions/erc7702/__generated__/MinimalAccount/write/executeWithSig.js";
//ACCOUNT
export { createSessionKey, isCreateSessionKeySupported, } from "../../extensions/erc7702/account/createSessionKey.js";
export { authenticate, getProfiles, getUserEmail, getUserPhoneNumber, linkProfile, preAuthenticate, unlinkProfile, } from "../../wallets/in-app/native/auth/index.js";
export { hasStoredPasskey } from "../../wallets/in-app/native/auth/passkeys.js";
export { inAppWallet } from "../../wallets/in-app/native/in-app.js";
//# sourceMappingURL=in-app.native.js.map