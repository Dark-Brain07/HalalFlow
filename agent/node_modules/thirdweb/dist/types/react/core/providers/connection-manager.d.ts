export declare const ConnectionManagerCtx: import("react").Context<{
    activeAccountStore: import("../../../reactive/store.js").Store<import("../../../exports/wallets.native.js").Account | undefined>;
    activeWalletChainStore: import("../../../reactive/store.js").Store<Readonly<import("../../../chains/types.js").ChainOptions & {
        rpc: string;
    }> | undefined>;
    activeWalletConnectionStatusStore: import("../../../reactive/store.js").Store<import("../../../wallets/manager/index.js").ConnectionStatus>;
    activeWalletStore: import("../../../reactive/store.js").Store<import("../../../exports/wallets.native.js").Wallet | undefined>;
    addConnectedWallet: (wallet: import("../../../exports/wallets.native.js").Wallet) => void;
    connect: (wallet: import("../../../exports/wallets.native.js").Wallet, options?: import("../../../wallets/manager/index.js").ConnectManagerOptions) => Promise<import("../../../exports/wallets.native.js").Wallet>;
    connectedWallets: import("../../../reactive/computedStore.js").ReadonlyStore<import("../../../exports/wallets.native.js").Wallet[]>;
    defineChains: (chains: import("../../../chains/types.js").Chain[]) => void;
    disconnectWallet: (wallet: import("../../../exports/wallets.native.js").Wallet) => void;
    handleConnection: (wallet: import("../../../exports/wallets.native.js").Wallet, options?: import("../../../wallets/manager/index.js").ConnectManagerOptions) => Promise<import("../../../exports/wallets.native.js").Wallet>;
    isAutoConnecting: import("../../../reactive/store.js").Store<boolean>;
    removeConnectedWallet: (wallet: import("../../../exports/wallets.native.js").Wallet) => void;
    setActiveWallet: (activeWallet: import("../../../exports/wallets.native.js").Wallet) => Promise<void>;
    switchActiveWalletChain: (chain: import("../../../chains/types.js").Chain) => Promise<void>;
} | undefined>;
/**
 * @internal
 */
export declare function useConnectionManager(): {
    activeAccountStore: import("../../../reactive/store.js").Store<import("../../../exports/wallets.native.js").Account | undefined>;
    activeWalletChainStore: import("../../../reactive/store.js").Store<Readonly<import("../../../chains/types.js").ChainOptions & {
        rpc: string;
    }> | undefined>;
    activeWalletConnectionStatusStore: import("../../../reactive/store.js").Store<import("../../../wallets/manager/index.js").ConnectionStatus>;
    activeWalletStore: import("../../../reactive/store.js").Store<import("../../../exports/wallets.native.js").Wallet | undefined>;
    addConnectedWallet: (wallet: import("../../../exports/wallets.native.js").Wallet) => void;
    connect: (wallet: import("../../../exports/wallets.native.js").Wallet, options?: import("../../../wallets/manager/index.js").ConnectManagerOptions) => Promise<import("../../../exports/wallets.native.js").Wallet>;
    connectedWallets: import("../../../reactive/computedStore.js").ReadonlyStore<import("../../../exports/wallets.native.js").Wallet[]>;
    defineChains: (chains: import("../../../chains/types.js").Chain[]) => void;
    disconnectWallet: (wallet: import("../../../exports/wallets.native.js").Wallet) => void;
    handleConnection: (wallet: import("../../../exports/wallets.native.js").Wallet, options?: import("../../../wallets/manager/index.js").ConnectManagerOptions) => Promise<import("../../../exports/wallets.native.js").Wallet>;
    isAutoConnecting: import("../../../reactive/store.js").Store<boolean>;
    removeConnectedWallet: (wallet: import("../../../exports/wallets.native.js").Wallet) => void;
    setActiveWallet: (activeWallet: import("../../../exports/wallets.native.js").Wallet) => Promise<void>;
    switchActiveWalletChain: (chain: import("../../../chains/types.js").Chain) => Promise<void>;
};
/**
 * Use this instead of `useConnectionManager` to throw a more specific error message when used outside of a provider.
 * @internal
 */
export declare function useConnectionManagerCtx(hookname: string): {
    activeAccountStore: import("../../../reactive/store.js").Store<import("../../../exports/wallets.native.js").Account | undefined>;
    activeWalletChainStore: import("../../../reactive/store.js").Store<Readonly<import("../../../chains/types.js").ChainOptions & {
        rpc: string;
    }> | undefined>;
    activeWalletConnectionStatusStore: import("../../../reactive/store.js").Store<import("../../../wallets/manager/index.js").ConnectionStatus>;
    activeWalletStore: import("../../../reactive/store.js").Store<import("../../../exports/wallets.native.js").Wallet | undefined>;
    addConnectedWallet: (wallet: import("../../../exports/wallets.native.js").Wallet) => void;
    connect: (wallet: import("../../../exports/wallets.native.js").Wallet, options?: import("../../../wallets/manager/index.js").ConnectManagerOptions) => Promise<import("../../../exports/wallets.native.js").Wallet>;
    connectedWallets: import("../../../reactive/computedStore.js").ReadonlyStore<import("../../../exports/wallets.native.js").Wallet[]>;
    defineChains: (chains: import("../../../chains/types.js").Chain[]) => void;
    disconnectWallet: (wallet: import("../../../exports/wallets.native.js").Wallet) => void;
    handleConnection: (wallet: import("../../../exports/wallets.native.js").Wallet, options?: import("../../../wallets/manager/index.js").ConnectManagerOptions) => Promise<import("../../../exports/wallets.native.js").Wallet>;
    isAutoConnecting: import("../../../reactive/store.js").Store<boolean>;
    removeConnectedWallet: (wallet: import("../../../exports/wallets.native.js").Wallet) => void;
    setActiveWallet: (activeWallet: import("../../../exports/wallets.native.js").Wallet) => Promise<void>;
    switchActiveWalletChain: (chain: import("../../../chains/types.js").Chain) => Promise<void>;
};
//# sourceMappingURL=connection-manager.d.ts.map