module.exports = {
    rules: {},
    configs: {
        all: {
            plugins: [
                'react',
                'react-perf'
            ],
            extends: ['plugin:react-perf/all'],
            parserOptions: {
                ecmaFeatures: { jsx: true }
            },
            settings: {
                react: { version: 'detect' }
            },
            rules: {
                'react/jsx-indent': 'error',
                'react/jsx-uses-react': 'error',
                'react/jsx-uses-vars': 'error',
                'react/no-find-dom-node': 'error',
                'react/no-danger': 'error',
                'react/no-access-state-in-setstate': 'error',
                'react/no-direct-mutation-state': 'error',
                'react/jsx-no-duplicate-props': 'error',
                'react/jsx-pascal-case': 'error',
                'react/jsx-key': 'error',
                'react/no-unknown-property': 'error',
                'react/require-render-return': 'error'
            }
        }
    }
};
