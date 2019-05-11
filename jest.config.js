module.exports = {
    "clearMocks": true,
    "testMatch": [
        "<rootDir>/rules/**/*.spec.(ts|tsx)"
    ],
    "testEnvironment": "node",
    "testURL": "http://localhost",
    "setupFiles": [
        "<rootDir>/config/jest/expect/expect.js"
    ],
    "transform": {
        "^(?!.*\\.(js|ts|css|json)$)": "<rootDir>/config/jest/transform/file.transform.js",
        "^.+\\.ts$": "<rootDir>/config/jest/transform/typescript.transform.js"
    },
    "testPathIgnorePatterns": [
        "<rootDir>/node_modules/",
        "<rootDir>/dist/"
    ],
    "moduleFileExtensions": [
        "web.ts",
        "ts",
        "web.js",
        "js",
        "json",
        "node"
    ]
};
