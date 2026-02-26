import { ignores, javascript, react, stylistic, typescript, unicorn } from './configs';
import type { AvengerOptions, UserConfig } from './types';

export async function avenger(
  options: AvengerOptions = {},
  ...userConfigs: UserConfig[]
): Promise<UserConfig[]> {
  const {
    react: enableReact = false,
    typescript: enableTypescript = true,
    stylistic: enableStylistic = true,
    unicorn: enableUnicorn = true,
    ignores: customIgnores = [],
  } = options;

  const configs: UserConfig[] = [];

  // 1. Ignores
  configs.push(...ignores(customIgnores));

  // 2. JavaScript (always enabled)
  configs.push(...(await javascript()));

  // 3. TypeScript
  if (enableTypescript) {
    const tsOptions = typeof enableTypescript === 'object' ? enableTypescript : {};
    configs.push(...(await typescript(tsOptions)));
  }

  // 4. React
  if (enableReact) {
    const reactOptions = typeof enableReact === 'object' ? enableReact : {};
    if (enableTypescript && reactOptions.typescript === undefined) {
      reactOptions.typescript = true;
    }
    configs.push(...(await react(reactOptions)));
  }

  // 5. Stylistic
  if (enableStylistic) {
    const stylisticOptions = typeof enableStylistic === 'object' ? enableStylistic : {};
    configs.push(...stylistic(stylisticOptions));
  }

  // 6. Unicorn
  if (enableUnicorn) {
    configs.push(...unicorn());
  }

  // 7. User overrides
  if (userConfigs.length > 0) {
    configs.push(...userConfigs);
  }

  return configs;
}
