// tslint:disable:file-name-casing
import { Rule } from './noVoidGetterRule';

describe('noVoidGetterRule', () => {
    const rule = Rule.metadata.ruleName;

    it('should return error if function has void type', () => {
        const source = 'function getName(): void {}';
        expect({ source, rule }).toBeFailedWith(Rule.FAILURE_STRING);
    });

    it('should return error if function has promise void type', () => {
        const source = 'async function getName(): Promise<void> {}';
        expect({ source, rule }).toBeFailedWith(Rule.FAILURE_STRING);
    });

    it('should return error if function in variable declaration has void type', () => {
        const source = 'const getSmth = (): void => {};';
        expect({ source, rule }).toBeFailedWith(Rule.FAILURE_STRING);
    });

    it('should return error if function in variable declaration has promise void type', () => {
        const source = 'const getSmth = (): Promise<void> => {};';
        expect({ source, rule }).toBeFailedWith(Rule.FAILURE_STRING);
    });

    it('should return error if function in class has void type', () => {
        const source = `
            class Clazz {
                private getSmth3(): void {}
            }
        `;

        expect({ source, rule }).toBeFailedWith(Rule.FAILURE_STRING);
    });

    it('should return error if function in class has promise void type', () => {
        const source = `
            class Clazz {
                getSmth = (): void => {};
            }
        `;

        expect({ source, rule }).toBeFailedWith(Rule.FAILURE_STRING);
    });

    it('should return error if function in class has void type', () => {
        const source = `
            class Clazz {
                getSmth = (): Promise<void> => {};
            }
        `;

        expect({ source, rule }).toBeFailedWith(Rule.FAILURE_STRING);
    });

    it('should return error if function in class has promise void type', () => {
        const source = `
            class Clazz {
                private getSmth3(): Promise<void> {}
            }
        `;

        expect({ source, rule }).toBeFailedWith(Rule.FAILURE_STRING);
    });

    it('should return error if function in interface has void type', () => {
        const source = `
            interface Interface {
                getSmth4?: (e: number) => void;
            }
        `;

        expect({ source, rule }).toBeFailedWith(Rule.FAILURE_STRING);
    });

    it('should return error if function in interface has promise void type', () => {
        const source = `
            interface Interface {
                getSmth5: (e: number) => Promise<void>;
            }
        `;

        expect({ source, rule }).toBeFailedWith(Rule.FAILURE_STRING);
    });
});
