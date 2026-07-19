import type { Client, Options as ClientOptions, TDataShape } from "./client/index.js";
import type { DeleteV1WebhooksByWebhookIdData, DeleteV1WebhooksByWebhookIdErrors, DeleteV1WebhooksByWebhookIdResponses, GetV1BlocksData, GetV1BlocksErrors, GetV1BlocksResponses, GetV1ContractsAbiByContractAddressData, GetV1ContractsAbiByContractAddressErrors, GetV1ContractsAbiByContractAddressResponses, GetV1ContractsMetadataByContractAddressData, GetV1ContractsMetadataByContractAddressErrors, GetV1ContractsMetadataByContractAddressResponses, GetV1EventsByContractAddressBySignatureData, GetV1EventsByContractAddressBySignatureErrors, GetV1EventsByContractAddressBySignatureResponses, GetV1EventsByContractAddressData, GetV1EventsByContractAddressErrors, GetV1EventsByContractAddressResponses, GetV1EventsData, GetV1EventsErrors, GetV1EventsResponses, GetV1NftsBalanceByOwnerAddressData, GetV1NftsBalanceByOwnerAddressErrors, GetV1NftsBalanceByOwnerAddressResponses, GetV1NftsByContractAddressByTokenIdData, GetV1NftsByContractAddressByTokenIdErrors, GetV1NftsByContractAddressByTokenIdResponses, GetV1NftsByContractAddressData, GetV1NftsByContractAddressErrors, GetV1NftsByContractAddressResponses, GetV1NftsCollectionsByContractAddressData, GetV1NftsCollectionsByContractAddressErrors, GetV1NftsCollectionsByContractAddressResponses, GetV1NftsData, GetV1NftsErrors, GetV1NftsMetadataRefreshByContractAddressByTokenIdData, GetV1NftsMetadataRefreshByContractAddressByTokenIdErrors, GetV1NftsMetadataRefreshByContractAddressByTokenIdResponses, GetV1NftsMetadataRefreshByContractAddressData, GetV1NftsMetadataRefreshByContractAddressErrors, GetV1NftsMetadataRefreshByContractAddressResponses, GetV1NftsOwnersByContractAddressByTokenIdData, GetV1NftsOwnersByContractAddressByTokenIdErrors, GetV1NftsOwnersByContractAddressByTokenIdResponses, GetV1NftsOwnersByContractAddressData, GetV1NftsOwnersByContractAddressErrors, GetV1NftsOwnersByContractAddressResponses, GetV1NftsResponses, GetV1NftsTransfersByContractAddressByTokenIdData, GetV1NftsTransfersByContractAddressByTokenIdErrors, GetV1NftsTransfersByContractAddressByTokenIdResponses, GetV1NftsTransfersByContractAddressData, GetV1NftsTransfersByContractAddressErrors, GetV1NftsTransfersByContractAddressResponses, GetV1NftsTransfersData, GetV1NftsTransfersErrors, GetV1NftsTransfersResponses, GetV1NftsTransfersTransactionByTransactionHashData, GetV1NftsTransfersTransactionByTransactionHashErrors, GetV1NftsTransfersTransactionByTransactionHashResponses, GetV1ResolveByInputData, GetV1ResolveByInputErrors, GetV1ResolveByInputResponses, GetV1TokensData, GetV1TokensErc20ByOwnerAddressData, GetV1TokensErc20ByOwnerAddressErrors, GetV1TokensErc20ByOwnerAddressResponses, GetV1TokensErc721ByOwnerAddressData, GetV1TokensErc721ByOwnerAddressErrors, GetV1TokensErc721ByOwnerAddressResponses, GetV1TokensErc1155ByOwnerAddressData, GetV1TokensErc1155ByOwnerAddressErrors, GetV1TokensErc1155ByOwnerAddressResponses, GetV1TokensErrors, GetV1TokensLookupData, GetV1TokensLookupErrors, GetV1TokensLookupResponses, GetV1TokensOwnersData, GetV1TokensOwnersErrors, GetV1TokensOwnersResponses, GetV1TokensPriceData, GetV1TokensPriceErrors, GetV1TokensPriceResponses, GetV1TokensPriceSupportedData, GetV1TokensPriceSupportedErrors, GetV1TokensPriceSupportedResponses, GetV1TokensResponses, GetV1TokensTransfersByContractAddressData, GetV1TokensTransfersByContractAddressErrors, GetV1TokensTransfersByContractAddressResponses, GetV1TokensTransfersData, GetV1TokensTransfersErrors, GetV1TokensTransfersResponses, GetV1TokensTransfersTransactionByTransactionHashData, GetV1TokensTransfersTransactionByTransactionHashErrors, GetV1TokensTransfersTransactionByTransactionHashResponses, GetV1TransactionsByContractAddressBySignatureData, GetV1TransactionsByContractAddressBySignatureErrors, GetV1TransactionsByContractAddressBySignatureResponses, GetV1TransactionsByContractAddressData, GetV1TransactionsByContractAddressErrors, GetV1TransactionsByContractAddressResponses, GetV1TransactionsData, GetV1TransactionsErrors, GetV1TransactionsResponses, GetV1WalletsByWalletAddressTransactionsData, GetV1WalletsByWalletAddressTransactionsErrors, GetV1WalletsByWalletAddressTransactionsResponses, GetV1WebhooksData, GetV1WebhooksErrors, GetV1WebhooksResponses, PatchV1WebhooksByWebhookIdData, PatchV1WebhooksByWebhookIdErrors, PatchV1WebhooksByWebhookIdResponses, PostServiceWebhooksFiltersValidateData, PostServiceWebhooksFiltersValidateErrors, PostServiceWebhooksFiltersValidateResponses, PostV1DecodeByContractAddressData, PostV1DecodeByContractAddressErrors, PostV1DecodeByContractAddressResponses, PostV1WebhooksData, PostV1WebhooksErrors, PostV1WebhooksResponses, PostV1WebhooksTestData, PostV1WebhooksTestErrors, PostV1WebhooksTestResponses } from "./types.gen.js";
export type Options<TData extends TDataShape = TDataShape, ThrowOnError extends boolean = boolean> = ClientOptions<TData, ThrowOnError> & {
    /**
     * You can provide a client instance returned by `createClient()` instead of
     * individual options. This might be also useful if you want to implement a
     * custom client.
     */
    client?: Client;
    /**
     * You can pass arbitrary values through the `meta` object. This can be
     * used to access values that aren't defined as part of the SDK function.
     */
    meta?: Record<string, unknown>;
};
/**
 * Get webhooks
 * Get a list of webhooks or a single webhook by ID
 * @deprecated
 */
