module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['unicorn', '@typescript-eslint', 'prettier'],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        },
        project: 'tsconfig.json'
    },
    rules: {
        complexity: ['error', 10],
        'multiline-ternary': ['error', 'never'],
        'arrow-body-style': ['error', 'as-needed'],
        'unicorn/filename-case': 'error',
        'capitalized-comments': ['error', 'always', { ignorePattern: 'tslint|noinspection|istanbul' }],
        'spaced-comment': ['error', 'always'],
        curly: 'error',
        'comma-dangle': ['error', 'never'],
        'no-multiple-empty-lines': ['error', { max: 1 }],
        indent: ['error', 4, { SwitchCase: 1 }],
        '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
        'prefer-template': 'error',
        '@typescript-eslint/member-ordering': 'error',
        '@typescript-eslint/no-explicit-any': ['error', { ignoreRestArgs: false }],
        'no-caller': 'error',
        'no-invalid-this': 'error',
        'no-bitwise': 'error',
        'no-console': 'error',
        'no-new-wrappers': 'error',
        'constructor-super': 'error',
        'no-empty': 'error',
        'no-eval': 'error',
        '@typescript-eslint/no-inferrable-types': ['error', { ignoreParameters: true }],
        'no-shadow': 'error',
        'no-fallthrough': 'error',
        'default-case': 'error',
        'no-trailing-spaces': 'error',
        'no-undef-init': 'error',
        'no-unused-expressions': 'error',
        'no-var': 'error',
        'prefer-const': 'error',
        quotes: ['error', 'single'],
        radix: 'error',
        'no-throw-literal': 'error',
        semi: 'off',
        '@typescript-eslint/semi': 'error',
        eqeqeq: ['error', 'always', { null: 'ignore' }],
        '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true }],
        '@typescript-eslint/type-annotation-spacing': 'error',
        'prettier/prettier': [
            'error',
            {
                trailingComma: 'none',
                parser: 'typescript',
                tabWidth: 4,
                semi: true,
                bracketSpacing: true,
                jsxBracketSameLine: true,
                printWidth: 120,
                singleQuote: true,
                arrowParens: 'avoid'
            },
            {
                usePrettierrc: false
            }
        ]
    }
};
