import type { Awaitable, TypedFlatConfigItem } from './types'

/**
 * Merges and flattens multiple ESLint configs into a single array.
 */
export async function mergeFlatConfigs(...configs: Awaitable<TypedFlatConfigItem | TypedFlatConfigItem[]>[]): Promise<TypedFlatConfigItem[]> {
  const resolved = await Promise.all(configs)
  return resolved.flat()
}