import { ignores, importLiteConfig, javascript, react, reactNative, stylistic, typescript, unicorn } from './configs';
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
    importLite: enableImportLite = true,
    ignores: customIgnores = [],
  } = options;

  const configs: UserConfig[] = [];

  // 1. Ignores
  configs.push(...ignores(customIgnores));

  // 2. JavaScript (always enabled)
  configs.push(...(await javascript()));

  // 3. Import-lite
  if (enableImportLite) {
    const importLiteOptions = typeof enableImportLite === 'object' ? enableImportLite : {};
    configs.push(...importLiteConfig(importLiteOptions));
  }

  // 4. TypeScript
  if (enableTypescript) {
    const tsOptions = typeof enableTypescript === 'object' ? enableTypescript : {};
    configs.push(...(await typescript(tsOptions)));
  }

  // 5. React
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

  // 6. React Native
  if (enableReactNative) {
    const reactNativeOptions = typeof enableReactNative === 'object' ? enableReactNative : {};
    configs.push(...(await reactNative(reactNativeOptions)));
  }

  // 7. Stylistic
  if (enableStylistic) {
    const stylisticOptions = typeof enableStylistic === 'object' ? enableStylistic : {};
    configs.push(...stylistic(stylisticOptions));
  }

  // 8. Unicorn
  if (enableUnicorn) {
    configs.push(...unicorn());
  }

  // 9. User overrides
  if (userConfigs.length > 0) {
    configs.push(...userConfigs);
  }

  return configs;
}
