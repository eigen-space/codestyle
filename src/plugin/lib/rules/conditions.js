const { isParenthesized } = require('eslint-utils');

const ERROR_TYPE = {
    COUNTER_CLOCKWISE_COMPARISON: 'counter-clockwise-comparison',
    LITERAL_OR_CONSTANT_COMPARISON: 'literal-or-constant-comparison',
    NEGATION_BEFORE_PARENTHESES: 'negation-before-parentheses',
    UNNECESSARY_NESTED_IF: 'unnecessary-nested-if',
    UNNECESSARY_ELSE: 'unnecessary-else',
    UNNECESSARY_TERNARY: 'unnecessary-ternary-operator'
};

const MESSAGE_TYPE = {
    [ERROR_TYPE.COUNTER_CLOCKWISE_COMPARISON]: 'You should use only clockwise comparison `<`',
    [ERROR_TYPE.LITERAL_OR_CONSTANT_COMPARISON]: `Literal or enum to compare with should be on right side of\
     expression`,
    [ERROR_TYPE.NEGATION_BEFORE_PARENTHESES]: 'Unexpected negation before parentheses',
    [ERROR_TYPE.UNNECESSARY_NESTED_IF]: 'Unnecessary nested if statement',
    [ERROR_TYPE.UNNECESSARY_ELSE]: 'Unnecessary else statement. You could do declaration in else statement before if',
    [ERROR_TYPE.UNNECESSARY_TERNARY]: 'Unnecessary ternary operator'
};

const exportedModule = module.exports = {
    meta: {
        type: 'layout',

        docs: {
            description: 'rules for checking condition syntax',
            category: 'Stylistic Issues'
        },

        messages: {
            [ERROR_TYPE.COUNTER_CLOCKWISE_COMPARISON]: MESSAGE_TYPE[ERROR_TYPE.COUNTER_CLOCKWISE_COMPARISON],
            [ERROR_TYPE.LITERAL_OR_CONSTANT_COMPARISON]: MESSAGE_TYPE[ERROR_TYPE.LITERAL_OR_CONSTANT_COMPARISON],
            [ERROR_TYPE.NEGATION_BEFORE_PARENTHESES]: MESSAGE_TYPE[ERROR_TYPE.NEGATION_BEFORE_PARENTHESES],
            [ERROR_TYPE.UNNECESSARY_NESTED_IF]: MESSAGE_TYPE[ERROR_TYPE.UNNECESSARY_NESTED_IF],
            [ERROR_TYPE.UNNECESSARY_ELSE]: MESSAGE_TYPE[ERROR_TYPE.UNNECESSARY_ELSE],
            [ERROR_TYPE.UNNECESSARY_TERNARY]: MESSAGE_TYPE[ERROR_TYPE.UNNECESSARY_TERNARY]
        }
    },
    create(context) {
        return {
            BinaryExpression(node) {
                checkBinaryExpression(context, node);
            },

            LogicalExpression(node) {
                checkLogicalExpression(context, node);
            },

            AssignmentExpression(node) {
                checkAssignmentExpression(context, node);
            },

            VariableDeclarator(node) {
                checkVariableDeclarator(context, node);
            },

            IfStatement(node) {
                checkIfStatement(context, node);
            }
        };
    }
};

exportedModule.ERROR_TYPE = ERROR_TYPE;

function checkBinaryExpression(context, node) {
    isCounterClockwiseComparison(context, node);
    isComparisonHasEnumOrConstantOnLeftSide(context, node);
    isNegationBeforeParentheses(context, node);
}

function checkLogicalExpression(context, node) {
    isNegationBeforeParentheses(context, node);
}

function checkAssignmentExpression(context, node) {
    isHasUnnecessaryTernary(context, node.right);
}

function checkVariableDeclarator(context, node) {
    isHasUnnecessaryTernary(context, node.init || {});
}

function checkIfStatement(context, node) {
    isHasUnnecessaryIfStatement(context, node);
    isHasUnnecessaryElseStatement(context, node);
}

