import type { Linter } from 'eslint';
import type { RuleOptions } from './eslintype';
import type { Awaitable, IOptionsConfig, ResolvedOptions, EslintFlatConfigItem } from './types';
import { isPackageExists } from 'local-pkg';
import { fileURLToPath } from 'node:url';

/**
 * 合并多个 ESLint 扁平配置
 */
export const mergeFlatConfigs = async (
  ...configs: Awaitable<EslintFlatConfigItem | EslintFlatConfigItem[]>[]
): Promise<EslintFlatConfigItem[]> => {
  const resolved = await Promise.all(configs);
  return resolved.flat();
};

/**
 * 解析子选项
 */
export const resolveSubOptions = <K extends keyof IOptionsConfig>(
  options: IOptionsConfig,
  key: K,
): ResolvedOptions<IOptionsConfig[K]> => {
  const value = options[key];

  return typeof value === 'boolean' ? {} as any : value || {};
};

/**
 * 获取覆盖规则
 */
export const getOverrides = <K extends keyof IOptionsConfig>(
  options: IOptionsConfig,
  key: K,
): Partial<Linter.RulesRecord & RuleOptions> => {
  const subOptions = resolveSubOptions(options, key);

  return {
    ...(options.overrides as any)?.[key],
    ...('overrides' in subOptions ? subOptions.overrides : {}),
  };
};

/**
 * 加载模块
 */
export const loadModule = async <T>(modulePromise: Promise<T>): Promise<T extends { default: infer U } ? U : T> => {
  const result = await modulePromise;

  return (result as any).default || result;
};

const isCwdInScope = isPackageExists('@sj-distributor/eslint-config');

const scopeUrl = fileURLToPath(new URL('.', import.meta.url));

/**
 * 检查包是否在指定范围内
 */
export function isPackageInScope(name: string): boolean {
  return isPackageExists(name, { paths: [scopeUrl] });
}

/**
 * 确保所需的包已安装
 */
export async function ensurePackages(packages: (string | undefined)[]): Promise<void> {
  if (process.env.CI || !process.stdout.isTTY || !isCwdInScope) {
    return;
  }

  const nonExistingPackages = packages.filter((pkg): pkg is string => !!pkg && !isPackageInScope(pkg));

  if (nonExistingPackages.length === 0) {
    return;
  }

  const { confirm } = await import('@clack/prompts');
  const { installPackage } = await import('@antfu/install-pkg');

  const shouldInstall = await confirm({
    message: `${nonExistingPackages.length === 1 ? 'Package is' : 'Packages are'} required for this config: ${nonExistingPackages.join(', ')}. Do you want to install them?`,
  });

  if (shouldInstall) {
    await installPackage(nonExistingPackages, { dev: true });
  }
}
