"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const styled_1 = require("@emotion/styled");
const react_icons_1 = require("@radix-ui/react-icons");
const fuse_js_1 = require("fuse.js");
const react_1 = require("react");
const wallet_infos_js_1 = require("../../../../../wallets/__generated__/wallet-infos.js");
const constants_js_1 = require("../../../../../wallets/constants.js");
const create_wallet_js_1 = require("../../../../../wallets/create-wallet.js");
const CustomThemeProvider_js_1 = require("../../../../core/design-system/CustomThemeProvider.js");
const index_js_1 = require("../../../../core/design-system/index.js");
const wallet_ui_states_provider_js_1 = require("../../../providers/wallet-ui-states-provider.js");
const sortWallets_js_1 = require("../../../utils/sortWallets.js");
const basic_js_1 = require("../../components/basic.js");
const formElements_js_1 = require("../../components/formElements.js");
const Spacer_js_1 = require("../../components/Spacer.js");
const Spinner_js_1 = require("../../components/Spinner.js");
const text_js_1 = require("../../components/text.js");
const useDebouncedValue_js_1 = require("../../hooks/useDebouncedValue.js");
const useShowMore_js_1 = require("../../hooks/useShowMore.js");
const WalletEntryButton_js_1 = require("../WalletEntryButton.js");
/**
 *
 * @internal
 */
function AllWalletsUI(props) {
    const { itemsToShow, lastItemRef } = (0, useShowMore_js_1.useShowMore)(10, 10);
    const setSelectionData = (0, wallet_ui_states_provider_js_1.useSetSelectionData)();
    const walletList = (0, react_1.useMemo)(() => {
        return wallet_infos_js_1.default
            .filter((info) => !constants_js_1.NON_SEARCHABLE_WALLETS.includes(info.id))
            .filter((info) => !props.walletIdsToHide?.includes(info.id));
    }, [props.walletIdsToHide]);
    const fuseInstance = (0, react_1.useMemo)(() => {
        return new fuse_js_1.default(walletList, {
            keys: [
                {
                    name: "name",
                    weight: 1,
                },
            ],
            threshold: 0.4,
        });
    }, [walletList]);
    const listContainer = (0, react_1.useRef)(null);
    const [searchTerm, setSearchTerm] = (0, react_1.useState)("");
    const deferredSearchTerm = (0, useDebouncedValue_js_1.useDebouncedValue)(searchTerm, 300);
    const searchResults = deferredSearchTerm
        ? fuseInstance.search(deferredSearchTerm).map((result) => result.item)
        : walletList;
    const walletInfosToShow = (0, react_1.useMemo)(() => {
        return (0, sortWallets_js_1.sortWallets)(searchResults.slice(0, itemsToShow));
    }, [searchResults, itemsToShow]);
    return ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { animate: "fadein", flex: "column", fullHeight: true, className: "tw-all-wallets-screen", children: [(0, jsx_runtime_1.jsx)(basic_js_1.Container, { p: "lg", children: (0, jsx_runtime_1.jsx)(basic_js_1.ModalHeader, { onBack: props.onBack, title: "Select Wallet" }) }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "xs" }), (0, jsx_runtime_1.jsx)(basic_js_1.Container, { px: "lg", children: (0, jsx_runtime_1.jsxs)("div", { style: {
                        alignItems: "center",
                        display: "flex",
                        position: "relative",
                    }, children: [(0, jsx_runtime_1.jsx)(StyledMagnifyingGlassIcon, { height: index_js_1.iconSize.md, width: index_js_1.iconSize.md }), (0, jsx_runtime_1.jsx)(formElements_js_1.Input, { onChange: (e) => {
                                listContainer.current?.parentElement?.scroll({
                                    top: 0,
                                });
                                setSearchTerm(e.target.value);
                            }, placeholder: "Search Wallet", style: {
                                padding: `${index_js_1.spacing.sm} ${index_js_1.spacing.sm} ${index_js_1.spacing.sm} ${index_js_1.spacing.xxl}`,
                            }, tabIndex: -1, value: searchTerm, variant: "outline" }), deferredSearchTerm !== searchTerm && ((0, jsx_runtime_1.jsx)("div", { style: {
                                position: "absolute",
                                right: index_js_1.spacing.md,
                            }, children: (0, jsx_runtime_1.jsx)(Spinner_js_1.Spinner, { color: "accentText", size: "md" }) }))] }) }), walletInfosToShow.length > 0 && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "md" }), (0, jsx_runtime_1.jsxs)(basic_js_1.Container, { animate: "fadein", expand: true, scrollY: true, children: [(0, jsx_runtime_1.jsx)("div", { ref: listContainer, style: {
                                    maxHeight: props.size === "compact" ? "400px" : undefined,
                                    paddingInline: index_js_1.spacing.md,
                                }, children: walletInfosToShow.map((walletInfo, i) => {
                                    const isLast = i === walletInfosToShow.length - 1;
                                    const wallet = (0, create_wallet_js_1.createWallet)(walletInfo.id);
                                    return ((0, jsx_runtime_1.jsx)("li", { ref: isLast ? lastItemRef : undefined, style: {
                                            listStyle: "none",
                                        }, children: (0, jsx_runtime_1.jsx)(WalletEntryButton_js_1.WalletEntryButton, { className: "tw-select-wallet-button", badge: undefined, client: props.client, connectLocale: props.connectLocale, isActive: false, recommendedWallets: props.recommendedWallets, selectWallet: () => {
                                                props.onSelect(wallet);
                                                if (!props.disableSelectionDataReset) {
                                                    setSelectionData({});
                                                }
                                            }, wallet: wallet }) }, walletInfo.id));
                                }) }), (0, jsx_runtime_1.jsx)(Spacer_js_1.Spacer, { y: "xl" })] })] })), walletInfosToShow.length === 0 && ((0, jsx_runtime_1.jsxs)(basic_js_1.Container, { animate: "fadein", center: "both", color: "secondaryText", expand: true, flex: "column", gap: "md", style: {
                    minHeight: "250px",
                }, children: [(0, jsx_runtime_1.jsx)(react_icons_1.CrossCircledIcon, { height: index_js_1.iconSize.xl, width: index_js_1.iconSize.xl }), (0, jsx_runtime_1.jsx)(text_js_1.Text, { children: " No Results " })] }))] }));
}
const StyledMagnifyingGlassIcon = /* @__PURE__ */ (0, styled_1.default)(react_icons_1.MagnifyingGlassIcon)((_) => {
    const theme = (0, CustomThemeProvider_js_1.useCustomTheme)();
    return {
        color: theme.colors.secondaryText,
        left: index_js_1.spacing.sm,
        position: "absolute",
    };
});
exports.default = AllWalletsUI;
//# sourceMappingURL=AllWalletsUI.js.map