import type { OptionsOverrides, FlatConfigItem } from '../../types'

import globals from 'globals'

import { RULES } from './rule'
import { default as pluginUnusedImports } from 'eslint-plugin-unused-imports'

export const javascriptConfig = async (
  options: OptionsOverrides = {},
): Promise<FlatConfigItem[]> => {
  const {
    overrides = {},
  } = options

  return [
    {
      languageOptions: {
        ecmaVersion: 2022,
        globals: {
          ...globals.browser,
          ...globals.es2021,
          ...globals.node,
          document: 'readonly',
          navigator: 'readonly',
          window: 'readonly',
        },
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
          ecmaVersion: 2022,
          sourceType: 'module',
        },
        sourceType: 'module',
      },
      linterOptions: {
        reportUnusedDisableDirectives: true,
      },
      name: 'sj-distributor/javascript/rules',
    },
    {
      name: 'sj-distributor/javascript/rules',
      plugins: {
        'unused-imports': pluginUnusedImports,
      },
      rules: {
        ...RULES,
        ...overrides,
      },
    },
  ]
}
