import { lint } from '../test/linter';

const rule = 'boolean-naming';

describe('BooleanNamingRule', () => {

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
