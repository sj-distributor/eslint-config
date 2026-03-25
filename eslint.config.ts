import { avenger } from './src';

export default avenger(
  {
    react: true,
    typescript: true,
    stylistic: true,
    ignores: ['fixtures'],
  },
  {
    rules: {
      'no-console': 'warn',
    },
  },
);
