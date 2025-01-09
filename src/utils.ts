import type { Linter } from 'eslint'
import type { RuleOptions } from './eslintype'
import type { Awaitable, OptionsConfig, ResolvedOptions, EslintFlatConfigItem } from './types'

/**
 * Merges and flattens multiple ESLint configs into a single array.
 */
export async function mergeFlatConfigs(...configs: Awaitable<EslintFlatConfigItem | EslintFlatConfigItem[]>[]): Promise<EslintFlatConfigItem[]> {
  const resolved = await Promise.all(configs)
  return resolved.flat()
}

export function resolveSubOptions<K extends keyof OptionsConfig>(
  options: OptionsConfig,
  key: K,
): ResolvedOptions<OptionsConfig[K]> {
  return typeof options[key] === 'boolean'
    ? {} as any
    : options[key] || {}
}

export function getOverrides<K extends keyof OptionsConfig>(
  options: OptionsConfig,
  key: K,
): Partial<Linter.RulesRecord & RuleOptions> {
  const sub = resolveSubOptions(options, key)
  return {
    ...(options.overrides as any)?.[key],
    ...'overrides' in sub
      ? sub.overrides
      : {},
  }
}