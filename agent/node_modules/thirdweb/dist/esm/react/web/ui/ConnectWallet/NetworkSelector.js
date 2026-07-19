"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import styled from "@emotion/styled";
import { CrossCircledIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import Fuse from "fuse.js";
import { Fragment, memo, useCallback, useContext, useEffect, useMemo, useState, } from "react";
import { convertApiChainToChain } from "../../../../chains/utils.js";
import { CustomThemeProvider, useCustomTheme, } from "../../../core/design-system/CustomThemeProvider.js";
import { fontSize, iconSize, media, radius, spacing, } from "../../../core/design-system/index.js";
import { useChainsQuery } from "../../../core/hooks/others/useChainQuery.js";
import { useActiveWalletChain } from "../../../core/hooks/wallets/useActiveWalletChain.js";
import { useSwitchActiveWalletChain } from "../../../core/hooks/wallets/useSwitchActiveWalletChain.js";
import { SetRootElementContext } from "../../../core/providers/RootElementContext.js";
import { Container, Line, ModalHeader } from "../components/basic.js";
import { Button } from "../components/buttons.js";
import { ChainActiveDot } from "../components/ChainActiveDot.js";
import { fallbackChainIcon } from "../components/fallbackChainIcon.js";
import { Input } from "../components/formElements.js";
import { Modal } from "../components/Modal.js";
import { ModalTitle } from "../components/modalElements.js";
import { Skeleton } from "../components/Skeleton.js";
import { Spacer } from "../components/Spacer.js";
import { Spinner } from "../components/Spinner.js";
import { Text } from "../components/text.js";
import { StyledButton, StyledP, StyledUl } from "../design-system/elements.js";
import { useDebouncedValue } from "../hooks/useDebouncedValue.js";
import { useShowMore } from "../hooks/useShowMore.js";
import { ChainIcon } from "../prebuilt/Chain/icon.js";
import { ChainName } from "../prebuilt/Chain/name.js";
import { ChainProvider } from "../prebuilt/Chain/provider.js";
import { getConnectLocale } from "./locale/getConnectLocale.js";
/**
 * @internal
 */
export function NetworkSelectorContent(props) {
    const locale = props.connectLocale.networkSelector;
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTab, setSelectedTab] = useState("all");
    const deferredSearchTerm = useDebouncedValue(searchTerm, 300);
    const { onSwitch, onCustomClick } = props.networkSelector || {};
    // labels
    const othersLabel = locale.categoryLabel.others;
    const popularLabel = locale.categoryLabel.popular;
    const recentLabel = locale.categoryLabel.recentlyUsed;
    // create sections, chainToSectionMap and allChains
    const { chainSections, allChains, allChainsToSectionMap } = useMemo(() => {
        const chainSectionsValue = [];
        const allChainsValue = [];
        const allChainsToSectionMapValue = new Map();
        function addChain(c, section) {
            allChainsToSectionMapValue.set(c.id, section);
            allChainsValue.push(c);
        }
        // if new API is used
        if (props.networkSelector?.sections) {
            for (const s of props.networkSelector.sections) {
                const chainsToAdd = s.chains.filter((c) => !allChainsToSectionMapValue.has(c.id));
                if (chainsToAdd.length > 0) {
                    chainSectionsValue.push({
                        chains: chainsToAdd,
                        label: s.label,
                    });
                    for (const c of chainsToAdd) {
                        addChain(c, s.label);
                    }
                }
            }
        }
        // if old API is used
        else {
            const allChainsMap = new Map(props.chains.map((c) => [c.id, c]));
            // add all recent chains
            if (props.networkSelector?.recentChainIds &&
                props.networkSelector?.recentChainIds.length > 0) {
                const recentChains = props.networkSelector.recentChainIds
                    .map((id) => allChainsMap.get(id))
                    .filter((c) => c !== undefined);
                chainSectionsValue.push({
                    chains: recentChains,
                    label: recentLabel,
                });
                for (const c of recentChains) {
                    addChain(c, recentLabel);
                }
            }
            // then add all popular chains ( exclude already added chains )
            if (props.networkSelector?.popularChainIds &&
                props.networkSelector.popularChainIds.length > 0) {
                const popularChains = props.networkSelector.popularChainIds
                    .map((id) => allChainsMap.get(id))
                    .filter((c) => c !== undefined);
                const chainsToAdd = popularChains.filter((c) => !allChainsToSectionMapValue.has(c.id));
                if (chainsToAdd.length > 0) {
                    chainSectionsValue.push({
                        chains: chainsToAdd,
                        label: popularLabel,
                    });
                    for (const c of chainsToAdd) {
                        addChain(c, popularLabel);
                    }
                }
            }
        }
        // add all other chains ( exclude already added chains )
        const otherChainsToAdd = props.chains.filter((c) => !allChainsToSectionMapValue.has(c.id));
        if (otherChainsToAdd.length > 0) {
            chainSectionsValue.push({
                chains: otherChainsToAdd,
                label: othersLabel,
            });
            for (const c of otherChainsToAdd) {
                addChain(c, othersLabel);
            }
        }
        return {
            allChains: allChainsValue,
            allChainsToSectionMap: allChainsToSectionMapValue,
            chainSections: chainSectionsValue,
        };
    }, [
        props.networkSelector?.sections,
        props.networkSelector?.recentChainIds,
        props.networkSelector?.popularChainIds,
        props.chains,
        recentLabel,
        popularLabel,
        othersLabel,
    ]);
    // optimizing for dashboard - if we already have names - don't query - we already have the data we want
    const chainsHaveName = allChains.every((c) => !!c.name);
    const allChainsQuery = useChainsQuery(chainsHaveName ? [] : allChains, 10);
    const isAllChainsQueryLoading = chainsHaveName
        ? false
        : allChainsQuery.some((q) => q.isLoading);
    const allChainsMetadata = chainsHaveName
        ? allChains
        : !isAllChainsQueryLoading
            ? allChainsQuery
                .filter((x) => !!x.data)
                .map((q) => convertApiChainToChain(q.data))
            : [];
    // fuse instance for searching
    const fuse = useMemo(() => {
        return new Fuse(allChainsMetadata, {
            keys: [
                {
                    name: "name",
                    weight: 1,
                },
                {
                    name: "chainId",
                    weight: 1,
                },
            ],
            threshold: 0.4,
        });
    }, [allChainsMetadata]);
    // chains filtered by search term
    const searchedChainSections = useMemo(() => {
        if (deferredSearchTerm === "") {
            return undefined;
        }
        const filteredChainSectionsValue = [];
        const filteredAllChains = fuse
            .search(deferredSearchTerm)
            .map((r) => r.item);
        for (const c of filteredAllChains) {
            const label = allChainsToSectionMap.get(c.id);
            if (!label) {
                return; // just a type guard, this never happens
            }
            const section = filteredChainSectionsValue.find((s) => s.label === label);
            if (section) {
                section.chains.push(c);
            }
            else {
                filteredChainSectionsValue.push({
                    chains: [c],
                    label,
                });
            }
        }
        return filteredChainSectionsValue;
    }, [deferredSearchTerm, fuse, allChainsToSectionMap]) || chainSections;
    const filteredChainSections = useMemo(() => {
        if (selectedTab === "all") {
            return searchedChainSections;
        }
        return searchedChainSections.map((section) => ({
            chains: section.chains.filter((c) => (selectedTab === "mainnet" && !c.testnet) ||
                (selectedTab === "testnet" && c.testnet)),
            label: section.label,
        }));
    }, [searchedChainSections, selectedTab]);
    const handleSwitch = useCallback((chain) => {
        if (onSwitch) {
            onSwitch(chain);
        }
        props.closeModal();
    }, [onSwitch, props]);
    return (_jsxs(Container, { className: props.className, children: [_jsx(Container, { p: "lg", children: props.onBack ? (_jsx(ModalHeader, { onBack: props.onBack, title: locale.title })) : (_jsx(ModalTitle, { children: locale.title })) }), props.showTabs !== false && (_jsxs(_Fragment, { children: [_jsx(Container, { px: "lg", children: _jsxs(Container, { flex: "row", gap: "xxs", children: [_jsx(TabButton, { "data-active": selectedTab === "all", onClick: () => setSelectedTab("all"), children: locale.allNetworks }), _jsx(TabButton, { "data-active": selectedTab === "mainnet", onClick: () => setSelectedTab("mainnet"), children: locale.mainnets }), _jsx(TabButton, { "data-active": selectedTab === "testnet", onClick: () => setSelectedTab("testnet"), children: locale.testnets })] }) }), _jsx(Spacer, { y: "lg" })] })), props.showTabs === false && _jsx(Spacer, { y: "xxs" }), _jsx(Container, { px: "lg", children: _jsxs("div", { style: {
                        alignItems: "center",
                        display: "flex",
                        position: "relative",
                    }, children: [_jsx(StyledMagnifyingGlassIcon, { height: iconSize.md, width: iconSize.md }), _jsx(Input, { disabled: isAllChainsQueryLoading, onChange: (e) => {
                                setSearchTerm(e.target.value);
                            }, placeholder: isAllChainsQueryLoading
                                ? "Loading chains..."
                                : locale.inputPlaceholder, style: {
                                padding: `${spacing.sm} ${spacing.md} ${spacing.sm} ${spacing.xxl}`,
                            }, tabIndex: -1, value: searchTerm, variant: "outline" }), (deferredSearchTerm !== searchTerm || isAllChainsQueryLoading) && (_jsx("div", { style: {
                                position: "absolute",
                                right: spacing.md,
                            }, children: _jsx(Spinner, { color: "accentText", size: "md" }) }))] }) }), _jsx(Spacer, { y: "lg" }), _jsx(Container, { px: "md", children: _jsx(NetworkTabContent, { chainSections: filteredChainSections, client: props.client, close: props.closeModal, connectLocale: props.connectLocale, onSwitch: handleSwitch, renderChain: props.networkSelector?.renderChain }) }), onCustomClick && (_jsxs(_Fragment, { children: [_jsx(Line, {}), _jsx(Container, { p: "lg", children: _jsx(Button, { fullWidth: true, onClick: () => {
                                onCustomClick();
                                props.closeModal();
                            }, style: {
                                boxShadow: "none",
                                display: "flex",
                                fontSize: fontSize.sm,
                            }, variant: "link", children: locale.addCustomNetwork }) })] }))] }));
}
/**
 *
 * @internal
 */
