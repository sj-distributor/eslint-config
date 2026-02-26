export type Awaitable<T> = T | Promise<T>;

export async function interopDefault<T>(m: Awaitable<T>): Promise<T extends { default: infer U } ? U : T> {
  const resolved = await m;
  // eslint-disable-next-line ts/no-explicit-any
  return (resolved as any).default || resolved;
}

export function renameRules(
  rules: Record<string, any>,
  map: Record<string, string>,
): Record<string, any> {
  return Object.fromEntries(
    Object.entries(rules).map(([key, value]) => {
      for (const [from, to] of Object.entries(map)) {
        if (key.startsWith(`${from}/`))
          return [to + key.slice(from.length), value];
      }
      return [key, value];
    }),
  );
}
