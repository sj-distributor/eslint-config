import type { Linter } from 'eslint';
import tseslint from 'typescript-eslint';

export async function typescript(
  options: {
    files?: string[];
    overrides?: Linter.Config['rules'];
  } = {},
): Promise<Linter.Config[]> {
  const {
    files = ['**/*.{ts,tsx,mts,cts}'],
    overrides = {},
  } = options;

  // tseslint.configs.recommended is an array of config objects
  return tseslint.configs.recommended.map((config, index) => ({
    name: `sj-distributor/typescript/recommended/${index}`,
    ...config,
    files,
    rules: {
      ...config.rules,
      '@typescript-eslint/no-explicit-any': 'warn',
      ...overrides,
    },
  })) as Linter.Config[];
}
