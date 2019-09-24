import { isParenthesized } from 'eslint-utils';
import { CommonRuleContext } from '../../@types/eslint';
import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/experimental-utils';

export enum ERROR_TYPE {
    COUNTER_CLOCKWISE_COMPARISON = 'counter-clockwise-comparison',
    LITERAL_OR_CONSTANT_COMPARISON = 'literal-or-constant-comparison',
    NEGATION_BEFORE_PARENTHESES = 'negation-before-parentheses',
    UNNECESSARY_NESTED_IF = 'unnecessary-nested-if',
    UNNECESSARY_ELSE = 'unnecessary-else',
    UNNECESSARY_TERNARY = 'unnecessary-ternary-operator'
}

const MESSAGE_TYPE = {
    [ERROR_TYPE.COUNTER_CLOCKWISE_COMPARISON]: 'You should use only clockwise comparison `<`',
    [ERROR_TYPE.LITERAL_OR_CONSTANT_COMPARISON]: `Literal or enum to compare with should be on right side of\
     expression`,
    [ERROR_TYPE.NEGATION_BEFORE_PARENTHESES]: 'Unexpected negation before parentheses',
    [ERROR_TYPE.UNNECESSARY_NESTED_IF]: 'Unnecessary nested if statement',
    [ERROR_TYPE.UNNECESSARY_ELSE]: 'Unnecessary else statement. You could do declaration in else statement before if',
    [ERROR_TYPE.UNNECESSARY_TERNARY]: 'Unnecessary ternary operator'
};

