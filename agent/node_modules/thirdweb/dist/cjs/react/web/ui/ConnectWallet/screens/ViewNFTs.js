"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewNFTs = ViewNFTs;
exports.ViewNFTsContent = ViewNFTsContent;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_query_1 = require("@tanstack/react-query");
const utils_js_1 = require("../../../../../chains/utils.js");
const contract_js_1 = require("../../../../../contract/contract.js");
const getOwnedNFTs_js_1 = require("../../../../../extensions/erc721/read/getOwnedNFTs.js");
const isERC721_js_1 = require("../../../../../extensions/erc721/read/isERC721.js");
const getOwnedNFTs_js_2 = require("../../../../../extensions/erc1155/read/getOwnedNFTs.js");
const isERC1155_js_1 = require("../../../../../extensions/erc1155/read/isERC1155.js");
const get_nfts_js_1 = require("../../../../../insight/get-nfts.js");
const useActiveAccount_js_1 = require("../../../../core/hooks/wallets/useActiveAccount.js");
const useActiveWalletChain_js_1 = require("../../../../core/hooks/wallets/useActiveWalletChain.js");
const basic_js_1 = require("../../components/basic.js");
const Skeleton_js_1 = require("../../components/Skeleton.js");
const Spacer_js_1 = require("../../components/Spacer.js");
const text_js_1 = require("../../components/text.js");
const MediaRenderer_js_1 = require("../../MediaRenderer/MediaRenderer.js");
const fetchNFTs = async (client, chain, nftAddress, owner) => {
    const contract = (0, contract_js_1.getContract)({
        address: nftAddress,
        chain,
        client,
    });
    const erc721 = await (0, isERC721_js_1.isERC721)({ contract }).catch(() => {
        throw new Error(`Failed to read contract bytecode for NFT ${nftAddress} on ${chain.name || chain.id}, is this NFT on the correct chain?`);
    });
    if (erc721) {
        const result = await (0, getOwnedNFTs_js_1.getOwnedNFTs)({
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
    const erc1155 = await (0, isERC1155_js_1.isERC1155)({ contract }).catch(() => false);
    if (erc1155) {
        const result = await (0, getOwnedNFTs_js_2.getOwnedNFTs)({
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
function ViewNFTs(props) {
    return ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { style: {
            minHeight: "300px",
        }, children: [(0, jsx_runtime_1.jsx)(basic_js_1.Container, { p: "lg", children: (0, jsx_runtime_1.jsx)(basic_js_1.ModalHeader, { onBack: props.onBack, title: props.connectLocale.viewFunds.viewNFTs }) }), (0, jsx_runtime_1.jsx)(basic_js_1.Line, {}), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { px: "sm", scrollY: true, style: {
                    maxHeight: "500px",
                }, children: [(0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "md" }), (0, jsx_runtime_1.jsx)(ViewNFTsContent, { ...props })] })] }));
}
function ViewNFTsContent(props) {
    const activeAccount = (0, useActiveAccount_js_1.useActiveAccount)();
    const activeChain = (0, useActiveWalletChain_js_1.useActiveWalletChain)();
    const nftQuery = (0, react_query_1.useQuery)({
        enabled: !!activeChain && !!activeAccount,
        queryFn: async () => {
            if (!activeAccount) {
                throw new Error("No active account");
            }
            if (!activeChain) {
                throw new Error("No active chain");
            }
            const result = await (0, get_nfts_js_1.getOwnedNFTs)({
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
                    chain: (0, utils_js_1.getCachedChain)(nft.chainId),
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
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [nftQuery.error ? ((0, jsx_runtime_1.jsx)(basic_js_1.Container, { center: "both", py: "lg", children: (0, jsx_runtime_1.jsx)(text_js_1.Text, { center: true, color: "secondaryText", size: "sm", children: "Error loading NFTs" }) })) : nftQuery.data?.length === 0 && !nftQuery.isLoading ? ((0, jsx_runtime_1.jsx)(basic_js_1.Container, { center: "both", py: "lg", children: (0, jsx_runtime_1.jsx)(text_js_1.Text, { center: true, color: "secondaryText", size: "sm", children: "No NFTs found on this chain" }) })) : ((0, jsx_runtime_1.jsx)(basic_js_1.Container, { style: {
                    display: "grid",
                    gap: "12px",
                    gridTemplateColumns: "1fr 1fr",
                }, children: nftQuery.isLoading || !filteredNFTs ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Skeleton_js_1.Skeleton, { height: "150px", width: "150px" }), (0, jsx_runtime_1.jsx)(Skeleton_js_1.Skeleton, { height: "150px", width: "150px" }), (0, jsx_runtime_1.jsx)(Skeleton_js_1.Skeleton, { height: "150px", width: "150px" })] })) : (filteredNFTs.map((nft) => ((0, jsx_runtime_1.jsx)(NftCard, { ...nft, chain: nft.chain, client: props.client, theme: props.theme }, `${nft.chain.id}:${nft.address}:${nft.id}`)))) })), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "lg" })] }));
}
function NftCard(props) {
    const theme = typeof props.theme === "string" ? props.theme : props.theme.type;
    const themeObject = typeof props.theme === "string" ? undefined : props.theme;
    const content = ((0, jsx_runtime_1.jsxs)("div", { style: {
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            width: "150px",
        }, children: [(0, jsx_runtime_1.jsxs)("div", { style: {
                    alignItems: "center",
                    background: theme === "light" ? "rgba(0, 0, 0, 0.10)" : "rgba(0, 0, 0, 0.20)",
                    borderRadius: "8px",
                    display: "flex",
                    flexShrink: 0,
                    height: "150px",
                    overflow: "hidden",
                    position: "relative",
                    width: "150px",
                }, children: [props.metadata.image && ((0, jsx_runtime_1.jsx)(MediaRenderer_js_1.MediaRenderer, { client: props.client, src: props.metadata.image, style: {
                            height: "100%",
                            width: "100%",
                        } })), props.quantityOwned > 1 && ((0, jsx_runtime_1.jsx)("div", { style: {
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
                        }, children: props.quantityOwned.toString() })), props.chain.icon && ((0, jsx_runtime_1.jsx)("img", { alt: props.chain.name, src: props.chain.icon.url, style: {
                            bottom: "4px",
                            height: "20px",
                            left: "4px",
                            position: "absolute",
                            width: "20px",
                        } }))] }), (0, jsx_runtime_1.jsx)(text_js_1.Text, { color: "primaryText", size: "xs", style: {
                    fontWeight: 600,
                    maxLines: 2,
                    textAlign: "center",
                }, children: props.metadata.name })] }));
    if (props.chain.name) {
        return ((0, jsx_runtime_1.jsx)("a", { href: `https://thirdweb.com/${props.chain.id}/${props.address}/nfts/${props.id}`, rel: "noreferrer", target: "_blank", children: content }));
    }
    return content;
}
//# sourceMappingURL=ViewNFTs.js.map