import type { ThirdwebClient } from "../client/client.js";
export type CreateServerWalletArgs = {
    client: ThirdwebClient;
    label: string;
};
/**
 * Create a new server wallet.
 * @param params - The parameters for the server wallet.
 * @param params.client - The thirdweb client to use.
 * @param params.label - The label for the server wallet.
 * @returns The server wallet signer address and the predicted smart account address.
 * @engine
 * @example
 * ```ts
 * import { Engine } from "thirdweb";
 *
 * const serverWallet = await Engine.createServerWallet({
 *   client,
 *   label: "My Server Wallet",
 * });
 * console.log(serverWallet.address);
 * console.log(serverWallet.smartAccountAddress);
 * ```
 */
export declare function createServerWallet(params: CreateServerWalletArgs): Promise<{
    address: string;
    label?: string;
    createdAt: string;
    smartAccountAddress?: string;
}>;
//# sourceMappingURL=create-server-wallet.d.ts.map