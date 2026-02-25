import js from '@eslint/js';
import type { Linter } from 'eslint';

export async function javascript(
  options: {
    files?: string[];
  } = {},
): Promise<Linter.Config[]> {
  const {
    files = ['**/*.{js,mjs,cjs}'],
  } = options;

  return [
    {
      name: 'sj-distributor/javascript/rules',
      files,
      ...js.configs.recommended,
    },
  ];
}
