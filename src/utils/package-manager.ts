import { fileURLToPath } from 'node:url';

import { isPackageExists } from 'local-pkg';

const isCwdInScope = isPackageExists('@sj-distributor/eslint-config');

const scopeUrl = fileURLToPath(new URL('.', import.meta.url));

/**
 * Check if the package is within the specified range.
 */
export function isPackageInScope(name: string): boolean {
  return isPackageExists(name, { paths: [scopeUrl] });
}

/**
 * Ensure that the required packages are installed.
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
