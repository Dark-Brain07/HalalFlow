import type { Chain } from "../../../../chains/types.js";
import type { ThirdwebClient } from "../../../../client/client.js";
import type { SupportedFiatCurrency } from "../../../../pay/convert/type.js";
import type { PurchaseData } from "../../../../pay/types.js";
import type { WaitForReceiptOptions } from "../../../../transaction/actions/wait-for-tx-receipt.js";
import { type PreparedTransaction } from "../../../../transaction/prepare-transaction.js";
import { type Address } from "../../../../utils/address.js";
import type { Wallet } from "../../../../wallets/interfaces/wallet.js";
import type { SmartWalletOptions } from "../../../../wallets/smart/types.js";
import type { AppMetadata } from "../../../../wallets/types.js";
import type { WalletId } from "../../../../wallets/wallet-types.js";
import { type Theme } from "../../../core/design-system/index.js";
import type { SiweAuthOptions } from "../../../core/hooks/auth/useSiweAuth.js";
import type { ConnectButton_connectModalOptions } from "../../../core/hooks/connection/ConnectButtonProps.js";
import type { SupportedTokens } from "../../../core/utils/defaultTokens.js";
import type { LocaleId } from "../types.js";
export type TransactionWidgetProps = {
    /**
     * Customize the supported tokens that users can pay with.
     */
    supportedTokens?: SupportedTokens;
    /**
     * A client is the entry point to the thirdweb SDK.
     * It is required for all other actions.
     * You can create a client using the `createThirdwebClient` function. Refer to the [Creating a Client](https://portal.thirdweb.com/typescript/v5/client) documentation for more information.
     *
     * You must provide a `clientId` or `secretKey` in order to initialize a client. Pass `clientId` if you want for client-side usage and `secretKey` for server-side usage.
     *
     * ```tsx
     * import { createThirdwebClient } from "thirdweb";
     *
     * const client = createThirdwebClient({
     *  clientId: "<your_client_id>",
     * })
     * ```
     */
    client: ThirdwebClient;
    /**
     * By default - ConnectButton UI uses the `en-US` locale for english language users.
     *
     * You can customize the language used in the ConnectButton UI by setting the `locale` prop.
     *
     * Refer to the [`LocaleId`](https://portal.thirdweb.com/references/typescript/v5/LocaleId) type for supported locales.
     */
    locale?: LocaleId;
    /**
     * Set the theme for the `TransactionWidget` component. By default it is set to `"dark"`
     *
     * theme can be set to either `"dark"`, `"light"` or a custom theme object.
     * You can also import [`lightTheme`](https://portal.thirdweb.com/references/typescript/v5/lightTheme)
     * or [`darkTheme`](https://portal.thirdweb.com/references/typescript/v5/darkTheme)
     * functions from `thirdweb/react` to use the default themes as base and overrides parts of it.
     * @example
     * ```ts
     * import { lightTheme } from "thirdweb/react";
     *
     * const customTheme = lightTheme({
     *  colors: {
     *    modalBg: 'red'
     *  }
     * })
     *
     * function Example() {
     *  return <TransactionWidget client={client} theme={customTheme} />
     * }
     * ```
     */
    theme?: "light" | "dark" | Theme;
    /**
     * Customize the options for "Connect" Button showing in the TransactionWidget UI when the user is not connected to a wallet.
     *
     * Refer to the [`TransactionWidgetConnectOptions`](https://portal.thirdweb.com/references/typescript/v5/TransactionWidgetConnectOptions) type for more details.
     */
    connectOptions?: TransactionWidgetConnectOptions;
    /**
     * All wallet IDs included in this array will be hidden from wallet selection when connected.
     */
    hiddenWallets?: WalletId[];
    /**
     * The wallet that should be pre-selected in the TransactionWidget UI.
     */
    activeWallet?: Wallet;
    style?: React.CSSProperties;
    className?: string;
    /**
     * Whether to show thirdweb branding in the widget.
     * @default true
     */
    showThirdwebBranding?: boolean;
    /**
     * The token address needed to complete this transaction. Leave undefined if no token is required.
     */
    tokenAddress?: Address;
    /**
     * The price of the item **(as a decimal string)**, e.g. "1.5" for 1.5 tokens.
     */
    amount?: string;
    /**
     * A title for the transaction.
     */
    title?: string;
    /**
     * The transaction description.
     */
    description?: string;
    /**
     * An image URL to show on the widget, such as an NFT image.
     */
    image?: string;
    /**
     * Whether the user or the seller pays the protocol fees. Defaults to the user.
     */
    feePayer?: "user" | "seller";
    /**
     * Arbitrary data to be included in the returned status and webhook events.
     */
    purchaseData?: PurchaseData;
    /**
     * Callback triggered when the purchase is successful.
     */
    onSuccess?: (data: WaitForReceiptOptions) => void;
    /**
     * Callback triggered when the purchase encounters an error.
     */
    onError?: (error: Error) => void;
    /**
     * Callback triggered when the user cancels the purchase.
     */
    onCancel?: () => void;
    /**
     * Arbitrary data to be included in the returned status and webhook events.
     */
    transaction: PreparedTransaction;
    /**
     * @hidden
     */
    paymentLinkId?: string;
    /**
     * Allowed payment methods
     * @default ["crypto", "card"]
     */
    paymentMethods?: ("crypto" | "card")[];
    /**
     * The currency to use for the payment.
     * @default "USD"
     */
    currency?: SupportedFiatCurrency;
    /** The user's ISO 3166 alpha-2 country code. This is used to determine onramp provider support. */
    country?: string;
    /**
     * Custom label for the main action button.
     */
    buttonLabel?: string;
};
/**
 * Widget a prebuilt UI for purchasing a specific token.
 *
 * @param props - Props of type [`TransactionWidgetProps`](https://portal.thirdweb.com/references/typescript/v5/TransactionWidgetProps) to configure the TransactionWidget component.
 *
 * @example
 * ### Default configuration
 *
 * By default, the `TransactionWidget` component allows users to fund their wallets with crypto or fiat on any of the supported chains.
 *
 * ```tsx
 * <TransactionWidget
 *   client={client}
 *   transaction={prepareTransaction({
 *     to: "0x...",
 *     chain: ethereum,
 *     client: client,
 *   })}
 *   amount="0.1"
 *  />
 * ```
 *
 * ### Customize the supported tokens
 *
 * You can customize the supported tokens that users can pay with by passing a `supportedTokens` object to the `TransactionWidget` component.
 *
 * ```tsx
 * <TransactionWidget
 *   client={client}
 *   transaction={prepareTransaction({
 *     to: "0x...",
 *     chain: ethereum,
 *     client: client,
 *   })}
 *   supportedTokens={{
 *     [8453]: [
 *       {
 *         address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
 *         name: "USDC",
 *         symbol: "USDC",
 *       },
 *     ],
 *   }}
 * />
 * ```
 *
 * ### Customize the UI
 *
 * You can customize the UI of the `TransactionWidget` component by passing a custom theme object to the `theme` prop.
 *
 * ```tsx
 * <TransactionWidget
 *   client={client}
 *   transaction={prepareTransaction({
 *     to: "0x...",
 *     chain: ethereum,
 *     client: client,
 *     value: toUnits("0.001", 18),
 *   })}
 *   theme={darkTheme({
 *     colors: {
 *       modalBg: "red",
 *     },
 *   })}
 * />
 * ```
 *
 * Refer to the [`Theme`](https://portal.thirdweb.com/references/typescript/v5/Theme) type for more details.
 *
 * ### Update the Title
 *
 * You can update the title of the widget by passing a `title` prop to the `TransactionWidget` component.
 *
 * ```tsx
 * <TransactionWidget
 *   transaction={prepareTransaction({
 *     to: "0x...",
 *     chain: ethereum,
 *     client: client,
 *     value: toUnits("0.001", 18),
 *   })}
 *   client={client}
 *   title="Transaction ETH"
 * />
 * ```
 *
 * ### Configure the wallet connection
 *
 * You can customize the wallet connection flow by passing a `connectOptions` object to the `TransactionWidget` component.
 *
 * ```tsx
 * <TransactionWidget
 *   client={client}
 *   transaction={prepareTransaction({
 *     to: "0x...",
 *     chain: ethereum,
 *     client: client,
 *     value: toUnits("0.001", 18),
 *   })}
 *   connectOptions={{
 *     connectModal: {
 *       size: 'compact',
 *       title: "Sign in",
 *     }
 *   }}
 * />
 * ```
 *
 * Refer to the [`TransactionWidgetConnectOptions`](https://portal.thirdweb.com/references/typescript/v5/TransactionWidgetConnectOptions) type for more details.
 *
 * @bridge
 */
