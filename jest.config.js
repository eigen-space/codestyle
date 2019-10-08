module.exports = {
    testMatch: ['<rootDir>/src/**/*.spec.ts'],
    collectCoverageFrom: [
        '!<rootDir>/src/packages/eslint-plugin-eigenspace-script/src/tests/utils/**/*',
        '!**/index.ts',
        '<rootDir>/src/packages/**/*.ts'
    ],
    coveragePathIgnorePatterns: [
        '.*\\.d\\.ts'
    ],
    setupFiles: ['<rootDir>/config/jest/setup/console.setup.js'],
    transform: {
        '^(?!.*\\.(js|ts|tsx|css|json)$)': '<rootDir>/config/jest/transform/file.transform.js',
        '^.+\\.ts$': '<rootDir>/config/jest/transform/typescript.transform.js'
    },
    moduleFileExtensions: [
        'ts',
        'js',
        'json',
        'node'
    ],
    globals: {
        'ts-jest': { tsConfig: 'tsconfig.spec.json' }
    },
    collectCoverage: true,
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100
        }
    }
};
