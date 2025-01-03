import type { ParserOptions } from '@typescript-eslint/parser';
import type { Linter } from 'eslint';

/**
 * 支持同步或异步返回值的类型
 */
export type Awaitable<T> = T | Promise<T>;

/**
 * 扁平化配置项类型，继承自 ESLint 配置类型并移除了插件属性
 */
export type FlatConfigItem = Omit<Linter.Config<Linter.RulesRecord>, 'plugins'> & {
  /**
   * 包含插件名称到插件对象的名称-值映射的对象。
   * 当指定“files”时，这些插件仅适用于匹配的文件
   * 
   * @see https://eslint.org/docs/latest/user-guide/configuring/configuration-files-new#using-plugins-in-your-configuration
   */
  plugins?: Record<string, any>;
};

/**
 * TypeScript 解析器选项配置。
 */
export interface OptionsTypeScriptParserOptions {
  /**
   * TypeScript 解析器的额外选项。
   */
  parserOptions?: Partial<ParserOptions>

  /**
   * 启用类型感知规则的文件匹配模式
   * @default ['**\/*.{ts,tsx}']
   */
  filesTypeAware?: string[]

  /**
   * 排除启用类型感知规则的文件匹配模式
   * @default ['**\/*.md\/**', '**\/*.astro/*.ts']
   */
  ignoresTypeAware?: string[]
}

/**
 * TypeScript 类型感知配置选项
 */
export interface OptionsTypeScriptWithTypes {
  /**
   * TypeScript 配置文件路径。提供此选项将启用类型感知规则。
   * @see https://typescript-eslint.io/linting/typed-linting/
   */
  tsconfigPath?: string

  /**
   * 重写类型感知规则。
   */
  overridesTypeAware?: FlatConfigItem['rules']
}

/**
 * 自定义规则覆盖的选项
 */
export interface OptionsOverrides {
  /**
   * 自定义规则覆盖
   */
  overrides?: FlatConfigItem['rules'];
}

/**
 * 自定义文件匹配模式的选项
 */
export interface OptionsFiles {
  /**
   * 自定义文件匹配模式，用于覆盖默认的文件匹配规则。
   */
  files?: string[];
}

export type ResolvedOptions<T> = T extends boolean
  ? never
  : NonNullable<T>

export type OptionsTypescript =
  (OptionsTypeScriptWithTypes & OptionsOverrides)
  | (OptionsTypeScriptParserOptions & OptionsOverrides)

/**
 * 主配置选项
 */
export interface OptionsConfig {
  /**
   * 是否启用 React 配置
   */
  react?: boolean | OptionsOverrides;
  /**
   * 是否启用 TypeScript 配置
   */
  typescript?: boolean;
  /**
   * 是否启用 JavaScript 配置
   */
  javascript?: boolean;
  /**
   * 自定义规则覆盖
   */
  overrides?: {
    react?: FlatConfigItem['rules'];
    typescript?: FlatConfigItem['rules'];
    javascript?: FlatConfigItem['rules']
  };
}