import type { Chain } from "../../../../chains/types.js";
import type { ThirdwebClient } from "../../../../client/client.js";
import type { PreparedSendCall } from "../../../eip5792/send-calls.js";
import type { GetCallsStatusRawResponse, GetCallsStatusResponse } from "../../../eip5792/types.js";
import type { Account } from "../../../interfaces/wallet.js";
/**
 * @internal
 */
export declare function inAppWalletSendCalls(args: {
    account: Account;
    calls: PreparedSendCall[];
    chain: Chain;
}): Promise<string>;
/**
 * @internal
 */
export declare function inAppWalletGetCallsStatus(args: {
    chain: Chain;
    client: ThirdwebClient;
    id: string;
}): Promise<GetCallsStatusResponse>;
/**
 * @internal
 */
export declare function inAppWalletGetCallsStatusRaw(args: {
    chain: Chain;
    client: ThirdwebClient;
    id: string;
}): Promise<GetCallsStatusRawResponse>;
//# sourceMappingURL=in-app-wallet-calls.d.ts.map