function isCounterClockwiseComparison(context, node) {
    if (node.operator.startsWith('>')) {
        report(context, node, ERROR_TYPE.COUNTER_CLOCKWISE_COMPARISON);
    }
}

function isComparisonHasEnumOrConstantOnLeftSide(context, node) {
    if (['!==', '==='].includes(node.operator)) {
        const isLeftSideVariableConstOrLiteral = isPossibleEnum(context, node.left) || isLiteral(node.left);
        const isRightSideVariableConstOrLiteral = isPossibleEnum(context, node.right) || isLiteral(node.right);

        if (isLeftSideVariableConstOrLiteral && !isRightSideVariableConstOrLiteral) {
            report(context, node, ERROR_TYPE.LITERAL_OR_CONSTANT_COMPARISON);
        }
    }
}

function isHasUnnecessaryTernary(context, node) {
    if (node.type !== 'ConditionalExpression') {
        return;
    }

    const sourceCode = context.getSourceCode();

    const test = sourceCode.getText(node.test);
    const consequent = sourceCode.getText(node.consequent);

    if (test === consequent) {
        report(context, node, ERROR_TYPE.UNNECESSARY_TERNARY);
    }
}

function isHasUnnecessaryIfStatement(context, node) {
    const body = [...node.consequent.body];
    if (!body.length || body.pop().type !== 'IfStatement') {
        return;
    }

    if (body.every(statement => isSimpleVariableDeclarationOrAssignment(statement))) {
        report(context, node, ERROR_TYPE.UNNECESSARY_NESTED_IF);
    }
}

function isHasUnnecessaryElseStatement(context, node) {
    if (!node.alternate || !node.alternate.body) {
        return;
    }

    const { body } = node.alternate;

    if (body.every(statement => isSimpleVariableDeclarationOrAssignment(statement))) {
        report(context, node.alternate, ERROR_TYPE.UNNECESSARY_ELSE);
    }
}

function isNegationBeforeParentheses(context, node) {
    const sourceCode = context.getSourceCode();
    if (isParenthesized(1, node, sourceCode)) {
        const tokenBeforeParentheses = sourceCode.getTokenBefore(sourceCode.getTokenBefore(node));

        if (tokenBeforeParentheses.value === '!' && tokenBeforeParentheses.type === 'Punctuator') {
            report(context, node, ERROR_TYPE.NEGATION_BEFORE_PARENTHESES);
        }
    }
}

function isSimpleVariableDeclarationOrAssignment(node) {
    const isAssignment = node.type === 'ExpressionStatement' && node.expression.type === 'AssignmentExpression';
    if (node.type !== 'VariableDeclaration' && !isAssignment) {
        return false;
    }

    if (isAssignment) {
        return isSimpleInitialization(node.expression.right);
    }

    return node.declarations.every(declaration => isSimpleInitialization(declaration.init));
}

function isSimpleInitialization(node) {
    return isSimpleProperty(node) || isSimpleLogicalOrBinaryExpression(node);
}

function isSimpleLogicalOrBinaryExpression(node) {
    const isLogicalOrBinaryExpression = ['LogicalExpression', 'BinaryExpression'].includes(node.type);
    return isLogicalOrBinaryExpression && isSimpleProperty(node.left) && isSimpleProperty(node.right);
}

function isSimpleProperty(node) {
    return ['Literal', 'Identifier', 'MemberExpression'].includes(node.type);
}

function isPossibleEnum(context, node) {
    // If first letter of object is in upper case then perhaps it is an enum or constant

    const sourceCode = context.getSourceCode();

    const variableText = sourceCode.getText(node);

    return node.type === 'MemberExpression' && variableText[0] !== variableText[0].toLowerCase();
}

function isLiteral(node) {
    return ['Literal', 'Identifier'].includes(node.type);
}

function report(context, node, messageId) {
    context.report({
        messageId,
        loc: node.loc
    });
}