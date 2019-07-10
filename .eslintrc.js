module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: [
        'unicorn',
        '@typescript-eslint'
    ],
    extends: [
        'plugin:@typescript-eslint/recommended'
    ],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        },
        project: './tsconfig.json'
    },
    rules: {
        complexity: ['error', 10],
        'arrow-body-style': ["error", "as-needed"],
        'unicorn/filename-case': 'error',
        'max-len': ['error', { 'code': 120 }],
        '@typescript-eslint/no-explicit-any': ['error', { 'ignoreRestArgs': false }]
    }
};
