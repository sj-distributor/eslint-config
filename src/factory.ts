import  { FlatConfigComposer } from 'eslint-flat-config-utils';
import { type Awaitable, type ConfigNames, type OptionsConfig, type TypedFlatConfigItem } from './types';
import { getOverrides, resolveSubOptions } from './utils';
import type { Linter } from 'eslint';
import { isPackageExists } from 'local-pkg';
import { disablesConfig, reactConfig } from './configs';

const flatConfigProps = [
  'name',
  'languageOptions',
  'linterOptions',
  'processor',
  'plugins',
  'rules',
  'settings',
] satisfies (keyof TypedFlatConfigItem)[]

/**
 * Construct an array of ESLint flat config items.
 *
 * @param {OptionsConfig & TypedFlatConfigItem} options
 *  The options for generating the ESLint configurations.
 * @param {Awaitable<TypedFlatConfigItem | TypedFlatConfigItem[]>[]} userConfigs
 *  The user configurations to be merged with the generated configurations.
 * @returns {Promise<TypedFlatConfigItem[]>}
 *  The merged ESLint configurations.
 */
export function avenger (
  options: OptionsConfig & Omit<TypedFlatConfigItem, 'files'> = {},
  ...userConfigs: Awaitable<TypedFlatConfigItem | TypedFlatConfigItem[] | FlatConfigComposer<any, any> | Linter.Config[]>[]
):  FlatConfigComposer<TypedFlatConfigItem, ConfigNames> {
  const {
    react = false,
    typescript = isPackageExists('typescript'),
    ...otherOptions
  } = options;

  const configs: Promise<TypedFlatConfigItem[]>[] = []

  const typescriptOptions = resolveSubOptions(options, 'typescript')

  const tsconfigPath = 'tsconfigPath' in typescriptOptions ? typescriptOptions.tsconfigPath : undefined
  
  if (react) { 
    configs.push(reactConfig({
      ...typescriptOptions,
      overrides: getOverrides(options, 'react'),
      tsconfigPath,
    }));
  }

  configs.push(
    disablesConfig(),
  )

  if ('files' in options) {
    throw new Error('[@sj-distributor/eslint-config] The first argument should not contain the "files" property as the options are supposed to be global. Place it in the second or later config instead.')
  }

  // User can optionally pass a flat config item to the first argument
  // We pick the known keys as ESLint would do schema validation
  const fusedConfig = flatConfigProps.reduce((acc, key) => {
    if (key in options)
      acc[key] = options[key] as any
    return acc
  }, {} as TypedFlatConfigItem)

  if (Object.keys(fusedConfig).length) {
    configs.push(Promise.resolve([fusedConfig]))
  }

  let composer = new FlatConfigComposer<TypedFlatConfigItem, ConfigNames>()

  composer = composer
    .append(
      ...configs,
      ...userConfigs as any,
    );

  return composer;
}