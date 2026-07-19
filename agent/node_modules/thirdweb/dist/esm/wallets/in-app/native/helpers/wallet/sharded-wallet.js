import { fetchUserDetails } from "../api/fetchers.js";
import { postAuth } from "../auth/middleware.js";
import { getWalletUserDetails } from "../storage/local.js";
import { getExistingUserAccount } from "./retrieval.js";
export class ShardedWallet {
    constructor(args) {
        Object.defineProperty(this, "client", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "storage", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.client = args.client;
        this.storage = args.storage;
    }
    async postWalletSetUp(authResult) {
        await postAuth({
            client: this.client,
            encryptionKey: authResult.encryptionKey,
            storage: this.storage,
            storedToken: authResult.storedToken,
        });
    }
    async getUserWalletStatus() {
        const localData = await getWalletUserDetails(this.client.clientId);
        const userStatus = await fetchUserDetails({
            client: this.client,
            email: localData?.email,
            storage: this.storage,
        });
        if (userStatus.status === "Logged In, Wallet Initialized") {
            return {
                account: await this.getAccount(),
                authDetails: userStatus.storedToken.authDetails,
                status: userStatus.status,
                walletAddress: userStatus.walletAddress,
            };
        }
        if (userStatus.status === "Logged In, New Device") {
            return {
                authDetails: userStatus.storedToken.authDetails,
                status: "Logged In, New Device",
                walletAddress: userStatus.walletAddress,
            };
        }
        if (userStatus.status === "Logged In, Wallet Uninitialized") {
            return {
                authDetails: userStatus.storedToken.authDetails,
                status: "Logged In, Wallet Uninitialized",
            };
        }
        // Logged out
        return { status: "Logged Out" };
    }
    getAccount() {
        return getExistingUserAccount({
            client: this.client,
            storage: this.storage,
        });
    }
}
//# sourceMappingURL=sharded-wallet.js.map