export declare const getV1Webhooks: <ThrowOnError extends boolean = false>(options?: Options<GetV1WebhooksData, ThrowOnError>) => import("./client/types.js").RequestResult<GetV1WebhooksResponses, GetV1WebhooksErrors, ThrowOnError, "fields">;
/**
 * Create webhook
 * Deprecated - Insight webhooks will remain active for a while, but new ones cannot be created. A general thirdweb webhook solution will be available instead. Create a new webhook. In order to receive decoded data, specify a partial ABI in the filters.
 * @deprecated
 */
export declare const postV1Webhooks: <ThrowOnError extends boolean = false>(options?: Options<PostV1WebhooksData, ThrowOnError>) => import("./client/types.js").RequestResult<PostV1WebhooksResponses, PostV1WebhooksErrors, ThrowOnError, "fields">;
/**
 * Delete webhook
 * Delete a webhook. This action cannot be undone.
 * @deprecated
 */
export declare const deleteV1WebhooksByWebhookId: <ThrowOnError extends boolean = false>(options: Options<DeleteV1WebhooksByWebhookIdData, ThrowOnError>) => import("./client/types.js").RequestResult<DeleteV1WebhooksByWebhookIdResponses, DeleteV1WebhooksByWebhookIdErrors, ThrowOnError, "fields">;
/**
 * Update webhook
 * Update a webhook.
 * @deprecated
 */
export declare const patchV1WebhooksByWebhookId: <ThrowOnError extends boolean = false>(options: Options<PatchV1WebhooksByWebhookIdData, ThrowOnError>) => import("./client/types.js").RequestResult<PatchV1WebhooksByWebhookIdResponses, PatchV1WebhooksByWebhookIdErrors, ThrowOnError, "fields">;
/**
 * Test webhook
 * Test your webhook URL. This will send a test event to the webhook URL signed with an example secret 'test123'. NB! The payload does not necessarily match your webhook filters. You can however use it to test signature verification and payload format handling.
 * @deprecated
 */
