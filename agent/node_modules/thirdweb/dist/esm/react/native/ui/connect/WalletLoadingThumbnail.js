import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";
import { Rect, Svg } from "react-native-svg";
import { radius } from "../../design-system/index.js";
const AnimatedRect = Animated.createAnimatedComponent(Rect);
const PADDING = 10;
const INTERNAL_PADDING = 5;
function WalletLoadingThumbnail({ theme, children, showError, imageSize, animate, roundLoader, }) {
    const spinValue = useRef(new Animated.Value(0));
    useEffect(() => {
        if (!animate)
            return;
        const animation = Animated.timing(spinValue.current, {
            duration: 1150,
            easing: Easing.linear,
            toValue: 1,
            useNativeDriver: true,
        });
        const loop = Animated.loop(animation);
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
    return (_jsxs(View, { style: styles.container, children: [_jsx(Svg, { height: imageSize + PADDING, style: styles.loader, viewBox: `0 0 ${imageSize + PADDING} ${imageSize + PADDING}`, width: imageSize + PADDING, children: animate && (_jsx(AnimatedRect, { fill: "transparent", height: imageSize + INTERNAL_PADDING, rx: rx, stroke: showError ? "transparent" : theme.colors.accentText, strokeDasharray: "100 300", strokeDashoffset: spin, strokeWidth: 3, width: imageSize + INTERNAL_PADDING, x: "2", y: "2" })) }), showError && (_jsx(View, { style: [
                    {
                        borderColor: theme.colors.borderColor,
                        borderRadius: radius.lg,
                        borderWidth: 3,
                        height: imageSize + INTERNAL_PADDING,
                        position: "absolute",
                        width: imageSize + INTERNAL_PADDING,
                    },
                ] })), children] }));
}
const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
    },
    loader: {
        position: "absolute",
    },
});
export default WalletLoadingThumbnail;
//# sourceMappingURL=WalletLoadingThumbnail.js.map