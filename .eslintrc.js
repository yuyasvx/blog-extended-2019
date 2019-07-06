module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  extends: [
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'standard',
    'plugin:@typescript-eslint/recommended',
    '@nuxtjs',
    'plugin:nuxt/recommended',
    'plugin:prettier/recommended',
    'prettier/vue'
  ],
  plugins: [
    'prettier',
    '@typescript-eslint'
  ],
  // add your custom rules here
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/explicit-function-return-type': ['warn', { allowExpressions: true }],
    '@typescript-eslint/member-delimiter-style': [
      'warn',
      {
        multiline: {
          delimiter: 'none',
          requireLast: true
        }
      }
    ],
    '@typescript-eslint/interface-name-prefix': 'off',
    // https://github.com/typescript-eslint/typescript-eslint/issues/422
    '@typescript-eslint/explicit-member-accessibility': 'off',
    // '@typescript-eslint/explicit-member-accessibility': [
    //   'error',
    //   { accessibility: 'explicit', overrides: { constructor: 'off' } }
    // ],
    'import/no-unresolved': 'off',
    'no-var': 'error',
    'prefer-const': 'warn',
    'prefer-template': 'warn'
  }
}
