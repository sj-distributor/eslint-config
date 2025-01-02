import path from 'path';

export function getDir() {
  return __dirname;
}

export function resolvePath(relativePath: string) {
  return path.resolve(__dirname, relativePath);
}