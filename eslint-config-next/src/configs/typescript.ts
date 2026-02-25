import type { Linter } from 'eslint';
import tseslint from 'typescript-eslint';

export async function typescript(
  options: {
    files?: string[];
  } = {},
): Promise<Linter.Config[]> {
  const {
    files = ['**/*.{ts,tsx,mts,cts}'],
  } = options;

  // tseslint.configs.recommended is an array of config objects
  return tseslint.configs.recommended.map((config, index) => ({
    name: `sj-distributor/typescript/recommended/${index}`,
    ...config,
    files,
  })) as Linter.Config[];
}
