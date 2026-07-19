import { track } from "./index.js";
/**
 * @internal
 */
export async function trackConnect(args) {
    const { client, ecosystem, walletType, walletAddress, chainId } = args;
    return track({
        client,
        data: {
            action: "connect",
            chainId,
            source: "connectWallet",
            walletAddress,
            walletType,
        },
        ecosystem,
    });
}
//# sourceMappingURL=connect.js.map