export declare function TransactionWidget(props: TransactionWidgetProps): import("react/jsx-runtime").JSX.Element;
export declare function TransactionWidgetContentWrapper(props: TransactionWidgetProps): import("react/jsx-runtime").JSX.Element | null;
/**
 * Connection options for the `TransactionWidget` component
 *
 * @example
 * ```tsx
 * <TransactionWidget client={client} connectOptions={{
 *    connectModal: {
 *      size: 'compact',
 *      title: "Sign in",
 *    }
 *  }}
 * />
 * ```
 */
type TransactionWidgetConnectOptions = {
    /**
     * Configurations for the `ConnectButton`'s Modal that is shown for connecting a wallet
     * Refer to the [`ConnectButton_connectModalOptions`](https://portal.thirdweb.com/references/typescript/v5/ConnectButton_connectModalOptions) type for more details
     */
    connectModal?: ConnectButton_connectModalOptions;
    /**
     * Configure options for WalletConnect
     *
     * By default WalletConnect uses the thirdweb's default project id.
     * Setting your own project id is recommended.
     *
     * You can create a project id by signing up on [walletconnect.com](https://walletconnect.com/)
     */
    walletConnect?: {
        projectId?: string;
    };
    /**
     * Enable Account abstraction for all wallets. This will connect to the users's smart account based on the connected personal wallet and the given options.
     *
     * This allows to sponsor gas fees for your user's transaction using the thirdweb account abstraction infrastructure.
     *
     */
    accountAbstraction?: SmartWalletOptions;
    /**
     * Array of wallets to show in Connect Modal. If not provided, default wallets will be used.
     */
    wallets?: Wallet[];
    /**
     * When the user has connected their wallet to your site, this configuration determines whether or not you want to automatically connect to the last connected wallet when user visits your site again in the future.
     *
     * By default it is set to `{ timeout: 15000 }` meaning that autoConnect is enabled and if the autoConnection does not succeed within 15 seconds, it will be cancelled.
     *
     * If you want to disable autoConnect, set this prop to `false`.
     *
     * If you want to customize the timeout, you can assign an object with a `timeout` key to this prop.
     * ```
     */
    autoConnect?: {
        timeout: number;
    } | boolean;
    /**
     * Metadata of the app that will be passed to connected wallet. Setting this is highly recommended.
     */
    appMetadata?: AppMetadata;
    /**
     * The [`Chain`](https://portal.thirdweb.com/references/typescript/v5/Chain) object of the blockchain you want the wallet to connect to
     *
     * If a `chain` is not specified, Wallet will be connected to whatever is the default set in the wallet.
     *
     * If a `chain` is specified, Wallet will be prompted to switch to given chain after connection if it is not already connected to it.
     * This ensures that the wallet is connected to the correct blockchain before interacting with your app.
     *
     * The `ConnectButton` also shows a "Switch Network" button until the wallet is connected to the specified chain. Clicking on the "Switch Network" button triggers the wallet to switch to the specified chain.
     *
     * You can create a `Chain` object using the [`defineChain`](https://portal.thirdweb.com/references/typescript/v5/defineChain) function.
     * At minimum, you need to pass the `id` of the blockchain to `defineChain` function to create a `Chain` object.
     * ```
     */
    chain?: Chain;
    /**
     * Array of chains that your app supports.
     *
     * This is only relevant if your app is a multi-chain app and works across multiple blockchains.
     * If your app only works on a single blockchain, you should only specify the `chain` prop.
     *
     * Given list of chains will used in various ways:
     * - They will be displayed in the network selector in the `ConnectButton`'s details modal post connection
     * - They will be sent to wallet at the time of connection if the wallet supports requesting multiple chains ( example: WalletConnect ) so that users can switch between the chains post connection easily
     *
     * You can create a `Chain` object using the [`defineChain`](https://portal.thirdweb.com/references/typescript/v5/defineChain) function.
     * At minimum, you need to pass the `id` of the blockchain to `defineChain` function to create a `Chain` object.
     *
     * ```tsx
     * import { defineChain } from "thirdweb/react";
     *
     * const polygon = defineChain({
     *   id: 137,
     * });
     * ```
     */
    chains?: Chain[];
    /**
     * Wallets to show as recommended in the `ConnectButton`'s Modal
     */
    recommendedWallets?: Wallet[];
    /**
     * By default, ConnectButton modal shows a "All Wallets" button that shows a list of 500+ wallets.
     *
     * You can disable this button by setting `showAllWallets` prop to `false`
     */
    showAllWallets?: boolean;
    /**
     * Enable SIWE (Sign in with Ethererum) by passing an object of type `SiweAuthOptions` to
     * enforce the users to sign a message after connecting their wallet to authenticate themselves.
     *
     * Refer to the [`SiweAuthOptions`](https://portal.thirdweb.com/references/typescript/v5/SiweAuthOptions) for more details
     */
    auth?: SiweAuthOptions;
};
export {};
//# sourceMappingURL=TransactionWidget.d.ts.map