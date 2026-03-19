# @sj-distributor/eslint-config

基于最新的 ESLint Flat Config (v9+)，提供开箱即用的 React + TypeScript 最佳实践。

[English Documentation](./README.md)

## 特性

- **现代化**: 基于 ESLint Flat Config，摒弃旧的 `.eslintrc`
- **全能**: 内置 JavaScript, TypeScript, React (含 Hooks, Refresh & Extra), Stylistic (格式化), Unicorn 等规则
- **简化**: 规则前缀已简化别名 (例如 TypeScript 使用 `ts/`, 格式化使用 `@stylistic/`)
- **强类型**: 提供完整的 TypeScript 类型提示，编写配置不再盲猜
- **零配置**: 默认启用最佳实践，无需繁琐配置
- **灵活**: 支持通过简单的 API 进行自定义和规则覆盖

## 安装

```bash
pnpm add -D eslint @sj-distributor/eslint-config
```

或者使用 npm/yarn:

```bash
npm install -D eslint @sj-distributor/eslint-config
# 或
yarn add -D eslint @sj-distributor/eslint-config
```

> 注意：本项目依赖 ESLint v9+ 和 TypeScript v5+。

## 快速开始

在项目根目录创建 `eslint.config.ts` 文件：

```typescript
import { avenger } from '@sj-distributor/eslint-config';

export default avenger();
```

> **提示**：如果您使用 `.ts` 配置文件，请确保您的开发环境支持加载 TS 模块（如安装 `jiti` 或 `tsx`）。VS Code ESLint 插件通常开箱即用，但可能需要几秒钟来初始化 TypeScript 运行时。

这就完了！你现在已经拥有了完整的 Lint 规则。

## 配置选项

`avenger` 函数接收两个参数：

1.  **Options**: 功能开关和基础配置
2.  **UserConfigs**: (可选) 用户自定义覆盖配置，支持任意多个

### 基础配置 (Options)

```typescript
export default avenger({
  // 启用/禁用特定模块 (默认全部启用)
  react: true,       // 包含 React, Hooks, Refresh
  typescript: true,  // 包含 TS 推荐规则
  stylistic: true,   // 包含代码风格和格式化规则
  unicorn: true,     // 包含 Unicorn 强力规则

  // 自定义忽略文件 (合并到默认忽略列表)
  ignores: ['**/temp', 'src/legacy/**/*.ts'],
});
```

### 高级配置

某些模块支持更细粒度的配置，包括模块特定的规则覆盖：

```typescript
export default avenger({
  // TypeScript 配置
  typescript: {
    files: ['**/*.ts', '**/*.tsx'], // 仅扫描特定文件
    tsconfigPath: 'tsconfig.json', // 启用类型感知 Lint
    overrides: {
      'ts/no-explicit-any': 'error', // 仅覆盖 TS 模块的特定规则 (前缀: ts/)
    },
  },

  // React 配置
  react: {
    files: ['**/*.tsx'], 
    typescript: true, // 启用 React 的 TS 支持 (默认跟随全局 TS 开关)
    overrides: {
      'react-hooks/exhaustive-deps': 'warn',
    },
  },

  // Stylistic 配置 (替代 Prettier)
  stylistic: {
    indent: 2,           // 缩进空格数
    quotes: 'single',    // 引号类型: 'single' | 'double'
    semi: true,          // 是否使用分号
    jsx: true,           // 是否启用 JSX 格式化
    
    // 覆盖具体的 Stylistic 规则
    overrides: {
      '@stylistic/jsx-max-props-per-line': ['error', { maximum: 1 }],
    },
  },
});
```

## 规则覆盖 (Override)

你有两种方式来覆盖规则：

1.  **模块特定覆盖 (Module-Specific)**: 在每个模块配置中使用 `overrides` 属性（如上所示）。
2.  **全局覆盖 (Global)**: 将标准的 ESLint Flat Config 对象作为 `avenger` 函数的后续参数传入。

**优先级顺序**：用户全局覆盖 > 模块特定覆盖 > 项目默认值 > 官方推荐规则。

### 示例: 全局覆盖

```typescript
export default avenger(
  { react: true, typescript: true },
  
  // 用户自定义配置对象
  {
    rules: {
      // 全局关闭 console 警告
      'no-console': 'off',
      
      // 修改 React Hooks 规则
      'react-hooks/exhaustive-deps': 'warn',
    },
  }
);
```

### 示例: 针对特定文件覆盖

利用 Flat Config 的 `files` 属性，只对部分文件应用规则：

```typescript
export default avenger(
  {}, // 使用默认配置
  
  // 针对测试文件的特殊规则
  {
    files: ['test/**/*.ts', '**/*.test.ts'],
    rules: {
      'no-console': 'off',
      'ts/no-explicit-any': 'off',
    },
  },
  
  // 针对旧代码的宽松规则
  {
    files: ['src/legacy/**/*.js'],
    rules: {
      'unicorn/filename-case': 'off',
    },
  }
);
```

## 类型感知 Lint (Type-Aware Linting)

如果你想启用强大的类型感知规则（例如检查未处理的 Promise 或误用的 Promise），请在 typescript 配置中提供 `tsconfigPath` 选项：

```typescript
export default avenger({
  typescript: {
    tsconfigPath: 'tsconfig.json',
  },
});
```

这将自动启用一系列严格的类型检查规则。请注意，这可能会略微增加 Lint 的运行时间。

## VS Code 集成

为了获得最佳的开发体验（自动修复、高亮），请确保安装 [VS Code ESLint 扩展](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)，并在项目 `.vscode/settings.json` 中添加以下配置：

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

## 常见问题

### 为什么不需要 Prettier？
本配置集成了 `@stylistic/eslint-plugin`，它提供了一套完整的代码格式化规则（缩进、空格、逗号等），完全可以替代 Prettier。这样做的好处是统一了工具链，避免了 ESLint 和 Prettier 之间的冲突。

### 如何查看当前生效的所有规则？
你可以使用 [eslint-config-inspector](https://github.com/eslint/config-inspector) 来可视化查看最终生成的配置：

```bash
npx @eslint/config-inspector
```

## License

MIT
