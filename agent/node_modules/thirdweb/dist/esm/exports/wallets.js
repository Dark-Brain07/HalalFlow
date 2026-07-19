// --- KEEEP IN SYNC with exports/wallets.native.ts ---
// generate a random private key
export { randomPrivateKey } from "ox/Secp256k1";
// eip1193
export * as EIP1193 from "../adapters/eip1193/index.js";
export { createWalletAdapter } from "../adapters/wallet-adapter.js";
export { getWalletInfo } from "../wallets/__generated__/getWalletInfo.js";
export { isBaseAccountSDKWallet } from "../wallets/base-account/base-account-web.js";
export { createWallet, walletConnect, } from "../wallets/create-wallet.js";
export { getAllWalletsList } from "../wallets/getAllWalletsList.js";
export { getUser, } from "../wallets/in-app/core/users/getUser.js";
export { ecosystemWallet } from "../wallets/in-app/web/ecosystem.js";
export { inAppWallet, 
/**
 * @deprecated use inAppWallet instead
 */
inAppWallet as embeddedWallet, } from "../wallets/in-app/web/in-app.js";
export { authenticate, authenticateWithRedirect, getProfiles, getUserEmail, getUserPhoneNumber, linkProfile, preAuthenticate, unlinkProfile, } from "../wallets/in-app/web/lib/auth/index.js";
// private-key
export { privateKeyToAccount, 
/**
 * @internal
 * @deprecated - use {@link privateKeyToAccount} instead
 */
privateKeyToAccount as privateKeyAccount, } from "../wallets/private-key.js";
export { smartWallet } from "../wallets/smart/smart-wallet.js";
export { generateAccount, } from "../wallets/utils/generateAccount.js";
// utils
export { getWalletBalance, } from "../wallets/utils/getWalletBalance.js";
// wallet connect
export { createWalletConnectClient, createWalletConnectSession, DefaultWalletConnectRequestHandlers, disconnectWalletConnectSession, getActiveWalletConnectSessions, } from "../wallets/wallet-connect/receiver/index.js";
// WEB ONLY EXPORTS
export { autoConnect } from "../wallets/connection/autoConnect.js";
// injected
export { getInstalledWallets, injectedProvider, } from "../wallets/injected/mipdStore.js";
export { deploySmartAccount } from "../wallets/smart/lib/signing.js";
//# sourceMappingURL=wallets.js.map