import { isPackageExists } from 'local-pkg';
import type { EslintFlatConfigItem, IOptionsFiles, IOptionsOverrides, IOptionsReactNative, IOptionsTypeScriptParserOptions, IOptionsTypeScriptWithTypes } from 'src/types';

import { ensurePackages, loadModule } from '../utils';

// 允许常量导出的 React Refresh 包列表
const REACT_REFRESH_ALLOW_CONSTANNT_EXPORT_PACKAGES = [
  'vite',
];

// Next.js 相关包列表
const NEXT_JS_PACKAGES = [
  'next',
];

export const react = async (
  options: IOptionsReactNative & IOptionsOverrides & IOptionsFiles & IOptionsTypeScriptParserOptions & IOptionsTypeScriptWithTypes = {},
): Promise<EslintFlatConfigItem[]> => {
  const {
    files = ['**/*.?([cm])[jt]s?(x)'],
    filesTypeAware = ['**/*.?([cm])ts', '**/*.?([cm])tsx'],
    overrides = {},
    tsconfigPath,
    reactnative = false,
  } = options;

  await ensurePackages([
    '@eslint-react/eslint-plugin',
    'eslint-plugin-react-hooks',
    'eslint-plugin-react-refresh',
  ]);

  const isTypeAware = !!tsconfigPath;

  const [
    reactPlugin,
    reactHooksPlugin,
    reactRefreshPlugin,
  ] = await Promise.all([
    loadModule(import('@eslint-react/eslint-plugin')),
    loadModule(import('eslint-plugin-react-hooks')),
    loadModule(import('eslint-plugin-react-refresh')),
  ] as const);

  const isAllowConstantExport = REACT_REFRESH_ALLOW_CONSTANNT_EXPORT_PACKAGES.some(i => isPackageExists(i));
  const isUseNext = NEXT_JS_PACKAGES.some(i => isPackageExists(i));

  const plugins = reactPlugin.configs.all.plugins;

  const domSpecificRules: EslintFlatConfigItem['rules'] = {
    // 禁止在 void DOM 元素中使用 children
    '@eslint-react/dom/no-children-in-void-dom-elements': 'warn',

    // 避免使用 dangerouslySetInnerHTML
    '@eslint-react/dom/no-dangerously-set-innerhtml': 'warn',

    // 禁止同时使用 dangerouslySetInnerHTML 和 children
    '@eslint-react/dom/no-dangerously-set-innerhtml-with-children': 'error',

    // 禁止使用 findDOMNode
    '@eslint-react/dom/no-find-dom-node': 'error',

    // 确保按钮元素有 type 属性
    '@eslint-react/dom/no-missing-button-type': 'warn',

    // 确保 iframe 元素有 sandbox 属性
    '@eslint-react/dom/no-missing-iframe-sandbox': 'warn',

    // 禁止使用命名空间组件
    '@eslint-react/dom/no-namespace': 'error',

    // 禁止使用 ReactDOM.render 的返回值
    '@eslint-react/dom/no-render-return-value': 'error',

    // 避免使用 javascript: URL
    '@eslint-react/dom/no-script-url': 'warn',

    // 避免使用不安全的 iframe sandbox 属性
    '@eslint-react/dom/no-unsafe-iframe-sandbox': 'warn',

    // 避免使用不安全的 target="_blank"
    '@eslint-react/dom/no-unsafe-target-blank': 'warn',
  };

  return [
    {
      name: 'sj-distributor/react/setup',
      plugins: {
        '@eslint-react': plugins['@eslint-react'],
        ...(reactnative ? {} : { '@eslint-react/dom': plugins['@eslint-react/dom'] }),
        'react-hooks': reactHooksPlugin,
        'react-refresh': reactRefreshPlugin,
        '@eslint-react/hooks-extra': plugins['@eslint-react/hooks-extra'],
        '@eslint-react/naming-convention': plugins['@eslint-react/naming-convention'],
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
        ...(reactnative ? {} : domSpecificRules),

        // 确保 useEffect 和 useMemo 的依赖项完整
        'react-hooks/exhaustive-deps': 'warn',

        // 确保 Hooks 规则被正确使用
        'react-hooks/rules-of-hooks': 'error',

        // 仅允许导出组件，避免导出常量或其他非组件内容
        'react-refresh/only-export-components': [
          'warn',
          {
            allowConstantExport: isAllowConstantExport,
            allowExportNames: [
              ...(isUseNext
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
            ],
          },
        ],

        // 确保 forwardRef 使用 ref
        '@eslint-react/ensure-forward-ref-using-ref': 'warn',

        // 禁止重复的 JSX 属性
        '@eslint-react/jsx-no-duplicate-props': 'warn',

        // 确保 JSX 中使用的变量已定义
        '@eslint-react/jsx-uses-vars': 'warn',

        // 禁止在 setState 中访问 this.state
        '@eslint-react/no-access-state-in-setstate': 'error',

        // 避免使用数组索引作为 key
        '@eslint-react/no-array-index-key': 'warn',

        // 避免使用 children 的 count 属性
        '@eslint-react/no-children-count': 'warn',

        // 避免使用 children 的 forEach 方法
        '@eslint-react/no-children-for-each': 'warn',

        // 避免使用 children 的 map 方法
        '@eslint-react/no-children-map': 'warn',

        // 避免使用 children 的 only 方法
        '@eslint-react/no-children-only': 'warn',

        // 避免将 children 转换为数组
        '@eslint-react/no-children-to-array': 'warn',

        // 避免使用 cloneElement
        '@eslint-react/no-clone-element': 'warn',

        // 避免使用注释文本节点
        '@eslint-react/no-comment-textnodes': 'warn',

        // 禁止使用 componentWillMount
        '@eslint-react/no-component-will-mount': 'error',

        // 禁止使用 componentWillReceiveProps
        '@eslint-react/no-component-will-receive-props': 'error',

        // 禁止使用 componentWillUpdate
        '@eslint-react/no-component-will-update': 'error',

        // 避免使用 Context.Provider
        '@eslint-react/no-context-provider': 'warn',

        // 禁止使用 createRef
        '@eslint-react/no-create-ref': 'error',

        // 禁止使用 defaultProps
        '@eslint-react/no-default-props': 'error',

        // 禁止直接修改 state
        '@eslint-react/no-direct-mutation-state': 'error',

        // 禁止重复的 key
        '@eslint-react/no-duplicate-key': 'error',

        // 避免使用 forwardRef
        '@eslint-react/no-forward-ref': 'warn',

        // 避免隐式的 key
        '@eslint-react/no-implicit-key': 'warn',

        // 确保列表项有 key
        '@eslint-react/no-missing-key': 'error',

        // 禁止嵌套组件
        '@eslint-react/no-nested-components': 'error',

        // 禁止使用 propTypes
        '@eslint-react/no-prop-types': 'error',

        // 避免冗余的 shouldComponentUpdate
        '@eslint-react/no-redundant-should-component-update': 'error',

        // 避免在 componentDidMount 中调用 setState
        '@eslint-react/no-set-state-in-component-did-mount': 'warn',

        // 避免在 componentDidUpdate 中调用 setState
        '@eslint-react/no-set-state-in-component-did-update': 'warn',

        // 避免在 componentWillUpdate 中调用 setState
        '@eslint-react/no-set-state-in-component-will-update': 'warn',

        // 禁止使用字符串 refs
        '@eslint-react/no-string-refs': 'error',

        // 避免使用不安全的 componentWillMount
        '@eslint-react/no-unsafe-component-will-mount': 'warn',

        // 避免使用不安全的 componentWillReceiveProps
        '@eslint-react/no-unsafe-component-will-receive-props': 'warn',

        // 避免使用不安全的 componentWillUpdate
        '@eslint-react/no-unsafe-component-will-update': 'warn',

        // 避免使用不稳定的 context 值
        '@eslint-react/no-unstable-context-value': 'warn',

        // 避免使用不稳定的 defaultProps
        '@eslint-react/no-unstable-default-props': 'warn',

        // 避免未使用的类组件成员
        '@eslint-react/no-unused-class-component-members': 'warn',

        // 避免未使用的 state
        '@eslint-react/no-unused-state': 'warn',

        // 推荐使用解构赋值
        '@eslint-react/prefer-destructuring-assignment': 'warn',

        // 推荐使用布尔简写
        '@eslint-react/prefer-shorthand-boolean': 'warn',

        // 推荐使用 Fragment 简写
        '@eslint-react/prefer-shorthand-fragment': 'warn',

        ...overrides,
      },
    },
    ...isTypeAware
      ? [{
          files: filesTypeAware,
          name: 'sj-distributor/react/type-aware-rules',
          rules: {
            ...{
              // 避免条件渲染中的泄漏
              '@eslint-react/no-leaked-conditional-rendering': 'warn',
            } as EslintFlatConfigItem['rules'],
          },
        }]
      : [],
  ];
};
