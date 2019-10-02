import { CommonUtils } from '../utils/common/common.utils';
import { FormattingUtils } from '../utils/formatting/formatting.utils';
import { CommonRuleContext } from '../../@types/eslint';
import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/experimental-utils';
import { RuleListener } from '@typescript-eslint/experimental-utils/dist/ts-eslint';
import { ObjectExpression } from 'estree';

const MAX_CONTENT_WIDTH = 70;
const MAX_PROPERTIES_IN_SINGLE_LINE = 3;
const MAX_ARRAY_PROPERTIES_IN_SINGLE_LINE = 1;
const MAX_CHILD_OBJECT_PROPERTIES_IN_SINGLE_LINE = 0;
const MAX_CHILD_CALL_EXPRESSION_LENGTH = 20;
const MAX_COUNT_CALL_EXPRESSION_IN_SINGLE_LINE = 1;

export enum ERROR_TYPE {
    CONTENT_WIDTH = 'content-width',
    COUNT_PROPERTIES = 'count-properties',
    COUNT_CALL_EXPRESSIONS = 'count-call-expressions',
    FUNCTION_LENGTH = 'function-length',
    COUNT_NESTED_OBJECT_PROPERTIES = 'count-nested-object-properties',
    COUNT_NESTED_ARRAY_ELEMENTS = 'count-nested-array-properties',
    NO_MULTILINE = 'no-multiline'
}

const SINGLE_LINE_ERRORS = {
    [ERROR_TYPE.CONTENT_WIDTH]: `content width of object is more than ${MAX_CONTENT_WIDTH}.`,
    [ERROR_TYPE.COUNT_PROPERTIES]: `an object in single line must contain not more than\
     ${MAX_PROPERTIES_IN_SINGLE_LINE} properties.`,
    [ERROR_TYPE.COUNT_CALL_EXPRESSIONS]: `an object in single line must contain not more than\
     ${MAX_COUNT_CALL_EXPRESSION_IN_SINGLE_LINE} call expressions.`,
    [ERROR_TYPE.FUNCTION_LENGTH]: `an object in single line can contain a function no longer than\
     ${MAX_CHILD_CALL_EXPRESSION_LENGTH} characters.`,
    [ERROR_TYPE.COUNT_NESTED_OBJECT_PROPERTIES]: `an object in single line can contain an object with the number of\
     properties not more than ${MAX_CHILD_OBJECT_PROPERTIES_IN_SINGLE_LINE}.`,
    [ERROR_TYPE.COUNT_NESTED_ARRAY_ELEMENTS]: `an object in single line can contain an array with the number of\
     properties not more than ${MAX_ARRAY_PROPERTIES_IN_SINGLE_LINE}.`
};

const MULTI_LINE_ERRORS = {
    [ERROR_TYPE.NO_MULTILINE]: 'the object can be written in one line.'
};

export default {
    meta: {
        type: 'layout',
        docs: {
            description: 'object literal property carrying rules',
            category: 'Stylistic Issues',
            recommended: 'error'
        },
        messages: {
            [ERROR_TYPE.CONTENT_WIDTH]: SINGLE_LINE_ERRORS[ERROR_TYPE.CONTENT_WIDTH],
            [ERROR_TYPE.COUNT_PROPERTIES]: SINGLE_LINE_ERRORS[ERROR_TYPE.COUNT_PROPERTIES],
            [ERROR_TYPE.COUNT_CALL_EXPRESSIONS]: SINGLE_LINE_ERRORS[ERROR_TYPE.COUNT_CALL_EXPRESSIONS],
            [ERROR_TYPE.FUNCTION_LENGTH]: SINGLE_LINE_ERRORS[ERROR_TYPE.FUNCTION_LENGTH],
            [ERROR_TYPE.COUNT_NESTED_OBJECT_PROPERTIES]: SINGLE_LINE_ERRORS[ERROR_TYPE.COUNT_NESTED_OBJECT_PROPERTIES],
            [ERROR_TYPE.COUNT_NESTED_ARRAY_ELEMENTS]: SINGLE_LINE_ERRORS[ERROR_TYPE.COUNT_NESTED_ARRAY_ELEMENTS],
            [ERROR_TYPE.NO_MULTILINE]: MULTI_LINE_ERRORS[ERROR_TYPE.NO_MULTILINE]
        }
    },
    create(context: CommonRuleContext): RuleListener {

        return {
            ObjectExpression(node: TSESTree.ObjectExpression) {
                if (!isDesiredObject(context)) {
                    return;
                }

                const isSingleLine = CommonUtils.isSingleLine(node);

                let messages = checkLiteralAsSingleLine(context, node);

                if (!isSingleLine) {
                    messages = !messages.length ? [ERROR_TYPE.NO_MULTILINE] : [];
                }

                report(context, node, messages);
            }
        };
    }
};