export default {
    meta: {
        type: 'layout',

        docs: {
            description: 'rules for checking condition syntax',
            category: 'Stylistic Issues',
            recommended: 'error'
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
    create(context: CommonRuleContext) {
        return {
            BinaryExpression(node: TSESTree.BinaryExpression) {
                checkBinaryExpression(context, node);
            },

            LogicalExpression(node: TSESTree.LogicalExpression) {
                checkLogicalExpression(context, node);
            },

            AssignmentExpression(node: TSESTree.AssignmentExpression) {
                checkAssignmentExpression(context, node);
            },

            VariableDeclarator(node: TSESTree.VariableDeclarator) {
                checkVariableDeclarator(context, node);
            },

            IfStatement(node: TSESTree.IfStatement) {
                checkIfStatement(context, node);
            }
        };
    }
};

function checkBinaryExpression(context: CommonRuleContext, node: TSESTree.BinaryExpression): void {
    isCounterClockwiseComparison(context, node);
    isComparisonHasEnumOrConstantOnLeftSide(context, node);
    isNegationBeforeParentheses(context, node);
}

function checkLogicalExpression(context: CommonRuleContext, node: TSESTree.LogicalExpression): void {
    isNegationBeforeParentheses(context, node);
}

function checkAssignmentExpression(context: CommonRuleContext, node: TSESTree.AssignmentExpression): void {
    isHasUnnecessaryTernary(context, node.right);
}

function checkVariableDeclarator(context: CommonRuleContext, node: TSESTree.VariableDeclarator): void {
    isHasUnnecessaryTernary(context, node.init);
}

function checkIfStatement(context: CommonRuleContext, node: TSESTree.IfStatement): void {
    isHasUnnecessaryIfStatement(context, node);
    isHasUnnecessaryElseStatement(context, node);
}

function isCounterClockwiseComparison(context: CommonRuleContext, node: TSESTree.BinaryExpression): void {
    if (node.operator.startsWith('>')) {
        report(context, node, ERROR_TYPE.COUNTER_CLOCKWISE_COMPARISON);
    }
}

function isComparisonHasEnumOrConstantOnLeftSide(context: CommonRuleContext, node: TSESTree.BinaryExpression): void {
    if (['!==', '==='].includes(node.operator)) {
        const isLeftSideVariableConstOrLiteral = isPossibleEnum(context, node.left) || isLiteral(node.left);
        const isRightSideVariableConstOrLiteral = isPossibleEnum(context, node.right) || isLiteral(node.right);

        if (isLeftSideVariableConstOrLiteral && !isRightSideVariableConstOrLiteral) {
            report(context, node, ERROR_TYPE.LITERAL_OR_CONSTANT_COMPARISON);
        }
    }
}

function isHasUnnecessaryTernary(context: CommonRuleContext, node: TSESTree.Node | null): void {
    if (!node || node.type !== AST_NODE_TYPES.ConditionalExpression) {
        return;
    }

    const sourceCode = context.getSourceCode();

    const test = sourceCode.getText(node.test);
    const consequent = sourceCode.getText(node.consequent);

    if (test === consequent) {
        report(context, node, ERROR_TYPE.UNNECESSARY_TERNARY);
    }
}

function isHasUnnecessaryIfStatement(context: CommonRuleContext, node: TSESTree.IfStatement): void {
    // Case when prop body doesn't exists
    // @ts-ignore
    const body = [...node.consequent.body];
    if (!body.length || body.pop().type !== AST_NODE_TYPES.IfStatement) {
        return;
    }

    if (body.every(statement => isSimpleVariableDeclarationOrAssignment(statement))) {
        report(context, node, ERROR_TYPE.UNNECESSARY_NESTED_IF);
    }
}

function isHasUnnecessaryElseStatement(context: CommonRuleContext, node: TSESTree.IfStatement): void {
    // Case when prop body doesn't exists
    // @ts-ignore
    if (!node.alternate || !node.alternate.body) {
        return;
    }

    // Case when prop body doesn't exists
    // @ts-ignore
    const body = node.alternate.body as TSESTree.Statement[];

    if (body.every(statement => isSimpleVariableDeclarationOrAssignment(statement))) {
        report(context, node.alternate, ERROR_TYPE.UNNECESSARY_ELSE);
    }
}

function isNegationBeforeParentheses(context: CommonRuleContext, node: TSESTree.Node): void {
    const sourceCode = context.getSourceCode();
    if (isParenthesized(1, node, sourceCode)) {
        const tokenBeforeParentheses = sourceCode.getTokenBefore(sourceCode.getTokenBefore(node)!);

        if (tokenBeforeParentheses!.value === '!' && tokenBeforeParentheses!.type === 'Punctuator') {
            report(context, node, ERROR_TYPE.NEGATION_BEFORE_PARENTHESES);
        }
    }
}

function isSimpleVariableDeclarationOrAssignment(node: TSESTree.Statement): boolean {
    if (node.type !== AST_NODE_TYPES.VariableDeclaration && !isAssignment(node)) {
        return false;
    }

    if (isAssignment(node)) {
        // Case when prop doesn't exists
        // @ts-ignore
        return isSimpleInitialization(node.expression.right);
    }

    // Case when prop doesn't exists
    // @ts-ignore
    return node.declarations.every(declaration => isSimpleInitialization(declaration.init));
}

function isSimpleInitialization(node: TSESTree.Node): boolean {
    return isSimpleProperty(node) || isSimpleLogicalOrBinaryExpression(node);
}

function isSimpleLogicalOrBinaryExpression(node: TSESTree.Node): boolean {
    const types = [AST_NODE_TYPES.LogicalExpression, AST_NODE_TYPES.BinaryExpression];
    const isLogicalOrBinaryExpression = types.includes(node.type);
    // Typescript sends fake errors
    // @ts-ignore
    return isLogicalOrBinaryExpression && isSimpleProperty(node.left) && isSimpleProperty(node.right);
}

function isSimpleProperty(node: TSESTree.Node): boolean {
    const types = [
        AST_NODE_TYPES.Literal,
        AST_NODE_TYPES.Identifier,
        AST_NODE_TYPES.MemberExpression
    ];

    return types.includes(node.type);
}

function isPossibleEnum(context: CommonRuleContext, node: TSESTree.Node): boolean {
    // If first letter of object is in upper case then perhaps it is an enum or constant

    const sourceCode = context.getSourceCode();

    const variableText = sourceCode.getText(node);

    return node.type === AST_NODE_TYPES.MemberExpression && variableText[0] !== variableText[0].toLowerCase();
}

function isLiteral(node: TSESTree.Node): boolean {
    return [AST_NODE_TYPES.Literal, AST_NODE_TYPES.Identifier].includes(node.type);
}

function isAssignment(node: TSESTree.Node): boolean {
    if (node.type !== AST_NODE_TYPES.ExpressionStatement) {
        return false;
    }

    return node.expression.type === AST_NODE_TYPES.AssignmentExpression;

}

function report(context: CommonRuleContext, node: TSESTree.Node, messageId: string): void {
    context.report({ messageId, loc: node.loc });
}