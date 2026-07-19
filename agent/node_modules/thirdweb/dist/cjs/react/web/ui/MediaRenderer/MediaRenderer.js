"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkPlayer = exports.IframePlayer = exports.MediaRenderer = void 0;
exports.mergeRefs = mergeRefs;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const icons_js_1 = require("./icons.js");
const useResolvedMediaType_js_1 = require("./useResolvedMediaType.js");
/**
 * Component that renders any asset stored on IPFS (or anywhere else), given the IPFS URI / URL.
 *
 * If an IPFS url is given, the asset is fetched from IPFS through the thirdweb IPFS gateway by default. You can also specify a custom gateway URL using the `gatewayUrl` prop.
 *
 * The [mime type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types) of the
 * asset is determined and the appropriate component is rendered on the UI.
 *
 * For example, if the URI points to an image, the `img` tag will be used. If it is a video, the `video` tag will be used, etc.
 * The component currently supports:
 *
 * - Images
 * - Videos
 * - Audio files
 * - SVGs (for [on-chain NFTs](https://blog.thirdweb.com/guides/how-to-create-on-chain-nfts-with-thirdweb/))
 * - `iframe` and `HTML`
 * - If none of these are appropriate, the fallback is a link to the asset
 *
 * The default size of rendered media is 300px x 300px, but this can be changed using the `width` and `height` props.
 *
 * You can use thirdweb CLI to upload any file to IPFS and get the IPFS URI
 *
 * Note: This component no longer supports 3D models as of v5.92.0!
 *
 * `npx thirdweb upload <path/to/file>`
 * @example
 * ```tsx
 * import { MediaRenderer } from "thirdweb/react";
 *
 * const client = createThirdwebClient({ clientId: "..." });
 *
 * function Home() {
 * 	return (
 * 		<MediaRenderer client={client} src="ipfs://QmV4HC9fNrPJQeYpbW55NLLuSBMyzE11zS1L4HmL6Lbk7X" />
 * 	);
 * }
 * ```
 * @param props - Refer to [`MediaRendererProps`](https://portal.thirdweb.com/references/typescript/v5/MediaRendererProps) to see the available props.
 */
