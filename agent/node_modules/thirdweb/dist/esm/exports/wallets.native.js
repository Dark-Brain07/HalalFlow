// --- KEEEP IN SYNC with exports/wallets.ts ---
export { authenticate, getProfiles, getUserEmail, getUserPhoneNumber, linkProfile, preAuthenticate, unlinkProfile, } from "../wallets/in-app/native/auth/index.js";
export { ecosystemWallet } from "../wallets/in-app/native/ecosystem.js";
export { inAppWallet } from "../wallets/in-app/native/in-app.js";
export { createWallet, walletConnect, } from "../wallets/native/create-wallet.js";
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
export const authenticateWithRedirect = () => {
    throw new Error("Not supported in native");
};
// eip1193
export * as EIP1193 from "../adapters/eip1193/index.js";
export { createWalletAdapter } from "../adapters/wallet-adapter.js";
export { getWalletInfo } from "../wallets/__generated__/getWalletInfo.js";
export { getAllWalletsList } from "../wallets/getAllWalletsList.js";
// wallet connect
export { createWalletConnectClient, createWalletConnectSession, DefaultWalletConnectRequestHandlers, disconnectWalletConnectSession, getActiveWalletConnectSessions, } from "../wallets/wallet-connect/receiver/index.js";
// NOT SUPPORTED
export const injectedProvider = () => {
    throw new Error("Not supported in native");
};
//# sourceMappingURL=wallets.native.js.map