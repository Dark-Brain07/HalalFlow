import type { ThirdwebClient } from "../../../../client/client.js";
import { type Theme } from "../../../core/design-system/index.js";
/**
 * @internal
 */
export declare const Img: React.FC<{
    width?: string;
    height?: string;
    src?: string;
    alt?: string;
    loading?: "eager" | "lazy";
    className?: string;
    style?: React.CSSProperties;
    fallbackImage?: string;
    fallback?: React.ReactNode;
    client: ThirdwebClient;
    skeletonColor?: keyof Theme["colors"];
}>;
//# sourceMappingURL=Img.d.ts.map