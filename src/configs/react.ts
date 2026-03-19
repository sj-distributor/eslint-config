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
   * Enable React Native support.
   * @default false
   */
  reactNative?: boolean;

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
    reactNative = false,
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

  // eslint-disable-next-line ts/no-explicit-any
  const plugins = (pluginReact.configs.all as any).plugins;

  let baseRules = {
    // recommended rules from @eslint-react/eslint-plugin
    ...pluginReact.configs.recommended.rules,
    ...(typescript ? pluginReact.configs['recommended-typescript'].rules : {}),
  };

  if (reactNative) {
    // eslint-disable-next-line ts/no-explicit-any
    const filteredRules: Record<string, any> = {};
    for (const key of Object.keys(baseRules)) {
      if (!key.startsWith('@eslint-react/dom/') && !key.startsWith('@eslint-react/web-api/')) {
        // eslint-disable-next-line ts/no-explicit-any
        filteredRules[key] = (baseRules as any)[key];
      }
    }
    baseRules = filteredRules;
  }

  return [
    {
      name: 'sj-distributor/react/setup',
      plugins: {
        'react-hooks': pluginReactHooks,
        'react-refresh': pluginReactRefresh,
        '@eslint-react': plugins['@eslint-react'],
        ...(reactNative
          ? {}
          : {
              '@eslint-react/dom': plugins['@eslint-react/dom'],
              '@eslint-react/web-api': plugins['@eslint-react/web-api'],
            }),
        '@eslint-react/hooks-extra': plugins['@eslint-react/hooks-extra'],
        '@eslint-react/naming-convention': plugins['@eslint-react/naming-convention'],
        '@eslint-react/rsc': plugins['@eslint-react/rsc'],
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
        ...baseRules,

        // react-hooks
        ...pluginReactHooks.configs.recommended.rules,

        // react-refresh
        ...pluginReactRefresh.configs.recommended.rules,

        // recommended rules from eslint-plugin-react-hooks-extra https://eslint-react.xyz/docs/rules/overview#hooks-extra-rules
        '@eslint-react/hooks-extra/no-direct-set-state-in-use-effect': 'warn',
      },
    },
    {
      name: 'sj-distributor/react/overrides',
      files,
      rules: overrides,
    },
  ];
}
