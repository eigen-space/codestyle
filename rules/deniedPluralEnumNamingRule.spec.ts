import { lint } from '../sandbox/linter';

const rule = 'denied-plural-enum-naming';

describe('DeniedPluralEnumNamingRule', () => {

    it('should return error if the name of an enum with export is plural', () => {
        const source = `
            export enum CardColumnsTemplateSizes
        `;
        const result = lint(rule, source);
        expect(result.errorCount).toBe(1);
    });

    it('should return error if the name of an enum is plural', () => {
        const source = `
            enum CardColumnsTemplateSizes
        `;
        const result = lint(rule, source);
        expect(result.errorCount).toBe(1);
    });

    it('should return error if any word of an enum name is plural', () => {
        const source = `
            enum CardColumnsTemplateSize
        `;
        const result = lint(rule, source);
        expect(result.errorCount).toBe(1);
    });

    it('should not return error if the name of an enum is uncountable singular', () => {
        const source = `
            enum CardAxis
        `;
        const result = lint(rule, source);
        expect(result.errorCount).toBe(0);
    });
});
