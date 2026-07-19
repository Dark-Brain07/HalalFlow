import * as logger from "./logger.js";
export var logging;
(function (logging) {
    logging.LogLevel = logger.LogLevel;
    /**
     * Console logger implementation that outputs to the console.
     */
    logging.ConsoleLogger = logger.ConsoleLogger;
})(logging || (logging = {}));
//# sourceMappingURL=exports.js.map