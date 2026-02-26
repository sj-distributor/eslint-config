import type { Linter } from 'eslint';
import tseslint from 'typescript-eslint';
import type { Overrides } from '../types';

export async function typescript(
  options: {
    files?: string[];
    overrides?: Overrides;
    tsconfigPath?: string;
  } = {},
): Promise<Linter.Config[]> {
  const {
    files = ['**/*.{ts,tsx,mts,cts}'],
    overrides = {},
    tsconfigPath,
  } = options;

  const typeAwareRules: Linter.Config[] = [];

  const makeParser = (typeAware: boolean): Linter.Config => {
    return {
      files,
      languageOptions: {
        parser: tseslint.parser as any,
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
    const typeAwareConfig: Linter.Config = {
      name: 'sj-distributor/typescript/type-aware-rules',
      files,
      rules: {
        // --- TypeScript Type Aware Rules ---
        
        '@typescript-eslint/await-thenable': 'error',
        '@typescript-eslint/no-floating-promises': 'error',
        '@typescript-eslint/no-for-in-array': 'error',
        '@typescript-eslint/no-implied-eval': 'error',
        '@typescript-eslint/no-misused-promises': 'error',
        '@typescript-eslint/no-unnecessary-type-assertion': 'error',
        '@typescript-eslint/no-unsafe-argument': 'error',
        '@typescript-eslint/no-unsafe-assignment': 'error',
        '@typescript-eslint/no-unsafe-call': 'error',
        '@typescript-eslint/no-unsafe-member-access': 'error',
        '@typescript-eslint/no-unsafe-return': 'error',
        '@typescript-eslint/require-await': 'error',
        '@typescript-eslint/restrict-plus-operands': 'error',
        '@typescript-eslint/restrict-template-expressions': 'error',
        '@typescript-eslint/unbound-method': 'error',
        
        // Disable ESLint rules that are handled by Type Aware Rules
        'dot-notation': 'off',
        'no-implied-eval': 'off',
        'require-await': 'off',
        '@typescript-eslint/dot-notation': ['error', { allowKeywords: true }],
      } as any,
    };
    typeAwareRules.push(typeAwareConfig);
  }

  const recommendedRules = tseslint.configs.recommended.reduce((acc, config) => {
    return { ...acc, ...config.rules };
  }, {});

  const strictRules = tseslint.configs.strict.reduce((acc, config) => {
    return { ...acc, ...config.rules };
  }, {});

  const recommendedConfig: Linter.Config = {
    name: 'sj-distributor/typescript/rules',
    files,
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      ...recommendedRules,
      ...strictRules,

      // --- Custom Rules ---

      // Allow any but warn
      '@typescript-eslint/no-explicit-any': 'warn',
      
      // Enforce type imports
      '@typescript-eslint/consistent-type-imports': ['error', {
        prefer: 'type-imports',
        disallowTypeAnnotations: false,
      }],
      
      // Allow unused vars (handled by unused-imports)
      '@typescript-eslint/no-unused-vars': 'off',
      
      // Allow non-null assertions
      '@typescript-eslint/no-non-null-assertion': 'off',
      
      // Allow type alias for definitions
      '@typescript-eslint/consistent-type-definitions': 'off',
      
      // Enforce method signature style
      '@typescript-eslint/method-signature-style': ['error', 'property'],

      // Disable ESLint rules that are handled by TypeScript
      'no-dupe-class-members': 'off',
      'no-redeclare': 'off',
      'no-use-before-define': 'off',
      'no-useless-constructor': 'off',

      // Enable TypeScript versions of above rules
      '@typescript-eslint/no-dupe-class-members': 'error',
      '@typescript-eslint/no-redeclare': ['error', { builtinGlobals: false }],
      '@typescript-eslint/no-use-before-define': ['error', { classes: false, functions: false, variables: true }],
      '@typescript-eslint/no-useless-constructor': 'off', // constructor parameters property is useful

      ...overrides,
    } as any,
  };

  return [
    {
      name: 'sj-distributor/typescript/setup',
      plugins: {
        '@typescript-eslint': tseslint.plugin,
      },
    },
    ...(tsconfigPath
      ? [makeParser(false), makeParser(true)]
      : [makeParser(false)]
    ),
    recommendedConfig,
    ...typeAwareRules,
  ];
}
