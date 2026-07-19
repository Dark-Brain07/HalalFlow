import { isEcosystemWallet } from "../../../../wallets/ecosystem/is-ecosystem-wallet.js";
import { isSmartWallet } from "../../../smart/index.js";
import { isInAppWallet } from "./index.js";
export function isInAppSigner(options) {
    const isInAppOrEcosystem = (w) => isInAppWallet(w) || isEcosystemWallet(w);
    const isSmartWalletWithAdmin = isSmartWallet(options.wallet) &&
        options.connectedWallets.some((w) => isInAppOrEcosystem(w) &&
            w.getAccount()?.address?.toLowerCase() ===
                options.wallet.getAdminAccount?.()?.address?.toLowerCase());
    return isInAppOrEcosystem(options.wallet) || isSmartWalletWithAdmin;
}
//# sourceMappingURL=is-in-app-signer.js.map