const NetworkTabContent = (props) => {
    const { chainSections } = props;
    const noChainsToShow = chainSections.every((section) => section.chains.length === 0);
    return (_jsx(Container, { animate: "fadein", scrollY: true, style: {
            height: "330px",
            paddingBottom: spacing.lg,
        }, children: noChainsToShow ? (_jsxs(Container, { center: "both", color: "secondaryText", flex: "column", gap: "md", children: [_jsx(Spacer, { y: "xl" }), _jsx(CrossCircledIcon, { height: iconSize.xl, width: iconSize.xl }), _jsx(Text, { children: " No Results " })] })) : (chainSections.map((section, idx) => {
            if (section.chains.length === 0) {
                return null;
            }
            return (_jsxs(Fragment, { children: [idx !== 0 && _jsx(Spacer, { y: "lg" }), _jsx(SectionLabel, { children: section.label }), _jsx(Spacer, { y: "xs" }), _jsx(NetworkList, { chains: section.chains, client: props.client, close: props.close, connectLocale: props.connectLocale, onSwitch: props.onSwitch, renderChain: props.renderChain })] }, section.label));
        })) }));
};
/**
 * @internal Exported for tests
 */
export const NetworkList = /* @__PURE__ */ memo(function NetworkList(props) {
    // show 10 items first, when reaching the last item, show 10 more
    const { itemsToShow, lastItemRef } = useShowMore(10, 10);
    const switchChain = useSwitchActiveWalletChain();
    const activeChain = useActiveWalletChain();
    const [switchingChainId, setSwitchingChainId] = useState(-1);
    const [errorSwitchingChainId, setErrorSwitchingChainId] = useState(-1);
    const close = props.close;
    useEffect(() => {
        // if switching and switched successfully - close modal
        if (switchingChainId !== -1 && activeChain?.id === switchingChainId) {
            if (close) {
                close();
            }
        }
    }, [switchingChainId, close, activeChain?.id]);
    const handleSwitch = async (chain) => {
        setErrorSwitchingChainId(-1);
        setSwitchingChainId(chain.id);
        try {
            await switchChain(chain);
            props.onSwitch(chain);
        }
        catch (e) {
            setErrorSwitchingChainId(chain.id);
            console.error(e);
        }
        finally {
            setSwitchingChainId(-1);
        }
    };
    const RenderChain = props.renderChain;
    const chainsToShow = props.chains.slice(0, itemsToShow);
    return (_jsx(NetworkListUl, { children: chainsToShow.map((chain, i) => {
            if (!chain) {
                return null;
            }
            const confirming = switchingChainId === chain.id;
            const switchingFailed = errorSwitchingChainId === chain.id;
            const isLast = i === chainsToShow.length - 1;
            return (_jsx("li", { ref: isLast ? lastItemRef : undefined, children: RenderChain ? (_jsx(RenderChain, { chain: chain, close: props.close, switchChain: () => {
                        handleSwitch(chain);
                    }, switchFailed: errorSwitchingChainId === chain.id, switching: switchingChainId === chain.id })) : (_jsx(ChainButton, { chain: chain, client: props.client, confirming: confirming, connectLocale: props.connectLocale, onClick: () => handleSwitch(chain), switchingFailed: switchingFailed })) }, chain.id));
        }) }));
});
/**
 * @internal
 */
