import fs from 'node:fs/promises';
import { flatConfigsToRulesDTS } from 'eslint-typegen/core';
import { builtinRules } from 'eslint/use-at-your-own-risk';
import type { Linter } from 'eslint';
import { ignores, javascript, react, stylistic, typescript, unicorn } from '../src';

export async function generateTypeDefinitions() {
  const configs: Linter.Config[] = [
    {
      name: 'eslint/builtin',
      plugins: {
        '': {
          rules: Object.fromEntries(builtinRules.entries()),
        },
      },
    },
    ...ignores(),
    ...(await javascript()),
    ...(await typescript()),
    ...(await react()),
    ...stylistic(),
    ...unicorn(),
  ];

  const configNames = configs.map(i => i.name).filter(Boolean) as string[];

  let dts = await flatConfigsToRulesDTS(configs, {
    includeAugmentation: false,
  });

  dts += `
// Names of all the configs
export type ConfigNames = ${configNames.map(i => `'${i}'`).join(' | ')}
`;

  await fs.writeFile('src/typegen.d.ts', dts);
}

generateTypeDefinitions().catch(console.error);
