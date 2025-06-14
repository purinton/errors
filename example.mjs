import log from '@purinton/log';
import { registerHandlers } from '@purinton/errors';
const { removeHandlers } = registerHandlers({ log });
throw new Error('Demo uncaught exception');
