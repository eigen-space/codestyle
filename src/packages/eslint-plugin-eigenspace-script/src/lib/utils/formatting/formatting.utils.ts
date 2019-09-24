import { TSESTree } from '@typescript-eslint/experimental-utils';
import { EOL } from 'os';
import { CommonUtils } from '../common/common.utils';
import { CommonRuleContext } from '../../../@types/eslint';

export class FormattingUtils {

    static getSingleLineFromMultiLine(str: string): string {
        return str.split(EOL)
            .map(part => part.trim())
            .join(' ');
    }

    static nodeToSingleLineText(context: CommonRuleContext, node: TSESTree.Node): string {
        const text = CommonUtils.getText(context, node);
        return FormattingUtils.getSingleLineFromMultiLine(text);
    }
}