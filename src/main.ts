import { FlatConfigComposer } from 'eslint-flat-config-utils';
import type { Awaitable, IOptionsConfig, EslintFlatConfigItem } from './types';
import type { ConfigNames } from './eslintype';
import { javascript } from './configs/javascript';
import { getOverrides, resolveSubOptions } from './utils';
import { isPackageExists } from 'local-pkg';
import { stylistic, typescript } from './configs';

export const avenger = (
  options: IOptionsConfig & Omit<EslintFlatConfigItem, 'files'> = {},
  ...customCongis: any
): FlatConfigComposer<EslintFlatConfigItem, ConfigNames> => {
  const {
    typescript: enableTypeScript = isPackageExists('typescript'),
    stylistic: enableStylistic = true,
  } = options;

  const stylisticOptions = typeof enableStylistic === 'object'
    ? enableStylistic
    : {};

  const configs: Awaitable<EslintFlatConfigItem[]>[] = [];

  const typescriptOptions = resolveSubOptions(options, 'typescript');

  // Configurations enabled by default
  configs.push(
    javascript({
      overrides: getOverrides(options, 'javascript'),
    }),
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

  let flatConfigs = new FlatConfigComposer<EslintFlatConfigItem, ConfigNames>();

  flatConfigs = flatConfigs.append(
    ...configs,
    ...customCongis as any,
  );

  return flatConfigs;
};
