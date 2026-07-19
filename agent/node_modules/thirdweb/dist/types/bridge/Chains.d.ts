import type { ThirdwebClient } from "../client/client.js";
import type { Chain } from "./types/Chain.js";
/**
 * Retrieves supported Bridge chains.
 *
 * @example
 * ```typescript
 * import { Bridge } from "thirdweb";
 *
 * const chains = await Bridge.chains({
 *   client: thirdwebClient,
 * });
 * ```
 *
 * Returned chains might look something like:
 * ```typescript
 * [
 *   {
 *     chainId: 1,
 *     name: "Ethereum",
 *     icon: "https://assets.thirdweb.com/chains/1.png",
 *     nativeCurrency: {
 *       name: "Ether",
 *       symbol: "ETH",
 *       decimals: 18
 *     }
 *   },
 *   {
 *     chainId: 137,
 *     name: "Polygon",
 *     icon: "https://assets.thirdweb.com/chains/137.png",
 *     nativeCurrency: {
 *       name: "MATIC",
 *       symbol: "MATIC",
 *       decimals: 18
 *     }
 *   }
 * ]
 * ```
 *
 * @param options - The options for fetching chains.
 * @param options.client - Your thirdweb client.
 *
 * @returns A promise that resolves to an array of chains.
 *
 * @throws Will throw an error if there is an issue fetching the chains.
 * @bridge
 * @beta
 */
export declare function chains(options: chains.Options): Promise<chains.Result>;
/**
 * Namespace containing types for the chains function.
 * @namespace chains
 * @bridge
 */
export declare namespace chains {
    /**
     * Options for fetching supported bridge chains.
     * @interface Options
     * @bridge
     */
    type Options = {
        /** Your thirdweb client */
        client: ThirdwebClient;
        /**
         * If true, returns only testnet chains. Defaults to false.
         */
        testnet?: boolean;
    } & ({
        /**
         * setting type=origin: Returns all chains that can be used as origin,
         * setting type=destination: Returns all chains that can be used as destination
         */
        type?: "origin" | "destination";
    } | {
        /**
         * setting originChainId=X: Returns destination chains reachable from chain X
         */
        originChainId?: number;
    } | {
        /**
         * setting destinationChainId=X: Returns origin chains reachable from chain X
         */
        destinationChainId?: number;
    });
    /**
     * Result returned from fetching supported bridge chains.
     * Contains an array of supported chains.
     * @interface Result
     * @bridge
     */
    type Result = Chain[];
}
//# sourceMappingURL=Chains.d.ts.map