export declare const postV1WebhooksTest: <ThrowOnError extends boolean = false>(options?: Options<PostV1WebhooksTestData, ThrowOnError>) => import("./client/types.js").RequestResult<PostV1WebhooksTestResponses, PostV1WebhooksTestErrors, ThrowOnError, "fields">;
/**
 * Get events
 * Get events
 */
export declare const getV1Events: <ThrowOnError extends boolean = false>(options?: Options<GetV1EventsData, ThrowOnError>) => import("./client/types.js").RequestResult<GetV1EventsResponses, GetV1EventsErrors, ThrowOnError, "fields">;
/**
 * Get contract events
 * Get contract events
 */
export declare const getV1EventsByContractAddress: <ThrowOnError extends boolean = false>(options: Options<GetV1EventsByContractAddressData, ThrowOnError>) => import("./client/types.js").RequestResult<GetV1EventsByContractAddressResponses, GetV1EventsByContractAddressErrors, ThrowOnError, "fields">;
/**
 * Get contract events with specific signature
 * Get specific contract events
 */
export declare const getV1EventsByContractAddressBySignature: <ThrowOnError extends boolean = false>(options: Options<GetV1EventsByContractAddressBySignatureData, ThrowOnError>) => import("./client/types.js").RequestResult<GetV1EventsByContractAddressBySignatureResponses, GetV1EventsByContractAddressBySignatureErrors, ThrowOnError, "fields">;
/**
 * Get transactions
 * Get transactions
 */
export declare const getV1Transactions: <ThrowOnError extends boolean = false>(options?: Options<GetV1TransactionsData, ThrowOnError>) => import("./client/types.js").RequestResult<GetV1TransactionsResponses, GetV1TransactionsErrors, ThrowOnError, "fields">;
/**
 * Get contract transactions
 * Get contract transactions
 */
export declare const getV1TransactionsByContractAddress: <ThrowOnError extends boolean = false>(options: Options<GetV1TransactionsByContractAddressData, ThrowOnError>) => import("./client/types.js").RequestResult<GetV1TransactionsByContractAddressResponses, GetV1TransactionsByContractAddressErrors, ThrowOnError, "fields">;
/**
 * Get contract transactions with specific signature
 * Get specific contract transactions
 */
export declare const getV1TransactionsByContractAddressBySignature: <ThrowOnError extends boolean = false>(options: Options<GetV1TransactionsByContractAddressBySignatureData, ThrowOnError>) => import("./client/types.js").RequestResult<GetV1TransactionsByContractAddressBySignatureResponses, GetV1TransactionsByContractAddressBySignatureErrors, ThrowOnError, "fields">;
/**
 * Get token owners by contract
 * Get token owners for specific contract
 */
export declare const getV1TokensOwners: <ThrowOnError extends boolean = false>(options: Options<GetV1TokensOwnersData, ThrowOnError>) => import("./client/types.js").RequestResult<GetV1TokensOwnersResponses, GetV1TokensOwnersErrors, ThrowOnError, "fields">;
/**
 * Get token transfers by transaction
 * Get token transfers by transaction
 */
export declare const getV1TokensTransfersTransactionByTransactionHash: <ThrowOnError extends boolean = false>(options: Options<GetV1TokensTransfersTransactionByTransactionHashData, ThrowOnError>) => import("./client/types.js").RequestResult<GetV1TokensTransfersTransactionByTransactionHashResponses, GetV1TokensTransfersTransactionByTransactionHashErrors, ThrowOnError, "fields">;
/**
 * Get token transfers by contract
 * Get token transfers by contract
 */
export declare const getV1TokensTransfersByContractAddress: <ThrowOnError extends boolean = false>(options: Options<GetV1TokensTransfersByContractAddressData, ThrowOnError>) => import("./client/types.js").RequestResult<GetV1TokensTransfersByContractAddressResponses, GetV1TokensTransfersByContractAddressErrors, ThrowOnError, "fields">;
/**
 * Get token transfers
 * Get token transfers
 */
