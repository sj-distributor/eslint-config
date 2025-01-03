import { globs } from '../../globs';
import type { FlatConfigItem, OptionsFiles, OptionsOverrides, OptionsTypeScriptParserOptions, OptionsTypeScriptWithTypes } from '../../types/types';
import { ensureDependenciesInstalled, resolveModule } from '../../utils';
import { REACT_RULES } from './rules';

export const reactConfig = async (
  options: OptionsTypeScriptParserOptions & OptionsTypeScriptWithTypes & OptionsOverrides & OptionsFiles = {}
): Promise<FlatConfigItem[]> => {
  const {
    files = [globs.src],
    overrides = {},
  } = options;

  // 确保依赖已安装
  await ensureDependenciesInstalled([
    '@eslint-react/eslint-plugin',
    'eslint-plugin-react-hooks'
  ]);

    // 动态加载插件
  const [pluginReact, pluginReactHooks] = await Promise.all([
    resolveModule(import('@eslint-react/eslint-plugin')),
    resolveModule(import('eslint-plugin-react-hooks')),
  ]);

  const plugins = pluginReact.configs.all.plugins;
  
  return [
    {
      name: 'sj-distributor/react/setup',
      plugins: {
        'react': plugins['@eslint-react'],
        'react-dom': plugins['@eslint-react/dom'],
        'react-hooks': pluginReactHooks,
        'react-hooks-extra': plugins['@eslint-react/hooks-extra'],
        'react-naming-convention': plugins['@eslint-react/naming-convention'],
      },
    },
    {
      files,
      name: 'sj-distributor/react/rules',
      languageOptions: {
        sourceType: 'module',
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
      rules: {
        ...REACT_RULES,
        ...overrides,
      },
    }
  ]

}
