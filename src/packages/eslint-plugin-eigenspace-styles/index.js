module.exports = {
    configs: {
        all: {
            overrides: [{
                plugins: ['eslint-plugin-prettier'],
                files: ['*.styles.ts'],
                rules: {
                    indent: 'off',
                    'prettier/prettier': ['error', {
                        trailingComma: 'none',
                        parser: 'typescript',
                        tabWidth: 4,
                        semi: true,
                        bracketSpacing: true,
                        printWidth: 120,
                        singleQuote: true
                    }]
                }
            }]
        }
    }
};
