describe('DeniedPluralEnumNamingRule', () => {
    const rule = 'denied-plural-enum-naming';

    it('should return error if the name of an enum with export is plural', () => {
        const source = `
            export enum CardColumnsTemplateSizes
        `;

        expect({ rule, source }).toBeFailedWith('Enum names must be singular');
    });

    it('should return error if the name of an enum is plural', () => {
        const source = `
            enum CardColumnsTemplateSizes
        `;

        expect({ rule, source }).toBeFailedWith('Enum names must be singular');
    });

    it('should return error if any word of an enum name is plural', () => {
        const source = `
            enum CardColumnsTemplateSize
        `;

        expect({ rule, source }).toBeFailedWith('Enum names must be singular');
    });

    it('should not return error if the name of an enum is uncountable singular', () => {
        const source = `
            enum CardAxis
        `;

        expect({ rule, source }).toBePassed();
    });
});
