import { optimism } from "../../../chains/chain-definitions/optimism.js";
import { getContract, } from "../../../contract/contract.js";
import { STORAGE_REGISTRY_ADDRESS } from "../constants.js";
/**
 * Retrieves the StorageRegistry contract.
 * @param options - The thirdweb client and an optional custom chain.
 * @returns The StorageRegistry contract instance.
 * @extension FARCASTER
 * @example
 * ```ts
 * import { getStorageRegistry } from "thirdweb/extensions/farcaster";
 *
 * const storageRegistry = await getStorageRegistry({
 *  client,
 * });
 * ```
 */
export function getStorageRegistry(options) {
    return getContract({
        address: STORAGE_REGISTRY_ADDRESS,
        chain: options.chain ?? optimism,
        client: options.client,
    });
}
//# sourceMappingURL=getStorageRegistry.js.map