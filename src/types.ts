import type { Linter } from 'eslint'
import type { RuleOptions } from './eslintype'
import type { ParserOptions } from '@typescript-eslint/parser'

export type Awaitable<T> = T | Promise<T>

export type Rules = RuleOptions

export type EslintFlatConfigItem = Omit<Linter.Config<Linter.RulesRecord & Rules>, 'plugins'> & {
  plugins?:Record<string, any>
}

export interface OptionsOverrides {
  overrides?: EslintFlatConfigItem['rules']
}

export interface OptionsTypeScriptWithTypes {
  /**
   * When this options is provided, type aware rules will be enabled.
   * @see https://typescript-eslint.io/linting/typed-linting/
   */
  tsconfigPath?: string

  /**
   * Override type aware rules.
   */
  overridesTypeAware?: EslintFlatConfigItem['rules']
}

export interface OptionsTypeScriptParserOptions {
  /**
   * Additional parser options for TypeScript.
   */
  parserOptions?: Partial<ParserOptions>

  /**
   * Glob patterns for files that should be type aware.
   * @default ['**\/*.{ts,tsx}']
   */
  filesTypeAware?: string[]

  /**
   * Glob patterns for files that should not be type aware.
   * @default ['**\/*.md\/**', '**\/*.astro/*.ts']
   */
  ignoresTypeAware?: string[]
}

export type OptionsTypescript =
  (OptionsTypeScriptWithTypes & OptionsOverrides)
  | (OptionsTypeScriptParserOptions & OptionsOverrides)

export type ResolvedOptions<T> = T extends boolean
  ? never
  : NonNullable<T>

export interface OptionsConfig {
  javascript?: OptionsOverrides

  typescript?: boolean | OptionsTypescript

  overrides?: {
    javascript?: EslintFlatConfigItem['rules']
  }
}