export declare const getV1TokensTransfers: <ThrowOnError extends boolean = false>(options?: Options<GetV1TokensTransfersData, ThrowOnError>) => import("./client/types.js").RequestResult<GetV1TokensTransfersResponses, GetV1TokensTransfersErrors, ThrowOnError, "fields">;
/**
 * Get ERC-20 balances by address
 * Get ERC-20 balances for a given address. [BEING DEPRECATED IN FAVOR OF /tokens]
 * @deprecated
 */
export declare const getV1TokensErc20ByOwnerAddress: <ThrowOnError extends boolean = false>(options: Options<GetV1TokensErc20ByOwnerAddressData, ThrowOnError>) => import("./client/types.js").RequestResult<GetV1TokensErc20ByOwnerAddressResponses, GetV1TokensErc20ByOwnerAddressErrors, ThrowOnError, "fields">;
/**
 * Get tokens
 * Query tokens
 */
export declare const getV1Tokens: <ThrowOnError extends boolean = false>(options: Options<GetV1TokensData, ThrowOnError>) => import("./client/types.js").RequestResult<GetV1TokensResponses, GetV1TokensErrors, ThrowOnError, "fields">;
/**
 * Get ERC-721 balances by address
 * Get ERC-721 (NFT) balances for a given address [BEING DEPRECATED IN FAVOR OF /nfts/balance]
 * @deprecated
 */
export declare const getV1TokensErc721ByOwnerAddress: <ThrowOnError extends boolean = false>(options: Options<GetV1TokensErc721ByOwnerAddressData, ThrowOnError>) => import("./client/types.js").RequestResult<GetV1TokensErc721ByOwnerAddressResponses, GetV1TokensErc721ByOwnerAddressErrors, ThrowOnError, "fields">;
/**
 * Get ERC-1155 balances by address
 * Get ERC-1155 (Multi Token) balances for a given address [BEING DEPRECATED IN FAVOR OF /nfts/balance]
 * @deprecated
 */
export declare const getV1TokensErc1155ByOwnerAddress: <ThrowOnError extends boolean = false>(options: Options<GetV1TokensErc1155ByOwnerAddressData, ThrowOnError>) => import("./client/types.js").RequestResult<GetV1TokensErc1155ByOwnerAddressResponses, GetV1TokensErc1155ByOwnerAddressErrors, ThrowOnError, "fields">;
/**
 * Get supported tokens for price data
 * Get supported tokens for price data
 */
export declare const getV1TokensPriceSupported: <ThrowOnError extends boolean = false>(options?: Options<GetV1TokensPriceSupportedData, ThrowOnError>) => import("./client/types.js").RequestResult<GetV1TokensPriceSupportedResponses, GetV1TokensPriceSupportedErrors, ThrowOnError, "fields">;
/**
 * Get token price
 * Get price in USD for given token(s)
 */
export declare const getV1TokensPrice: <ThrowOnError extends boolean = false>(options?: Options<GetV1TokensPriceData, ThrowOnError>) => import("./client/types.js").RequestResult<GetV1TokensPriceResponses, GetV1TokensPriceErrors, ThrowOnError, "fields">;
/**
 * Token lookup
 * Look up a fungible token by symbol
 */
export declare const getV1TokensLookup: <ThrowOnError extends boolean = false>(options: Options<GetV1TokensLookupData, ThrowOnError>) => import("./client/types.js").RequestResult<GetV1TokensLookupResponses, GetV1TokensLookupErrors, ThrowOnError, "fields">;
/**
 * Resolve
 * Resolve
 */
export declare const getV1ResolveByInput: <ThrowOnError extends boolean = false>(options: Options<GetV1ResolveByInputData, ThrowOnError>) => import("./client/types.js").RequestResult<GetV1ResolveByInputResponses, GetV1ResolveByInputErrors, ThrowOnError, "fields">;
/**
 * Get blocks
 * Get blocks
 */
export declare const getV1Blocks: <ThrowOnError extends boolean = false>(options?: Options<GetV1BlocksData, ThrowOnError>) => import("./client/types.js").RequestResult<GetV1BlocksResponses, GetV1BlocksErrors, ThrowOnError, "fields">;
/**
 * Get contract ABI​
 * Get contract ABI​
 */
