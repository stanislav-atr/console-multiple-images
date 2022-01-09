module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: './tsconfig.json',
    },
    extends: [
        'airbnb-base',
        'airbnb-typescript/base',
        'plugin:@typescript-eslint/recommended',
    ],
    rules: {
        'no-use-before-define': 'off',
        'no-restricted-syntax': 'off',
        'func-names': 'off',
        '@typescript-eslint/indent': ['error', 4],
        'no-param-reassign': 'off',
        'no-shadow': 'off',
        'import/prefer-default-export': 'off',
        'arrow-body-style': 'off',
        'import/no-extraneous-dependencies': 'off',
    },
};
