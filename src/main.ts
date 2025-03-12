import type { Linter } from 'eslint';
import { FlatConfigComposer } from 'eslint-flat-config-utils';
import { isPackageExists } from 'local-pkg';

import { ignores, importX, react, stylistic, typescript } from './configs';
import { javascript } from './configs/javascript';
import type { ConfigNames } from './eslintype';
import type { Awaitable, IOptionsConfig, EslintFlatConfigItem } from './types';
import { getOverrides, resolveSubOptions } from './utils';

export const avenger = (
  options: IOptionsConfig & Omit<EslintFlatConfigItem, 'files'> = {},
  ...customCongis: Awaitable<EslintFlatConfigItem | EslintFlatConfigItem[] | FlatConfigComposer<any, any> | Linter.Config[]>[]
): FlatConfigComposer<EslintFlatConfigItem, ConfigNames> => {
  const {
    typescript: enableTypeScript = isPackageExists('typescript'),
    stylistic: enableStylistic = true,
    react: enableReact = false,
    reactnative: enableReactNative = false,
    ignores: customIgnoresConfig,
  } = options;

  const stylisticOptions = options.stylistic === false
    ? false
    : typeof enableStylistic === 'object'
      ? enableStylistic
      : {};

  const configs: Awaitable<EslintFlatConfigItem[]>[] = [];

  const typescriptOptions = resolveSubOptions(options, 'typescript');
  const tsconfigPath = 'tsconfigPath' in typescriptOptions ? typescriptOptions.tsconfigPath : undefined;

  // Configurations enabled by default
  configs.push(
    ignores(customIgnoresConfig),
    javascript({
      overrides: getOverrides(options, 'javascript'),
    }),
    importX(),
  );

  if (enableTypeScript) {
    configs.push(
      typescript({
        ...typescriptOptions,
        overrides: getOverrides(options, 'typescript'),
      }),
    );
  }

  if (stylisticOptions) {
    configs.push(stylistic({
      ...stylisticOptions,
      overrides: getOverrides(options, 'stylistic'),
    }));
  }

  if (enableReact) {
    configs.push(react({
      ...typescriptOptions,
      overrides: getOverrides(options, 'react'),
      tsconfigPath,
      reactnative: !!enableReactNative,
    }));
  }

  let flatConfigs = new FlatConfigComposer<EslintFlatConfigItem, ConfigNames>();

  flatConfigs = flatConfigs.append(
    ...configs,
    ...customCongis as any,
  );

  return flatConfigs;
};
