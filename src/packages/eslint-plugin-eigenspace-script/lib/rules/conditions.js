const MESSAGE_COUNTER_CLOCKWISE_COMPARISON = 'You should use only clockwise comparison `<`';
const MESSAGE_LITERAL_OR_CONSTANT_COMPARISON = 'Literal or enum to compare with should be on right side of expression';
const MESSAGE_UNEXPECTED_NEGATION_BEFORE_PARENTHESES = 'Unexpected negation before parentheses';
const MESSAGE_UNNECESSARY_NESTED_IF = 'Unnecessary nested if statement';
const MESSAGE_UNNECESSARY_ELSE = 'Unnecessary else statement. You could do declaration in else statement before if';
const MESSAGE_UNNECESSARY_TERNARY = 'Unnecessary ternary operator';

const { isParenthesized } = require('eslint-utils');

module.exports = {
    meta: {
        type: 'layout',

        docs: {
            description: 'rules for checking condition syntax',
            category: 'Stylistic Issues'
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
        report(context, node, MESSAGE_COUNTER_CLOCKWISE_COMPARISON);
    }
}

function isComparisonHasEnumOrConstantOnLeftSide(context, node) {
    if (['!==', '==='].includes(node.operator)) {
        const isLeftSideVariableConstOrLiteral = isPossibleEnum(context, node.left) || isLiteral(node.left);
        const isRightSideVariableConstOrLiteral = isPossibleEnum(context, node.right) || isLiteral(node.right);

        if (isLeftSideVariableConstOrLiteral && !isRightSideVariableConstOrLiteral) {
            report(context, node, MESSAGE_LITERAL_OR_CONSTANT_COMPARISON);
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
        report(context, node, MESSAGE_UNNECESSARY_TERNARY);
    }
}

function isHasUnnecessaryIfStatement(context, node) {
    const body = [...node.consequent.body];
    if (!body.length || body.pop().type !== 'IfStatement') {
        return;
    }

    if (body.every(statement => isSimpleVariableDeclarationOrAssignment(statement))) {
        report(context, node, MESSAGE_UNNECESSARY_NESTED_IF);
    }
}

function isHasUnnecessaryElseStatement(context, node) {
    if (!node.alternate || !node.alternate.body) {
        return;
    }

    const { body } = node.alternate;

    if (body.every(statement => isSimpleVariableDeclarationOrAssignment(statement))) {
        report(context, node.alternate, MESSAGE_UNNECESSARY_ELSE);
    }
}

function isNegationBeforeParentheses(context, node) {
    const sourceCode = context.getSourceCode();
    if (isParenthesized(1, node, sourceCode)) {
        const tokenBeforeParentheses = sourceCode.getTokenBefore(sourceCode.getTokenBefore(node));

        if (tokenBeforeParentheses.value === '!' && tokenBeforeParentheses.type === 'Punctuator') {
            report(context, node, MESSAGE_UNEXPECTED_NEGATION_BEFORE_PARENTHESES);
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

    const variableText = sourceCode.getText(node.test);

    return node.type === 'MemberExpression' && variableText[0] !== variableText[0].toLowerCase();
}

function isLiteral(node) {
    return node.type === 'Literal';
}

function report(context, node, message) {
    context.report({
        message,
        loc: node.loc
    });
}