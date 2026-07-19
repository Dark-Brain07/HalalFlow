import { logGetInjectedProviderError } from '../../../core/telemetry/events/provider.js';
import { parseErrorMessageFromAny } from '../../../core/telemetry/utils.js';
const TBA_PROVIDER_IDENTIFIER = 'isCoinbaseBrowser';
export function getInjectedProvider() {
    try {
        const injectedProvider = window.top?.ethereum ?? window.ethereum;
        if (injectedProvider?.[TBA_PROVIDER_IDENTIFIER]) {
            return injectedProvider;
        }
        return null;
    }
    catch (error) {
        logGetInjectedProviderError({
            errorMessage: parseErrorMessageFromAny(error),
        });
        return null;
    }
}
//# sourceMappingURL=getInjectedProvider.js.map