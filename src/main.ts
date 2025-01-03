import { FlatConfigComposer } from 'eslint-flat-config-utils';
import type { OptionsConfig, Awaitable, FlatConfigItem } from './types/types';
import { isPackageExists } from 'local-pkg';
import { reactConfig } from './configs/react-config';
import type { Linter } from 'eslint';

export const avenger = (
  options: OptionsConfig & Omit<FlatConfigItem, 'files'> = {},
  ...customConfigs: Awaitable<Linter.Config | FlatConfigItem | FlatConfigItem[] | FlatConfigComposer<any, any>>[]
): FlatConfigComposer<FlatConfigItem> => {
  const {
    react: enableReact = true,
    typescript: enableTypescript = isPackageExists('typescript'),
    overrides = {}
  } = options;

  // Initialize an array to hold configuration items
  const confgis: Awaitable<FlatConfigItem[]>[] = [];

  if (enableReact) {
    confgis.push(reactConfig());
  }

  let composer = new FlatConfigComposer<FlatConfigItem>();

  composer = composer
    .append(
      ...confgis,
      ...customConfigs as any,
    );

  return composer;
}