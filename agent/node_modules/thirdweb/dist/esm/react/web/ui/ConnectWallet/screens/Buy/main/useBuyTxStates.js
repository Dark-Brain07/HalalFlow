import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getChainMetadata } from "../../../../../../../chains/utils.js";
import { NATIVE_TOKEN_ADDRESS } from "../../../../../../../constants/addresses.js";
import { getContract } from "../../../../../../../contract/contract.js";
import { getCurrencyMetadata } from "../../../../../../../extensions/erc20/read/getCurrencyMetadata.js";
import { encode } from "../../../../../../../transaction/actions/encode.js";
import { getTransactionGasCost } from "../../../../../../../transaction/utils.js";
import { resolvePromisedValue } from "../../../../../../../utils/promise/resolve-promised-value.js";
import { getWalletBalance } from "../../../../../../../wallets/utils/getWalletBalance.js";
export function useTransactionCostAndData(args) {
    const { transaction, account, supportedDestinations } = args;
    // Compute query key of the transaction first
    const [txQueryKey, setTxQueryKey] = useState();
    useEffect(() => {
        Promise.all([
            resolvePromisedValue(transaction.value),
            resolvePromisedValue(transaction.erc20Value),
            resolvePromisedValue(transaction.to),
            encode(transaction),
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
    return useQuery({
        enabled: !!transaction && !!txQueryKey,
        queryFn: async () => {
            if (!account) {
                throw new Error("No payer account found");
            }
            const erc20Value = await resolvePromisedValue(transaction.erc20Value);
            if (erc20Value) {
                const [tokenBalance, tokenMeta, gasCostWei, chainMetadata] = await Promise.all([
                    getWalletBalance({
                        address: account.address,
                        chain: transaction.chain,
                        client: transaction.client,
                        tokenAddress: erc20Value.tokenAddress,
                    }),
                    getCurrencyMetadata({
                        contract: getContract({
                            address: erc20Value.tokenAddress,
                            chain: transaction.chain,
                            client: transaction.client,
                        }),
                    }),
                    getTransactionGasCost(transaction, account?.address),
                    getChainMetadata(transaction.chain),
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
                getWalletBalance({
                    address: account.address,
                    chain: transaction.chain,
                    client: transaction.client,
                }),
                getChainMetadata(transaction.chain),
                getTransactionGasCost(transaction, account?.address),
            ]);
            const walletBalance = nativeWalletBalance;
            const transactionValueWei = (await resolvePromisedValue(transaction.value)) || 0n;
            return {
                chainMetadata,
                decimals: 18,
                gasCostWei,
                token: {
                    address: NATIVE_TOKEN_ADDRESS,
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