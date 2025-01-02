import type { Linter } from 'eslint';

export type Awaitable<T> = T | Promise<T>;

export type FlatConfigItem = Omit<Linter.Config<Linter.RulesRecord>, 'plugins'> & {
  /**
   * 包含插件名称到插件对象的名称-值映射的对象。当指定“files”时，这些插件仅适用于匹配的文件
   * 
   * @see https://eslint.org/docs/latest/user-guide/configuring/configuration-files-new#using-plugins-in-your-configuration
   */
  plugins?: Record<string, any>;
};

export interface OptionsConfig {
  /**
   * 是否启用 React 配置
   */
  react?: boolean;
  /**
   * 是否启用 TypeScript 配置
   */
  typescript?: boolean;
  /**
   * 自定义规则覆盖
   */
  overrides?: {
    react?: FlatConfigItem['rules'];
    typescript?: FlatConfigItem['rules'];
  };
}