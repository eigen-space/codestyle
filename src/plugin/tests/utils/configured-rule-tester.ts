import { RuleTester, RuleTesterConfig } from './rule-tester';

const options: RuleTesterConfig = {
    parser: '@typescript-eslint/parser',
    parserOptions: { ecmaVersion: 2018, sourceType: 'module', project: 'tsconfig.json' }
};

export const ruleTester = new RuleTester(options);