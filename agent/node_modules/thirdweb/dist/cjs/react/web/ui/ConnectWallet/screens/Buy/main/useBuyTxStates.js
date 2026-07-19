"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTransactionCostAndData = useTransactionCostAndData;
const react_query_1 = require("@tanstack/react-query");
const react_1 = require("react");
const utils_js_1 = require("../../../../../../../chains/utils.js");
const addresses_js_1 = require("../../../../../../../constants/addresses.js");
const contract_js_1 = require("../../../../../../../contract/contract.js");
const getCurrencyMetadata_js_1 = require("../../../../../../../extensions/erc20/read/getCurrencyMetadata.js");
const encode_js_1 = require("../../../../../../../transaction/actions/encode.js");
const utils_js_2 = require("../../../../../../../transaction/utils.js");
const resolve_promised_value_js_1 = require("../../../../../../../utils/promise/resolve-promised-value.js");
const getWalletBalance_js_1 = require("../../../../../../../wallets/utils/getWalletBalance.js");
function useTransactionCostAndData(args) {
    const { transaction, account, supportedDestinations } = args;
    // Compute query key of the transaction first
    const [txQueryKey, setTxQueryKey] = (0, react_1.useState)();
    (0, react_1.useEffect)(() => {
        Promise.all([
            (0, resolve_promised_value_js_1.resolvePromisedValue)(transaction.value),
            (0, resolve_promised_value_js_1.resolvePromisedValue)(transaction.erc20Value),
            (0, resolve_promised_value_js_1.resolvePromisedValue)(transaction.to),
            (0, encode_js_1.encode)(transaction),
        ]).then(([value, erc20Value, to, data]) => {
            setTxQueryKey({
                data,
                erc20Currency: erc20Value?.tokenAddress,
                erc20Value: erc20Value?.amountWei?.toString(),
                to,
                value: value?.toString(),
            });
        });
    }, [transaction]);
    return (0, react_query_1.useQuery)({
        enabled: !!transaction && !!txQueryKey,
        queryFn: async () => {
            if (!account) {
                throw new Error("No payer account found");
            }
            const erc20Value = await (0, resolve_promised_value_js_1.resolvePromisedValue)(transaction.erc20Value);
            if (erc20Value) {
                const [tokenBalance, tokenMeta, gasCostWei, chainMetadata] = await Promise.all([
                    (0, getWalletBalance_js_1.getWalletBalance)({
                        address: account.address,
                        chain: transaction.chain,
                        client: transaction.client,
                        tokenAddress: erc20Value.tokenAddress,
                    }),
                    (0, getCurrencyMetadata_js_1.getCurrencyMetadata)({
                        contract: (0, contract_js_1.getContract)({
                            address: erc20Value.tokenAddress,
                            chain: transaction.chain,
                            client: transaction.client,
                        }),
                    }),
                    (0, utils_js_2.getTransactionGasCost)(transaction, account?.address),
                    (0, utils_js_1.getChainMetadata)(transaction.chain),
                ]);
                const transactionValueWei = erc20Value.amountWei;
                const walletBalance = tokenBalance;
                const currency = {
                    address: erc20Value.tokenAddress,
                    icon: supportedDestinations
                        .find((c) => c.chain.id === transaction.chain.id)
                        ?.tokens.find((t) => t.address.toLowerCase() ===
                        erc20Value.tokenAddress.toLowerCase())?.icon,
                    name: tokenMeta.name,
                    symbol: tokenMeta.symbol,
                };
                return {
                    chainMetadata,
                    decimals: tokenMeta.decimals,
                    gasCostWei,
                    token: currency,
                    transactionValueWei,
                    walletBalance,
                };
            }
            const [nativeWalletBalance, chainMetadata, gasCostWei] = await Promise.all([
                (0, getWalletBalance_js_1.getWalletBalance)({
                    address: account.address,
                    chain: transaction.chain,
                    client: transaction.client,
                }),
                (0, utils_js_1.getChainMetadata)(transaction.chain),
                (0, utils_js_2.getTransactionGasCost)(transaction, account?.address),
            ]);
            const walletBalance = nativeWalletBalance;
            const transactionValueWei = (await (0, resolve_promised_value_js_1.resolvePromisedValue)(transaction.value)) || 0n;
            return {
                chainMetadata,
                decimals: 18,
                gasCostWei,
                token: {
                    address: addresses_js_1.NATIVE_TOKEN_ADDRESS,
                    icon: chainMetadata.icon?.url,
                    name: chainMetadata.nativeCurrency.name,
                    symbol: chainMetadata.nativeCurrency.symbol,
                },
                transactionValueWei,
                walletBalance,
            };
        },
        queryKey: [
            "transaction-cost",
            transaction.chain.id,
            account?.address,
            txQueryKey,
        ],
        refetchInterval: args.refetchIntervalMs || 30_000,
    });
}
//# sourceMappingURL=useBuyTxStates.js.map