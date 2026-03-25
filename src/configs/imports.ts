import type { ImportsOptions, TypedFlatConfigItem } from '../types';
import pluginImportLite from 'eslint-plugin-import-lite';

export function imports(options: ImportsOptions = {}): TypedFlatConfigItem[] {
  const {
    overrides = {},
    stylistic = true,
  } = options;

  return [
    {
      name: 'sj-distributor/imports/rules',
      plugins: {
        import: pluginImportLite,
      },
      rules: {
        'import/consistent-type-specifier-style': ['error', 'top-level'],
        'import/first': 'error',
        'import/no-duplicates': 'error',
        'import/no-mutable-exports': 'error',
        'import/no-named-default': 'error',

        ...(stylistic
          ? {
              'import/newline-after-import': ['error', { count: 1 }],
            }
          : {}),

        ...overrides,
      },
    },
  ];
}
