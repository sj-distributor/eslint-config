import type { EslintFlatConfigItem, IOptionsOverrides, IStylisticConfig } from 'src/types';
import { loadModule } from '../utils';

export const DEFAULT_CONFIG: IStylisticConfig = {
  jsx: true,
  semi: true,
  indent: 2,
  quotes: 'single',
};

export const stylistic = async (
  options: IStylisticConfig & IOptionsOverrides = {},
): Promise<EslintFlatConfigItem[]> => {
  const {
    jsx,
    semi,
    quotes,
    indent,
    overrides = {},
  } = {
    ...DEFAULT_CONFIG,
    ...options,
  };

  const stylisticPlugin = await loadModule(import('@stylistic/eslint-plugin'));

  const stylisticConfig = stylisticPlugin.configs.customize({
    flat: true,
    indent,
    jsx,
    pluginName: '@stylistic',
    quotes,
    semi,
  });

  return [
    {
      name: 'sj-distributor/stylistic/rules',
      plugins: {
        '@stylistic': stylisticPlugin,
      },
      rules: {
        ...stylisticConfig.rules,

        '@stylistic/object-curly-spacing': ['error', 'always'],
        '@stylistic/jsx-closing-bracket-location': ['error', 'line-aligned'],
        '@stylistic/quotes': ['error', 'single'],
        '@stylistic/comma-dangle': ['error', 'always-multiline'],
        '@stylistic/arrow-parens': ['error', 'as-needed'],

        'curly': ['error', 'all'],

        ...overrides,
      },
    },
  ];
};
