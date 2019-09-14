import { ruleTester } from '../../utils/configured-rule-tester';

const rule = require('../../../lib/rules/conditions');

ruleTester.run('conditions', rule, {
    valid: [
        'const x;',
        '1 < x;',
        '1 < x && x < 10',
        `
            enum BusinessCommon {
                ES_EXEC
            }
            
            x === BusinessCommon.ES_EXEC
        `,
        `
            if ((trip.disabled || trip.removed) && trip.hasOrders) {
                someAction();
            }
        `,
        `
            if (trip.disabled) {
                const a = foo();
                if (trip.hasOrders) {
                    someAction();
                }
            }
        `,
        `
            if (trip.disabled) {
                boo();
                if (trip.hasOrders) {
                    someAction();
                }
            } else {
                foo();
            }
        `,
        `
            let t = 3;
            if (!orderId || !demandKey) {
                t = 5;
            }
        `,
        'action.attributes = action.attributes || [];',
        'action.attributes = condition ? action.attributes : [];',
        'const attributes = action.attributes || [];',
        'const attributes = condition ? action.attributes : [];'
    ],
    invalid: [
        {
            code: 'x > 1',
            errors: [{ messageId: rule.ERROR_TYPE.COUNTER_CLOCKWISE_COMPARISON }]
        },
        {
            code: '1 < x && x > 10',
            errors: [{ messageId: rule.ERROR_TYPE.COUNTER_CLOCKWISE_COMPARISON }]
        },
        {
            code: `
                if (trip.disabled) {
                    if (trip.hasOrders) {
                        const t = 3;
                    }
                }
            `,
            errors: [{ messageId: rule.ERROR_TYPE.UNNECESSARY_NESTED_IF }]
        },
        {
            code: `
                if (trip.disabled) {
                    a = b || c;
                    if (trip.hasOrders) {
                        t = 3;
                    }
                }
            `,
            errors: [{ messageId: rule.ERROR_TYPE.UNNECESSARY_NESTED_IF }]
        },
        {
            code: `
                if (!(a && b)) {
                    const g = 3;
                }
            `,
            errors: [{ messageId: rule.ERROR_TYPE.NEGATION_BEFORE_PARENTHESES }]
        },
        {
            code: 'action.attributes = action.attributes ? action.attributes : [];',
            errors: [{ messageId: rule.ERROR_TYPE.UNNECESSARY_TERNARY }]
        },
        {
            code: 'const attributes = action.attributes ? action.attributes : [];',
            errors: [{ messageId: rule.ERROR_TYPE.UNNECESSARY_TERNARY }]
        },
        {
            code: `
                let g;
                if (a && b) {
                    g = 3;
                } else {
                    g = 5;
                    g = a || b;
                }
            `,
            errors: [{ messageId: rule.ERROR_TYPE.UNNECESSARY_ELSE }]
        },
        {
            code: 'if (BusinessCommon.ES_EXEC !== trip.state) {}',
            errors: [{ messageId: rule.ERROR_TYPE.LITERAL_OR_CONSTANT_COMPARISON }]
        }
    ]
});