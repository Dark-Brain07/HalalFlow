import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { iconSize, radius, spacing, } from "../../../../core/design-system/index.js";
import { Container } from "../../components/basic.js";
import { Input } from "../../components/formElements.js";
export function SearchInput(props) {
    return (_jsxs("div", { style: {
            position: "relative",
        }, children: [_jsx(Container, { color: "secondaryText", children: _jsx(MagnifyingGlassIcon, { width: iconSize.md, height: iconSize.md, style: {
                        position: "absolute",
                        left: spacing.sm,
                        top: "50%",
                        borderRadius: radius.lg,
                        transform: "translateY(-50%)",
                    } }) }), _jsx(Input, { variant: "outline", placeholder: props.placeholder, value: props.value, sm: true, style: {
                    paddingLeft: "44px",
                }, onChange: (e) => props.onChange(e.target.value), autoFocus: props.autoFocus })] }));
}
//# sourceMappingURL=SearchInput.js.map