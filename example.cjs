const { registerExceptionHandlers } = require('@purinton/errors');

const { removeHandlers } = registerExceptionHandlers();

// Simulate an uncaught exception for demonstration
setTimeout(() => { throw new Error('Demo uncaught exception'); }, 1000);

// To remove handlers (for testability):
//removeHandlers();
