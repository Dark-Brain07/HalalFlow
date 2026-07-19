import { getContract, } from "../../../contract/contract.js";
import { resolveImplementation } from "../../../utils/bytecode/resolveImplementation.js";
import { uninstallModule } from "../__generated__/IModularCore/write/uninstallModule.js";
/**
 * Uninstall an module by proxy
 * @param options - The options for uninstalling an module by proxy
 * @returns A prepared transaction to send
 * @modules
 * @example
 * ```ts
 * import { uninstallModuleByProxy } from "thirdweb/modules";
 * const transaction = uninstallModuleByProxy({
 *  client,
 *  chain,
 *  contract,
 *  moduleProxyAddress: "0x...",
 * });
 * await sendTransaction({ transaction, account });
 * ```
 */
export function uninstallModuleByProxy(options) {
    const { client, chain, contract, moduleProxyAddress, moduleData } = options;
    return uninstallModule({
        asyncParams: async () => {
            const moduleImplementation = await resolveImplementation(getContract({
                address: moduleProxyAddress,
                chain,
                client,
            }));
            return {
                data: moduleData || "0x",
                moduleContract: moduleImplementation.address,
            };
        },
        contract,
    });
}
//# sourceMappingURL=uninstallModuleByProxy.js.map