exports.MediaRenderer = (() => (0, react_1.forwardRef)(function Media_Renderer({ src, poster, alt, gatewayUrl, requireInteraction = false, width = "300px", height = "300px", style, mimeType, client, controls, className, }, ref) {
    const mergedStyle = {
        objectFit: "contain",
        ...style,
    };
    const { mediaInfo, isFetched: mediaInfoIsFetched } = (0, useResolvedMediaType_js_1.useResolvedMediaType)(client, src ?? undefined, mimeType, gatewayUrl);
    const { mediaInfo: possiblePosterSrc } = (0, useResolvedMediaType_js_1.useResolvedMediaType)(client, poster ?? undefined, undefined, gatewayUrl);
    if (!mediaInfoIsFetched || !src) {
        return (0, jsx_runtime_1.jsx)("div", { className: className, style: style });
    }
    if (mediaInfo.mimeType) {
        // html content
        if (mediaInfo.mimeType.startsWith("text/html")) {
            return ((0, jsx_runtime_1.jsx)(exports.IframePlayer, { alt: alt, className: className, poster: possiblePosterSrc.url, ref: ref, requireInteraction: requireInteraction, src: mediaInfo.url, style: mergedStyle }));
        }
        // 3d model
        if (mediaInfo.mimeType.startsWith("model")) {
            console.error("Encountered an unsupported media type. 3D model support was removed in v5.92.0. To add a 3D model to your app, use @google/model-viewer and use the ModelViewer component.");
            // show poster
            if (possiblePosterSrc.mimeType?.startsWith("image/")) {
                return ((0, jsx_runtime_1.jsx)(ImageRenderer, { alt: alt, className: className, height: height, ref: ref, src: possiblePosterSrc.url, style: mergedStyle, width: width }));
            }
        }
        //  video
        if (mediaInfo.mimeType.startsWith("video")) {
            return ((0, jsx_runtime_1.jsx)(VideoPlayer, { className: className, controls: controls, poster: possiblePosterSrc.mimeType?.startsWith("image/")
                    ? possiblePosterSrc.url
                    : undefined, ref: ref, requireInteraction: requireInteraction, src: mediaInfo.url, style: mergedStyle }));
        }
        // audio
        if (mediaInfo.mimeType.startsWith("audio")) {
            return ((0, jsx_runtime_1.jsx)(AudioPlayer, { alt: alt, className: className, controls: controls, height: height, poster: possiblePosterSrc.url, ref: ref, src: mediaInfo.url, style: mergedStyle, width: width }));
        }
        // image
        if (mediaInfo.mimeType.startsWith("image/")) {
            return ((0, jsx_runtime_1.jsx)(ImageRenderer, { alt: alt, className: className, height: height, ref: ref, src: mediaInfo.url, style: mergedStyle, width: width }));
        }
    }
    // unknown mime types or no mime type
    return ((0, jsx_runtime_1.jsx)(exports.LinkPlayer, { alt: alt, className: className, ref: ref, src: mediaInfo.url, style: mergedStyle }));
}))();
const PlayButton = ({ onClick, isPlaying }) => {
    const [isHovering, setIsHovering] = (0, react_1.useState)(false);
    const onMouseEnter = () => setIsHovering(true);
    const onMouseLeave = () => setIsHovering(false);
    const onMouseDown = () => setIsHovering(false);
    const onMouseUp = () => setIsHovering(true);
    return ((0, jsx_runtime_1.jsx)("button", { onClick: onClick, onMouseDown: onMouseDown, onMouseEnter: onMouseEnter, onMouseLeave: onMouseLeave, onMouseUp: onMouseUp, style: {
            backgroundColor: "#fff",
            border: "1px solid rgb(229, 232, 235)",
            borderRadius: "50%",
            bottom: 0,
            color: "rgb(138, 147, 155)",
            cursor: "pointer",
            display: "grid",
            height: "32px",
            padding: 0,
            placeItems: "center",
            position: "absolute",
            right: 0,
            transform: "translate(-25%, -25%)",
            width: "32px",
            zIndex: 3,
            ...(isHovering
                ? {
                    boxShadow: "rgb(4 17 29 / 25%) 0px 0px 8px 0px",
                    color: "rgb(53, 56, 64)",
                }
                : {}),
        }, type: "button", children: !isPlaying ? (0, jsx_runtime_1.jsx)(icons_js_1.CarbonPlayFilledAlt, {}) : (0, jsx_runtime_1.jsx)(icons_js_1.CarbonPauseFilled, {}) }));
};
const ImageRenderer = /* @__PURE__ */ (() => (0, react_1.forwardRef)(function Image_Renderer(props, ref) {
    const { style, src, alt, className, height, width } = props;
    const [error, setError] = (0, react_1.useState)(false);
    if (error) {
        return ((0, jsx_runtime_1.jsx)(exports.LinkPlayer, { alt: alt, className: className, ref: ref, src: src, style: style }));
    }
    return ((0, jsx_runtime_1.jsx)("img", { alt: alt, className: className, height: height, onError: () => {
            setError(true);
        }, ref: ref, src: src ?? undefined, style: style, width: width }));
}))();
const VideoPlayer = /* @__PURE__ */ (() => (0, react_1.forwardRef)(function Video_Player({ src, alt, poster, requireInteraction, style, width, height, controls, className, }, ref) {
    const videoRef = (0, react_1.useRef)(null);
    const [playing, setPlaying] = (0, react_1.useState)(!requireInteraction);
    const [muted, setMuted] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        if (videoRef.current) {
            if (playing) {
                try {
                    videoRef.current.play();
                }
                catch (err) {
                    console.error("Error playing video", err);
                }
            }
            else {
                try {
                    videoRef.current.pause();
                    videoRef.current.currentTime = 0;
                }
                catch (err) {
                    console.error("Error pausing video", err);
                }
            }
        }
    }, [playing]);
    if (error) {
        return ((0, jsx_runtime_1.jsx)(exports.LinkPlayer, { alt: alt, className: className, ref: ref, src: src, style: style }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: className, style: { position: "relative", ...style }, children: [(0, jsx_runtime_1.jsx)("video", { controls: controls, controlsList: "nodownload", height: height, loop: true, muted: muted, onCanPlay: () => {
                    if (playing) {
                        videoRef.current?.play();
                    }
                }, onError: () => {
                    setError(true);
                }, playsInline: true, poster: poster ?? undefined, preload: poster ? "metadata" : "auto", ref: mergeRefs([videoRef, ref]), src: src ?? undefined, style: {
                    height: "100%",
                    objectFit: "contain",
                    opacity: !poster ? 1 : playing ? 1 : 0,
                    transition: "opacity .5s",
                    width: "100%",
                    zIndex: 1,
                }, width: width }), poster && ((0, jsx_runtime_1.jsx)("img", { alt: alt, src: poster, style: {
                    bottom: 0,
                    height: "100%",
                    left: 0,
                    objectFit: "contain",
                    opacity: playing ? 0 : 1,
                    pointerEvents: "none",
                    position: "absolute",
                    right: 0,
                    top: 0,
                    transition: "opacity .5s",
                    width: "100%",
                    zIndex: 2,
                } })), (0, jsx_runtime_1.jsx)(PlayButton, { isPlaying: playing, onClick: () => {
                    setPlaying((prev) => !prev);
                    setMuted(false);
                } })] }));
}))();
const AudioPlayer = /* @__PURE__ */ (() => (0, react_1.forwardRef)(function Audio_Player({ src, alt, poster, style, height, width, className, controls }, ref) {
    const audioRef = (0, react_1.useRef)(null);
    const [playing, setPlaying] = (0, react_1.useState)(false);
    const [muted, setMuted] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        if (audioRef.current) {
            if (playing) {
                audioRef.current.play();
            }
            else {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
        }
    }, [playing]);
    if (error) {
        return ((0, jsx_runtime_1.jsx)(exports.LinkPlayer, { alt: alt, className: className, ref: ref, src: src, style: style }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: className, style: { position: "relative", ...style }, children: [poster ? ((0, jsx_runtime_1.jsx)("img", { alt: alt, height: height, src: poster, style: {
                    height: "100%",
                    objectFit: "contain",
                    pointerEvents: "none",
                    width: "100%",
                }, width: width })) : ((0, jsx_runtime_1.jsx)("div", { style: {
                    backgroundColor: "#fff",
                    color: "rgb(138, 147, 155)",
                    display: "grid",
                    height: "100%",
                    placeItems: "center",
                    pointerEvents: "none",
                    width: "100%",
                }, children: (0, jsx_runtime_1.jsx)(icons_js_1.CarbonDocumentAudio, { style: { height: "64px", width: "64px" } }) })), (0, jsx_runtime_1.jsx)(PlayButton, { isPlaying: playing, onClick: () => {
                    setPlaying((prev) => !prev);
                    setMuted(false);
                } }), (0, jsx_runtime_1.jsx)("audio", { controls: controls, controlsList: "nodownload", loop: true, muted: muted, onError: () => {
                    setError(true);
                }, playsInline: true, preload: "none", ref: mergeRefs([audioRef, ref]), src: src ?? undefined, style: {
                    opacity: 0,
                    pointerEvents: "none",
                    position: "absolute",
                    visibility: "hidden",
                    zIndex: -1,
                } })] }));
}))();
/**
 * @internal Exported for tests
 */
