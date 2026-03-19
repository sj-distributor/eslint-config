import type { TypedFlatConfigItem } from '../types';
import type { Overrides } from '../types';
import { interopDefault } from '../utils';

export interface ReactNativeOptions {
  /**
   * Files to apply the React Native rules to.
   * @default ['**\\/*.{js,jsx,mjs,cjs,ts,tsx}']
   */
  files?: string[];

  /**
   * Override React Native rules.
   */
  overrides?: Overrides;
}

export async function reactNative(
  options: ReactNativeOptions = {},
): Promise<TypedFlatConfigItem[]> {
  const {
    files = ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    overrides = {},
  } = options;

  try {
    const rnConfigPath = '@react-native/eslint-config/flat';
    const [
      reactNativeConfig,
    ] = await Promise.all([
      interopDefault(import(rnConfigPath)),
    ] as const);

    return [
      {
        name: 'sj-distributor/react-native/setup',
        languageOptions: {
          globals: {
            __DEV__: 'readonly',
          },
        },
      },
      ...(Array.isArray(reactNativeConfig) ? reactNativeConfig : [reactNativeConfig]),
      {
        name: 'sj-distributor/react-native/overrides',
        files,
        rules: overrides,
      },
    ];
  }
  catch (error) {
    if (error instanceof Error && 'code' in error && (error as any).code === 'ERR_MODULE_NOT_FOUND') {
      throw new Error(
        'You have enabled React Native support but "@react-native/eslint-config" is not installed.\n'
        + 'Please install it using your package manager.\n'
        + 'e.g. pnpm add -D @react-native/eslint-config',
      );
    }
    throw error;
  }
}
