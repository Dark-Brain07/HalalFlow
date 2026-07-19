"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useIsMobile = useIsMobile;
const React = require("react");
const MOBILE_BREAKPOINT = 640;
function useIsMobile() {
    const [isMobile, setIsMobile] = React.useState(undefined);
    React.useEffect(() => {
        const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
        const onChange = () => {
            setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
        };
        mql.addEventListener("change", onChange);
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
        return () => mql.removeEventListener("change", onChange);
    }, []);
    return !!isMobile;
}
//# sourceMappingURL=useisMobile.js.map