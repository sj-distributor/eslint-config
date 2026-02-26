import type { Linter } from 'eslint';
import unicornPlugin from 'eslint-plugin-unicorn';

export function unicorn(): Linter.Config[] {
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
