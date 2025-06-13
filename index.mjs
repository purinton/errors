import log from '@purinton/log';

/**
 * Registers process-level exception handlers for uncaught exceptions, unhandled rejections, warnings, and exit events.
 * @param {Object} options
 * @param {Object} [options.processObj=process] - The process object to attach handlers to.
 * @param {Object} [options.logger=log] - Logger for output.
 * @returns {Object} { removeHandlers } - Function to remove all registered handlers (for testability).
 */
export const registerHandlers = ({
  processObj = process,
  logger = log
} = {}) => {
  const handlers = {
    uncaughtException: (err) => logger.error('Uncaught Exception:', err),
    unhandledRejection: (reason, promise) => logger.error('Unhandled Rejection at:', promise, 'reason:', reason),
    warning: (warning) => logger.warn('Warning:', warning.name, warning.message),
    exit: (code) => logger.debug(`Process exiting with code: ${code}`)
  };
  processObj.on('uncaughtException', handlers.uncaughtException);
  processObj.on('unhandledRejection', handlers.unhandledRejection);
  processObj.on('warning', handlers.warning);
  processObj.on('exit', handlers.exit);
  const removeHandlers = () => {
    processObj.off('uncaughtException', handlers.uncaughtException);
    processObj.off('unhandledRejection', handlers.unhandledRejection);
    processObj.off('warning', handlers.warning);
    processObj.off('exit', handlers.exit);
  };
  return { removeHandlers };
};

export default registerHandlers;
