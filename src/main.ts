import { ignores, javascript, react, reactNative, stylistic, typescript, unicorn } from './configs';
import type { AvengerOptions, UserConfig } from './types';

export async function avenger(
  options: AvengerOptions = {},
  ...userConfigs: UserConfig[]
): Promise<UserConfig[]> {
  const {
    react: enableReact = false,
    reactNative: enableReactNative = false,
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
    if (enableReactNative && reactOptions.reactNative === undefined) {
      reactOptions.reactNative = true;
    }
    configs.push(...(await react(reactOptions)));
  }

  // 5. React Native
  if (enableReactNative) {
    const reactNativeOptions = typeof enableReactNative === 'object' ? enableReactNative : {};
    configs.push(...(await reactNative(reactNativeOptions)));
  }

  // 6. Stylistic
  if (enableStylistic) {
    const stylisticOptions = typeof enableStylistic === 'object' ? enableStylistic : {};
    configs.push(...stylistic(stylisticOptions));
  }

  // 7. Unicorn
  if (enableUnicorn) {
    configs.push(...unicorn());
  }

  // 8. User overrides
  if (userConfigs.length > 0) {
    configs.push(...userConfigs);
  }

  return configs;
}
