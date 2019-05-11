import { Rule } from './objectPropertiesCarryingRule';

describe('ObjectPropertiesCarrying', () => {
    const rule = 'object-properties-carrying';

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

        expect({ source, rule }).toBeFailedWith(failureStringMaxSingleLineProps);
    });

    it('should not to be failed', () => {
        const source = `
            const a123123 = { component: 12 };
        `;

        expect({ source, rule }).toBePassed();
    });

    it('should not to be failed with empty array property', () => {
        const source = `
            const a123123 = { component: 12 };
        `;

        expect({ source, rule }).toBePassed();
    });

    it('should not to be failed with array property with 1 item', () => {
        const source = `
            const a123123 = { countries: [], selectedItems: [0] };
        `;

        expect({ source, rule }).toBePassed();
    });

    it('should not to be failed with array with 1 item', () => {
        const source = `
            const a123123 = { countries: ['Russia'], selectedItems: [0] };
        `;

        expect({ source, rule }).toBePassed();
    });

    it('should to be failed with array with 2 items', () => {
        const source = `
            const a123123 = { countries: ['Russia', 'USA'], selectedItems: [0] };
        `;

        expect({ source, rule }).toBeFailedWith(Rule.FAILURE_STRING_OBJECT_COMPLEX_VALUES);
    });

    it('should not to be failed with empty object property', () => {
        const source = `
            const a123123 = { fruits: {} };
        `;

        expect({ source, rule }).toBePassed();
    });

    it('should not to be failed with not empty object property', () => {
        const source = `
            const a123123 = { fruits: {}, vegetable: { price: 12 } };
        `;

        expect({ source, rule }).toBeFailedWith(Rule.FAILURE_STRING_OBJECT_COMPLEX_VALUES);
    });

    it('should to be failed with 2 function invoking methods', () => {
        const source = `
            const a123123 = { apply: jest.fn(), denied: functions.resolve.do() };
        `;

        expect({ source, rule }).toBeFailedWith(Rule.FAILURE_STRING_OBJECT_COMPLEX_VALUES);
    });

    it('should be passed with 1 function invoking methods', () => {
        const source = `
            const a123123 = { apply: jest.fn(), anotherProperty: 123 };
        `;

        expect({ source, rule }).toBePassed();
    });

    it('should to be failed with 1 function more than required length', () => {
        const source = `
            const a123123 = { denied: functions.resolve.big.method.do(), no: '123' };
        `;

        expect({ source, rule }).toBeFailedWith(Rule.FAILURE_STRING_OBJECT_COMPLEX_VALUES);
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

        expect({ source, rule }).toBePassed();
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

        expect({ source, rule }).toBeFailedWith(Rule.FAILURE_STRING_OBJECT_CARRYING);
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

        expect({ source, rule }).toBePassed();
    });

    it('should to be failed with the overflow properties on the single line', () => {
        const source = `
           const obj12 = {
                r: 12, u: 80,
                y: 16,
                o: 13
            };
        `;

        expect({ source, rule }).toBeFailedWith(Rule.FAILURE_STRING_OBJECT_CARRYING);
    });

    it('should to be failed with the not overflow properties on the single line', () => {
        const source = `
          const obj14 = {
            r: 12, y: 16,
            u: 80
          };
        `;

        expect({ source, rule }).toBeFailedWith(Rule.FAILURE_STRING_OBJECT_CARRYING);
    });

    it('should to be failed if object is carrying but properties are not overflow', () => {
        const source = `
          const obj13 = {
              r: 12,
              u: 80,
              y: 16
          };
        `;

        expect({ source, rule }).toBeFailedWith(failureStringCarryingObjectMinProps);
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

        expect({ rule, source }).toBePassed();
    });

    it('should to be failed if properties not overflow on single line but complex', () => {
        const source = `
           const obji = { yellow: () => {}, green: () => {} };
        `;

        expect({ source, rule }).toBeFailedWith(Rule.FAILURE_STRING_OBJECT_COMPLEX_VALUES);
    });

    it('should not to be failed if there is only 1 complex property in single line', () => {
        const source = `
           const objiy = { green: function (): number { return 2; } };
        `;

        expect({ source, rule }).toBePassed();
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

        expect({ source, rule }).toBePassed();
    });

    it('should to be failed with long content', () => {
        const failureStringMaxContentWidth = Rule.FAILURE_STRING_CONTENT_WIDTH.replace(
            '$0',
            String(Rule.DEFAULT_MAX_CONTENT_WIDTH)
        );
        const source = `
           const props = { columnsTemplate: 'Hello! Did you hear me?', test: 'California Dreaming! Noooooo' };
        `;

        expect({ source, rule }).toBeFailedWith(failureStringMaxContentWidth);
    });

    it('should to be failed with complex values', () => {
        const source = `
           const colors = { default: colors.shades.black100, primary: colors.shades.black40 }
        `;

        expect({ source, rule }).toBeFailedWith(Rule.FAILURE_STRING_OBJECT_COMPLEX_VALUES);
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

        expect({ rule, source }).toBeFailedWith(failureStringCarryingObjectMinProps);
    });
});
