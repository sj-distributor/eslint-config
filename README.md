# @sj-distributor/eslint-config

[![npm version](https://img.shields.io/npm/v/@sj-distributor/eslint-config.svg)](https://www.npmjs.com/package/@sj-distributor/eslint-config)
[![license](https://img.shields.io/npm/l/@sj-distributor/eslint-config.svg)](https://github.com/sj-distributor/eslint-config/blob/main/LICENSE)

🚀 **SJ Distributor Avenger Team ESLint Config** - A modern, opinionated ESLint configuration for JavaScript, TypeScript, and React projects.

> [!WARNING]
> Requires ESLint version **v9.18.0** or higher.

## ✨ Features

- 🎯 **Zero Config** - Works out of the box with sensible defaults
- 🔧 **Highly Configurable** - Customize rules to fit your project needs
- 📦 **Modular Design** - Enable only the features you need
- 🚀 **Modern Standards** - Built for ESLint v9+ flat config
- 🎨 **Code Style** - Integrated with @stylistic for consistent formatting
- ⚡ **Performance** - Optimized for fast linting with smart defaults
- 🔍 **Type-Aware** - Full TypeScript support with type-aware rules
- ⚛️ **React Ready** - Comprehensive React and React Native support

## 📦 Installation

```bash
# Using pnpm (recommended)
pnpm add -D eslint @sj-distributor/eslint-config

# Using npm
npm install -D eslint @sj-distributor/eslint-config

# Using yarn
yarn add -D eslint @sj-distributor/eslint-config
```

## 🚀 Quick Start

### Basic Usage

Create an `eslint.config.mjs` file in your project root:

```js
// eslint.config.mjs
import { avenger } from '@sj-distributor/eslint-config';

export default avenger();
```

### TypeScript Project

```js
// eslint.config.mjs
import { avenger } from '@sj-distributor/eslint-config';

export default avenger({
  typescript: true,
  stylistic: true,
});
```

### React Project

```js
// eslint.config.mjs
import { avenger } from '@sj-distributor/eslint-config';

export default avenger({
  typescript: true,
  react: true,
  stylistic: {
    jsx: true,
    quotes: 'single',
    semi: true,
  },
});
```

### React Native Project

```js
// eslint.config.mjs
import { avenger } from '@sj-distributor/eslint-config';

export default avenger({
  typescript: true,
  react: true,
  reactnative: true,
});
```

## ⚙️ Configuration Options

### Core Options

```js
avenger({
  // Enable TypeScript support (auto-detected)
  typescript: true,
  
  // Enable stylistic formatting rules
  stylistic: {
    jsx: true,        // Enable JSX formatting
    quotes: 'single', // 'single' | 'double'
    semi: true,       // Enable semicolons
    indent: 2,        // Indentation size
  },
  
  // Enable React support
  react: true,
  
  // Enable React Native support
  reactnative: true,
  
  // Custom ignore patterns
  ignores: {
    customIgnores: ['custom-dir/**'],
  },
});
```

### TypeScript Configuration

```js
avenger({
  typescript: {
    // Path to tsconfig.json for type-aware rules
    tsconfigPath: './tsconfig.json',
    
    // Custom parser options
    parserOptions: {
      project: './tsconfig.json',
    },
    
    // Override specific rules
    overrides: {
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
});
```

### Advanced Usage

```js
import { avenger } from '@sj-distributor/eslint-config';

export default avenger(
  {
    typescript: true,
    react: true,
    stylistic: true,
  },
  // Add custom configs
  {
    files: ['**/*.test.ts'],
    rules: {
      'no-console': 'off',
    },
  },
  // Add more custom configs...
);
```

## 📋 Included Configurations

### Core Configurations
- **JavaScript** - Essential JavaScript rules and best practices
- **TypeScript** - Comprehensive TypeScript support with type-aware rules
- **Ignores** - Default ignore patterns for common files and directories

### Framework Configurations
- **React** - React-specific rules and hooks validation
- **React Native** - React Native optimized rules

### Tool Integrations
- **Import/Export** - Import ordering and validation via `eslint-plugin-import-x`
- **Stylistic** - Code formatting rules via `@stylistic/eslint-plugin`
- **Unused Imports** - Automatic unused import detection and removal
- **Type-Aware Rules** - Advanced TypeScript type checking
- **Modern JavaScript** - ES2022+ features support

## 🗂️ Configuration Architecture

Our configuration uses a flat architecture where all configuration files are stored directly in the `src/configs/` directory:

### 📁 Configuration File Structure

```
src/configs/
├── ignores.ts     # Default ignore mode
├── javascript.ts  # Basic JavaScript rules
├── typescript.ts  # TypeScript language support
├── react.ts       # React framework rules
├── import-x.ts    # Import/export rules
├── stylistic.ts   # Code style rules
└── index.ts       # Unified export
```

### 🎯 Adding New Configurations

When you need to add new configurations, please follow these steps:

1. **Create configuration file** - Create a new `.ts` file in the `src/configs/` directory
2. **Implement configuration function** - Export a configuration function that follows the standard
3. **Update index file** - Add the export in `src/configs/index.ts`
4. **Update main configuration** - Integrate the new configuration in `src/main.ts`
5. **Update documentation** - Add usage instructions in README

### 📝 Configuration File Naming Convention

- Use lowercase letters and hyphens: `kebab-case.ts`
- File names should be concise and clear, reflecting the configuration purpose
- Each configuration file should export a default function
- Re-export in `index.ts`

## 🎯 Rule Philosophy

Our configuration follows these principles:

- **🛡️ Safety First** - Prevent common bugs and runtime errors
- **📖 Readability** - Enforce consistent and readable code style
- **🚀 Modern Practices** - Encourage modern JavaScript/TypeScript patterns
- **⚡ Performance** - Avoid performance anti-patterns
- **🔧 Flexibility** - Easy to customize and extend

## 🔧 Development

```bash
# Install dependencies
pnpm install

# Build the package
pnpm build

# Run linting
pnpm lint

# Fix linting issues
pnpm lint:fix

# Type checking
pnpm typecheck

# Generate ESLint types
pnpm eslint:typegen

# Start config inspector
pnpm dev
```

## 📚 Migration Guide

### From ESLint v8

If you're migrating from ESLint v8, you'll need to:

1. Update to ESLint v9+
2. Convert your `.eslintrc.*` to `eslint.config.mjs`
3. Update your configuration format

```js
// Old (.eslintrc.js)
module.exports = {
  extends: ['@sj-distributor/eslint-config'],
};

// New (eslint.config.mjs)
import { avenger } from '@sj-distributor/eslint-config';
export default avenger();
```

## 📄 License

[MIT](./LICENSE) © 2024 SJ Distributor Avenger Team

## 🙏 Acknowledgments

This configuration is inspired by and built upon:
- [@antfu/eslint-config](https://github.com/antfu/eslint-config)
- [ESLint Stylistic](https://eslint.style/)
- [TypeScript ESLint](https://typescript-eslint.io/)
- [ESLint React](https://github.com/Rel1cx/eslint-react)
