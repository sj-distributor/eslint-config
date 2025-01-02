import { isPackageExists } from 'local-pkg';
import type { Awaitable } from './types/types';
import { fileURLToPath } from 'node:url';
import { installPackage } from '@antfu/install-pkg';
import { confirm } from '@clack/prompts';

// 获取当前模块所在目录的路径
const SCOPE_PATH = fileURLToPath(new URL('.', import.meta.url));

/**
 * 检查某个包是否在项目范围内已安装。
 * 
 * @param packageName 包名称。
 * @returns 如果包已安装，返回 `true`；否则返回 `false`。
 */
export function isPackageInstalled(packageName: string): boolean {
  return isPackageExists(packageName, { paths: [SCOPE_PATH] });
}

/**
 * 处理模块的默认导出，确保总是返回模块的实际内容。
 * 
 * @param m 模块的导入结果，可以是 Promise 或普通值。
 * @returns 模块的实际内容。
 */
export async function resolveModule<T>(m: Awaitable<T>): Promise<T extends { default: infer U } ? U : T> {
  const resolved = await m;
  return (resolved as any).default || resolved;
}

/**
 * 确保某些包已安装。如果未安装，提示用户是否安装。
 * 
 * @param packages 需要检查的包名称列表。
 */
export async function ensureDependenciesInstalled(packages: (string | undefined)[]): Promise<void> {
  // 在 CI 环境或非交互式终端中跳过检查
  if (process.env.CI || !process.stdout.isTTY) return;

  // 过滤出未安装的包
  const missingPackages = packages.filter(
    (pkg): pkg is string => !!pkg && !isPackageExists(pkg, { paths: [SCOPE_PATH] })
  );

  if (missingPackages.length === 0) return;

  // 提示用户是否安装缺失的包
  const shouldInstall = await confirm({
    message: `The following ${missingPackages.length === 1 ? 'package is' : 'packages are'} required: ${missingPackages.join(', ')}. Do you want to install them?`,
  });

  shouldInstall && await installPackage(missingPackages, { dev: true });
}