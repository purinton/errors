# @purinton/errors

[![npm version](https://img.shields.io/npm/v/@purinton/errors.svg)](https://www.npmjs.com/package/@purinton/errors)
[![license](https://img.shields.io/github/license/purinton/errors.svg)](LICENSE)
[![build status](https://github.com/purinton/errors/actions/workflows/nodejs.yml/badge.svg)](https://github.com/purinton/errors/actions)

> Minimal Node.js process-level error handler module

---

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [CommonJS](#commonjs)
  - [ESM](#esm)
- [API](#api)
- [Examples](#examples)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- Registers handlers for uncaught exceptions, unhandled rejections, warnings, and process exit events
- Pluggable logger (defaults to [@purinton/log](https://www.npmjs.com/package/@purinton/log))
- Easy to add/remove handlers for testability

## Installation

```sh
npm install @purinton/errors
```

## Usage

### CommonJS

```js
const { registerExceptionHandlers } = require('@purinton/errors');
registerExceptionHandlers();

// Simulate an uncaught exception
setTimeout(() => { throw new Error('Demo uncaught exception'); }, 1000);
```

### ESM

```js
import { registerExceptionHandlers } from '@purinton/errors';
registerExceptionHandlers();

// Simulate an uncaught exception
setTimeout(() => { throw new Error('Demo uncaught exception'); }, 1000);
```

## API

### `registerExceptionHandlers(processObj = process, logger = log)`

Registers process-level exception handlers. Returns an object with a `removeHandlers` function to detach all handlers (useful for testing).

- `processObj` (optional): The process object to attach handlers to (default: `process`)
- `logger` (optional): Logger for output (default: [@purinton/log](https://www.npmjs.com/package/@purinton/log))
- **Returns:** `{ removeHandlers: () => void }`

## Examples

See [`example.cjs`](./example.cjs) and [`example.mjs`](./example.mjs) for runnable usage demos.

## Development

- Edit the source files
- Update `package.json` metadata
- Add your code and tests
- Run `npm test` to verify

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check [issues page](https://github.com/purinton/errors/issues) or submit a pull request.

## License

This project is [MIT](LICENSE) licensed.
