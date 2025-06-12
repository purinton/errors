// Minimal CommonJS test stub
const { registerHandlers } = require('./index.cjs');
const { test, expect, describe, beforeEach } = require('@jest/globals');

describe('registerHandlers (CJS)', () => {
  let events;
  let mockLogger;
  let mockProcess;
  let removeHandlers;

  beforeEach(() => {
    events = {};
    mockLogger = {
      error: jest.fn(),
      warn: jest.fn(),
      info: jest.fn()
    };
    mockProcess = {
      on: (event, handler) => { events[event] = handler; },
      off: jest.fn()
    };
    ({ removeHandlers } = registerHandlers(mockProcess, mockLogger));
  });

  test('should call logger.error on uncaughtException', () => {
    events.uncaughtException(new Error('fail'));
    expect(mockLogger.error).toHaveBeenCalledWith('Uncaught Exception:', expect.any(Error));
  });

  test('should call logger.error on unhandledRejection', () => {
    events.unhandledRejection('reason', 'promise');
    expect(mockLogger.error).toHaveBeenCalledWith('Unhandled Rejection at:', 'promise', 'reason:', 'reason');
  });

  test('should call logger.warn on warning', () => {
    events.warning({ name: 'Warn', message: 'msg' });
    expect(mockLogger.warn).toHaveBeenCalledWith('Warning:', 'Warn', 'msg');
  });

  test('should call logger.info on exit', () => {
    events.exit(0);
    expect(mockLogger.info).toHaveBeenCalledWith('Process exiting with code: 0');
  });

  test('should provide a removeHandlers function', () => {
    expect(typeof removeHandlers).toBe('function');
  });
});
