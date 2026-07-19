import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { resolveScheme } from "../../../../../utils/ipfs.js";
import { useCustomTheme } from "../../../../core/design-system/CustomThemeProvider.js";
import { radius, spacing } from "../../../../core/design-system/index.js";
import { Container } from "../../components/basic.js";
import { Spacer } from "../../components/Spacer.js";
import { Text } from "../../components/text.js";
export function WithHeader(props) {
    const theme = useCustomTheme();
    return (_jsxs(Container, { flex: "column", children: [props.image && (_jsx("div", { className: "tw-header-image", style: {
                    aspectRatio: "16/9",
                    backgroundColor: theme.colors.tertiaryBg,
                    backgroundImage: `url(${getUrl(props.client, props.image)})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    borderRadius: `${radius.md} ${radius.md} 0 0`,
                    marginBottom: spacing.xxs,
                    overflow: "hidden",
                    width: "100%",
                } })), _jsxs(Container, { flex: "column", px: "md", children: [_jsx(Spacer, { y: "md" }), (props.title || props.description) && (_jsxs(_Fragment, { children: [props.title && (_jsx(Text, { color: "primaryText", size: "lg", weight: 500, trackingTight: true, children: props.title })), props.description && (_jsxs(_Fragment, { children: [_jsx(Spacer, { y: "xxs" }), _jsx(Text, { color: "secondaryText", size: "sm", multiline: true, children: props.description })] })), _jsx(Spacer, { y: "md" })] })), props.children] })] }));
}
function getUrl(client, uri) {
    if (!uri.startsWith("ipfs://")) {
        return uri;
    }
    return resolveScheme({
        client,
        uri,
    });
}
//# sourceMappingURL=WithHeader.js.map