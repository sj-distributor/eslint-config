import type { FlatConfigItem } from '../../types/types';
import { ensureDependenciesInstalled, resolveModule } from '../../utils';
import { REACT_RULES } from './react-rules';

export async function reactConfig(): Promise<FlatConfigItem[]> {

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
      rules: {
        ...REACT_RULES,

        // overrides
        // ...overrides,
      },
    },
  ]

}
