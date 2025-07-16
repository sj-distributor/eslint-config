/**
 * Load modules.
 */
export const loadModule = async <T>(modulePromise: Promise<T>): Promise<T extends { default: infer U } ? U : T> => {
  const result = await modulePromise;

  return (result as any).default || result;
};
