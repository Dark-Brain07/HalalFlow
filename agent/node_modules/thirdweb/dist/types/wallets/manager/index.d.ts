import type { Chain } from "../../chains/types.js";
import type { ThirdwebClient } from "../../client/client.js";
import type { OnConnectCallback } from "../../react/core/hooks/connection/types.js";
import type { AsyncStorage } from "../../utils/storage/AsyncStorage.js";
import type { Account, Wallet } from "../interfaces/wallet.js";
import type { SmartWalletOptions } from "../smart/types.js";
import type { WalletId } from "../wallet-types.js";
export type ConnectionStatus = "connected" | "disconnected" | "connecting" | "unknown";
export declare const LAST_USED_WALLET_ID = "thirdweb:last-used-wallet-id";
export type ConnectionManager = ReturnType<typeof createConnectionManager>;
export type ConnectManagerOptions = {
    client: ThirdwebClient;
    accountAbstraction?: SmartWalletOptions;
    setWalletAsActive?: boolean;
    onConnect?: OnConnectCallback;
};
/**
 * Create a connection manager for Wallet connections
 * @param storage - An instance of type [`AsyncStorage`](https://portal.thirdweb.com/references/typescript/v5/AsyncStorage)
 * @example
 * ```ts
 * const manager = createConnectionManager();
 * ```
 * @returns A connection manager object
 * @walletUtils
 */
export declare function createConnectionManager(storage: AsyncStorage): {
    activeAccountStore: import("../../reactive/store.js").Store<Account | undefined>;
    activeWalletChainStore: import("../../reactive/store.js").Store<Readonly<import("../../chains/types.js").ChainOptions & {
        rpc: string;
    }> | undefined>;
    activeWalletConnectionStatusStore: import("../../reactive/store.js").Store<ConnectionStatus>;
    activeWalletStore: import("../../reactive/store.js").Store<Wallet | undefined>;
    addConnectedWallet: (wallet: Wallet) => void;
    connect: (wallet: Wallet, options?: ConnectManagerOptions) => Promise<Wallet>;
    connectedWallets: import("../../reactive/computedStore.js").ReadonlyStore<Wallet[]>;
    defineChains: (chains: Chain[]) => void;
    disconnectWallet: (wallet: Wallet) => void;
    handleConnection: (wallet: Wallet, options?: ConnectManagerOptions) => Promise<Wallet>;
    isAutoConnecting: import("../../reactive/store.js").Store<boolean>;
    removeConnectedWallet: (wallet: Wallet) => void;
    setActiveWallet: (activeWallet: Wallet) => Promise<void>;
    switchActiveWalletChain: (chain: Chain) => Promise<void>;
};
/**
 *
 * @internal
 */
export declare function getStoredConnectedWalletIds(storage: AsyncStorage): Promise<string[] | null>;
/**
 * @internal
 */
export declare function getStoredActiveWalletId(storage: AsyncStorage): Promise<WalletId | null>;
/**
 * @internal
 */
export declare function getLastConnectedChain(storage: AsyncStorage): Promise<Chain | null>;
/**
 * @internal
 */
export declare const handleSmartWalletConnection: (eoaWallet: Wallet, client: ThirdwebClient, options: SmartWalletOptions, onWalletDisconnect: (wallet: Wallet) => void) => Promise<Wallet<"smart">>;
//# sourceMappingURL=index.d.ts.map