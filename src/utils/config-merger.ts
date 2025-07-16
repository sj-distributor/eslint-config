import type { Linter } from 'eslint';

import type { RuleOptions } from '../eslintype';
import type { Awaitable, IOptionsConfig, ResolvedOptions, EslintFlatConfigItem } from '../types';

/**
 * Merge multiple flat ESLint configurations.
 */
export const mergeFlatConfigs = async (
  ...configs: Awaitable<EslintFlatConfigItem | EslintFlatConfigItem[]>[]
): Promise<EslintFlatConfigItem[]> => {
  const resolved = await Promise.all(configs);
  return resolved.flat();
};

/**
 * Parse suboptions.
 */
export const resolveSubOptions = <K extends keyof IOptionsConfig>(
  options: IOptionsConfig,
  key: K,
): ResolvedOptions<IOptionsConfig[K]> => {
  const value = options[key];

  return typeof value === 'boolean' ? {} as any : value || {};
};

/**
 * Obtain coverage rules.
 */
export const getOverrides = <K extends keyof IOptionsConfig>(
  options: IOptionsConfig,
  key: K,
): Partial<Linter.RulesRecord & RuleOptions> => {
  const subOptions = resolveSubOptions(options, key);

  return {
    ...(options.overrides as any)?.[key],
    ...('overrides' in subOptions ? subOptions.overrides : {}),
  };
};
