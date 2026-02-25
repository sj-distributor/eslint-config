import stylisticPlugin from '@stylistic/eslint-plugin';
import type { Linter } from 'eslint';

export interface StylisticOptions {
  indent?: number | 'tab';
  quotes?: 'single' | 'double';
  semi?: boolean;
  jsx?: boolean;
  overrides?: Linter.Config['rules'];
}

export function stylistic(
  options: StylisticOptions = {},
): Linter.Config[] {
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

        ...overrides,
      },
    },
  ];
}
