const log = require('@purinton/log');
const { registerHandlers } = require('@purinton/errors');
const { removeHandlers } = registerHandlers({ log });
throw new Error('Demo uncaught exception');
