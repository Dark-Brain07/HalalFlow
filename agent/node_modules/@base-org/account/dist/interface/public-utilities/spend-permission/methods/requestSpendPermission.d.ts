import { SpendPermission } from '../../../../core/rpc/coinbase_fetchSpendPermissions.js';
import { ProviderInterface } from '../../../../core/provider/interface.js';
export type WalletSignCapabilities = {
    spendPermission?: {
        requireBalance?: boolean;
    };
};
export type RequestSpendPermissionType = {
    account: string;
    spender: string;
    token: string;
    chainId: number;
    allowance: bigint;
    periodInDays: number;
    start?: Date;
    end?: Date;
    salt?: string;
    extraData?: string;
    capabilities?: WalletSignCapabilities;
};
export declare const requestSpendPermission: ((request: RequestSpendPermissionType & {
    provider: ProviderInterface;
}) => Promise<SpendPermission>) | ((request: RequestSpendPermissionType & {
    provider: ProviderInterface;
}) => Promise<SpendPermission>);
//# sourceMappingURL=requestSpendPermission.d.ts.map