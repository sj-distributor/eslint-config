import fs from 'node:fs/promises'
import { mergeFlatConfigs, typescript } from '../src'
import { builtinRules } from 'eslint/use-at-your-own-risk'
import { flatConfigsToRulesDTS } from 'eslint-typegen/core'
import { javascript } from 'src/configs/javascript'

const configs = await mergeFlatConfigs(
  {
    plugins: {
      '': {
        rules: Object.fromEntries(builtinRules.entries())
      }
    }
  },
  javascript(),
  typescript()
)

const configNames = configs.map(i => i.name).filter(Boolean) as string[]

let dts = await flatConfigsToRulesDTS (configs, {
  includeAugmentation: false,
})

dts += `
// Names of all the configs
export type ConfigNames = ${configNames.map(i => `'${i}'`).join(' | ')}
`

await fs.writeFile('src/eslintype.d.ts', dts)
