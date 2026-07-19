"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_native_1 = require("react-native");
const react_native_svg_1 = require("react-native-svg");
const index_js_1 = require("../../design-system/index.js");
const AnimatedRect = react_native_1.Animated.createAnimatedComponent(react_native_svg_1.Rect);
const PADDING = 10;
const INTERNAL_PADDING = 5;
function WalletLoadingThumbnail({ theme, children, showError, imageSize, animate, roundLoader, }) {
    const spinValue = (0, react_1.useRef)(new react_native_1.Animated.Value(0));
    (0, react_1.useEffect)(() => {
        if (!animate)
            return;
        const animation = react_native_1.Animated.timing(spinValue.current, {
            duration: 1150,
            easing: react_native_1.Easing.linear,
            toValue: 1,
            useNativeDriver: true,
        });
        const loop = react_native_1.Animated.loop(animation);
        loop.start();
        return () => {
            loop.stop();
        };
    }, [animate]);
    const spin = spinValue.current.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -400],
    });
    const rx = roundLoader ? imageSize / 2 : 15;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: styles.container, children: [(0, jsx_runtime_1.jsx)(react_native_svg_1.Svg, { height: imageSize + PADDING, style: styles.loader, viewBox: `0 0 ${imageSize + PADDING} ${imageSize + PADDING}`, width: imageSize + PADDING, children: animate && ((0, jsx_runtime_1.jsx)(AnimatedRect, { fill: "transparent", height: imageSize + INTERNAL_PADDING, rx: rx, stroke: showError ? "transparent" : theme.colors.accentText, strokeDasharray: "100 300", strokeDashoffset: spin, strokeWidth: 3, width: imageSize + INTERNAL_PADDING, x: "2", y: "2" })) }), showError && ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
                    {
                        borderColor: theme.colors.borderColor,
                        borderRadius: index_js_1.radius.lg,
                        borderWidth: 3,
                        height: imageSize + INTERNAL_PADDING,
                        position: "absolute",
                        width: imageSize + INTERNAL_PADDING,
                    },
                ] })), children] }));
}
const styles = react_native_1.StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
    },
    loader: {
        position: "absolute",
    },
});
exports.default = WalletLoadingThumbnail;
//# sourceMappingURL=WalletLoadingThumbnail.js.map