export const ChainButton = /* @__PURE__ */ memo(function ChainButton(props) {
    const locale = props.connectLocale;
    const { chain, confirming, switchingFailed } = props;
    const activeChain = useActiveWalletChain();
    return (_jsx(ChainProvider, { chain: chain, children: _jsxs(NetworkButton, { "data-active": activeChain?.id === chain.id, onClick: props.onClick, children: [_jsxs(Container, { style: {
                        alignItems: "center",
                        display: "flex",
                        flexShrink: 0,
                        position: "relative",
                    }, children: [_jsx(ChainIcon, { client: props.client, fallbackComponent: _jsx("img", { alt: "", src: fallbackChainIcon, style: {
                                    height: `${iconSize.lg}px`,
                                    width: `${iconSize.lg}px`,
                                } }), loading: "lazy", loadingComponent: _jsx(Skeleton, { height: `${iconSize.lg}px`, width: `${iconSize.lg}px` }), style: {
                                height: `${iconSize.lg}px`,
                                width: `${iconSize.lg}px`,
                            } }), activeChain?.id === chain.id && (_jsx(ChainActiveDot, { className: "tw-chain-active-dot-button-network-selector" }))] }), confirming || switchingFailed ? (_jsxs(Container, { flex: "column", gap: "3xs", style: { alignItems: "flex-start", width: "100%" }, children: [_jsx(ChainName, { loadingComponent: _jsx(Skeleton, { height: "20px", width: "150px" }) }), _jsxs(Container, { animate: "fadein", center: "y", flex: "row", gap: "xxs", children: [confirming && (_jsxs(_Fragment, { children: [_jsx(Text, { color: "accentText", size: "xs", children: locale.switchingNetwork }), _jsx(Spinner, { color: "accentText", size: "xs" })] })), switchingFailed && (_jsx(Container, { animate: "fadein", children: _jsx(Text, { color: "danger", size: "xs", children: locale.networkSelector.failedToSwitch }) }))] })] })) : (_jsx(ChainName, { className: "tw-chain-icon-none-confirming", loadingComponent: _jsx(Skeleton, { height: "20px", width: "150px" }) }))] }) }));
});
/**
 * @internal Exported for tests
 */
