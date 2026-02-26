import type { Linter } from 'eslint';
import type { ReactOptions } from './configs/react';
import type { StylisticOptions } from './configs/stylistic';
import type { RuleOptions } from './typegen';

export type UserConfig = Linter.Config<Linter.RulesRecord & RuleOptions>;

export type Overrides = Linter.Config<Linter.RulesRecord & RuleOptions>['rules'];

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
