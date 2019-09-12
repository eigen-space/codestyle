class CommonUtils {

    static isSingleLine(node) {
        const { start, end } = node.loc;
        return start.line === end.line;
    }

    static getContentLength(node) {
        const [start, end] = node.range;
        return end - start;
    }

    static findIndexParentByType(context, type) {
        return CommonUtils.getAncestors(context)
            .findIndex(ancestor => ancestor.type === type);
    }

    static getAncestors(context) {
        return context.getAncestors()
            .reverse();
    }

    static getText(context, node) {
        const sourceCode = context.getSourceCode();
        return sourceCode.getText(node);
    }
}

module.exports = { CommonUtils };