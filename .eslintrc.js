module.exports = {
  env: {
    browser: true,
    node: true,
    'jest/globals': true
  },
  extends: [
    'standard',
    'plugin:prettier/recommended',
    'plugin:react/recommended'
  ],
  plugins: ['@typescript-eslint', 'jest'],
  parser: '@typescript-eslint/parser',
  rules: {
    '@typescript-eslint/adjacent-overload-signatures': 'error',
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: false
      }
    ],
    'standard/no-callback-literal': 'off',
    'standard/computed-property-even-spacing': 'off',
    yoda: 'off',
    'react/display-name': 'off',
    'react/prop-types': 'off',
    'import/first': 'off',
    'import/no-webpack-loader-syntax': 'off',
    camelcase: 'off',
    'no-unused-vars': 'off',
    'no-useless-return': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        args: 'none',
        ignoreRestSiblings: true
      }
    ],
    'no-dupe-class-members': 'off',
    'prefer-promise-reject-errors': 'off'
  },
  globals: {
    browser: true
  }
}