exports.IframePlayer = (() => (0, react_1.forwardRef)(function Iframe_Player({ src, alt, poster, requireInteraction, style, ...restProps }, ref) {
    const [playing, setPlaying] = (0, react_1.useState)(!requireInteraction);
    return ((0, jsx_runtime_1.jsxs)("div", { style: { position: "relative", ...style }, ...restProps, children: [(0, jsx_runtime_1.jsx)("iframe", { allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture", ref: ref, sandbox: "allow-scripts", src: playing ? (src ?? undefined) : undefined, style: {
                    border: "none",
                    height: "100%",
                    objectFit: "contain",
                    opacity: !poster ? 1 : playing ? 1 : 0,
                    transition: "opacity .5s",
                    width: "100%",
                    zIndex: 1,
                }, title: alt || "thirdweb iframe player" }), poster && ((0, jsx_runtime_1.jsx)("img", { alt: alt, src: poster, style: {
                    bottom: 0,
                    height: "100%",
                    left: 0,
                    objectFit: "contain",
                    opacity: playing ? 0 : 1,
                    pointerEvents: "none",
                    position: "absolute",
                    right: 0,
                    top: 0,
                    transition: "opacity .5s",
                    width: "100%",
                    zIndex: 2,
                } })), (0, jsx_runtime_1.jsx)(PlayButton, { isPlaying: playing, onClick: () => {
                    setPlaying((prev) => !prev);
                } })] }));
}))();
/**
 * @internal Exported for tests
 */
exports.LinkPlayer = (() => (0, react_1.forwardRef)(function Link_Player({ src, alt, style, className }, ref) {
    return ((0, jsx_runtime_1.jsx)("div", { className: className, style: { position: "relative", ...style }, children: (0, jsx_runtime_1.jsx)("div", { style: {
                backgroundColor: "#fff",
                color: "rgb(138, 147, 155)",
                display: "grid",
                height: "100%",
                placeItems: "center",
                width: "100%",
            }, children: (0, jsx_runtime_1.jsxs)("div", { style: {
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "column",
                    flexWrap: "nowrap",
                    gap: "8px",
                }, children: [(0, jsx_runtime_1.jsx)(icons_js_1.CarbonDocumentUnknown, { style: {
                            aspectRatio: "1",
                            maxWidth: "128px",
                            minWidth: "48px",
                            width: "50%",
                        } }), (0, jsx_runtime_1.jsx)("a", { href: src ?? undefined, ref: ref, rel: "noopener noreferrer", style: {
                            color: "rgb(138, 147, 155)",
                            textDecoration: "underline",
                        }, target: "_blank", children: alt || "File" })] }) }) }));
}))();
/**
 * @internal
 */
// biome-ignore lint/suspicious/noExplicitAny: TODO: fix any
function mergeRefs(refs) {
    return (value) => {
        for (const ref of refs) {
            if (typeof ref === "function") {
                ref(value);
            }
            else if (ref != null) {
                ref.current = value;
            }
        }
    };
}
//# sourceMappingURL=MediaRenderer.js.map