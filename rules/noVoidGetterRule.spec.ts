/* tslint:disable:file-name-casing comment-type */
import { lint } from '../test/linter';
import { Rule } from './noVoidGetterRule';

const rule = Rule.metadata.ruleName;

describe('noVoidGetterRule', () => {

    it('should return error if function has void type', () => {
        const source = 'function getName(): void {}';
        const failure = lint(rule, source).failures[0].getFailure();
        expect(failure).toBe(Rule.FAILURE_STRING);
    });

    it('should return error if function has promise void type', () => {
        const source = 'function async getName(): Promise<void> {}';
        const failure = lint(rule, source).failures[0].getFailure();
        expect(failure).toBe(Rule.FAILURE_STRING);
    });

    it('should return error if function in variable declaration has void type', () => {
        const source = 'const getSmth = (): void => {};';
        const failure = lint(rule, source).failures[0].getFailure();
        expect(failure).toBe(Rule.FAILURE_STRING);
    });

    it('should return error if function in variable declaration has promise void type', () => {
        const source = 'const getSmth = (): Promise<void> => {};';
        const failure = lint(rule, source).failures[0].getFailure();
        expect(failure).toBe(Rule.FAILURE_STRING);
    });

    it('should return error if function in class has void type', () => {
        const source = `
            class Clazz {
                private getSmth3(): void {}
            }
        `;
        const result = lint(rule, source);
        expect(result.errorCount).toBe(1);
    });

    it('should return error if function in class has promise void type', () => {
        const source = `
            class Clazz {
                getSmth = (): void => {};
            }
        `;
        const result = lint(rule, source);
        expect(result.errorCount).toBe(1);
    });

    it('should return error if function in class has void type', () => {
        const source = `
            class Clazz {
                getSmth = (): Promise<void> => {};
            }
        `;
        const result = lint(rule, source);
        expect(result.errorCount).toBe(1);
    });

    it('should return error if function in class has promise void type', () => {
        const source = `
            class Clazz {
                private getSmth3(): Promise<void> {}
            }
        `;
        const result = lint(rule, source);
        expect(result.errorCount).toBe(1);
    });

    it('should return error if function in interface has void type', () => {
        const source = `
            interface Interface {
                getSmth4?: (e: number) => void;
            }
        `;
        const result = lint(rule, source);
        expect(result.errorCount).toBe(1);
    });

    it('should return error if function in interface has promise void type', () => {
        const source = `
            interface Interface {
                getSmth5: (e: number) => Promise<void>;
            }
        `;
        const result = lint(rule, source);
        expect(result.errorCount).toBe(1);
    });
});