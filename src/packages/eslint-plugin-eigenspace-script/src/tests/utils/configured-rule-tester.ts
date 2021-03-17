import { RuleTester, RuleTesterConfig } from './rule-tester';

const options: RuleTesterConfig = { parser: '@typescript-eslint/parser' };

export const ruleTester = new RuleTester(options);