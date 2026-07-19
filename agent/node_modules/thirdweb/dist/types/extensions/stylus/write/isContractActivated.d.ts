import type { Chain } from "../../../chains/types.js";
import type { ThirdwebClient } from "../../../client/client.js";
export type IsContractActivatedOptions = {
    chain: Chain;
    client: ThirdwebClient;
    bytecode: `0x${string}`;
};
export declare function isContractActivated(options: IsContractActivatedOptions): Promise<boolean>;
//# sourceMappingURL=isContractActivated.d.ts.map