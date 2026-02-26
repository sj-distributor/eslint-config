import js from '@eslint/js';
import type { Linter } from 'eslint';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import type { Overrides } from '../types';

export async function javascript(
  options: {
    files?: string[];
    overrides?: Overrides;
  } = {}
): Promise<Linter.Config[]> {
  const {
    files = ['**/*.{js,mjs,cjs}'],
    overrides = {},
  } = options;

  return [
    {
      name: 'sj-distributor/javascript/rules',
      files,
      ...js.configs.recommended,
      plugins: {
        'unused-imports': unusedImports,
      },
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
      rules: {
        ...js.configs.recommended.rules,

        'unused-imports/no-unused-imports': 'error',
        'unused-imports/no-unused-vars': [
          'warn',
          {
            vars: 'all',
            varsIgnorePattern: '^_',
            args: 'after-used',
            argsIgnorePattern: '^_',
          },
        ],

        // Common
        'no-unused-vars': 'off', // handled by unused-imports
        'no-param-reassign': 'off',
        'array-callback-return': 'error',
        'block-scoped-var': 'error',
        'consistent-return': 'off',
        'complexity': ['off', 11],
        'eqeqeq': ['error', 'smart'],
        'no-alert': 'warn',
        'no-case-declarations': 'error',
        'no-multi-str': 'error',
        'no-with': 'error',
        'no-void': 'error',
        'no-useless-escape': 'off',
        'vars-on-top': 'error',
        'require-await': 'off',
        'no-return-assign': 'off',
        'prefer-arrow-callback': [
          'error',
          {
            allowNamedFunctions: false,
            allowUnboundThis: true,
          },
        ],
        'prefer-const': [
          'error',
          {
            destructuring: 'all',
            ignoreReadBeforeAssign: true,
          },
        ],
        'prefer-exponentiation-operator': 'error',
        'prefer-regex-literals': ['error', { disallowRedundantWrapping: true }],
        'prefer-rest-params': 'error',
        'prefer-spread': 'error',
        'prefer-template': 'error',
        'sort-imports': [
          'error',
          {
            ignoreCase: false,
            ignoreDeclarationSort: true,
            ignoreMemberSort: false,
            memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
            allowSeparatedGroups: false,
          },
        ],
        'symbol-description': 'error',

        ...overrides,
      },
    },
  ];
}
