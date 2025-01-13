import type { Linter } from 'eslint'
import type { RuleOptions } from './eslintype'
import type { Awaitable, IOptionsConfig, ResolvedOptions, EslintFlatConfigItem } from './types'

export  const mergeFlatConfigs = async (...configs: Awaitable<EslintFlatConfigItem | EslintFlatConfigItem[]>[]): Promise<EslintFlatConfigItem[]> => {
  const resolved = await Promise.all(configs)
  return resolved.flat()
}

export const resolveSubOptions = <K extends keyof IOptionsConfig>(
  options: IOptionsConfig,
  key: K,
): ResolvedOptions<IOptionsConfig[K]> => {
  return typeof options[key] === 'boolean'
    ? {} as any
    : options[key] || {}
}

export const getOverrides = <K extends keyof IOptionsConfig>(
  options: IOptionsConfig,
  key: K,
): Partial<Linter.RulesRecord & RuleOptions> => {
  const sub = resolveSubOptions(options, key)
  return {
    ...(options.overrides as any)?.[key],
    ...'overrides' in sub
      ? sub.overrides
      : {},
  }
}

export const loadModule = async <T>(m: Promise<T>): Promise<T extends { default: infer U } ? U : T> => {
  const result = await m;
  return (result as any).default || result;
}