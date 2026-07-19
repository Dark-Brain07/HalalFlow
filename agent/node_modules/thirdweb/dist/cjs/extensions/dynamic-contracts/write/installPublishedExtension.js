"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.installPublishedExtension = installPublishedExtension;
const resolve_abi_js_1 = require("../../../contract/actions/resolve-abi.js");
const bootstrap_js_1 = require("../../../contract/deployment/utils/bootstrap.js");
const get_required_transactions_js_1 = require("../../../extensions/prebuilts/get-required-transactions.js");
const addExtension_js_1 = require("../__generated__/IExtensionManager/write/addExtension.js");
/**
 * Install a published extension on a dynamic contract
 * @param options - The options for installing a published extension
 * @returns A prepared transaction to send
 * @example
 * ```ts
 * import { installPublishedExtension } from "thirdweb/dynamic-contracts";
 * const transaction = installPublishedExtension({
 *  client,
 *  chain,
 *  account,
 *  contract,
 *  extensionName: "MyExtension",
 *  publisherAddress: "0x...",
 * });
 * await sendTransaction({ transaction, account });
 * ```
 */
function installPublishedExtension(options) {
    const { account, contract, extensionName, constructorParams, publisher, version, } = options;
    return (0, addExtension_js_1.addExtension)({
        asyncParams: async () => {
            const deployedExtension = await (0, bootstrap_js_1.getOrDeployInfraForPublishedContract)({
                account,
                chain: contract.chain,
                client: contract.client,
                constructorParams: constructorParams ||
                    (await (0, get_required_transactions_js_1.getAllDefaultConstructorParamsForImplementation)({
                        chain: contract.chain,
                        client: contract.client,
                        contractId: extensionName,
                    })),
                contractId: extensionName,
                publisher,
                version,
            });
            const abi = await (0, resolve_abi_js_1.resolveContractAbi)(deployedExtension.implementationContract);
            const functions = (0, get_required_transactions_js_1.generateExtensionFunctionsFromAbi)(abi);
            return {
                extension: {
                    functions,
                    metadata: {
                        implementation: deployedExtension.implementationContract.address,
                        metadataURI: "",
                        name: extensionName,
                    },
                },
            };
        },
        contract,
    });
}
//# sourceMappingURL=installPublishedExtension.js.map