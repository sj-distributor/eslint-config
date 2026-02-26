import { interopDefault, renameRules } from '../utils';
import type { Overrides, TypedFlatConfigItem } from '../types';

export async function typescript(
  options: {
    files?: string[];
    overrides?: Overrides;
    tsconfigPath?: string;
  } = {},
): Promise<TypedFlatConfigItem[]> {
  const {
    files = ['**/*.{ts,tsx,mts,cts}'],
    overrides = {},
    tsconfigPath,
  } = options;

  const pluginTs = await interopDefault(import('typescript-eslint'));

  const typeAwareRules: TypedFlatConfigItem[] = [];

  const makeParser = (typeAware: boolean): TypedFlatConfigItem => {
    return {
      files,
      languageOptions: {
        parser: pluginTs.parser,
        parserOptions: {
          sourceType: 'module',
          ...(typeAware && tsconfigPath)
            ? {
                projectService: true,
                tsconfigRootDir: process.cwd(),
              }
            : {},
        },
      },
      name: `sj-distributor/typescript/${typeAware ? 'type-aware-parser' : 'parser'}`,
    };
  };

  if (tsconfigPath) {
    const typeAwareConfig: TypedFlatConfigItem = {
      name: 'sj-distributor/typescript/type-aware-rules',
      files,
      rules: {
        // --- TypeScript Type Aware Rules ---

        'ts/await-thenable': 'error',
        'ts/no-floating-promises': 'error',
        'ts/no-for-in-array': 'error',
        'ts/no-implied-eval': 'error',
        'ts/no-misused-promises': 'error',
        'ts/no-unnecessary-type-assertion': 'error',
        'ts/no-unsafe-argument': 'error',
        'ts/no-unsafe-assignment': 'error',
        'ts/no-unsafe-call': 'error',
        'ts/no-unsafe-member-access': 'error',
        'ts/no-unsafe-return': 'error',
        'ts/require-await': 'error',
        'ts/restrict-plus-operands': 'error',
        'ts/restrict-template-expressions': 'error',
        'ts/unbound-method': 'error',

        // Disable ESLint rules that are handled by Type Aware Rules
        'dot-notation': 'off',
        'no-implied-eval': 'off',
        'require-await': 'off',
        'ts/dot-notation': ['error', { allowKeywords: true }],
      },
    };
    typeAwareRules.push(typeAwareConfig);
  }

  const recommendedRules = pluginTs.configs.recommended.reduce((acc, config) => {
    return { ...acc, ...renameRules(config.rules || {}, { '@typescript-eslint': 'ts' }) };
  }, {} as TypedFlatConfigItem['rules']);

  const strictRules = pluginTs.configs.strict.reduce((acc, config) => {
    return { ...acc, ...renameRules(config.rules || {}, { '@typescript-eslint': 'ts' }) };
  }, {} as TypedFlatConfigItem['rules']);

  return [
    {
      name: 'sj-distributor/typescript/setup',
      plugins: {
        ts: pluginTs.plugin,
      },
    },
    ...(tsconfigPath
      ? [makeParser(false), makeParser(true)]
      : [makeParser(false)]
    ),
    {
      name: 'sj-distributor/typescript/rules',
      files,
      rules: {
        ...recommendedRules,
        ...strictRules,

        // --- Custom Rules ---

        // Allow any but warn
        'ts/no-explicit-any': 'warn',

        // Enforce type imports
        'ts/consistent-type-imports': ['error', {
          prefer: 'type-imports',
          disallowTypeAnnotations: false,
        }],

        // Allow unused vars (handled by unused-imports)
        'ts/no-unused-vars': 'off',

        // Allow non-null assertions
        'ts/no-non-null-assertion': 'off',

        // Allow type alias for definitions
        'ts/consistent-type-definitions': 'off',

        // Enforce method signature style
        'ts/method-signature-style': ['error', 'property'],

        // Disable ESLint rules that are handled by TypeScript
        'no-dupe-class-members': 'off',
        'no-redeclare': 'off',
        'no-use-before-define': 'off',
        'no-useless-constructor': 'off',

        // Enable TypeScript versions of above rules
        'ts/no-dupe-class-members': 'error',
        'ts/no-redeclare': ['error', { builtinGlobals: false }],
        'ts/no-use-before-define': ['error', { classes: false, functions: false, variables: true }],
        'ts/no-useless-constructor': 'off', // constructor parameters property is useful
      },
    },
    ...typeAwareRules,
    {
      name: 'sj-distributor/typescript/overrides',
      files,
      rules: overrides,
    },
  ];
}
