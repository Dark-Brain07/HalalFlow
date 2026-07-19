import type { ThirdwebClient } from "../client/client.js";
export type GetServerWalletsArgs = {
    client: ThirdwebClient;
    limit?: number;
    page?: number;
};
/**
 * List all server wallets.
 * @param params - The parameters for the server wallet.
 * @param params.client - The thirdweb client to use.
 * @returns an array of server wallets with their signer address and predicted smart account address.
 * @engine
 * @example
 * ```ts
 * import { Engine } from "thirdweb";
 *
 * const serverWallets = await Engine.getServerWallets({
 *   client,
 * });
 * console.log(serverWallets);
 * ```
 */
export declare function getServerWallets(params: GetServerWalletsArgs): Promise<{
    accounts: Array<{
        address: string;
        label?: string;
        createdAt: string;
        smartAccountAddress?: string;
    }>;
    pagination: {
        totalCount: number;
        page: number;
        limit: number;
    };
}>;
//# sourceMappingURL=list-server-wallets.d.ts.map