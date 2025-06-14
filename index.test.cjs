// Minimal CommonJS test stub
const { registerHandlers, default: defaultExport } = require('./index.cjs');
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
      debug: jest.fn()
    };
    mockProcess = {
      on: (event, handler) => { events[event] = handler; },
      off: jest.fn()
    };
    ({ removeHandlers } = registerHandlers({ processObj: mockProcess, log: mockLogger }));
  });

  test('should call logger.error on uncaughtException', () => {
    events.uncaughtException(new Error('fail'));
    expect(mockLogger.error).toHaveBeenCalledWith('Uncaught Exception', expect.objectContaining({
      name: 'Error',
      message: 'fail',
      stack: expect.any(String),
      error: expect.any(Error)
    }));
  });

  test('should call logger.error on unhandledRejection', () => {
    const err = new Error('reason');
    events.unhandledRejection(err, 'promise');
    expect(mockLogger.error).toHaveBeenCalledWith('Unhandled Rejection', expect.objectContaining({
      reason: expect.objectContaining({
        name: 'Error',
        message: 'reason',
        stack: expect.any(String),
        error: expect.any(Error)
      }),
      promise: 'promise'
    }));
  });

  test('should call logger.warn on warning', () => {
    const warning = { name: 'Warn', message: 'msg', stack: 'stack' };
    events.warning(warning);
    expect(mockLogger.warn).toHaveBeenCalledWith('Warning', expect.objectContaining({
      name: 'Warn',
      message: 'msg',
      stack: 'stack',
      warning
    }));
  });

  test('should call logger.debug on exit', () => {
    events.exit(0);
    expect(mockLogger.debug).toHaveBeenCalledWith('Process Exiting', { code: 0 });
  });

  test('should provide a removeHandlers function', () => {
    expect(typeof removeHandlers).toBe('function');
  });
});

describe('default export (CJS)', () => {
  let events;
  let mockLogger;
  let mockProcess;
  let removeHandlers;

  beforeEach(() => {
    events = {};
    mockLogger = {
      error: jest.fn(),
      warn: jest.fn(),
      debug: jest.fn()
    };
    mockProcess = {
      on: (event, handler) => { events[event] = handler; },
      off: jest.fn()
    };
    ({ removeHandlers } = defaultExport({ processObj: mockProcess, log: mockLogger }));
  });

  test('should call logger.error on uncaughtException', () => {
    events.uncaughtException(new Error('fail'));
    expect(mockLogger.error).toHaveBeenCalledWith('Uncaught Exception', expect.objectContaining({
      name: 'Error',
      message: 'fail',
      stack: expect.any(String),
      error: expect.any(Error)
    }));
  });

  test('should call logger.error on unhandledRejection', () => {
    const err = new Error('reason');
    events.unhandledRejection(err, 'promise');
    expect(mockLogger.error).toHaveBeenCalledWith('Unhandled Rejection', expect.objectContaining({
      reason: expect.objectContaining({
        name: 'Error',
        message: 'reason',
        stack: expect.any(String),
        error: expect.any(Error)
      }),
      promise: 'promise'
    }));
  });

  test('should call logger.warn on warning', () => {
    const warning = { name: 'Warn', message: 'msg', stack: 'stack' };
    events.warning(warning);
    expect(mockLogger.warn).toHaveBeenCalledWith('Warning', expect.objectContaining({
      name: 'Warn',
      message: 'msg',
      stack: 'stack',
      warning
    }));
  });

  test('should call logger.debug on exit', () => {
    events.exit(0);
    expect(mockLogger.debug).toHaveBeenCalledWith('Process Exiting', { code: 0 });
  });

  test('should provide a removeHandlers function', () => {
    expect(typeof removeHandlers).toBe('function');
  });
});
