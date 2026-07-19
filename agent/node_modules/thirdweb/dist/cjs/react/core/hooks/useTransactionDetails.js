"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTransactionDetails = useTransactionDetails;
const react_query_1 = require("@tanstack/react-query");
const viem_1 = require("viem");
const addresses_js_1 = require("../../../constants/addresses.js");
const get_compiler_metadata_js_1 = require("../../../contract/actions/get-compiler-metadata.js");
const contract_js_1 = require("../../../contract/contract.js");
const decimals_js_1 = require("../../../extensions/erc20/read/decimals.js");
const get_token_js_1 = require("../../../pay/convert/get-token.js");
const encode_js_1 = require("../../../transaction/actions/encode.js");
const utils_js_1 = require("../../../transaction/utils.js");
const json_js_1 = require("../../../utils/json.js");
const resolve_promised_value_js_1 = require("../../../utils/promise/resolve-promised-value.js");
const units_js_1 = require("../../../utils/units.js");
const is_smart_wallet_js_1 = require("../../../wallets/smart/is-smart-wallet.js");
const formatTokenBalance_js_1 = require("../../web/ui/ConnectWallet/screens/formatTokenBalance.js");
const useChainQuery_js_1 = require("./others/useChainQuery.js");
/**
 * Hook to fetch comprehensive transaction details including contract metadata,
 * function information, cost calculations, and gas estimates.
 */
function useTransactionDetails({ transaction, client, wallet, }) {
    const chainMetadata = (0, useChainQuery_js_1.useChainMetadata)(transaction.chain);
    const hasSponsoredTransactions = (0, is_smart_wallet_js_1.hasSponsoredTransactionsEnabled)(wallet);
    return (0, react_query_1.useQuery)({
        enabled: !!transaction.to && !!chainMetadata.data,
        queryFn: async () => {
            const contract = (0, contract_js_1.getContract)({
                address: transaction.to,
                chain: transaction.chain,
                client,
            });
            const [contractMetadata, value, erc20Value, transactionData] = await Promise.all([
                (0, get_compiler_metadata_js_1.getCompilerMetadata)(contract).catch(() => null),
                (0, resolve_promised_value_js_1.resolvePromisedValue)(transaction.value),
                (0, resolve_promised_value_js_1.resolvePromisedValue)(transaction.erc20Value),
                (0, encode_js_1.encode)(transaction).catch(() => "0x"),
            ]);
            const [tokenInfo, gasCostWei] = await Promise.all([
                (0, get_token_js_1.getToken)(client, erc20Value?.tokenAddress || addresses_js_1.NATIVE_TOKEN_ADDRESS, transaction.chain.id),
                hasSponsoredTransactions
                    ? 0n
                    : (0, utils_js_1.getTransactionGasCost)(transaction).catch(() => null),
            ]);
            // Process function info from ABI if available
            let functionInfo = {
                description: undefined,
                functionName: "Contract Call",
                selector: "0x",
            };
            if (contractMetadata?.abi && transactionData.length >= 10) {
                try {
                    const selector = transactionData.slice(0, 10);
                    const abi = contractMetadata.abi;
                    // Find matching function in ABI
                    const abiItems = Array.isArray(abi) ? abi : [];
                    const functions = abiItems
                        .filter((item) => item &&
                        typeof item === "object" &&
                        "type" in item &&
                        item.type === "function")
                        .map((item) => item);
                    const matchingFunction = functions.find((fn) => {
                        return (0, viem_1.toFunctionSelector)(fn) === selector;
                    });
                    if (matchingFunction) {
                        functionInfo = {
                            description: undefined,
                            functionName: matchingFunction.name,
                            selector, // Skip devdoc for now
                        };
                    }
                }
                catch {
                    // Keep default values
                }
            }
            const resolveDecimals = async () => {
                if (tokenInfo) {
                    return tokenInfo.decimals;
                }
                if (erc20Value) {
                    return (0, decimals_js_1.decimals)({
                        contract: (0, contract_js_1.getContract)({
                            address: erc20Value.tokenAddress,
                            chain: transaction.chain,
                            client,
                        }),
                    });
                }
                return 18;
            };
            const decimal = await resolveDecimals();
            const costWei = erc20Value ? erc20Value.amountWei : value || 0n;
            const nativeTokenSymbol = chainMetadata.data?.nativeCurrency?.symbol || "ETH";
            const tokenSymbol = tokenInfo?.symbol || nativeTokenSymbol;
            const totalCostWei = erc20Value &&
                erc20Value.tokenAddress.toLowerCase() !== addresses_js_1.NATIVE_TOKEN_ADDRESS
                ? erc20Value.amountWei
                : (value || 0n) + (gasCostWei || 0n);
            const totalCost = (0, units_js_1.toTokens)(totalCostWei, decimal);
            return {
                contractMetadata,
                costWei,
                functionInfo,
                gasCostDisplay: gasCostWei
                    ? `${(0, formatTokenBalance_js_1.formatTokenAmount)(gasCostWei, 18)} ${nativeTokenSymbol}`
                    : null,
                gasCostWei,
                tokenInfo,
                totalCost,
                totalCostWei,
                txCostDisplay: `${(0, formatTokenBalance_js_1.formatTokenAmount)(costWei, decimal)} ${tokenSymbol}`,
            };
        },
        queryKey: [
            "transaction-details",
            (0, json_js_1.stringify)(transaction),
            hasSponsoredTransactions,
        ],
    });
}
//# sourceMappingURL=useTransactionDetails.js.map