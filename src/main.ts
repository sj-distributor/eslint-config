import { FlatConfigComposer } from 'eslint-flat-config-utils';
import type { Awaitable, OptionsConfig, TypedFlatConfigItem } from './types'
import type { ConfigNames } from './eslintype';

export const sjAvenger = (
  options: OptionsConfig & Omit<TypedFlatConfigItem, 'files'> = {},
  ...customCongis:any
): FlatConfigComposer<TypedFlatConfigItem, ConfigNames> => {
  const {
    typescript
  } = options;

  const configs: Awaitable<TypedFlatConfigItem[]>[] = []

  configs.push(
    
  )

  let flatConfigs = new FlatConfigComposer<TypedFlatConfigItem, ConfigNames>()

  flatConfigs = flatConfigs.append(
    ...configs,
    ...customCongis as any,
  );

  return flatConfigs
}