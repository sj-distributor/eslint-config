import { FlatConfigComposer } from 'eslint-flat-config-utils';
import type { Awaitable, OptionsConfig, EslintFlatConfigItem } from './types'
import type { ConfigNames } from './eslintype';
import { javascript } from './configs/javascript';
import { getOverrides } from './utils';

export const avenger = (
  options: OptionsConfig & Omit<EslintFlatConfigItem, 'files'> = {},
  ...customCongis:any
): FlatConfigComposer<EslintFlatConfigItem, ConfigNames> => {
  const {
    typescript
  } = options;

  const configs: Awaitable<EslintFlatConfigItem[]>[] = []

  // Configurations enabled by default
  configs.push(
    javascript({
      overrides:getOverrides(options, 'javascript')
    })
  )

  let flatConfigs = new FlatConfigComposer<EslintFlatConfigItem, ConfigNames>()

  flatConfigs = flatConfigs.append(
    ...configs,
    ...customCongis as any,
  );

  return flatConfigs
}