const MAX_CONTENT_WIDTH = 70;
const MAX_PROPERTIES_IN_SINLE_LINE = 3;
const MAX_ARRAY_PROPERTIES_IN_SINLE_LINE = 1;
const MAX_CHILD_OBJECT_PROPERTIES_IN_SINLE_LINE = 0;
const MAX_CHILD_CALL_EXPRESSION_LENGTH = 20;
const MAX_COUNT_CALL_EXPRESSION_IN_SINGLE_LINE = 1;

module.exports = {
    meta: {
        type: 'layout',

        docs: {
            description: 'object literal property carrying rules',
            category: 'Stylistic Issues'
        }
    },
    create(context) {
        return {
            ObjectExpression(node) {
                if (isSingleLine(node)) {
                    checkSingleLineLiteral(context, node);
                }

                if (isObjectProperty(node)) {
                    checkObjectInObject(context, node);
                }
            },

            ArrayExpression(node) {
                if (!isObjectProperty(node)) {
                    return;
                }

                if (isParentObjectInSingleLine(context)) {
                    checkArrayInObject(context, node);
                }
            },

            CallExpression(node) {
                if (!isObjectProperty(node)) {
                    return;
                }

                if (isParentObjectInSingleLine(context)) {
                    checkFunctionInObject(context, node);
                }
            }
        };
    }
};

function checkFunctionInObject(context, node) {
    if (MAX_CHILD_CALL_EXPRESSION_LENGTH < getContentLength(node)) {
        context.report({
            message: `an object in single line can contain a function no longer than\
             ${MAX_CHILD_CALL_EXPRESSION_LENGTH} characters`,
            loc: node.loc,
            node
        });
    }
}

function checkSingleLineLiteral(context, node) {
    if (MAX_CONTENT_WIDTH < getContentLength(node)) {
        context.report({
            message: `content width of object is more than ${MAX_CONTENT_WIDTH}`,
            loc: node.loc,
            node
        });
    }

    if (MAX_PROPERTIES_IN_SINLE_LINE < node.properties.length) {
        context.report({
            message: `an object in single line must contain not more than ${MAX_PROPERTIES_IN_SINLE_LINE} properties`,
            loc: node.loc,
            node
        });
    }

    const nestedNodes = node.properties.map(prop => prop.value)
        .filter(nestedNode => Boolean(nestedNode));

    const callExpressions = nestedNodes.filter(nestedNode => nestedNode.type === 'CallExpression');

    if (MAX_COUNT_CALL_EXPRESSION_IN_SINGLE_LINE < callExpressions.length) {
        context.report({
            message: `an object in single line must contain not more than ${MAX_COUNT_CALL_EXPRESSION_IN_SINGLE_LINE}\
             call expressions`,
            loc: node.loc,
            node
        });
    }
}

function checkObjectInObject(context, node) {
    if (isParentObjectInSingleLine(context, node) && node.properties.length) {
        context.report({
            message: `an object in single line can contain an object with the number of properties not more than\
                 ${MAX_CHILD_OBJECT_PROPERTIES_IN_SINLE_LINE}`,
            loc: node.loc,
            node
        });
    }
}

function checkArrayInObject(context, node) {
    if (MAX_ARRAY_PROPERTIES_IN_SINLE_LINE < node.elements.length) {
        context.report({
            message: `an object in single line can contain an array with the number of properties not more than\
             ${MAX_ARRAY_PROPERTIES_IN_SINLE_LINE}`,
            loc: node.loc
        });
    }
}

// TODO: Move to utils later
// UTILS

function isObjectProperty(node) {
    return node.parent.type === 'Property';
}

function isParentObjectInSingleLine(context) {
    const ancestors = context.getAncestors();
    const parentObjectNode = ancestors.find(ancestor => ancestor.type === 'ObjectExpression');
    return isSingleLine(parentObjectNode);
}

function isSingleLine(node) {
    const { start, end } = node.loc;
    return start.line === end.line;
}

function getContentLength(node) {
    const [start, end] = node.range;
    return end - start;
}