module.exports = {
    clearMocks: true,
    testMatch: ['<rootDir>/src/**/*.spec.(ts|tsx)'],
    testEnvironment: 'node',
    testURL: 'http://localhost',
    transform: {
        '^(?!.*\\.(js|ts|css|json)$)': '<rootDir>/config/jest/transform/file.transform.js',
        '^.+\\.ts$': 'ts-jest'
    },
    testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
    moduleFileExtensions: ['web.ts', 'ts', 'web.js', 'js', 'json', 'node'],
    globals: {
        'ts-jest': {
            tsConfig: 'tsconfig.spec.json'
        }
    }
};
