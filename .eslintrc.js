module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  plugins: ['eslint-plugin-prettier', 'react-hooks'],
  env: {
    browser: true,
    es6: true,
    node: true,
    jquery: true,
  },
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  globals: {
    cookies: 'readonly',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'prettier/prettier': ['error'],
    'react/display-name': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'off',
    'no-console': 0,
    'no-plusplus': 0,
    'func-names': 0,
    'max-len': [
      'error',
      {
        code: 120,
        ignoreComments: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
    'linebreak-style': 0,
  },
};
