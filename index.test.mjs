import { jest } from '@jest/globals';
import { registerHandlers } from './index.mjs';
import defaultExport from './index.mjs';

// Jest ESM mocking
const createMockLogger = () => ({
  error: jest.fn(),
  warn: jest.fn(),
  debug: jest.fn()
});

describe('registerHandlers (ESM)', () => {
  let events;
  let mockLogger;
  let mockProcess;
  let removeHandlers;

  beforeEach(() => {
    events = {};
    mockLogger = createMockLogger();
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

  test('should call logger.debug on exit', () => {
    events.exit(0);
    expect(mockLogger.debug).toHaveBeenCalledWith('Process exiting with code: 0');
  });

  test('should provide a removeHandlers function', () => {
    expect(typeof removeHandlers).toBe('function');
  });
});

describe('default export (ESM)', () => {
  let events;
  let mockLogger;
  let mockProcess;
  let removeHandlers;

  beforeEach(() => {
    events = {};
    mockLogger = createMockLogger();
    mockProcess = {
      on: (event, handler) => { events[event] = handler; },
      off: jest.fn()
    };
    ({ removeHandlers } = defaultExport(mockProcess, mockLogger));
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

  test('should call logger.debug on exit', () => {
    events.exit(0);
    expect(mockLogger.debug).toHaveBeenCalledWith('Process exiting with code: 0');
  });

  test('should provide a removeHandlers function', () => {
    expect(typeof removeHandlers).toBe('function');
  });
});
