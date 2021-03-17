import objectPropertiesCarrying from './lib/rules/object-properties-carrying';
import conditions from './lib/rules/conditions';

module.exports = {
    rules: { 'object-properties-carrying': objectPropertiesCarrying, conditions },
    configs: {
        all: {
            parser: '@typescript-eslint/parser',
            plugins: ['unicorn', '@typescript-eslint', 'eigenspace-script'],
            parserOptions: {
                ecmaVersion: 2020,
                sourceType: 'module',
                ecmaFeatures: { jsx: true },
                project: 'tsconfig.eslint.json'
            },
            rules: {
                'eigenspace-script/object-properties-carrying': 'error',
                'eigenspace-script/conditions': 'error',
                'no-multi-spaces': 'error',
                'no-nested-ternary': 'error',
                'no-lonely-if': 'error',
                'key-spacing': 'error',
                'comma-spacing': 'error',
                'space-infix-ops': 'error',
                'space-before-blocks': 'error',
                'keyword-spacing': 'error',
                'comma-style': ['error', 'last'],
                'max-statements-per-line': ['error', { 'max': 1 }],
                'array-bracket-spacing': ['error', 'never'],
                'object-curly-spacing': ['error', 'always'],
                'brace-style': 'error',
                'max-len': [
                    'error',
                    {
                        code: 120,
                        ignoreComments: true,
                        ignoreUrls: true,
                        ignorePattern: '^import\\s.+\\sfrom\\s.+;$|^const\\s.+=\\srequire\(.+\);'
                    }
                ],
                complexity: ['error', 10],
                'multiline-ternary': ['error', 'never'],
                'unicorn/filename-case': 'error',
                'spaced-comment': ['error', 'always'],
                curly: 'error',
                'comma-dangle': ['error', 'never'],
                'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
                indent: ['error', 4, { SwitchCase: 1 }],
                '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
                'prefer-template': 'error',
                '@typescript-eslint/member-ordering': 'error',
                '@typescript-eslint/no-explicit-any': ['error', { ignoreRestArgs: false }],
                'no-caller': 'error',
                'no-bitwise': 'error',
                'no-console': 'error',
                'no-new-wrappers': 'error',
                'constructor-super': 'error',
                'no-empty': 'error',
                'no-eval': 'error',
                '@typescript-eslint/no-inferrable-types': ['error', { ignoreParameters: true }],
                'no-shadow': 'off',
                '@typescript-eslint/no-shadow': ['error'],
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
                '@typescript-eslint/semi': 'error',
                eqeqeq: ['error', 'always', { null: 'ignore' }],
                '@typescript-eslint/type-annotation-spacing': 'error',
                'yoda': ['error', 'never', { 'onlyEquality': true }],
                'no-else-return': 'error',
                'no-implicit-coercion': 'error',
                'line-comment-position': [
                    'error',
                    { position: 'above' }
                ],
                '@typescript-eslint/no-useless-constructor': 'error',
                'no-param-reassign': ['error', { props: true }]
            },
            overrides: [
                {
                    files: ['!*.styles.ts'],
                    rules: {
                        '@typescript-eslint/no-extra-parens': ['error', 'all', { ignoreJSX: 'all' }]
                    }
                },
                {
                    files: ['*.ts?x'],
                    rules: {
                        '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true }]
                    }
                }
            ]
        }
    }
};
