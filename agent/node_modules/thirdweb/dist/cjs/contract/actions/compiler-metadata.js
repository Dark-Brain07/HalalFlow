"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatCompilerMetadata = formatCompilerMetadata;
/**
 * Formats the compiler metadata into a standardized format.
 * @param metadata - The compiler metadata to be formatted.
 * @returns The formatted metadata.
 * @internal
 */
function formatCompilerMetadata(
// biome-ignore lint/suspicious/noExplicitAny: TODO: fix later
metadata) {
    let meta = metadata;
    if ("source_metadata" in metadata) {
        meta = metadata.source_metadata;
    }
    const compilationTarget = meta.settings.compilationTarget;
    const targets = Object.keys(compilationTarget);
    const name = compilationTarget[targets[0]];
    const info = {
        author: meta.output.devdoc.author,
        details: meta.output.devdoc.detail,
        notice: meta.output.userdoc.notice,
        title: meta.output.devdoc.title,
    };
    const licenses = [
        ...new Set(
        // biome-ignore lint/suspicious/noExplicitAny: TODO: fix later
        Object.entries(meta.sources).map(([, src]) => src.license)),
    ];
    return {
        abi: meta?.output?.abi || [],
        info,
        isPartialAbi: meta.isPartialAbi,
        licenses,
        metadata: meta,
        name,
        zk_version: metadata.zk_version,
    };
}
//# sourceMappingURL=compiler-metadata.js.map