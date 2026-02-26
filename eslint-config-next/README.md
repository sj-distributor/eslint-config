# @sj-distributor/eslint-config

The ESLint configuration for the SJ Distributor team, based on the latest ESLint Flat Config (v9+), offering out-of-the-box best practices for React + TypeScript.

[中文文档](./README_CN.md)

## Features

- **Modern**: Based on ESLint Flat Config, saying goodbye to `.eslintrc`.
- **All-in-One**: Built-in rules for JavaScript, TypeScript, React, Hooks, Stylistic (Formatting), Unicorn, and more.
- **Type-Safe**: Complete TypeScript type definitions, no more guessing configurations.
- **Zero-Config**: Enables best practices by default.
- **Flexible**: Easy customization and rule overrides via a simple API.

## Installation

```bash
pnpm add -D eslint @sj-distributor/eslint-config
```

> Note: This project requires ESLint v9+ and TypeScript v5+.

## Quick Start

Create an `eslint.config.ts` file in your project root:

```typescript
import { avenger } from '@sj-distributor/eslint-config';

export default avenger();
```

That's it! You now have a complete Linting setup.

## Configuration Options

The `avenger` function accepts two types of arguments:

1.  **Options**: Feature toggles and basic configuration.
2.  **UserConfigs**: (Optional) User override configurations, supporting multiple arguments.

### Basic Configuration (Options)

```typescript
export default avenger({
  // Enable/Disable specific modules (all enabled by default)
  react: true,       // Includes React, Hooks, Refresh
  typescript: true,  // Includes TS recommended rules
  stylistic: true,   // Includes code style and formatting rules
  unicorn: true,     // Includes Unicorn power rules

  // Custom ignores (merged with default ignores)
  ignores: ['**/temp', 'src/legacy/**/*.ts'],
});
```

### Advanced Configuration

Some modules support more granular configuration, including module-specific rule overrides:

```typescript
export default avenger({
  // TypeScript Configuration
  typescript: {
    files: ['**/*.ts', '**/*.tsx'], // Scan only specific files
    overrides: {
      '@typescript-eslint/no-explicit-any': 'error', // Override specific TS rules
    },
  },

  // React Configuration
  react: {
    files: ['**/*.tsx'], 
    typescript: true, // Enable TS support for React (defaults to global TS toggle)
    overrides: {
      'react/prop-types': 'off',
    },
  },

  // Stylistic Configuration (Replaces Prettier)
  stylistic: {
    indent: 2,           // Indentation spaces
    quotes: 'single',    // Quote style: 'single' | 'double'
    semi: true,          // Use semicolons
    jsx: true,           // Enable JSX formatting
    
    // Override specific Stylistic rules
    overrides: {
      '@stylistic/jsx-max-props-per-line': ['error', { maximum: 1 }],
    },
  },
});
```

## Rule Overrides

You can override rules in two ways:

1.  **Module-Specific Overrides**: Using the `overrides` property within each module config (as shown above).
2.  **Global Overrides**: Passing standard ESLint Flat Config objects as subsequent arguments to `avenger`.

**Priority**: User Global Overrides > Module Specific Overrides > Project Defaults > Official Recommended Rules.

### Example: Global Overrides

```typescript
export default avenger(
  { react: true, typescript: true },
  
  // User custom config object
  {
    rules: {
      // Disable console warnings globally
      'no-console': 'off',
      
      // Modify React Hooks rules
      'react-hooks/exhaustive-deps': 'warn',
    },
  }
);
```

### Example: File-Specific Overrides

Leverage Flat Config's `files` property to apply rules only to specific files:

```typescript
export default avenger(
  {}, // Use default options
  
  // Rules for test files
  {
    files: ['test/**/*.ts', '**/*.test.ts'],
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  
  // Relaxed rules for legacy code
  {
    files: ['src/legacy/**/*.js'],
    rules: {
      'unicorn/filename-case': 'off',
    },
  }
);
```

## VS Code Integration

For the best development experience (auto-fix, highlighting), install the [VS Code ESLint Extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and add the following to your project's `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "never"
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ]
}
```

## FAQ

### Why no Prettier?
This config integrates `@stylistic/eslint-plugin`, providing a complete set of code formatting rules (indentation, spacing, quotes, etc.), fully replacing Prettier. This unifies the toolchain and avoids conflicts between ESLint and Prettier.

### How to inspect current rules?
Use [eslint-config-inspector](https://github.com/eslint/config-inspector) to visualize the final configuration:

```bash
npx @eslint/config-inspector
```

## License

MIT
