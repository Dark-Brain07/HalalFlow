import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo } from "react";
import { Image } from "react-native";
import { SvgXml } from "react-native-svg";
import { radius } from "../../design-system/index.js";
function getImage(data) {
    if (data.startsWith("data:image/svg+xml;base64,")) {
        const image = globalThis.atob(data.replace("data:image/svg+xml;base64,", ""));
        return { image, type: "xml" };
    }
    if (data.startsWith("data:image/")) {
        return { image: data, type: "image" };
    }
    if (data.startsWith("<svg")) {
        return { image: data, type: "xml" };
    }
    return { image: data, type: "url" };
}
export const RNImage = (props) => {
    const { data, size, color, placeholder } = props;
    const imageResult = useMemo(() => {
        if (!data) {
            return undefined;
        }
        return getImage(data);
    }, [data]);
    if (!imageResult) {
        return null;
    }
    const { image, type } = imageResult;
    switch (type) {
        case "url":
        case "image":
            return (_jsx(Image, { height: size, loadingIndicatorSource: { uri: placeholder }, source: { uri: image }, style: [{ borderRadius: radius.md }], width: size }));
        case "xml":
            return _jsx(SvgXml, { color: color, height: size, width: size, xml: image });
        default:
            return null;
    }
};
//# sourceMappingURL=RNImage.js.map