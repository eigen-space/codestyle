import { ruleTester } from '../../utils/configured-rule-tester';
const rule = require('../../../lib/rules/object-properties-carrying');

ruleTester.run('object-properties-carrying', rule, {
    valid: [
        'const noMultiLine = { a: 3, b: 5, c: 5 }',
        'const noMultiLine = { someNestedArray: [1] }',
        'const noMultiLine = { someNestedObject: {} }',
        'const noMultiLine = { someNestedFunc: tmp.a.NameFunc() }',
        'functionCall({ someNestedFunc: tmp.a.NameFunc() })',
        `
            const noMultiLine = {
                a: 1,
                b: 2,
                c: 3,
                d: 4
            }
        `
    ],
    invalid: [
        {
            code: 'const noSingleLine = { a: 3, b: 5, c: 5, d: 2 }',
            errors: [{ messageId: rule.ERROR_TYPE.COUNT_PROPERTIES }]
        },
        {
            code: 'const noSingleLine = { someNestedArray: [1, 2] }',
            errors: [{ messageId: rule.ERROR_TYPE.COUNT_NESTED_ARRAY_ELEMENTS }]
        },
        {
            code: 'const noSingleLine = { someNestedFunc: tmp.a.biiiiiiiiiiiiiiiiigNameFunc() }',
            errors: [{ messageId: rule.ERROR_TYPE.FUNCTION_LENGTH }]
        },
        {
            code: 'const noSingleLine = { nestedFunc: tmp(), anotherNestedFunc: call() }',
            errors: [{ messageId: rule.ERROR_TYPE.COUNT_CALL_EXPRESSIONS }]
        },
        {
            code: 'const noSingleLine = { someNestedObject: { a: 3 } }',
            errors: [{ messageId: rule.ERROR_TYPE.COUNT_NESTED_OBJECT_PROPERTIES }]
        },
        {
            code: 'const noSingleLine = { bigStr: \'very-biiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiig-string\' }',
            errors: [{ messageId: rule.ERROR_TYPE.CONTENT_WIDTH }]
        },
        {
            code: `
                const noMultiLine = {
                    a: 3,
                    b: 2
                }
            `,
            errors: [{ messageId: rule.ERROR_TYPE.NO_MULTILINE }]
        }
    ]
});