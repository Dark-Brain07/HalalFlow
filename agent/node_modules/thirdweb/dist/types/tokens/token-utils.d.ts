import { type Hex } from "viem";
import type { ThirdwebClient } from "../client/client.js";
import type { PoolConfig, TokenParams } from "./types.js";
export declare const SaltFlag: {
    /** Mix in msg.sender */
    readonly MIX_SENDER: 1;
    /** Mix in block.chainid */
    readonly MIX_CHAIN_ID: 2;
    /** Mix in block.number */
    readonly MIX_BLOCK_NUMBER: 4;
    /** Mix in contractInitData */
    readonly MIX_CONTRACT_INIT_DATA: 8;
    /** Mix in hookInitData */
    readonly MIX_HOOK_INIT_DATA: 16;
    /** Mix in creator address */
    readonly MIX_CREATOR: 32;
    /** Bypass mode – disable all transformations */
    readonly BYPASS: 128;
};
export type SaltFlagType = (typeof SaltFlag)[keyof typeof SaltFlag];
export declare function encodeInitParams(options: {
    client: ThirdwebClient;
    params: TokenParams;
    creator: string;
}): Promise<Hex>;
export declare function encodePoolConfig(poolConfig: PoolConfig): Hex;
export declare function generateSalt(salt: Hex | string, flags?: SaltFlagType): Hex;
//# sourceMappingURL=token-utils.d.ts.map