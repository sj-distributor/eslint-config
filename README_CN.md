# @sj-distributor/eslint-config

[![npm version](https://img.shields.io/npm/v/@sj-distributor/eslint-config.svg)](https://www.npmjs.com/package/@sj-distributor/eslint-config)
[![license](https://img.shields.io/npm/l/@sj-distributor/eslint-config.svg)](https://github.com/sj-distributor/eslint-config/blob/main/LICENSE)

🚀 **SJ Distributor Avenger Team ESLint 配置** - 一个现代化、有主见的 ESLint 配置，适用于 JavaScript、TypeScript 和 React 项目。

> [!WARNING]
> 需要 ESLint 版本 **v9.18.0** 或更高。

## ✨ 特性

- 🎯 **零配置** - 开箱即用，具有合理的默认设置
- 🔧 **高度可配置** - 自定义规则以适应您的项目需求
- 📦 **模块化设计** - 仅启用您需要的功能
- 🚀 **现代标准** - 为 ESLint v9+ 扁平配置而构建
- 🎨 **代码风格** - 与 @stylistic 集成，确保一致的格式化
- ⚡ **性能优化** - 通过智能默认设置优化快速检查
- 🔍 **类型感知** - 完整的 TypeScript 支持和类型感知规则
- ⚛️ **React 就绪** - 全面的 React 和 React Native 支持

## 📦 安装

```bash
# 使用 pnpm（推荐）
pnpm add -D eslint @sj-distributor/eslint-config

# 使用 npm
npm install -D eslint @sj-distributor/eslint-config

# 使用 yarn
yarn add -D eslint @sj-distributor/eslint-config
```

## 🚀 快速开始

### 基础用法

在项目根目录创建 `eslint.config.mjs` 文件：

```js
// eslint.config.mjs
import { avenger } from '@sj-distributor/eslint-config';

export default avenger();
```

### TypeScript 项目

```js
// eslint.config.mjs
import { avenger } from '@sj-distributor/eslint-config';

export default avenger({
  typescript: true,
  stylistic: true,
});
```

### React 项目

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

### React Native 项目

```js
// eslint.config.mjs
import { avenger } from '@sj-distributor/eslint-config';

export default avenger({
  typescript: true,
  react: true,
  reactnative: true,
});
```

## ⚙️ 配置选项

### 核心选项

```js
avenger({
  // 启用 TypeScript 支持（自动检测）
  typescript: true,
  
  // 启用样式格式化规则
  stylistic: {
    jsx: true,        // 启用 JSX 格式化
    quotes: 'single', // 'single' | 'double'
    semi: true,       // 启用分号
    indent: 2,        // 缩进大小
  },
  
  // 启用 React 支持
  react: true,
  
  // 启用 React Native 支持
  reactnative: true,
  
  // 自定义忽略模式
  ignores: {
    customIgnores: ['custom-dir/**'],
  },
});
```

### TypeScript 配置

```js
avenger({
  typescript: {
    // tsconfig.json 路径，用于类型感知规则
    tsconfigPath: './tsconfig.json',
    
    // 自定义解析器选项
    parserOptions: {
      project: './tsconfig.json',
    },
    
    // 覆盖特定规则
    overrides: {
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
});
```

### 高级用法

```js
import { avenger } from '@sj-distributor/eslint-config';

export default avenger(
  {
    typescript: true,
    react: true,
    stylistic: true,
  },
  // 添加自定义配置
  {
    files: ['**/*.test.ts'],
    rules: {
      'no-console': 'off',
    },
  },
  // 添加更多自定义配置...
);
```

## 🗂️ 配置架构

我们的配置采用扁平化架构，所有配置文件直接存放在 `src/configs/` 目录下：

### 📁 配置文件结构

```
src/configs/
├── ignores.ts     # 默认忽略模式
├── javascript.ts  # JavaScript 基础规则
├── typescript.ts  # TypeScript 语言支持
├── react.ts       # React 框架规则
├── import-x.ts    # 导入/导出规则
├── stylistic.ts   # 代码风格规则
└── index.ts       # 统一导出
```

### 🎯 添加新配置

当您需要添加新配置时，请遵循以下步骤：

1. **创建配置文件** - 在 `src/configs/` 目录下创建新的 `.ts` 文件
2. **实现配置函数** - 导出符合标准的配置函数
3. **更新索引文件** - 在 `src/configs/index.ts` 中添加导出
4. **更新主配置** - 在 `src/main.ts` 中集成新配置
5. **更新文档** - 在 README 中添加使用说明

### 📝 配置文件命名规范

- 使用小写字母和连字符：`kebab-case.ts`
- 文件名应简洁明了，反映配置用途
- 每个配置文件应导出一个默认函数
- 在 `index.ts` 中重新导出

### 💡 配置示例

```typescript
// src/configs/new-config.ts
import type { EslintFlatConfigItem } from '../types';

export const newConfig = async (): Promise<EslintFlatConfigItem[]> => {
  return [
    {
      name: 'sj-distributor/new-config/rules',
      rules: {
        // 配置规则
      },
    },
  ];
};

export default newConfig;
```

## 🎯 规则理念

我们的配置遵循以下原则：

- **🛡️ 安全第一** - 防止常见错误和运行时错误
- **📖 可读性** - 强制执行一致且可读的代码风格
- **🚀 现代实践** - 鼓励现代 JavaScript/TypeScript 模式
- **⚡ 性能** - 避免性能反模式
- **🔧 灵活性** - 易于自定义和扩展

## 🔧 开发

```bash
# 安装依赖
pnpm install

# 构建包
pnpm build

# 运行检查
pnpm lint

# 修复检查问题
pnpm lint:fix

# 类型检查
pnpm typecheck

# 生成 ESLint 类型
pnpm eslint:typegen

# 启动配置检查器
pnpm dev
```

## 📚 迁移指南

### 从 ESLint v8 迁移

如果您正在从 ESLint v8 迁移，您需要：

1. 更新到 ESLint v9+
2. 将您的 `.eslintrc.*` 转换为 `eslint.config.mjs`
3. 更新您的配置格式

```js
// 旧版本 (.eslintrc.js)
module.exports = {
  extends: ['@sj-distributor/eslint-config'],
};

// 新版本 (eslint.config.mjs)
import { avenger } from '@sj-distributor/eslint-config';
export default avenger();
```

## 📄 许可证

[MIT](./LICENSE) © 2024 SJ Distributor Avenger Team

## 🙏 致谢

此配置受到以下项目的启发和构建：
- [@antfu/eslint-config](https://github.com/antfu/eslint-config)
- [ESLint Stylistic](https://eslint.style/)
- [TypeScript ESLint](https://typescript-eslint.io/)
- [ESLint React](https://github.com/Rel1cx/eslint-react)