module.exports = {
    runner: 'jest-runner-tslint',
    clearMocks: true,
    testMatch: [
        '<rootDir>/rules/**/?(*.)(spec).(ts|tsx)'
    ],
    testURL: 'http://localhost',
    transform: {
        '^(?!.*\\.(js|ts|tsx|css|json)$)': '<rootDir>/config/jest/transform/file.transform.js',
        '^.+\\.tsx?$': '<rootDir>/config/jest/transform/typescript.transform.js'
    },
    moduleFileExtensions: [
        'web.ts',
        'ts',
        'tsx',
        'web.js',
        'js',
        'json',
        'node'
    ],
    globals: {
        'ts-jest': {
            tsConfig: 'tsconfig.spec.json'
        }
    }
};
