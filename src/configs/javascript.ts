import unusedImportsPlugin from 'eslint-plugin-unused-imports';
import globals from 'globals';

import type { IOptionsOverrides, EslintFlatConfigItem } from '../types';

export const javascript = async (
  { overrides = {} }: IOptionsOverrides = {},
): Promise<EslintFlatConfigItem[]> => {
  return [
    {
      name: 'sj-distributor/javascript/setup',
      linterOptions: {
        reportUnusedDisableDirectives: true,
      },
      languageOptions: {
        ecmaVersion: 2022,
        globals: {
          ...globals.browser,
          ...globals.es2021,
          ...globals.node,
          document: 'readonly',
          navigator: 'readonly',
          window: 'readonly',
        },
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
          ecmaVersion: 2022,
          sourceType: 'module',
        },
        sourceType: 'module',
      },
    },
    {
      name: 'sj-distributor/javascript/rules',
      plugins: {
        'unused-imports': unusedImportsPlugin,
      },
      rules: {
        // 强制 getter 和 setter 成对出现，并确保 setter 不能没有对应的 getter
        'accessor-pairs': ['error', { enforceForClassMembers: true, setWithoutGet: true }],

        // 强制数组方法（如 map、filter）的回调函数中有 return 语句
        'array-callback-return': 'error',

        // 禁止在块作用域外使用变量
        'block-scoped-var': 'error',

        // 强制在子类构造函数中调用 super()
        'constructor-super': 'error',

        // 强制 switch 语句中的 default 分支放在最后
        'default-case-last': 'error',

        // 强制使用点号访问对象属性（如 obj.property 而不是 obj['property']），但允许关键字作为属性名
        'dot-notation': ['error', { allowKeywords: true }],

        // 强制使用 === 和 !==，避免隐式类型转换
        'eqeqeq': ['error', 'smart'],

        // 强制构造函数名以大写字母开头，但允许非构造函数以小写字母开头
        'new-cap': ['error', { capIsNew: false, newIsCap: true, properties: true }],

        // 禁止使用 alert、confirm 和 prompt
        'no-alert': 'error',

        // 禁止使用 Array 构造函数，推荐使用数组字面量
        'no-array-constructor': 'error',

        // 禁止在 new Promise 的构造函数中使用 async 函数
        'no-async-promise-executor': 'error',

        // 禁止使用 arguments.caller 和 arguments.callee
        'no-caller': 'error',

        // 禁止在 case 或 default 分支中声明变量，除非使用块作用域
        'no-case-declarations': 'error',

        // 禁止重新赋值类名
        'no-class-assign': 'error',

        // 禁止与 -0 进行比较
        'no-compare-neg-zero': 'error',

        // 禁止在条件语句中使用赋值操作符（如 if (x = 1)）
        'no-cond-assign': ['error', 'always'],

        // 禁止使用 console，但允许 console.warn 和 console.error
        'no-console': ['error', { allow: ['warn', 'error'] }],

        // 禁止重新赋值 const 声明的变量
        'no-const-assign': 'error',

        // 禁止在正则表达式中使用控制字符（如 \x1f）
        'no-control-regex': 'error',

        // 禁止使用 debugger
        'no-debugger': 'error',

        // 禁止删除变量
        'no-delete-var': 'error',

        // 禁止函数参数重复
        'no-dupe-args': 'error',

        // 禁止类成员重复
        'no-dupe-class-members': 'error',

        // 禁止对象字面量中键名重复
        'no-dupe-keys': 'error',

        // 禁止 switch 语句中的重复 case 分支
        'no-duplicate-case': 'error',

        // 禁止空块语句，但允许空的 catch 块
        'no-empty': ['error', { allowEmptyCatch: true }],

        // 禁止正则表达式中使用空字符类（如 []）
        'no-empty-character-class': 'error',

        // 禁止解构赋值中使用空模式（如 const {} = obj）
        'no-empty-pattern': 'error',

        // 禁止使用 eval
        'no-eval': 'error',

        // 禁止在 catch 块中重新赋值异常变量
        'no-ex-assign': 'error',

        // 禁止扩展原生对象（如 Array.prototype）
        'no-extend-native': 'error',

        // 禁止不必要的 bind 调用
        'no-extra-bind': 'error',

        // 禁止不必要的布尔类型转换（如 !!x）
        'no-extra-boolean-cast': 'error',

        // 禁止 switch 语句中的 case 分支穿透（缺少 break）
        'no-fallthrough': 'error',

        // 禁止重新赋值函数声明
        'no-func-assign': 'error',

        // 禁止重新赋值全局变量
        'no-global-assign': 'error',

        // 禁止隐式的 eval 调用（如 setTimeout('code')）
        'no-implied-eval': 'error',

        // 禁止重新赋值 import 导入的变量
        'no-import-assign': 'error',

        // 禁止无效的正则表达式
        'no-invalid-regexp': 'error',

        // 禁止使用不规则的空白字符
        'no-irregular-whitespace': 'error',

        // 禁止使用 __iterator__ 属性
        'no-iterator': 'error',

        // 禁止使用标签语句（如 label: for (...)）
        'no-labels': ['error', { allowLoop: false, allowSwitch: false }],

        // 禁止不必要的嵌套块
        'no-lone-blocks': 'error',

        // 禁止数字字面量丢失精度
        'no-loss-of-precision': 'error',

        // 禁止正则表达式中可能引起误解的字符类
        'no-misleading-character-class': 'error',

        // 禁止多行字符串
        'no-multi-str': 'error',

        // 禁止使用 new 调用构造函数但不赋值
        'no-new': 'error',

        // 禁止使用 new Function
        'no-new-func': 'error',

        // 禁止使用 new 调用非构造函数的原生对象（如 new Symbol）
        'no-new-native-nonconstructor': 'error',

        // 禁止使用 new 调用原始值包装器（如 new String、new Number）
        'no-new-wrappers': 'error',

        // 禁止将全局对象作为函数调用（如 Math()）
        'no-obj-calls': 'error',

        // 禁止使用八进制字面量（如 0123）
        'no-octal': 'error',

        // 禁止字符串中使用八进制转义序列（如 "\0123"）
        'no-octal-escape': 'error',

        // 禁止使用 __proto__ 属性
        'no-proto': 'error',

        // 禁止直接调用 Object.prototype 的方法（如 hasOwnProperty）
        'no-prototype-builtins': 'error',

        // 禁止重复声明变量
        'no-redeclare': ['error', { builtinGlobals: false }],

        // 禁止正则表达式中使用多个空格（如 /a   b/）
        'no-regex-spaces': 'error',

        // 禁止使用特定的全局变量（如 global 和 self），推荐使用 globalThis
        'no-restricted-globals': [
          'error',
          { message: 'Use `globalThis` instead.', name: 'global' },
          { message: 'Use `globalThis` instead.', name: 'self' },
        ],

        // 禁止使用特定的对象属性（如 __proto__、__defineGetter__）
        'no-restricted-properties': [
          'error',
          { message: 'Use `Object.getPrototypeOf` or `Object.setPrototypeOf` instead.', property: '__proto__' },
          { message: 'Use `Object.defineProperty` instead.', property: '__defineGetter__' },
          { message: 'Use `Object.defineProperty` instead.', property: '__defineSetter__' },
          { message: 'Use `Object.getOwnPropertyDescriptor` instead.', property: '__lookupGetter__' },
          { message: 'Use `Object.getOwnPropertyDescriptor` instead.', property: '__lookupSetter__' },
        ],

        // 禁止使用特定的语法（如 const enum 和 export =）
        'no-restricted-syntax': [
          'error',
          'TSEnumDeclaration[const=true]',
          'TSExportAssignment',
        ],

        // 禁止自我赋值（如 x = x）
        'no-self-assign': ['error', { props: true }],

        // 禁止自我比较（如 x === x）
        'no-self-compare': 'error',

        // 禁止使用逗号操作符（如 a = 1, b = 2）
        'no-sequences': 'error',

        // 禁止使用保留字作为变量名（如 let class = 1）
        'no-shadow-restricted-names': 'error',

        // 禁止稀疏数组（如 [1,,2]）
        'no-sparse-arrays': 'error',

        // 禁止在字符串中使用模板字符串语法（如 "Hello ${name}"）
        'no-template-curly-in-string': 'error',

        // 禁止在 super() 之前使用 this
        'no-this-before-super': 'error',

        // 禁止抛出非 Error 对象
        'no-throw-literal': 'error',

        // 禁止使用未声明的变量
        'no-undef': 'error',

        // 禁止将变量初始化为 undefined
        'no-undef-init': 'error',

        // 禁止意外的多行代码（如 return 后换行）
        'no-unexpected-multiline': 'error',

        // 禁止循环条件未修改
        'no-unmodified-loop-condition': 'error',

        // 禁止不必要的三元表达式（如 x ? x : y）
        'no-unneeded-ternary': ['error', { defaultAssignment: false }],

        // 禁止不可达代码
        'no-unreachable': 'error',

        // 禁止无法退出的循环
        'no-unreachable-loop': 'error',

        // 禁止在 finally 块中使用 return 或 throw
        'no-unsafe-finally': 'error',

        // 禁止不安全的取反操作（如 !x in y）
        'no-unsafe-negation': 'error',

        // 禁止未使用的表达式（如 a && b），但允许短路表达式和三元表达式
        'no-unused-expressions': ['error', {
          allowShortCircuit: true,
          allowTaggedTemplates: true,
          allowTernary: true,
        }],

        // 禁止未使用的变量，但忽略函数参数和捕获的异常
        'no-unused-vars': ['error', {
          args: 'none',
          caughtErrors: 'none',
          ignoreRestSiblings: true,
          vars: 'all',
        }],

        // 禁止在定义前使用变量，但允许函数和类提升
        'no-use-before-define': ['error', { classes: false, functions: false, variables: true }],

        // 禁止正则表达式中无用的反向引用
        'no-useless-backreference': 'error',

        // 禁止不必要的 .call() 和 .apply()
        'no-useless-call': 'error',

        // 禁止不必要的 catch 块
        'no-useless-catch': 'error',

        // 禁止不必要的计算属性（如 { ['a']: 1 }）
        'no-useless-computed-key': 'error',

        // 禁止不必要的构造函数
        'no-useless-constructor': 'error',

        // 禁止不必要的解构重命名（如 const { a: b } = obj）
        'no-useless-rename': 'error',

        // 禁止不必要的 return 语句
        'no-useless-return': 'error',

        // 禁止使用 var，推荐使用 let 或 const
        'no-var': 'error',

        // 禁止使用 with 语句
        'no-with': 'error',

        // 强制使用对象属性简写（如 { x } 而不是 { x: x }）
        'object-shorthand': [
          'error',
          'always',
          {
            avoidQuotes: true,
            ignoreConstructors: false,
          },
        ],

        // 强制每个作用域中只使用一个 var 或 let 声明
        'one-var': ['error', { initialized: 'never' }],

        // 推荐使用箭头函数作为回调函数
        'prefer-arrow-callback': [
          'error',
          {
            allowNamedFunctions: false,
            allowUnboundThis: true,
          },
        ],

        // 推荐使用 const 声明不会重新赋值的变量
        'prefer-const': [
          'error',
          {
            destructuring: 'all',
            ignoreReadBeforeAssign: true,
          },
        ],

        // 推荐使用幂运算符（**）而不是 Math.pow
        'prefer-exponentiation-operator': 'error',

        // 推荐在 Promise.reject 中使用 Error 对象
        'prefer-promise-reject-errors': 'error',

        // 推荐使用正则表达式字面量而不是 new RegExp
        'prefer-regex-literals': ['error', { disallowRedundantWrapping: true }],

        // 推荐使用剩余参数（...args）而不是 arguments
        'prefer-rest-params': 'error',

        // 推荐使用扩展运算符（...）而不是 apply
        'prefer-spread': 'error',

        // 推荐使用模板字符串而不是字符串拼接
        'prefer-template': 'error',

        // 强制 Symbol 必须有描述
        'symbol-description': 'error',

        // 禁止文件开头的 Unicode BOM（字节顺序标记）
        'unicode-bom': ['error', 'never'],

        // 检查未使用的导入
        'unused-imports/no-unused-imports': 'error',

        // 检查未使用的变量
        'unused-imports/no-unused-vars': [
          'error',
          {
            args: 'after-used',
            argsIgnorePattern: '^_',
            ignoreRestSiblings: true,
            vars: 'all',
            varsIgnorePattern: '^_',
          },
        ],

        // 强制使用 isNaN 检查 NaN
        'use-isnan': ['error', { enforceForIndexOf: true, enforceForSwitchCase: true }],

        // 强制 typeof 操作符的参数必须是字符串字面量
        'valid-typeof': ['error', { requireStringLiterals: true }],

        // 强制变量声明放在作用域顶部
        'vars-on-top': 'error',

        // 禁止 Yoda 条件（如 if (42 === value)）
        'yoda': ['error', 'never'],

        ...overrides,
      },
    },
  ];
};
