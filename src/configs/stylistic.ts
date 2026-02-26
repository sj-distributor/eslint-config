import stylisticPlugin from '@stylistic/eslint-plugin';
import type { TypedFlatConfigItem } from '../types';
import type { Overrides } from '../types';

export interface StylisticOptions {
  indent?: number | 'tab';
  quotes?: 'single' | 'double';
  semi?: boolean;
  jsx?: boolean;
  overrides?: Overrides;
}

export function stylistic(
  options: StylisticOptions = {},
): TypedFlatConfigItem[] {
  const {
    indent = 2,
    quotes = 'single',
    semi = true,
    jsx = true,
    overrides = {},
  } = options;

  const config = stylisticPlugin.configs.customize({
    indent,
    quotes,
    semi,
    jsx,
  });

  return [
    {
      name: 'sj-distributor/stylistic',
      plugins: {
        '@stylistic': stylisticPlugin,
      },
      rules: {
        ...config.rules,

        // User specific preferences
        '@stylistic/object-curly-spacing': ['error', 'always'],
        '@stylistic/jsx-closing-bracket-location': ['error', 'tag-aligned'],
        '@stylistic/comma-dangle': ['error', 'always-multiline'],
        '@stylistic/arrow-parens': ['error', 'as-needed'],

        // JSX Quotes
        '@stylistic/jsx-quotes': ['error', 'prefer-double'],
      },
    },
    {
      name: 'sj-distributor/stylistic/overrides',
      rules: overrides,
    },
  ];
}
