import type { Linter } from 'eslint';
import type { ReactOptions } from './configs/react';
import type { StylisticOptions } from './configs/stylistic';
import type { RuleOptions } from './typegen';

export type UserConfig = TypedFlatConfigItem;

export type Overrides = TypedFlatConfigItem['rules'];

/**
 * An updated version of ESLint's `Linter.Config`, which provides autocompletion
 * for `rules` and relaxes type limitations for `plugins` and `rules`, because
 * many plugins still lack proper type definitions.
 */
export type TypedFlatConfigItem = Omit<Linter.Config<Linter.RulesRecord & RuleOptions>, 'plugins' | 'rules'> & {
  /**
   * An object containing a name-value mapping of plugin names to plugin objects.
   * When `files` is specified, these plugins are only available to the matching files.
   *
   * @see `https://eslint.org/docs/latest/user-guide/configuring/configuration-files-new#using-plugins-in-your-configuration`
   */
  // eslint-disable-next-line ts/no-explicit-any
  plugins?: Record<string, any>;

  /**
   * An object containing the configured rules. When `files` or `ignores` are
   * specified, these rule configurations are only available to the matching files.
   */
  rules?: Linter.Config<Linter.RulesRecord & RuleOptions>['rules'];
};

export interface AvengerOptions {
  /**
   * Enable React support.
   * @default false
   */
  react?: boolean | ReactOptions;

  /**
   * Enable TypeScript support.
   * @default true
   */
  typescript?: boolean | {
    files?: string[];
    overrides?: Overrides;
    tsconfigPath?: string;
  };

  /**
   * Enable stylistic rules.
   * @default true
   */
  stylistic?: boolean | StylisticOptions;

  /**
   * Enable unicorn rules.
   * @default true
   */
  unicorn?: boolean;

  /**
   * Custom ignores.
   */
  ignores?: string[];
}
