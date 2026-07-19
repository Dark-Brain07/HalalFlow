"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.installPublishedModule = installPublishedModule;
const bootstrap_js_1 = require("../../../contract/deployment/utils/bootstrap.js");
const deploy_published_js_1 = require("../../prebuilts/deploy-published.js");
const installModule_js_1 = require("../__generated__/IModularCore/write/installModule.js");
/**
 * Install a published module on a modular contract
 * @param options - The options for installing a published module
 * @returns A prepared transaction to send
 * @modules
 * @example
 * ```ts
 * import { installPublishedModule } from "thirdweb/modules";
 * const transaction = installPublishedModule({
 *  client,
 *  chain,
 *  account,
 *  contract,
 *  moduleName: "MyModule",
 *  publisherAddress: "0x...",
 * });
 * await sendTransaction({ transaction, account });
 * ```
 */
function installPublishedModule(options) {
    const { account, contract, moduleName, constructorParams, publisher, moduleData, nonce, } = options;
    return (0, installModule_js_1.installModule)({
        asyncParams: async () => {
            let implementationAddress;
            if (moduleName.toLowerCase().includes("stylus")) {
                // TODO: switch to deterministic / create2 when available
                implementationAddress = await (0, deploy_published_js_1.deployPublishedContract)({
                    account,
                    chain: contract.chain,
                    client: contract.client,
                    contractParams: constructorParams,
                    contractId: moduleName,
                    publisher,
                });
            }
            else {
                const deployedModule = await (0, bootstrap_js_1.getOrDeployInfraForPublishedContract)({
                    account,
                    chain: contract.chain,
                    client: contract.client,
                    constructorParams,
                    contractId: moduleName,
                    publisher,
                });
                implementationAddress = deployedModule.implementationContract
                    .address;
            }
            return {
                data: moduleData || "0x",
                moduleContract: implementationAddress,
            };
        },
        contract,
        overrides: {
            nonce,
        },
    });
}
//# sourceMappingURL=installPublishedModule.js.map