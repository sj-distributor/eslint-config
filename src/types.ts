import type { Linter } from 'eslint';
import type { RuleOptions } from './eslintype';
import type { ParserOptions } from '@typescript-eslint/parser';
import type { StylisticCustomizeOptions } from '@stylistic/eslint-plugin';

export type Awaitable<T> = T | Promise<T>;

export type Rules = RuleOptions;

export type EslintFlatConfigItem = Omit<Linter.Config<Linter.RulesRecord & Rules>, 'plugins'> & {
  plugins?: Record<string, any>;
};

export interface IOptionsFiles {
  files?: string[];
}

export interface IOptionsOverrides {
  overrides?: EslintFlatConfigItem['rules'];
}

export interface IOptionsTypeScriptWithTypes {
  /**
   * When this options is provided, type aware rules will be enabled.
   * @see https://typescript-eslint.io/linting/typed-linting/
   */
  tsconfigPath?: string;

  /**
   * Override type aware rules.
   */
  overridesTypeAware?: EslintFlatConfigItem['rules'];
}

export interface IOptionsTypeScriptParserOptions {
  /**
   * Additional parser options for TypeScript.
   */
  parserOptions?: Partial<ParserOptions>;

  /**
   * Glob patterns for files that should be type aware.
   * @default ['**\/*.{ts,tsx}']
   */
  filesTypeAware?: string[];

  /**
   * Glob patterns for files that should not be type aware.
   * @default ['**\/*.md\/**', '**\/*.astro/*.ts']
   */
  ignoresTypeAware?: string[];
}

export type OptionsTypescript =
  (IOptionsTypeScriptWithTypes & IOptionsOverrides)
  | (IOptionsTypeScriptParserOptions & IOptionsOverrides);

export type ResolvedOptions<T> = T extends boolean
  ? never
  : NonNullable<T>;

export interface IStylisticConfig
  extends Pick<StylisticCustomizeOptions, 'indent' | 'quotes' | 'jsx' | 'semi'> {
}

export interface IOptionsConfig {
  javascript?: IOptionsOverrides;

  typescript?: boolean | OptionsTypescript;

  stylistic?: boolean | (IStylisticConfig & IOptionsOverrides);

  overrides?: {
    javascript?: EslintFlatConfigItem['rules'];
    typescript?: EslintFlatConfigItem['rules'];
  };
}
