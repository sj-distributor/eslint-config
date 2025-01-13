import type { EslintFlatConfigItem, IOptionsFiles, IOptionsOverrides, IOptionsTypeScriptParserOptions, IOptionsTypeScriptWithTypes } from 'src/types';
import { ensurePackages, loadModule } from '../utils';
import { isPackageExists } from 'local-pkg';

// react refresh
const ReactRefreshAllowConstantExportPackages = [
  'vite',
];

const RemixPackages = [
  '@remix-run/node',
  '@remix-run/react',
  '@remix-run/serve',
  '@remix-run/dev',
];

const NextJsPackages = [
  'next',
];

export const react = async (
  options: IOptionsOverrides & IOptionsFiles & IOptionsTypeScriptParserOptions & IOptionsTypeScriptWithTypes = {},
): Promise<EslintFlatConfigItem[]> => {
  const {
    files = ['**/*.?([cm])[jt]s?(x)'],
    filesTypeAware = ['**/*.?([cm])ts', '**/*.?([cm])tsx'],
    overrides = {},
    tsconfigPath,
  } = options;

  await ensurePackages([
    '@eslint-react/eslint-plugin',
    'eslint-plugin-react-hooks',
    'eslint-plugin-react-refresh',
  ]);

  const isTypeAware = !!tsconfigPath;

  const typeAwareRules: EslintFlatConfigItem['rules'] = {
    'react/no-leaked-conditional-rendering': 'warn',
  };

  const [
    reactPlugin,
    reactHooksPlugin,
    reactRefreshPlugin,
  ] = await Promise.all([
    loadModule(import('@eslint-react/eslint-plugin')),
    loadModule(import('eslint-plugin-react-hooks')),
    loadModule(import('eslint-plugin-react-refresh')),
  ] as const);

  const isAllowConstantExport = ReactRefreshAllowConstantExportPackages.some(i => isPackageExists(i));
  const isUsingRemix = RemixPackages.some(i => isPackageExists(i));
  const isUsingNext = NextJsPackages.some(i => isPackageExists(i));

  const plugins = reactPlugin.configs.all.plugins;

  return [
    {
      name: 'sj-distributor/react/setup',
      plugins: {
        'react': plugins['@eslint-react'],
        'react-dom': plugins['@eslint-react/dom'],
        'react-hooks': reactHooksPlugin,
        'react-hooks-extra': plugins['@eslint-react/hooks-extra'],
        'react-naming-convention': plugins['@eslint-react/naming-convention'],
        'react-refresh': reactRefreshPlugin,
      },
    },
    {
      files,
      name: 'sj-distributor/react/rules',
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
        sourceType: 'module',
      },
      rules: {
        // recommended rules from @eslint-react/dom
        'react-dom/no-children-in-void-dom-elements': 'warn',
        'react-dom/no-dangerously-set-innerhtml': 'warn',
        'react-dom/no-dangerously-set-innerhtml-with-children': 'error',
        'react-dom/no-find-dom-node': 'error',
        'react-dom/no-missing-button-type': 'warn',
        'react-dom/no-missing-iframe-sandbox': 'warn',
        'react-dom/no-namespace': 'error',
        'react-dom/no-render-return-value': 'error',
        'react-dom/no-script-url': 'warn',
        'react-dom/no-unsafe-iframe-sandbox': 'warn',
        'react-dom/no-unsafe-target-blank': 'warn',

        // recommended rules react-hooks
        'react-hooks/exhaustive-deps': 'warn',
        'react-hooks/rules-of-hooks': 'error',

        // react refresh
        'react-refresh/only-export-components': [
          'warn',
          {
            allowConstantExport: isAllowConstantExport,
            allowExportNames: [
              ...(isUsingNext
                ? [
                    'dynamic',
                    'dynamicParams',
                    'revalidate',
                    'fetchCache',
                    'runtime',
                    'preferredRegion',
                    'maxDuration',
                    'config',
                    'generateStaticParams',
                    'metadata',
                    'generateMetadata',
                    'viewport',
                    'generateViewport',
                  ]
                : []),
              ...(isUsingRemix
                ? [
                    'meta',
                    'links',
                    'headers',
                    'loader',
                    'action',
                  ]
                : []),
            ],
          },
        ],

        // recommended rules from @eslint-react
        'react/ensure-forward-ref-using-ref': 'warn',
        'react/jsx-no-duplicate-props': 'warn',
        'react/jsx-uses-vars': 'warn',
        'react/no-access-state-in-setstate': 'error',
        'react/no-array-index-key': 'warn',
        'react/no-children-count': 'warn',
        'react/no-children-for-each': 'warn',
        'react/no-children-map': 'warn',
        'react/no-children-only': 'warn',
        'react/no-children-to-array': 'warn',
        'react/no-clone-element': 'warn',
        'react/no-comment-textnodes': 'warn',
        'react/no-component-will-mount': 'error',
        'react/no-component-will-receive-props': 'error',
        'react/no-component-will-update': 'error',
        'react/no-context-provider': 'warn',
        'react/no-create-ref': 'error',
        'react/no-default-props': 'error',
        'react/no-direct-mutation-state': 'error',
        'react/no-duplicate-key': 'error',
        'react/no-forward-ref': 'warn',
        'react/no-implicit-key': 'warn',
        'react/no-missing-key': 'error',
        'react/no-nested-components': 'error',
        'react/no-prop-types': 'error',
        'react/no-redundant-should-component-update': 'error',
        'react/no-set-state-in-component-did-mount': 'warn',
        'react/no-set-state-in-component-did-update': 'warn',
        'react/no-set-state-in-component-will-update': 'warn',
        'react/no-string-refs': 'error',
        'react/no-unsafe-component-will-mount': 'warn',
        'react/no-unsafe-component-will-receive-props': 'warn',
        'react/no-unsafe-component-will-update': 'warn',
        'react/no-unstable-context-value': 'warn',
        'react/no-unstable-default-props': 'warn',
        'react/no-unused-class-component-members': 'warn',
        'react/no-unused-state': 'warn',
        'react/prefer-destructuring-assignment': 'warn',
        'react/prefer-shorthand-boolean': 'warn',
        'react/prefer-shorthand-fragment': 'warn',

        // overrides
        ...overrides,
      },
    },
    ...isTypeAware
      ? [{
          files: filesTypeAware,
          name: 'sj-distributor/react/type-aware-rules',
          rules: {
            ...typeAwareRules,
          },
        }]
      : [],
  ];
};
