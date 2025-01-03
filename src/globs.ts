export const globs = {
  src: '**/*.?([cm])[jt]s?(x)',
  js: '**/*.?([cm])js',
  jsx: '**/*.?([cm])jsx',
  ts: '**/*.?([cm])ts',
  tsx: '**/*.?([cm])tsx',
  style: '**/*.{c,le,sc}ss',
  css: '**/*.css',
  less: '**/*.less',
  scss: '**/*.scss',
  json: ['**/*.json', '**/*.json5', '**/*.jsonc'],
  markdown: '**/*.md',
  yaml: '**/*.y?(a)ml',
  xml: '**/*.xml',
  svg: '**/*.svg',
  html: '**/*.htm?(l)',
};

export const GLOB_SRC_EXT = '?([cm])[jt]s?(x)'
export const GLOB_SRC = '**/*.?([cm])[jt]s?(x)'

export const GLOB_EXCLUDE = [
  // 依赖锁定文件
  '**/package-lock.json',
  '**/yarn.lock',
  '**/pnpm-lock.yaml',
  '**/bun.lockb',

  // 缓存和生成目录
  '**/node_modules',
  '**/dist',
  '**/output',
  '**/coverage',
  '**/temp',
  '**/.temp',
  '**/tmp',
  '**/.tmp',
  '**/.history',
  '**/.vitepress/cache',
  '**/.nuxt',
  '**/.next',
  '**/.svelte-kit',
  '**/.vercel',
  '**/.changeset',
  '**/.idea',
  '**/.cache',
  '**/.output',
  '**/.vite-inspect',
  '**/.yarn',

  // 其他文件
  '**/vite.config.*.timestamp-*',
  '**/CHANGELOG*.md',
  '**/*.min.*',
  '**/LICENSE*',
  '**/__snapshots__',
  '**/auto-import?(s).d.ts',
  '**/components.d.ts',
]