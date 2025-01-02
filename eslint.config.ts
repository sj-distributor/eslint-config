
import { avenger } from './src'

export default avenger(
  {
    react: true,
    typescript: true,
    // formatters: true,
    type: 'lib',
  },
  {
    ignores: [
      'fixtures',
      '_fixtures',
    ],
  },
  // {
  //   files: ['src/**/*.ts'],
  //   rules: {
  //     'perfectionist/sort-objects': 'error',
  //   },
  // },
  // {
  //   files: ['src/configs/*.ts'],
  //   plugins: {
  //     'style-migrate': styleMigrate,
  //   },
  //   rules: {
  //     'style-migrate/migrate': ['error', { namespaceTo: 'style' }],
  //   },
  // },
)
