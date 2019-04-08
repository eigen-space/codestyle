// tslint:disable:file-name-casing
import { lint } from '../sandbox/linter';

const rule = 'boolean-naming';

// We skip them because that specs does not work.
// Specs check rule that requires type checking. That leads to issue with specs.
// Issue: https://github.com/eigen-space/codestyle/issues/1
describe.skip('BooleanNamingRule', () => {

    it('should return error if declarable variable with boolean type has name without `is` or `has`', () => {
        const source = `
            let some: boolean;
        `;
        const result = lint(rule, source);
        expect(result.errorCount).toBe(1);
    });

    it('should do not return error if declarable variable with boolean type has name without `is` or `has`', () => {
        const source = `
            let isRaining: boolean;
        `;
        const result = lint(rule, source);
        expect(result.errorCount).toBe(0);
    });

    it('should return error if declarable property with boolean type has name without `is` or `has`', () => {
        const source = `
            class Clazz {
                private some: boolean;
            }
        `;
        const result = lint(rule, source);
        expect(result.errorCount).toBe(1);
    });

    it('should do not return error if declarable property with boolean type has name without `is` or `has`', () => {
        const source = `
            class Clazz {
                private isRaining: boolean;
            }
        `;
        const result = lint(rule, source);
        expect(result.errorCount).toBe(0);
    });
});
