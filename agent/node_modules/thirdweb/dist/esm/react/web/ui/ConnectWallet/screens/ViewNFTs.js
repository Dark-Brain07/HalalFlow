import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
import { getCachedChain } from "../../../../../chains/utils.js";
import { getContract } from "../../../../../contract/contract.js";
import { getOwnedNFTs as getErc721OwnedNFTs } from "../../../../../extensions/erc721/read/getOwnedNFTs.js";
import { isERC721 } from "../../../../../extensions/erc721/read/isERC721.js";
import { getOwnedNFTs as getErc1155OwnedNFTs } from "../../../../../extensions/erc1155/read/getOwnedNFTs.js";
import { isERC1155 } from "../../../../../extensions/erc1155/read/isERC1155.js";
import { getOwnedNFTs } from "../../../../../insight/get-nfts.js";
import { useActiveAccount } from "../../../../core/hooks/wallets/useActiveAccount.js";
import { useActiveWalletChain } from "../../../../core/hooks/wallets/useActiveWalletChain.js";
import { Container, Line, ModalHeader } from "../../components/basic.js";
import { Skeleton } from "../../components/Skeleton.js";
import { Spacer } from "../../components/Spacer.js";
import { Text } from "../../components/text.js";
import { MediaRenderer } from "../../MediaRenderer/MediaRenderer.js";
const fetchNFTs = async (client, chain, nftAddress, owner) => {
    const contract = getContract({
        address: nftAddress,
        chain,
        client,
    });
    const erc721 = await isERC721({ contract }).catch(() => {
        throw new Error(`Failed to read contract bytecode for NFT ${nftAddress} on ${chain.name || chain.id}, is this NFT on the correct chain?`);
    });
    if (erc721) {
        const result = await getErc721OwnedNFTs({
            contract,
            owner: owner,
        });
        return result.map((nft) => ({
            ...nft,
            address: contract.address,
            chain,
            quantityOwned: BigInt(1),
        }));
    }
    const erc1155 = await isERC1155({ contract }).catch(() => false);
    if (erc1155) {
        const result = await getErc1155OwnedNFTs({
            address: owner,
            contract,
        });
        return result.map((nft) => ({ ...nft, address: contract.address, chain }));
    }
    throw new Error(`NFT at ${nftAddress} on chain ${chain.id} is not ERC721 or ERC1155, or does not properly identify itself as supporting either interface`);
};
/**
 * @internal
 */
export function ViewNFTs(props) {
    return (_jsxs(Container, { style: {
            minHeight: "300px",
        }, children: [_jsx(Container, { p: "lg", children: _jsx(ModalHeader, { onBack: props.onBack, title: props.connectLocale.viewFunds.viewNFTs }) }), _jsx(Line, {}), _jsxs(Container, { px: "sm", scrollY: true, style: {
                    maxHeight: "500px",
                }, children: [_jsx(Spacer, { y: "md" }), _jsx(ViewNFTsContent, { ...props })] })] }));
}
export function ViewNFTsContent(props) {
    const activeAccount = useActiveAccount();
    const activeChain = useActiveWalletChain();
    const nftQuery = useQuery({
        enabled: !!activeChain && !!activeAccount,
        queryFn: async () => {
            if (!activeAccount) {
                throw new Error("No active account");
            }
            if (!activeChain) {
                throw new Error("No active chain");
            }
            const result = await getOwnedNFTs({
                chains: [activeChain],
                client: props.client,
                ownerAddress: activeAccount.address,
                contractAddresses: props.supportedNFTs?.[activeChain.id]?.map((nft) => nft.toLowerCase()),
            });
            return result
                .filter((nft) => !!nft.metadata.name && !!nft.metadata.image)
                .map((nft) => {
                return {
                    address: nft.tokenAddress,
                    chain: getCachedChain(nft.chainId),
                    ...nft,
                };
            });
        },
        queryKey: [
            "nfts",
            activeChain?.id,
            activeAccount?.address,
            props.supportedNFTs,
        ],
    });
    if (!activeChain?.id || !activeAccount?.address) {
        return null;
    }
    const filteredNFTs = nftQuery.data;
    return (_jsxs(_Fragment, { children: [nftQuery.error ? (_jsx(Container, { center: "both", py: "lg", children: _jsx(Text, { center: true, color: "secondaryText", size: "sm", children: "Error loading NFTs" }) })) : nftQuery.data?.length === 0 && !nftQuery.isLoading ? (_jsx(Container, { center: "both", py: "lg", children: _jsx(Text, { center: true, color: "secondaryText", size: "sm", children: "No NFTs found on this chain" }) })) : (_jsx(Container, { style: {
                    display: "grid",
                    gap: "12px",
                    gridTemplateColumns: "1fr 1fr",
                }, children: nftQuery.isLoading || !filteredNFTs ? (_jsxs(_Fragment, { children: [_jsx(Skeleton, { height: "150px", width: "150px" }), _jsx(Skeleton, { height: "150px", width: "150px" }), _jsx(Skeleton, { height: "150px", width: "150px" })] })) : (filteredNFTs.map((nft) => (_jsx(NftCard, { ...nft, chain: nft.chain, client: props.client, theme: props.theme }, `${nft.chain.id}:${nft.address}:${nft.id}`)))) })), _jsx(Spacer, { y: "lg" })] }));
}
function NftCard(props) {
    const theme = typeof props.theme === "string" ? props.theme : props.theme.type;
    const themeObject = typeof props.theme === "string" ? undefined : props.theme;
    const content = (_jsxs("div", { style: {
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            width: "150px",
        }, children: [_jsxs("div", { style: {
                    alignItems: "center",
                    background: theme === "light" ? "rgba(0, 0, 0, 0.10)" : "rgba(0, 0, 0, 0.20)",
                    borderRadius: "8px",
                    display: "flex",
                    flexShrink: 0,
                    height: "150px",
                    overflow: "hidden",
                    position: "relative",
                    width: "150px",
                }, children: [props.metadata.image && (_jsx(MediaRenderer, { client: props.client, src: props.metadata.image, style: {
                            height: "100%",
                            width: "100%",
                        } })), props.quantityOwned > 1 && (_jsx("div", { style: {
                            alignItems: "center",
                            background: themeObject?.colors?.modalBg ??
                                (theme === "light" ? "white" : "black"),
                            borderRadius: "100%",
                            bottom: "4px",
                            display: "flex",
                            fontSize: "10px",
                            height: "20px",
                            justifyContent: "center",
                            padding: "4px 4px",
                            position: "absolute",
                            right: "4px",
                            width: "20px",
                        }, children: props.quantityOwned.toString() })), props.chain.icon && (_jsx("img", { alt: props.chain.name, src: props.chain.icon.url, style: {
                            bottom: "4px",
                            height: "20px",
                            left: "4px",
                            position: "absolute",
                            width: "20px",
                        } }))] }), _jsx(Text, { color: "primaryText", size: "xs", style: {
                    fontWeight: 600,
                    maxLines: 2,
                    textAlign: "center",
                }, children: props.metadata.name })] }));
    if (props.chain.name) {
        return (_jsx("a", { href: `https://thirdweb.com/${props.chain.id}/${props.address}/nfts/${props.id}`, rel: "noreferrer", target: "_blank", children: content }));
    }
    return content;
}
//# sourceMappingURL=ViewNFTs.js.map