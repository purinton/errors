const { registerHandlers } = require('@purinton/errors');
const { removeHandlers } = registerHandlers();

// Simulate an uncaught exception for demonstration
setTimeout(() => { throw new Error('Demo uncaught exception'); }, 100);

// To remove handlers (for testability):
//removeHandlers();
