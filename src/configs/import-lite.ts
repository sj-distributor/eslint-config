import importLite from 'eslint-plugin-import-lite';
import type { TypedFlatConfigItem, Overrides } from '../types';

export interface ImportLiteOptions {
  files?: string[];
  overrides?: Overrides;
}

export function importLiteConfig(
  options: ImportLiteOptions = {},
): TypedFlatConfigItem[] {
  const {
    files = ['**/*.{js,mjs,cjs,ts,tsx,mts,cts,jsx}'],
    overrides = {},
  } = options;

  return [
    {
      name: 'sj-distributor/import-lite/rules',
      files,
      plugins: {
        'import-lite': importLite,
      },
      rules: {
        'import-lite/no-duplicates': 'error',
        'import-lite/first': 'error',
        'import-lite/newline-after-import': 'error',
        'import-lite/no-mutable-exports': 'error',
        'import-lite/exports-last': 'error',
        'import-lite/no-named-default': 'error',

        // TypeScript handles this natively
        'import-lite/consistent-type-specifier-style': 'off',
      },
    },
    {
      name: 'sj-distributor/import-lite/overrides',
      files,
      rules: overrides,
    },
  ];
}
