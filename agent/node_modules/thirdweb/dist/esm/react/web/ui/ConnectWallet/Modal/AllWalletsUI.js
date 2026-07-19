"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import styled from "@emotion/styled";
import { CrossCircledIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import Fuse from "fuse.js";
import { useMemo, useRef, useState } from "react";
import walletInfos from "../../../../../wallets/__generated__/wallet-infos.js";
import { NON_SEARCHABLE_WALLETS } from "../../../../../wallets/constants.js";
import { createWallet } from "../../../../../wallets/create-wallet.js";
import { useCustomTheme } from "../../../../core/design-system/CustomThemeProvider.js";
import { iconSize, spacing } from "../../../../core/design-system/index.js";
import { useSetSelectionData } from "../../../providers/wallet-ui-states-provider.js";
import { sortWallets } from "../../../utils/sortWallets.js";
import { Container, ModalHeader } from "../../components/basic.js";
import { Input } from "../../components/formElements.js";
import { Spacer } from "../../components/Spacer.js";
import { Spinner } from "../../components/Spinner.js";
import { Text } from "../../components/text.js";
import { useDebouncedValue } from "../../hooks/useDebouncedValue.js";
import { useShowMore } from "../../hooks/useShowMore.js";
import { WalletEntryButton } from "../WalletEntryButton.js";
/**
 *
 * @internal
 */
function AllWalletsUI(props) {
    const { itemsToShow, lastItemRef } = useShowMore(10, 10);
    const setSelectionData = useSetSelectionData();
    const walletList = useMemo(() => {
        return walletInfos
            .filter((info) => !NON_SEARCHABLE_WALLETS.includes(info.id))
            .filter((info) => !props.walletIdsToHide?.includes(info.id));
    }, [props.walletIdsToHide]);
    const fuseInstance = useMemo(() => {
        return new Fuse(walletList, {
            keys: [
                {
                    name: "name",
                    weight: 1,
                },
            ],
            threshold: 0.4,
        });
    }, [walletList]);
    const listContainer = useRef(null);
    const [searchTerm, setSearchTerm] = useState("");
    const deferredSearchTerm = useDebouncedValue(searchTerm, 300);
    const searchResults = deferredSearchTerm
        ? fuseInstance.search(deferredSearchTerm).map((result) => result.item)
        : walletList;
    const walletInfosToShow = useMemo(() => {
        return sortWallets(searchResults.slice(0, itemsToShow));
    }, [searchResults, itemsToShow]);
    return (_jsxs(Container, { animate: "fadein", flex: "column", fullHeight: true, className: "tw-all-wallets-screen", children: [_jsx(Container, { p: "lg", children: _jsx(ModalHeader, { onBack: props.onBack, title: "Select Wallet" }) }), _jsx(Spacer, { y: "xs" }), _jsx(Container, { px: "lg", children: _jsxs("div", { style: {
                        alignItems: "center",
                        display: "flex",
                        position: "relative",
                    }, children: [_jsx(StyledMagnifyingGlassIcon, { height: iconSize.md, width: iconSize.md }), _jsx(Input, { onChange: (e) => {
                                listContainer.current?.parentElement?.scroll({
                                    top: 0,
                                });
                                setSearchTerm(e.target.value);
                            }, placeholder: "Search Wallet", style: {
                                padding: `${spacing.sm} ${spacing.sm} ${spacing.sm} ${spacing.xxl}`,
                            }, tabIndex: -1, value: searchTerm, variant: "outline" }), deferredSearchTerm !== searchTerm && (_jsx("div", { style: {
                                position: "absolute",
                                right: spacing.md,
                            }, children: _jsx(Spinner, { color: "accentText", size: "md" }) }))] }) }), walletInfosToShow.length > 0 && (_jsxs(_Fragment, { children: [_jsx(Spacer, { y: "md" }), _jsxs(Container, { animate: "fadein", expand: true, scrollY: true, children: [_jsx("div", { ref: listContainer, style: {
                                    maxHeight: props.size === "compact" ? "400px" : undefined,
                                    paddingInline: spacing.md,
                                }, children: walletInfosToShow.map((walletInfo, i) => {
                                    const isLast = i === walletInfosToShow.length - 1;
                                    const wallet = createWallet(walletInfo.id);
                                    return (_jsx("li", { ref: isLast ? lastItemRef : undefined, style: {
                                            listStyle: "none",
                                        }, children: _jsx(WalletEntryButton, { className: "tw-select-wallet-button", badge: undefined, client: props.client, connectLocale: props.connectLocale, isActive: false, recommendedWallets: props.recommendedWallets, selectWallet: () => {
                                                props.onSelect(wallet);
                                                if (!props.disableSelectionDataReset) {
                                                    setSelectionData({});
                                                }
                                            }, wallet: wallet }) }, walletInfo.id));
                                }) }), _jsx(Spacer, { y: "xl" })] })] })), walletInfosToShow.length === 0 && (_jsxs(Container, { animate: "fadein", center: "both", color: "secondaryText", expand: true, flex: "column", gap: "md", style: {
                    minHeight: "250px",
                }, children: [_jsx(CrossCircledIcon, { height: iconSize.xl, width: iconSize.xl }), _jsx(Text, { children: " No Results " })] }))] }));
}
const StyledMagnifyingGlassIcon = /* @__PURE__ */ styled(MagnifyingGlassIcon)((_) => {
    const theme = useCustomTheme();
    return {
        color: theme.colors.secondaryText,
        left: spacing.sm,
        position: "absolute",
    };
});
export default AllWalletsUI;
//# sourceMappingURL=AllWalletsUI.js.map