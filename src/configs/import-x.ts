import eslintPluginImportX from 'eslint-plugin-import-x';

import type { EslintFlatConfigItem } from '../types';

export const importX = async (
): Promise<EslintFlatConfigItem[]> => {
  return [
    {
      name: 'sj-distributor/import-x/rules',
      plugins: {
        'import-x': eslintPluginImportX,
      },
      rules: {
        // 确保类型导入的风格一致
        'import-x/consistent-type-specifier-style': ['error', 'prefer-top-level'],

        // 确保所有导入语句出现在其他语句之前
        'import-x/first': 'error',

        // 禁止重复导入同一模块
        'import-x/no-duplicates': 'error',

        // 禁止使用可变导出，确保导出值的不可变性
        'import-x/no-mutable-exports': 'error',

        // 禁止将命名导出作为默认导入
        'import-x/no-named-default': 'error',

        // 禁止模块导入自身
        'import-x/no-self-import': 'error',

        // 禁止在导入中使用 webpack 的 loader 语法
        'import-x/no-webpack-loader-syntax': 'error',

        // 在导入语句后强制添加一个空行的规则
        'import-x/newline-after-import': ['error', { count: 1 }],

        // 强制模块导入的顺序
        'import-x/order': [
          'error',
          {
            'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
            'pathGroups': [
              {
                pattern: 'react',
                group: 'external',
                position: 'before',
              },
              {
                pattern: '@/**',
                group: 'internal',
                position: 'after',
              },
            ],
            'newlines-between': 'always',
            'pathGroupsExcludedImportTypes': ['builtin'],
            'alphabetize': {
              order: 'asc',
              caseInsensitive: true,
            },
          },
        ],
      },
    },
  ];
};
