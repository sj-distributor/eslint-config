import type { TypedFlatConfigItem } from '../types';
import type { Overrides } from '../types';
import { interopDefault } from '../utils';

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
): Promise<TypedFlatConfigItem[]> {
  const {
    files = ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    typescript = true,
    overrides = {},
  } = options;

  const [
    pluginReact,
    pluginReactHooks,
    pluginReactRefresh,
  ] = await Promise.all([
    interopDefault(import('@eslint-react/eslint-plugin')),
    interopDefault(import('eslint-plugin-react-hooks')),
    interopDefault(import('eslint-plugin-react-refresh')),
  ] as const);

  const plugins = (pluginReact.configs.all as any).plugins;

  return [
    {
      name: 'sj-distributor/react/setup',
      plugins: {
        'react-hooks': pluginReactHooks,
        'react-refresh': pluginReactRefresh,
        '@eslint-react': plugins['@eslint-react'],
        '@eslint-react/dom': plugins['@eslint-react/dom'],
        '@eslint-react/hooks-extra': plugins['@eslint-react/hooks-extra'],
        '@eslint-react/naming-convention': plugins['@eslint-react/naming-convention'],
        '@eslint-react/rsc': plugins['@eslint-react/rsc'],
        '@eslint-react/web-api': plugins['@eslint-react/web-api'],
      },
    },
    {
      name: 'sj-distributor/react/rules',
      files,
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
        sourceType: 'module',
      },
      rules: {
        // recommended rules from @eslint-react/eslint-plugin
        ...pluginReact.configs.recommended.rules,
        ...(typescript ? pluginReact.configs['recommended-typescript'].rules : {}),

        // react-hooks
        ...pluginReactHooks.configs.recommended.rules,

        // react-refresh
        ...pluginReactRefresh.configs.recommended.rules,
      },
    },
    {
      name: 'sj-distributor/react/overrides',
      files,
      rules: overrides,
    },
  ];
}
