import { globs } from '../../globs'
import type { FlatConfigItem, OptionsComponentExts, OptionsFiles, OptionsOverrides, OptionsTypeScriptParserOptions, OptionsTypeScriptWithTypes } from '../../types'
import { renameRules, resolveModule } from '../../utils'

export const typescriptConfig = async (
  options: OptionsFiles & OptionsOverrides & OptionsTypeScriptWithTypes & OptionsTypeScriptParserOptions & OptionsComponentExts = {}
): Promise<FlatConfigItem[]> => { 
const {
    componentExts = [],
    overrides = {},
    // overridesTypeAware = {},
    parserOptions = {},
    // type = 'app',
} = options
  
  const files = options.files ?? [
    globs.ts,
    globs.tsx,
    ...componentExts.map(ext => `**/*.${ext}`),
  ]
  
  const filesTypeAware = options.filesTypeAware ?? [globs.ts, globs.tsx]

  const ignoresTypeAware = options.ignoresTypeAware ?? [
    `${globs.markdown}/**`,
    globs.astro,
  ]

  const tsconfigPath = options?.tsconfigPath
    ? options.tsconfigPath
    : undefined
  
  const isTypeAware = !!tsconfigPath
  
  const [
    pluginTypescript,
    parserTypescript,
  ] = await Promise.all([
    resolveModule(import('@typescript-eslint/eslint-plugin')),
    resolveModule(import('@typescript-eslint/parser')),
  ] as const)

  const makeParser = (typeAware: boolean, files: string[], ignores?: string[]): FlatConfigItem => {
    return {
      files,
      ...ignores ? { ignores } : {},
      languageOptions: {
        parser: parserTypescript,
        parserOptions: {
          extraFileExtensions: componentExts.map(ext => `.${ext}`),
          sourceType: 'module',
          ...typeAware
            ? {
                projectService: {
                  allowDefaultProject: ['./*.js'],
                  defaultProject: tsconfigPath,
                },
                tsconfigRootDir: process.cwd(),
              }
            : {},
          ...parserOptions as any,
        },
      },
      name: `sj-distributor/typescript/${typeAware ? 'type-aware-parser' : 'parser'}`,
    }
  }

  return [
    {
      name: 'sj-distributor/typescript/setup',
      plugins: {
        ts: pluginTypescript as any,
      },
    },
    ...isTypeAware
      ? [
          makeParser(false, files),
          makeParser(true, filesTypeAware, ignoresTypeAware),
        ]
      : [
        makeParser(false, files),
      ],
    {
      files,
      name: 'sj-distributor/typescript/rules',
      rules: {
        ...renameRules(
          pluginTypescript.configs['eslint-recommended'].overrides![0].rules!,
          { '@typescript-eslint': 'ts' },
        ),
        ...renameRules(
          pluginTypescript.configs.strict.rules!,
          { '@typescript-eslint': 'ts' },
        ),
        'no-dupe-class-members': 'off',
        'no-redeclare': 'off',
        'no-use-before-define': 'off',
        'no-useless-constructor': 'off',
        'ts/ban-ts-comment': ['error', { 'ts-expect-error': 'allow-with-description' }],
        'ts/consistent-type-definitions': ['error', 'interface'],
        'ts/consistent-type-imports': ['error', {
          disallowTypeAnnotations: false,
          prefer: 'type-imports',
        }],

        'ts/method-signature-style': ['error', 'property'], // https://www.totaltypescript.com/method-shorthand-syntax-considered-harmful
        'ts/no-dupe-class-members': 'error',
        'ts/no-dynamic-delete': 'off',
        'ts/no-empty-object-type': ['error', { allowInterfaces: 'always' }],
        'ts/no-explicit-any': 'off',
        'ts/no-extraneous-class': 'off',
        'ts/no-import-type-side-effects': 'error',
        'ts/no-invalid-void-type': 'off',
        'ts/no-non-null-assertion': 'off',
        'ts/no-redeclare': ['error', { builtinGlobals: false }],
        'ts/no-require-imports': 'error',
        'ts/no-unused-expressions': ['error', {
          allowShortCircuit: true,
          allowTaggedTemplates: true,
          allowTernary: true,
        }],
        'ts/no-unused-vars': 'off',
        'ts/no-use-before-define': ['error', { classes: false, functions: false, variables: true }],
        'ts/no-useless-constructor': 'off',
        'ts/no-wrapper-object-types': 'error',
        'ts/triple-slash-reference': 'off',
        'ts/unified-signatures': 'off',

        ...overrides,
      }
    },
  ]
}