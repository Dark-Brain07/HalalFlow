import { distribute } from "../extensions/tokens/__generated__/ERC20Entrypoint/write/distribute.js";
import { toUnits } from "../utils/units.js";
import { getDeployedEntrypointERC20 } from "./get-entrypoint-erc20.js";
export async function distributeToken(options) {
    const entrypoint = await getDeployedEntrypointERC20(options);
    if (!entrypoint) {
        throw new Error(`Entrypoint not found on chain: ${options.chain.id}`);
    }
    return distribute({
        asset: options.tokenAddress,
        contents: options.contents.map((a) => {
            return { ...a, amount: toUnits(a.amount.toString(), 18) };
        }),
        contract: entrypoint,
    });
}
//# sourceMappingURL=distribute-token.js.map