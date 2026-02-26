import reactPlugin from '@eslint-react/eslint-plugin';
import type { Linter } from 'eslint';
import hooksPlugin from 'eslint-plugin-react-hooks';
import refreshPlugin from 'eslint-plugin-react-refresh';
import type { Overrides } from '../types';

export interface ReactOptions {
  /**
   * Files to apply the React rules to.
   * @default ['**\/*.{js,jsx,mjs,cjs,ts,tsx}']
   */
  files?: string[];

  /**
   * Enable TypeScript support.
   * @default true
   */
  typescript?: boolean;

  /**
   * Override React rules.
   */
  overrides?: Overrides;
}

export async function react(
  options: ReactOptions = {},
): Promise<Linter.Config[]> {
  const {
    files = ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    typescript = true,
    overrides = {},
  } = options;

  const configs: Linter.Config[] = [];

  // 1. React Core
  configs.push({
    files,
    ...reactPlugin.configs.recommended,
    name: 'sj-distributor/react/recommended',
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...overrides,
    },
  });

  if (typescript) {
    configs.push({
      files,
      ...reactPlugin.configs['recommended-typescript'],
      name: 'sj-distributor/react/recommended-typescript',
      rules: {
        ...reactPlugin.configs['recommended-typescript'].rules,
        ...overrides,
      },
    });
  }

  // 2. React Hooks
  configs.push({
    name: 'sj-distributor/react/hooks',
    files,
    rules: {
      ...hooksPlugin.configs.recommended.rules,
    },
  });

  // 3. React Refresh
  configs.push({
    name: 'sj-distributor/react/refresh',
    files,
    rules: {
      ...refreshPlugin.configs.recommended.rules,
    },
  });

  return configs;
}
