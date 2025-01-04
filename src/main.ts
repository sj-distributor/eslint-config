import { FlatConfigComposer } from 'eslint-flat-config-utils';
import type { OptionsConfig, Awaitable, FlatConfigItem } from './types';
import { isPackageExists } from 'local-pkg';
import type { Linter } from 'eslint';
import { getOverrides, resolveSubOptions } from './utils';
import { ignoreConfig } from './configs';

export const avenger = (
  options: OptionsConfig & Omit<FlatConfigItem, 'files'> = {},
  ...customConfigs: Awaitable<Linter.Config | FlatConfigItem | FlatConfigItem[] | FlatConfigComposer<any, any>>[]
): FlatConfigComposer<FlatConfigItem> => {
  const {
    react: enableReact,
    typescript: enableTypeScript = isPackageExists('typescript'),
    ignores,
    // overrides = {},
    componentExts = [],
  } = options;

  // Initialize an array to hold configuration items
  const configs: Awaitable<FlatConfigItem[]>[] = [];

  const typescriptOptions:any = resolveSubOptions(options, 'typescript')
  // const tsconfigPath = 'tsconfigPath' in typescriptOptions ? typescriptOptions.tsconfigPath : undefined
  
  configs.push(
    ignoreConfig(ignores),
    // javascriptConfig({
    //   overrides: getOverrides(options, 'javascript'),
    // })
  );

  // if (enableTypeScript) {
  //   configs.push(typescriptConfig({
  //     ...typescriptOptions,
  //     componentExts,
  //     overrides: getOverrides(options, 'typescript'),
  //     // type: options.type,
  //   }))
  // }
  
  // if (enableReact) {
  //   configs.push(reactConfig());
  // }

  let composer = new FlatConfigComposer<FlatConfigItem>();

  composer = composer
    .append(
      ...configs,
      ...customConfigs as any,
    );

  return composer;
}