import { FlatConfigComposer } from 'eslint-flat-config-utils';
import type { OptionsConfig, Awaitable, FlatConfigItem } from './types/types';
import { isPackageExists } from 'local-pkg';
import { reactConfig } from './configs/react-config';

export function avenger(options: OptionsConfig) :FlatConfigComposer<FlatConfigItem>
{
  const {
    react: enableReact = true,
    typescript: enableTypescript = isPackageExists('typescript'),
    overrides = {}
  } = options;

  const confgis: Awaitable<FlatConfigItem[]>[] = [];

  if (enableReact) {
    confgis.push(reactConfig());
  }

  const composer = new FlatConfigComposer<FlatConfigItem>();

  composer.append(...confgis);

  return composer;
}