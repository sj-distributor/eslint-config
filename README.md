# SJ Distributor ESLint config

> [!WARNING]
> Requires eslint version v9.6.0 or higher.

## Installation

```bash
pnpm install -D eslint @sj-distributor/eslint-config
```

## Usage

1. Create a eslint.config.mjs file in the project root directory. (Already created, can be ignored)

2. Add the following configuration to the eslint.config.mjs file:

```js
// eslint.config.mjs
import { sjAvenger } from '@sj-distributor/eslint-config';

export default sjAvenger();
```

## License

[MIT](./LICENSE)