export const TabButton = /* @__PURE__ */ (() => styled.button((_) => {
    const theme = useCustomTheme();
    return {
        all: "unset",
        "&[data-active='true']": {
            background: theme.colors.secondaryButtonBg,
            color: theme.colors.primaryText,
        },
        borderRadius: radius.lg,
        color: theme.colors.secondaryText,
        cursor: "pointer",
        fontSize: fontSize.sm,
        fontWeight: 500,
        padding: `${spacing.sm} ${spacing.sm}`,
        transition: "background 0.2s ease, color 0.2s ease",
        WebkitTapHighlightColor: "transparent",
    };
}))();
/**
 * @internal Exported for tests
 */
export const SectionLabel = /* @__PURE__ */ StyledP(() => {
    const theme = useCustomTheme();
    return {
        color: theme.colors.secondaryText,
        display: "block",
        fontSize: fontSize.sm,
        margin: 0,
        padding: `0 ${spacing.xs}`,
    };
});
const NetworkListUl = /* @__PURE__ */ StyledUl({
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    gap: spacing.xs,
    listStyle: "none",
    margin: 0,
    padding: 0,
});
/**
 * @internal Exported for tests
 */
export const NetworkButton = /* @__PURE__ */ StyledButton((_) => {
    const theme = useCustomTheme();
    return {
        "&:hover": {
            background: theme.colors.secondaryButtonBg,
        },
        all: "unset",
        alignItems: "center",
        borderRadius: radius.md,
        boxSizing: "border-box",
        color: theme.colors.primaryText,
        cursor: "pointer",
        display: "flex",
        fontSize: fontSize.md,
        fontWeight: 500,
        gap: spacing.md,
        padding: `${spacing.xs} ${spacing.sm}`,
        transition: "background 0.2s ease",
        width: "100%",
        [media.mobile]: {
            fontSize: fontSize.sm,
        },
    };
});
/**
 * @internal Exported for tests
 */