export declare const getV1ContractsAbiByContractAddress: <ThrowOnError extends boolean = false>(options: Options<GetV1ContractsAbiByContractAddressData, ThrowOnError>) => import("./client/types.js").RequestResult<GetV1ContractsAbiByContractAddressResponses, GetV1ContractsAbiByContractAddressErrors, ThrowOnError, "fields">;
/**
 * Get contract metadata​
 * Get contract metadata​
 */
export declare const getV1ContractsMetadataByContractAddress: <ThrowOnError extends boolean = false>(options: Options<GetV1ContractsMetadataByContractAddressData, ThrowOnError>) => import("./client/types.js").RequestResult<GetV1ContractsMetadataByContractAddressResponses, GetV1ContractsMetadataByContractAddressErrors, ThrowOnError, "fields">;
/**
 * Decode logs and transactions​
 * Decode logs and transactions​
 */
export declare const postV1DecodeByContractAddress: <ThrowOnError extends boolean = false>(options: Options<PostV1DecodeByContractAddressData, ThrowOnError>) => import("./client/types.js").RequestResult<PostV1DecodeByContractAddressResponses, PostV1DecodeByContractAddressErrors, ThrowOnError, "fields">;
/**
 * Get NFT balances by address
 * Get NFT balances for a given address
 */
export declare const getV1NftsBalanceByOwnerAddress: <ThrowOnError extends boolean = false>(options: Options<GetV1NftsBalanceByOwnerAddressData, ThrowOnError>) => import("./client/types.js").RequestResult<GetV1NftsBalanceByOwnerAddressResponses, GetV1NftsBalanceByOwnerAddressErrors, ThrowOnError, "fields">;
/**
 * Get collection
 * Retrieve metadata about a collection
 */
export declare const getV1NftsCollectionsByContractAddress: <ThrowOnError extends boolean = false>(options: Options<GetV1NftsCollectionsByContractAddressData, ThrowOnError>) => import("./client/types.js").RequestResult<GetV1NftsCollectionsByContractAddressResponses, GetV1NftsCollectionsByContractAddressErrors, ThrowOnError, "fields">;
/**
 * Get NFTs
 * Get NFTs
 */
export declare const getV1Nfts: <ThrowOnError extends boolean = false>(options: Options<GetV1NftsData, ThrowOnError>) => import("./client/types.js").RequestResult<GetV1NftsResponses, GetV1NftsErrors, ThrowOnError, "fields">;
/**
 * Get NFT owners by contract
 * Get NFT owners by contract
 */
export declare const getV1NftsOwnersByContractAddress: <ThrowOnError extends boolean = false>(options: Options<GetV1NftsOwnersByContractAddressData, ThrowOnError>) => import("./client/types.js").RequestResult<GetV1NftsOwnersByContractAddressResponses, GetV1NftsOwnersByContractAddressErrors, ThrowOnError, "fields">;
/**
 * Get NFT owners by token
 * Get NFT owners by token
 */
export declare const getV1NftsOwnersByContractAddressByTokenId: <ThrowOnError extends boolean = false>(options: Options<GetV1NftsOwnersByContractAddressByTokenIdData, ThrowOnError>) => import("./client/types.js").RequestResult<GetV1NftsOwnersByContractAddressByTokenIdResponses, GetV1NftsOwnersByContractAddressByTokenIdErrors, ThrowOnError, "fields">;
/**
 * Get NFT transfers
 * Get NFT transfers
 */
export declare const getV1NftsTransfers: <ThrowOnError extends boolean = false>(options?: Options<GetV1NftsTransfersData, ThrowOnError>) => import("./client/types.js").RequestResult<GetV1NftsTransfersResponses, GetV1NftsTransfersErrors, ThrowOnError, "fields">;
/**
 * Get NFT transfers by transaction
 * Get NFT transfers by transaction
 */
