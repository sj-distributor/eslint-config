import type { TypedFlatConfigItem } from '../types';
import unicornPlugin from 'eslint-plugin-unicorn';

export function unicorn(): TypedFlatConfigItem[] {
  return [
    {
      name: 'sj-distributor/unicorn',
      plugins: {
        unicorn: unicornPlugin,
      },
      rules: {
        'unicorn/filename-case': [
          'error',
          {
            cases: {
              kebabCase: true,
              pascalCase: true,
              camelCase: false,
              snakeCase: false,
            },
          },
        ],
      },
    },
  ];
}
