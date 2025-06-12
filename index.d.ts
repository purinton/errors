import log from '@purinton/log';

/**
 * Registers process-level exception handlers for uncaught exceptions, unhandled rejections, warnings, and exit events.
 * @param processObj The process object to attach handlers to (default: process).
 * @param logger Logger for output (default: log).
 * @returns { removeHandlers } Function to remove all registered handlers (for testability).
 */
export declare function registerHandlers(
  processObj?: NodeJS.Process,
  logger?: typeof log
): { removeHandlers: () => void };
