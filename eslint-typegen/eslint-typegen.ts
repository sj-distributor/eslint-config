import fs from 'node:fs/promises';
import { javascript, mergeFlatConfigs, react, stylistic, typescript } from '../src';
import { builtinRules } from 'eslint/use-at-your-own-risk';
import { flatConfigsToRulesDTS } from 'eslint-typegen/core';

async function generateEslintType() {
  const configs = await mergeFlatConfigs(
    {
      plugins: {
        '': {
          rules: Object.fromEntries(builtinRules.entries()),
        },
      },
    },
    javascript(),
    typescript(),
    stylistic(),
    react(),
  );

  const configNames = configs.map(i => i.name).filter(Boolean) as string[];

  let types = await flatConfigsToRulesDTS(configs, {
    includeAugmentation: false,
  });

  types += `
// Names of all the configs
export type ConfigNames = ${configNames.map(i => `'${i}'`).join(' | ')}
`;

  try {
    await fs.writeFile('src/eslintype.d.ts', types);

    // eslint-disable-next-line no-console
    console.info('ESLint type definitions generated successfully.');
  }
  catch (error) {
    console.error('Failed to write ESLint type definitions:', error);
  }
}

generateEslintType().catch(error => {
  console.error('Error generating ESLint type definitions:', error);
});