// Not a part of call expression
function isDesiredObject(context: CommonRuleContext): boolean {
    const ignoredParentTypes = [AST_NODE_TYPES.CallExpression];
    const approvedParentTypes = [AST_NODE_TYPES.AssignmentExpression, AST_NODE_TYPES.VariableDeclarator];

    const approvedParentIndex = getClosestByTypes(context, approvedParentTypes);
    const ignoredParentIndex = getClosestByTypes(context, ignoredParentTypes);

    return approvedParentIndex < ignoredParentIndex;
}

function getClosestByTypes(context: CommonRuleContext, types: AST_NODE_TYPES[]): number {
    const NOT_FOUND_INDEX = -1;
    const parentPositions = types.map(type => CommonUtils.findIndexParentByType(context, type))
        .filter(index => NOT_FOUND_INDEX < index);
    return Math.min(...parentPositions);
}

function checkLiteralAsSingleLine(context: CommonRuleContext, node: TSESTree.ObjectExpression): string[] {
    const messages = [];

    messages.push(...checkCommonRules(context, node));

    const nestedNodes = node.properties.map(prop => {
        return prop.type !== AST_NODE_TYPES.SpreadElement ? prop.value : undefined;
    })
        .filter(nestedNode => Boolean(nestedNode)) as TSESTree.Node[];

    messages.push(checkArrayExpressionInObject(nestedNodes));
    messages.push(...checkFunctionsInObject(nestedNodes));
    messages.push(checkObjectInObject(nestedNodes));

    return messages.filter(message => Boolean(message)) as string[];
}

function checkCommonRules(context: CommonRuleContext, node: TSESTree.ObjectExpression): string[] {
    const messages = [];

    if (MAX_CONTENT_WIDTH < FormattingUtils.nodeToSingleLineText(context, node as TSESTree.Node).length) {
        messages.push(ERROR_TYPE.CONTENT_WIDTH);
    }

    if (MAX_PROPERTIES_IN_SINGLE_LINE < node.properties.length) {
        messages.push(ERROR_TYPE.COUNT_PROPERTIES);
    }

    return messages;
}

function checkArrayExpressionInObject(nodes: TSESTree.Node[]): string | undefined {
    const arrayExpressions = nodes.filter(nestedNode => {
        return nestedNode.type === AST_NODE_TYPES.ArrayExpression;
    }) as TSESTree.ArrayExpression[];
    if (arrayExpressions.some(array => MAX_ARRAY_PROPERTIES_IN_SINGLE_LINE < array.elements.length)) {
        return ERROR_TYPE.COUNT_NESTED_ARRAY_ELEMENTS;
    }
}

function checkFunctionsInObject(nodes: TSESTree.Node[]): string[] {
    const functionExpressions = [AST_NODE_TYPES.ArrowFunctionExpression, AST_NODE_TYPES.CallExpression];
    const callExpressions = nodes.filter(nestedNode => functionExpressions.includes(nestedNode.type));

    const messages = [];
    if (MAX_COUNT_CALL_EXPRESSION_IN_SINGLE_LINE < callExpressions.length) {
        messages.push(ERROR_TYPE.COUNT_CALL_EXPRESSIONS);
    }

    const functionLengths = callExpressions.map(expressionNode => CommonUtils.getContentLength(expressionNode));
    if (functionLengths.some(length => MAX_CHILD_CALL_EXPRESSION_LENGTH < length)) {
        messages.push(ERROR_TYPE.FUNCTION_LENGTH);
    }

    return messages;
}

function checkObjectInObject(nodes: TSESTree.Node[]): string | undefined {
    const objectExpressions = nodes.filter(nestedNode => {
        return nestedNode.type === AST_NODE_TYPES.ObjectExpression;
    }) as ObjectExpression[];
    if (objectExpressions.some(objectNode => Boolean(objectNode.properties.length))) {
        return ERROR_TYPE.COUNT_NESTED_OBJECT_PROPERTIES;
    }
}

function report(context: CommonRuleContext, node: TSESTree.Node, messages: string[]): void {
    messages.forEach(message => context.report({ messageId: message, node }));
}