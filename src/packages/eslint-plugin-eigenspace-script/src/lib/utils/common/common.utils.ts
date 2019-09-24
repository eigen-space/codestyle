import { CommonRuleContext } from '../../../@types/eslint';
import { TSESTree, AST_NODE_TYPES } from '@typescript-eslint/experimental-utils';

export class CommonUtils {

    static isSingleLine(node: TSESTree.Node): boolean {
        const { start, end } = node.loc;
        return start.line === end.line;
    }

    static getContentLength(node: TSESTree.Node): number {
        const [start, end] = node.range;
        return end - start;
    }

    static findIndexParentByType(context: CommonRuleContext, type: AST_NODE_TYPES): number {
        return CommonUtils.getAncestors(context)
            .findIndex(ancestor => ancestor.type === type);
    }

    static getAncestors(context: CommonRuleContext): TSESTree.Node[] {
        return context.getAncestors()
            .reverse();
    }

    static getText(context: CommonRuleContext, node: TSESTree.Node): string {
        const sourceCode = context.getSourceCode();
        return sourceCode.getText(node);
    }
}