import reactPlugin from '@eslint-react/eslint-plugin';
import type { Linter } from 'eslint';
import hooksPlugin from 'eslint-plugin-react-hooks';
import refreshPlugin from 'eslint-plugin-react-refresh';

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
}

export async function react(
  options: ReactOptions = {},
): Promise<Linter.Config[]> {
  const {
    files = ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    typescript = true,
  } = options;

  const configs: Linter.Config[] = [];

  // 1. React Core
  configs.push({
    files,
    ...reactPlugin.configs.recommended,
    name: 'sj-distributor/react/recommended',
  });

  if (typescript) {
    configs.push({
      files,
      ...reactPlugin.configs['recommended-typescript'],
      name: 'sj-distributor/react/recommended-typescript',
    });
  }

  // 2. React Hooks
  configs.push({
    name: 'sj-distributor/react/hooks',
    files,
    plugins: {
      'react-hooks': hooksPlugin,
    },
    rules: {
      ...hooksPlugin.configs.recommended.rules,
    },
  });

  // 3. React Refresh
  configs.push({
    name: 'sj-distributor/react/refresh',
    files,
    plugins: {
      'react-refresh': refreshPlugin,
    },
    rules: {
      'react-refresh/only-export-components': 'warn',
    },
  });

  return configs;
}
