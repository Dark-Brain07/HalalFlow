import type { ProviderInterface } from "@base-org/account";
import type { Chain } from "../../chains/types.js";
import type { ThirdwebClient } from "../../client/client.js";
import { BASE_ACCOUNT } from "../constants.js";
import type { Account, Wallet } from "../interfaces/wallet.js";
import type { AppMetadata, DisconnectFn, SwitchChainFn } from "../types.js";
import type { WalletEmitter } from "../wallet-emitter.js";
import type { CreateWalletArgs, WalletConnectionOption } from "../wallet-types.js";
/**
 * Configuration options for creating a Base Account SDK wallet.
 *
 * These options are passed to `createWallet` when creating a Base Account wallet
 * and configure the underlying `@base-org/account` SDK provider.
 *
 * @example
 * ```ts
 * import { createWallet } from "thirdweb/wallets";
 * import { base } from "thirdweb/chains";
 *
 * const wallet = createWallet("org.base.account", {
 *   appMetadata: {
 *     name: "My App",
 *     logoUrl: "https://example.com/logo.png",
 *   },
 *   chains: [base],
 * });
 * ```
 *
 * @beta
 */
export type BaseAccountWalletCreationOptions = {
    /**
     * Metadata of the dApp that will be passed to connected wallet.
     *
     * Some wallets may display this information to the user.
     *
     * Setting this property is highly recommended. If this is not set, Below default metadata will be used:
     *
     * ```ts
     * {
     *   name: "thirdweb powered dApp",
     *   url: "https://thirdweb.com",
     *   description: "thirdweb powered dApp",
     *   logoUrl: "https://thirdweb.com/favicon.ico",
     * };
     * ```
     */
    appMetadata?: AppMetadata;
    /**
     * Chains that the wallet can switch chains to, will default to the first chain in this array on first connection.
     * @default Ethereum mainnet
     * @example
     * ```ts
     * {
     *   chains: [base, optimism]
     * }
     * ```
     */
    chains?: Chain[];
} | undefined;
/**
 * Options for connecting to a Base Account SDK wallet.
 *
 * These options are passed to the `connect` method when connecting
 * a Base Account wallet to your application.
 *
 * @example
 * ```ts
 * import { createThirdwebClient } from "thirdweb";
 * import { createWallet } from "thirdweb/wallets";
 * import { base } from "thirdweb/chains";
 *
 * const client = createThirdwebClient({ clientId: "..." });
 * const wallet = createWallet("org.base.account");
 *
 * const account = await wallet.connect({
 *   client,
 *   chain: base,
 * });
 * ```
 *
 * @beta
 */
export type BaseAccountSDKWalletConnectionOptions = {
    /**
     * The Thirdweb client object
     */
    client: ThirdwebClient;
    /**
     * If you want the wallet to be connected to a specific blockchain, you can pass a `Chain` object to the `connect` method.
     * This will trigger a chain switch if the wallet provider is not already connected to the specified chain.
     *
     * You can create a `Chain` object using the [`defineChain`](https://portal.thirdweb.com/references/typescript/v5/defineChain) function.
     * At minimum, you need to pass the `id` of the blockchain.
     *
     * ```ts
     * import { defineChain } from "thirdweb";
     * const myChain = defineChain(myChainId);
     *
     * const address = await wallet.connect({ chain: myChain })
     */
    chain?: Chain;
};
/**
 * @internal
 */
export declare function getBaseAccountWebProvider(options?: CreateWalletArgs<typeof BASE_ACCOUNT>[1]): Promise<ProviderInterface>;
/**
 * Type guard to check if a wallet is a Base Account SDK wallet.
 *
 * This function narrows the wallet type to `Wallet<"org.base.account">`,
 * allowing TypeScript to infer the correct wallet type in conditional blocks.
 *
 * @param wallet - The wallet instance to check.
 * @returns `true` if the wallet is a Base Account SDK wallet, `false` otherwise.
 *
 * @example
 * ```ts
 * import { createWallet } from "thirdweb/wallets";
 * import { isBaseAccountSDKWallet } from "thirdweb/wallets";
 *
 * const wallet = createWallet("org.base.account");
 *
 * if (isBaseAccountSDKWallet(wallet)) {
 *   // wallet is typed as Wallet<"org.base.account">
 *   console.log("This is a Base Account wallet");
 * }
 * ```
 *
 * @beta
 */
export declare function isBaseAccountSDKWallet(wallet: Wallet): wallet is Wallet<typeof BASE_ACCOUNT>;
declare function onConnect(address: string, chain: Chain, provider: ProviderInterface, emitter: WalletEmitter<typeof BASE_ACCOUNT>, client: ThirdwebClient): [Account, Chain, DisconnectFn, SwitchChainFn];
/**
 * @internal
 */
export declare function connectBaseAccountSDK(options: WalletConnectionOption<typeof BASE_ACCOUNT>, emitter: WalletEmitter<typeof BASE_ACCOUNT>, provider: ProviderInterface): Promise<ReturnType<typeof onConnect>>;
/**
 * @internal
 */
export declare function autoConnectBaseAccountSDK(options: WalletConnectionOption<typeof BASE_ACCOUNT>, emitter: WalletEmitter<typeof BASE_ACCOUNT>, provider: ProviderInterface): Promise<ReturnType<typeof onConnect>>;
export {};
//# sourceMappingURL=base-account-web.d.ts.map