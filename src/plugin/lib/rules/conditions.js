const MESSAGE_COUNTER_CLOCKWISE_COMPARISON = 'You should use only clockwise comparison `<` except for null/undefined check';
const MESSAGE_LITERAL_OR_CONSTANT_COMPARISON = 'Literal or constant to compare with should be on right side of expression';
const MESSAGE_UNEXPECTED_NEGATION_BEFORE_PARENTHESES = 'Unexpected negation before parentheses';
const MESSAGE_UNNECESSARY_NESTED_IF = 'Unnecessary nested if statement';
const MESSAGE_UNNECESSARY_ELSE = 'Unnecessary else statement. You could do declaration in else statement before if';

const { isParenthesized } = require("eslint-utils");

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

            IfStatement(node) {
                checkIfStatement(context, node);
            }
        };
    }
};

function checkBinaryExpression(context, node) {
    if (node.operator.startsWith('>')) {
        report(context, node, MESSAGE_COUNTER_CLOCKWISE_COMPARISON);
    }

    if (['!==', '==='].includes(node.operator)) {
        // remove nesting
        const isLeftSideVariableConstOrLiteral = isPossibleEnum(node.left) || isLiteral(node.left);
        const isRightSideVariableConstOrLiteral = isPossibleEnum(node.right) || isLiteral(node.right);

        if (isLeftSideVariableConstOrLiteral && !isRightSideVariableConstOrLiteral) {
            report(context, node, MESSAGE_LITERAL_OR_CONSTANT_COMPARISON);
        }
    }

    isNegationBeforeParentheses(context, node)
}

function checkLogicalExpression(context, node) {
    isNegationBeforeParentheses(context, node)
}

// Check if in if statement we have unnecessary nested if statement
function checkIfStatement(context, node) {
    isHasUnnecessaryIfStatement(context, node);
    isHasUnnecessaryElseStatement(context, node);
}

function isHasUnnecessaryIfStatement(context, node) {
    const body = [...node.consequent.body];
    if (body.pop().type !== 'IfStatement') {
        return;
    }

    if (body.every(statement => isSimpleVariableDeclarationOrAssignment(statement))) {
        report(context, node, MESSAGE_UNNECESSARY_NESTED_IF);
    }
}

function isHasUnnecessaryElseStatement(context, node) {
    if (!node.alternate) {
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
    const isAssignmentExpression = node.type === 'ExpressionStatement' && node.expression.type === 'AssignmentExpression';
    if (node.type !== 'VariableDeclaration' && !isAssignmentExpression) {
        return false;
    }

    if (isAssignmentExpression) {
        return isSimpleProperty(node.expression.right) || isSimpleLogicalOrBinaryExpression(node.expression.right);
    }

    return node.declarations.every(declaration => isSimpleProperty(declaration.init) || isSimpleLogicalOrBinaryExpression(declaration.init));
}

function isSimpleLogicalOrBinaryExpression(node) {
    return ['LogicalExpression', 'BinaryExpression'].includes(node.type) && isSimpleProperty(node.left) && isSimpleProperty(node.right);
}

function isSimpleProperty(node) {
    return ['Literal', 'Identifier', 'MemberExpression'].includes(node.type);
}

function isPossibleEnum(node) {
    // If first letter of object is in upper case then perhaps it is an enum or constant
    return node.type === 'MemberExpression' && node.object.name[0] !== node.object.name[0].toLowerCase();
}

function isLiteral(node) {
    return node.type === 'Identifier';
}

function report(context, node, message) {
    context.report({
        message,
        loc: node.loc
    });
}