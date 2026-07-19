import type { AuthOption } from "../types.js";
import type { EcosystemWalletId } from "../wallet-types.js";
type EcosystemOptions = {
    name: string;
    imageUrl?: string;
    slug: string;
    homepage?: string;
    authOptions: AuthOption[];
    smartAccountOptions: SmartAccountOptions;
};
type SmartAccountOptions = {
    defaultChainId: number;
    sponsorGas: boolean;
    accountFactoryAddress?: string;
    executionMode?: "EIP4337" | "EIP7702";
};
/**
 * Retrieves the specified auth options for a given ecosystem wallet, if any.
 * @param walletId The ecosystem wallet ID.
 * @returns {AuthOption[] | undefined} The auth options for the ecosystem wallet.
 * @internal
 */
export declare function getEcosystemInfo(walletId: EcosystemWalletId): Promise<EcosystemOptions>;
export {};
//# sourceMappingURL=get-ecosystem-wallet-auth-options.d.ts.map