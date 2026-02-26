import js from '@eslint/js';
import type { Linter } from 'eslint';

export async function javascript(
  options: {
    files?: string[];
    overrides?: Linter.Config['rules'];
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
      rules: {
        ...js.configs.recommended.rules,
        ...overrides,
      },
    },
  ];
}
