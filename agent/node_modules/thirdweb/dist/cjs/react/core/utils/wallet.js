"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEnsName = useEnsName;
exports.useEnsAvatar = useEnsAvatar;
exports.useConnectedWalletDetails = useConnectedWalletDetails;
exports.useWalletInfo = useWalletInfo;
exports.useWalletImage = useWalletImage;
const react_query_1 = require("@tanstack/react-query");
const ethereum_js_1 = require("../../../chains/chain-definitions/ethereum.js");
const resolve_avatar_js_1 = require("../../../extensions/ens/resolve-avatar.js");
const resolve_name_js_1 = require("../../../extensions/ens/resolve-name.js");
const address_js_1 = require("../../../utils/address.js");
const avatar_js_1 = require("../../../utils/ens/avatar.js");
const getWalletInfo_js_1 = require("../../../wallets/__generated__/getWalletInfo.js");
const useWalletBalance_js_1 = require("../hooks/others/useWalletBalance.js");
const useSocialProfiles_js_1 = require("../social/useSocialProfiles.js");
/**
 * Get the ENS name and avatar for an address
 * @param options - the client and address to get the ENS name and avatar for
 * @returns - a query object that resolves to the ENS name
 * @example
 * ```tsx
 * import { useEnsName } from "thirdweb/react";
 *
 * const { data: ensName } = useEnsName({
 *  client,
 *  address: "0x1234...",
 * });
 * ```
 * @extension ENS
 */
function useEnsName(options) {
    const { client, address } = options;
    return (0, react_query_1.useQuery)({
        enabled: !!address,
        queryFn: () => (0, resolve_name_js_1.resolveName)({
            address: address || "",
            client,
            resolverChain: ethereum_js_1.ethereum,
        }),
        queryKey: ["ens-name", address],
    });
}
/**
 * Get the ENS avatar for an ENS name
 * @param options - the client and ENS name to get the avatar for
 * @returns - a query object that resolves to the avatar
 * @example
 * ```tsx
 * import { useEnsAvatar } from "thirdweb/react";
 *
 * const { data: ensAvatar } = useEnsAvatar({
 *  client,
 *  ensName: "my-ens-name.eth",
 * });
 * ```
 * @extension ENS
 */
function useEnsAvatar(options) {
    const { client, ensName } = options;
    return (0, react_query_1.useQuery)({
        enabled: !!ensName,
        queryFn: async () => (0, resolve_avatar_js_1.resolveAvatar)({
            client,
            name: ensName || "",
        }),
        queryKey: ["ens-avatar", ensName],
    });
}
/**
 * @internal This hook is only being used in our react-native package
 * It can be removed once we migrate the RN UI code to our headless components (AccountProvider, AccountName etc.)
 */
function useConnectedWalletDetails(client, walletChain, activeAccount, displayBalanceToken) {
    const tokenAddress = walletChain && displayBalanceToken
        ? displayBalanceToken[Number(walletChain.id)]
        : undefined;
    const ensNameQuery = useEnsName({
        address: activeAccount?.address,
        client,
    });
    const ensAvatarQuery = useEnsAvatar({
        client,
        ensName: ensNameQuery.data,
    });
    const socialProfileQuery = (0, useSocialProfiles_js_1.useSocialProfiles)({
        address: activeAccount?.address,
        client,
    });
    const shortAddress = activeAccount?.address
        ? (0, address_js_1.shortenAddress)(activeAccount.address, 4)
        : "";
    const balanceQuery = (0, useWalletBalance_js_1.useWalletBalance)({
        address: activeAccount?.address,
        chain: walletChain ? walletChain : undefined,
        client,
        tokenAddress,
    });
    const addressOrENS = ensNameQuery.data || shortAddress;
    const pfpUnresolved = socialProfileQuery.data?.filter((p) => p.avatar)[0]
        ?.avatar;
    const { data: pfp } = (0, react_query_1.useQuery)({
        enabled: !!pfpUnresolved,
        queryFn: async () => {
            if (!pfpUnresolved) {
                return undefined;
            }
            return (0, avatar_js_1.parseAvatarRecord)({ client, uri: pfpUnresolved });
        },
        queryKey: ["ens-avatar", pfpUnresolved],
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });
    const name = socialProfileQuery.data?.filter((p) => p.name)[0]?.name || addressOrENS;
    return {
        addressOrENS,
        balanceQuery,
        ensAvatarQuery,
        ensNameQuery,
        name,
        pfp,
        shortAddress,
        socialProfileQuery,
    };
}
/**
 * Returns the wallet info for the provided wallet id.
 *
 * @example
 * ```tsx
 * import { useWalletInfo } from "thirdweb/react";
 *
 * const { data: walletInfo } = useWalletInfo("io.metamask");
 * console.log("wallet name", walletInfo?.name);
 * ```
 * @wallet
 */
function useWalletInfo(id) {
    return (0, react_query_1.useQuery)({
        enabled: !!id,
        queryFn: () => {
            if (!id) {
                throw new Error("Wallet id is required");
            }
            return (0, getWalletInfo_js_1.getWalletInfo)(id, false);
        },
        queryKey: ["wallet-info", id],
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: false,
    });
}
/**
 * Returns the wallet icon for the provided wallet id.
 *
 * @example
 * ```tsx
 * import { useWalletImage } from "thirdweb/react";
 *
 * const { data: walletImage } = useWalletImage("io.metamask");
 *
 * return <img src={walletImage} alt="MetaMask logo" />;
 * ```
 *
 * @wallet
 */
function useWalletImage(id) {
    return (0, react_query_1.useQuery)({
        enabled: !!id,
        queryFn: async () => {
            if (!id) {
                throw new Error("Wallet id is required");
            }
            const { getInstalledWalletProviders } = await Promise.resolve().then(() => require("../../../wallets/injected/mipdStore.js"));
            const mipdImage = getInstalledWalletProviders().find((x) => x.info.rdns === id)?.info.icon;
            if (mipdImage) {
                return mipdImage;
            }
            return (0, getWalletInfo_js_1.getWalletInfo)(id, true);
        },
        queryKey: ["wallet-image", id],
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: false,
    });
}
//# sourceMappingURL=wallet.js.map