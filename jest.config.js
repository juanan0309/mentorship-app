const nextJest = require('next/jest')

const createJestConfig = nextJest({ dir: '.' })

module.exports = createJestConfig({
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/cypress/',
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/styles.ts',
    '\\.(css|less)$': 'identity-obj-proxy',
    '^@/components/(.*)$': '<rootDir>/components/$1',
  },
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
    '/cypress/',
  ],
})