export const StyledMagnifyingGlassIcon = /* @__PURE__ */ styled(MagnifyingGlassIcon)((_) => {
    const theme = useCustomTheme();
    return {
        color: theme.colors.secondaryText,
        left: spacing.sm,
        position: "absolute",
    };
});
/**
 * Hook to open the Wallet Network Switcher Modal that shows allows users to switch to different network.
 *
 * @example
 * ```tsx
 * import { createThirdwebClient } from "thirdweb";
 * import { useNetworkSwitcherModal } from "thirdweb/react";
 * import { base, ethereum, polygon, sepolia, arbitrum } from "thirdweb/chains";
 *
 * const client = createThirdwebClient({
 *  clientId: "<your_client_id>",
 * });
 *
 * function Example() {
 *   const networkSwitcher = useNetworkSwitcherModal();
 *
 *   function handleClick() {
 *      networkSwitcher.open({
 *        client,
 *        theme: 'light'
 *        sections: [
 *          { label: 'Recently used', chains: [arbitrum, polygon] },
 *          { label: 'Popular', chains: [base, ethereum, sepolia] },
 *        ]
 *     });
 *   }
 *
 *   return <button onClick={handleClick}> Switch Network </button>
 * }
 * ```
 * @wallet
 */
export function useNetworkSwitcherModal() {
    const activeChain = useActiveWalletChain();
    const setRootEl = useContext(SetRootElementContext);
    const closeModal = useCallback(() => {
        setRootEl(null);
    }, [setRootEl]);
    const openNetworkSwitcher = useCallback(async (props) => {
        if (!activeChain) {
            throw new Error("No active wallet found");
        }
        const locale = await getConnectLocale(props.locale || "en_US");
        setRootEl(_jsx(CustomThemeProvider, { theme: props.theme, children: _jsx(Modal, { className: "tw-modal__switch-network", title: "Switch Network", open: true, setOpen: (value) => {
                    if (!value) {
                        closeModal();
                    }
                }, size: "compact", style: {
                    paddingBottom: props.onCustomClick ? spacing.md : "0px",
                }, children: _jsx(NetworkSelectorContent, { chains: [activeChain], client: props.client, closeModal: closeModal, connectLocale: locale, networkSelector: {
                        onCustomClick: props.onCustomClick,
                        onSwitch: props.onSwitch,
                        renderChain: props.renderChain,
                        sections: props.sections,
                    } }) }) }));
    }, [setRootEl, closeModal, activeChain]);
    return {
        close: closeModal,
        open: openNetworkSwitcher,
    };
}
//# sourceMappingURL=NetworkSelector.js.map