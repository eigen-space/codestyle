// tslint:disable:file-name-casing
import { lint } from '../test/linter';
import { Rule } from './objectPropertiesCarryingRule';

const rule = 'object-properties-carrying';

describe('ObjectPropertiesCarrying', () => {
    const failureStringCarryingObjectMinProps = Rule.FAILURE_STRING_CARRYING_OBJECT_MIN_PROPS.replace(
        '$0',
        String(Rule.DEFAULT_MAX_SINGLE_LINE_PROPERTIES)
    );

    it('should failed with 4 any properties', () => {
        const failureStringMaxSingleLineProps = Rule.FAILURE_STRING_MAX_SINGLE_LINE_PROPS.replace(
            '$0',
            String(Rule.DEFAULT_MAX_SINGLE_LINE_PROPERTIES)
        );
        const source = `
            const j = 10;
            const obj108 = { y: 123, u: 0, i: 9, j };
        `;

        const [result] = lint(rule, source).failures;

        expect(result.getFailure()).toBe(failureStringMaxSingleLineProps);
    });

    it('should not to be failed', () => {
        const source = `
            const a123123 = { component: 12 };
        `;
        const [result] = lint(rule, source).failures;
        expect(result).toBeUndefined();
    });

    it('should not to be failed with some multiline complex properties', () => {
        const source = `
            const obj18 = {
                r: 12,
                u: 80,
                y: 16,
                o: 13,
                t: (): number => {
                    return 2;
                },
                io: 'qwerty'
            };
        `;
        const [result] = lint(rule, source).failures;
        expect(result).toBeUndefined();
    });

    it('should to be failed with two properties on the same line', () => {
        const source = `
           const obj181 = {
                r: 12,
                u: 80,
                y: 16,
                o: 13,
                t: (): number => {
                    return 2;
                }, io: 'qwerty'
            };
        `;
        const [result] = lint(rule, source).failures;
        expect(result.getFailure()).toBe(Rule.FAILURE_STRING_OBJECT_CARRYING);
    });

    it('should not be failed in class with static complex properties', () => {
        const source = `
           class Main {
                static defaultProps = {
                    onBurgerButtonClick: () => {},
                    onMenuClick: () => {}
                };
            }
        `;
        const [result] = lint(rule, source).failures;
        expect(result).toBeUndefined();
    });

    it('should to be failed with the overflow properties on the single line', () => {
        const source = `
           const obj12 = {
                r: 12, u: 80,
                y: 16,
                o: 13
            };
        `;
        const [result] = lint(rule, source).failures;
        expect(result.getFailure()).toBe(Rule.FAILURE_STRING_OBJECT_CARRYING);
    });

    it('should to be failed with the not overflow properties on the single line', () => {
        const source = `
          const obj14 = {
            r: 12, y: 16,
            u: 80
          };
        `;
        const [result] = lint(rule, source).failures;
        expect(result.getFailure()).toBe(Rule.FAILURE_STRING_OBJECT_CARRYING);
    });

    it('should to be failed if object is carrying but properties are not overflow', () => {
        const source = `
          const obj13 = {
              r: 12,
              u: 80,
              y: 16
          };
        `;
        const [result] = lint(rule, source).failures;
        expect(result.getFailure()).toBe(failureStringCarryingObjectMinProps);
    });

    it('should not to be failed if properties count crosses limit and object is multiline', () => {
        const source = `
           const a = 10;
           const obj102 = {
               y: 123,
               u: 0,
               i: 9,
               a
           };
        `;
        const [result] = lint(rule, source).failures;
        expect(result).toBeUndefined();
    });

    it('should to be failed if properties not overflow on single line but complex', () => {
        const source = `
           const obji = { yellow: () => {}, green: () => {} };
        `;
        const [result] = lint(rule, source).failures;
        expect(result.getFailure()).toBe(Rule.FAILURE_STRING_OBJECT_COMPLEX_VALUES);
    });

    it('should not to be failed if there is only 1 complex property in single line', () => {
        const source = `
           const objiy = { green: function (): number { return 2; } };
        `;
        const [result] = lint(rule, source).failures;
        expect(result).toBeUndefined();
    });

    it('should not to be failed if there is only one complex property placed on some lines', () => {
        const source = `
           const layout = {
                gridBreakPoints: {
                    sm: 576,
                    md: 768,
                    lg: 992,
                    xlg: 1200
                }
            };
        `;
        const [result] = lint(rule, source).failures;
        expect(result).toBeUndefined();
    });

    it('should to be failed with long content', () => {
        const failureStringMaxContentWidth = Rule.FAILURE_STRING_CONTENT_WIDTH.replace(
            '$0',
            String(Rule.DEFAULT_MAX_CONTENT_WIDTH)
        );
        const source = `
           const props = { columnsTemplate: 'Hello! Did you hear me?', test: 'California Dreaming! Noooooo' };
        `;

        const [result] = lint(rule, source).failures;

        expect(result.getFailure()).toBe(failureStringMaxContentWidth);
    });

    it('should to be failed with long content', () => {
        const source = `
           const colors = { default: colors.shades.black100, primary: colors.shades.black40 }
        `;
        const [result] = lint(rule, source).failures;
        expect(result.getFailure()).toBe(Rule.FAILURE_STRING_OBJECT_COMPLEX_VALUES);
    });

    it('should also work for nested objects', () => {
        const source = `
            const nestedObjects = {
                someObject: 123,
                inner: {
                    someInnerObject: {
                        another: {
                            apple: 123,
                            juice: 80
                        }
                    }
                }
            };
        `;
        const [result] = lint(rule, source).failures;
        expect(result.getFailure()).toBe(failureStringCarryingObjectMinProps);
    });
});