export declare const getV1NftsTransfersTransactionByTransactionHash: <ThrowOnError extends boolean = false>(options: Options<GetV1NftsTransfersTransactionByTransactionHashData, ThrowOnError>) => import("./client/types.js").RequestResult<GetV1NftsTransfersTransactionByTransactionHashResponses, GetV1NftsTransfersTransactionByTransactionHashErrors, ThrowOnError, "fields">;
/**
 * Get NFT transfers by contract
 * Get NFT transfers by contract
 */
export declare const getV1NftsTransfersByContractAddress: <ThrowOnError extends boolean = false>(options: Options<GetV1NftsTransfersByContractAddressData, ThrowOnError>) => import("./client/types.js").RequestResult<GetV1NftsTransfersByContractAddressResponses, GetV1NftsTransfersByContractAddressErrors, ThrowOnError, "fields">;
/**
 * Get NFTs by contract
 * Get NFTs by contract
 */
export declare const getV1NftsByContractAddress: <ThrowOnError extends boolean = false>(options: Options<GetV1NftsByContractAddressData, ThrowOnError>) => import("./client/types.js").RequestResult<GetV1NftsByContractAddressResponses, GetV1NftsByContractAddressErrors, ThrowOnError, "fields">;
/**
 * Get NFT transfers by token
 * Get NFT transfers by token
 */
export declare const getV1NftsTransfersByContractAddressByTokenId: <ThrowOnError extends boolean = false>(options: Options<GetV1NftsTransfersByContractAddressByTokenIdData, ThrowOnError>) => import("./client/types.js").RequestResult<GetV1NftsTransfersByContractAddressByTokenIdResponses, GetV1NftsTransfersByContractAddressByTokenIdErrors, ThrowOnError, "fields">;
/**
 * Get NFT by token ID
 * Get NFT by token ID
 */
export declare const getV1NftsByContractAddressByTokenId: <ThrowOnError extends boolean = false>(options: Options<GetV1NftsByContractAddressByTokenIdData, ThrowOnError>) => import("./client/types.js").RequestResult<GetV1NftsByContractAddressByTokenIdResponses, GetV1NftsByContractAddressByTokenIdErrors, ThrowOnError, "fields">;
/**
 * Force refresh collection metadata
 * Force refresh collection metadata for the specified contract (across multiple chains if provided)
 */
export declare const getV1NftsMetadataRefreshByContractAddress: <ThrowOnError extends boolean = false>(options: Options<GetV1NftsMetadataRefreshByContractAddressData, ThrowOnError>) => import("./client/types.js").RequestResult<GetV1NftsMetadataRefreshByContractAddressResponses, GetV1NftsMetadataRefreshByContractAddressErrors, ThrowOnError, "fields">;
/**
 * Force refresh token metadata
 * Force refresh token metadata for the specified contract and token ID (across multiple chains if provided)
 */
export declare const getV1NftsMetadataRefreshByContractAddressByTokenId: <ThrowOnError extends boolean = false>(options: Options<GetV1NftsMetadataRefreshByContractAddressByTokenIdData, ThrowOnError>) => import("./client/types.js").RequestResult<GetV1NftsMetadataRefreshByContractAddressByTokenIdResponses, GetV1NftsMetadataRefreshByContractAddressByTokenIdErrors, ThrowOnError, "fields">;
/**
 * Get wallet transactions
 * Get incoming and outgoing transactions for a wallet
 */
export declare const getV1WalletsByWalletAddressTransactions: <ThrowOnError extends boolean = false>(options: Options<GetV1WalletsByWalletAddressTransactionsData, ThrowOnError>) => import("./client/types.js").RequestResult<GetV1WalletsByWalletAddressTransactionsResponses, GetV1WalletsByWalletAddressTransactionsErrors, ThrowOnError, "fields">;
/**
 * Validate webhook filters
 * Webhook filters are complex and unique to Insight. Since webhooks are not created through this service anymore, this functionality to validate them is now exposed through this endpoint.
 */
export declare const postServiceWebhooksFiltersValidate: <ThrowOnError extends boolean = false>(options?: Options<PostServiceWebhooksFiltersValidateData, ThrowOnError>) => import("./client/types.js").RequestResult<PostServiceWebhooksFiltersValidateResponses, PostServiceWebhooksFiltersValidateErrors, ThrowOnError, "fields">;
//# sourceMappingURL=sdk.gen.d.ts.map