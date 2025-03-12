import type { EslintFlatConfigItem, IOptionsFiles, IOptionsOverrides, IOptionsTypeScriptParserOptions, IOptionsTypeScriptWithTypes } from 'src/types';

import { loadModule } from '../utils';

export const typescript = async (
  options: IOptionsFiles & IOptionsOverrides & IOptionsTypeScriptWithTypes & IOptionsTypeScriptParserOptions = {},
): Promise<EslintFlatConfigItem[]> => {
  const {
    files = [
      '**/*.?([cm])ts',
      '**/*.?([cm])tsx',
    ],
    overrides = {},
    parserOptions = {},
    overridesTypeAware = {},
    tsconfigPath,
  } = options;

  const isTypeAware = !!tsconfigPath;

  // 动态加载 TypeScript 解析器和插件
  const [tsParser, tsPlugin] = await Promise.all([
    loadModule(import('@typescript-eslint/parser')),
    loadModule(import('@typescript-eslint/eslint-plugin')),
  ] as const);

  const makeParser = (typeAware: boolean): EslintFlatConfigItem => {
    return {
      files,
      languageOptions: {
        parser: tsParser,
        parserOptions: {
          sourceType: 'module',
          ...(typeAware && tsconfigPath)
            ? {
                tsconfigRootDir: process.cwd(),
                project: tsconfigPath,
                projectService: {
                  allowDefaultProject: ['./*.js'],
                  defaultProject: tsconfigPath,
                },
              }
            : {},
          ...parserOptions as any,
        },
      },
      name: `sj-distributor/typescript/${typeAware ? 'type-aware-parser' : 'parser'}`,
    };
  };

  return [
    {
      name: 'sj-distributor/typescript/setup',
      plugins: {
        '@typescript-eslint': tsPlugin,
      },
    },
    ...(isTypeAware
      ? [makeParser(false), makeParser(true)]
      : [makeParser(false)]
    ),
    {
      files,
      name: 'sj-distributor/typescript/rules',
      rules: {
        // 使用 @typescript-eslint 推荐的规则
        ...tsPlugin.configs['eslint-recommended'].overrides![0].rules!,

        // 使用 @typescript-eslint 严格模式的规则
        ...tsPlugin.configs.strict.rules!,

        // --- 关闭 ESLint 原生规则，由 TypeScript 规则替代 ---

        // 禁止重复的类成员
        'no-dupe-class-members': 'off',

        // 禁止重复声明变量
        'no-redeclare': 'off',

        // 禁止在定义前使用
        'no-use-before-define': 'off',

        // 禁止不必要的构造函数
        'no-useless-constructor': 'off',

        // --- TypeScript 规则 ---

        // 禁止使用 @ts-ignore，但允许 @ts-expect-error 并需要描述
        '@typescript-eslint/ban-ts-comment': ['error', { 'ts-expect-error': 'allow-with-description' }],

        // 强制使用 interface 定义类型
        '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],

        '@typescript-eslint/consistent-type-imports': ['error', {
          disallowTypeAnnotations: false, // 允许类型注解
          prefer: 'type-imports', // 优先使用类型导入
        }],

        // 强制使用方法签名风格（property 风格）
        '@typescript-eslint/method-signature-style': ['error', 'property'],

        // 禁止重复的类成员
        '@typescript-eslint/no-dupe-class-members': 'error',

        // 允许动态删除属性
        '@typescript-eslint/no-dynamic-delete': 'off',

        // 禁止空对象类型，但允许接口
        '@typescript-eslint/no-empty-object-type': ['error', { allowInterfaces: 'always' }],

        // 允许使用 any 类型
        '@typescript-eslint/no-explicit-any': 'off',

        // 允许不必要的类
        '@typescript-eslint/no-extraneous-class': 'off',

        // 禁止导入类型时的副作用
        '@typescript-eslint/no-import-type-side-effects': 'error',

        // 允许无效的 void 类型
        '@typescript-eslint/no-invalid-void-type': 'off',

        // 允许非空断言
        '@typescript-eslint/no-non-null-assertion': 'off',

        // 禁止重复声明变量
        '@typescript-eslint/no-redeclare': ['error', { builtinGlobals: false }],

        // 禁止使用 require 导入
        '@typescript-eslint/no-require-imports': 'error',

        '@typescript-eslint/no-unused-expressions': ['error', {
          allowShortCircuit: true, // 允许短路求值
          allowTaggedTemplates: true, // 允许标签模板
          allowTernary: true, // 允许三元表达式
        }],

        // 允许未使用的变量
        '@typescript-eslint/no-unused-vars': 'off',

        // 禁止在定义前使用变量
        '@typescript-eslint/no-use-before-define': ['error', { classes: false, functions: false, variables: true }],

        // 允许不必要的构造函数
        '@typescript-eslint/no-useless-constructor': 'off',

        // 禁止使用包装对象类型
        '@typescript-eslint/no-wrapper-object-types': 'error',

        // 允许三斜杠引用
        '@typescript-eslint/triple-slash-reference': 'off',

        // 允许不一致的函数签名
        '@typescript-eslint/unified-signatures': 'off',

        ...overrides,
      },
    },
    ...isTypeAware
      ? [{
          files,
          name: 'sj-distributor/typescript/rules-type-aware',
          rules: {
            ...{
              // 关闭 ESLint 原生规则，由 TypeScript 规则替代

              // 禁止使用点号访问属性
              'dot-notation': 'off',

              // 禁止隐式的 eval 调用
              'no-implied-eval': 'off',

              // --- TypeScript 类型感知规则 ---

              // 禁止等待非 thenable 的值
              '@typescript-eslint/await-thenable': 'error',

              // 强制使用点号访问属性，允许关键字
              '@typescript-eslint/dot-notation': ['error', { allowKeywords: true }],

              // 禁止未处理的 Promise
              '@typescript-eslint/no-floating-promises': 'error',

              // 禁止对数组使用 for-in 循环
              '@typescript-eslint/no-for-in-array': 'error',

              // 禁止隐式的 eval 调用
              '@typescript-eslint/no-implied-eval': 'error',

              // 禁止误用 Promise
              '@typescript-eslint/no-misused-promises': 'error',

              // 禁止不必要的类型断言
              '@typescript-eslint/no-unnecessary-type-assertion': 'error',

              // 禁止不安全的函数参数
              '@typescript-eslint/no-unsafe-argument': 'error',

              // 禁止不安全的赋值
              '@typescript-eslint/no-unsafe-assignment': 'error',

              // 禁止不安全的函数调用
              '@typescript-eslint/no-unsafe-call': 'error',

              // 禁止不安全的成员访问
              '@typescript-eslint/no-unsafe-member-access': 'error',

              // 禁止不安全的返回
              '@typescript-eslint/no-unsafe-return': 'error',

              // 强制异步函数返回 Promise
              '@typescript-eslint/promise-function-async': 'error',

              // 限制加号操作符的操作数类型
              '@typescript-eslint/restrict-plus-operands': 'error',

              // 限制模板字符串中的表达式类型
              '@typescript-eslint/restrict-template-expressions': 'error',

              // 强制在 try-catch 中使用 return await
              '@typescript-eslint/return-await': ['error', 'in-try-catch'],

              // 强制严格的布尔表达式
              '@typescript-eslint/strict-boolean-expressions': ['error', {
                allowNullableBoolean: true, // 允许可空的布尔值
                allowNullableObject: true, // 允许可空的对象
              }],

              // 强制 switch 语句的完备性检查
              '@typescript-eslint/switch-exhaustiveness-check': 'error',

              // 禁止未绑定的方法
              '@typescript-eslint/unbound-method': 'error',
            } as EslintFlatConfigItem['rules'],
          },
          ...overridesTypeAware,
        }]
      : [],
  ];
};
