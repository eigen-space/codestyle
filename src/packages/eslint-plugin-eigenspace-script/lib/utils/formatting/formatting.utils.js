const endOfLine = require('os').EOL;
const { CommonUtils } = require('../common/common.utils');

class FormattingUtils {

    static getSingleLineFromMultiLine(str) {
        return str.split(endOfLine)
            .map(part => part.trim())
            .join(' ');
    }

    static nodeToSingleLineText(context, node) {
        const text = CommonUtils.getText(context, node);
        return FormattingUtils.getSingleLineFromMultiLine(text);
    }
}

module.exports = { FormattingUtils };