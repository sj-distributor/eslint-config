import { GLOB_EXCLUDE } from '../globs'
import type { FlatConfigItem } from '../types'

export const ignoreConfig = async (customIgnores: string[] = []): Promise<FlatConfigItem[]> => { 
  return [
    {
      name: 'sj-distributor/ignores',
      ignores: [
        ...GLOB_EXCLUDE,
        ...customIgnores
      ]
    }
  ]
}