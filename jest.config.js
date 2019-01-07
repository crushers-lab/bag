module.exports = {
    coverageDirectory: 'coverage',
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/lib/',
    ],
    moduleFileExtensions: [
        'ts',
        'tsx',
        'js',
        'json'
    ],
    testEnvironment: 'node',
    testMatch: [
        '**/tests/src/**/*.+(ts|tsx)',
    ],
    preset: 'ts-jest',
    collectCoverageFrom: ["src/**/*.{ts}"],
    modulePaths:[
        "node_modules",
        "src"
    ]
};
