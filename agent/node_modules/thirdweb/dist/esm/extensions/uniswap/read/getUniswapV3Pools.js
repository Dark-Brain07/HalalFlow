import { ZERO_ADDRESS } from "../../../constants/addresses.js";
const UniswapFee = {
    HIGH: 10000,
    LOW: 500,
    LOWEST: 100,
    MEDIUM: 3000,
};
/**
 * Finds the Uniswap V3 pools for the two tokens.
 * @param options - The token pair to find any pools for any Uniswap contract that implements getPool.
 * @returns The pools' addresses and fees.
 * @extension UNISWAP
 * @example
 * ```ts
 * import { getUniswapV3Pool } from "thirdweb/extensions/uniswap";
 * const pools = await getUniswapV3Pool({
 *  tokenA: "0x...",
 *  tokenB: "0x...",
 *  contract: factoryContract
 * });
 * ```
 */
export async function getUniswapV3Pool(options) {
    const { getPool } = await import("../__generated__/IUniswapV3Factory/read/getPool.js");
    const promises = Object.values(UniswapFee)
        .filter((value) => typeof value === "number")
        .map(async (fee) => {
        const poolAddress = await getPool({
            contract: options.contract,
            fee,
            tokenA: options.tokenA,
            tokenB: options.tokenB,
        });
        return {
            poolAddress,
            poolFee: fee,
        };
    });
    const results = await Promise.all(promises);
    const validPools = results.filter((result) => result.poolAddress && result.poolAddress !== ZERO_ADDRESS);
    return validPools;
}
//# sourceMappingURL=getUniswapV3Pools.js.map