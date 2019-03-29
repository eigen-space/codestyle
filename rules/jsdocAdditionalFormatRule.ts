import * as ts from 'typescript';
import * as Lint from 'tslint';

export class Rule extends Lint.Rules.AbstractRule {
    public static FAILURE_STRING_NO_BODY = 'JsDoc requires body';
    public static FAILURE_STRING_LINES_BEFORE_BODY = 'JsDoc body should starts without empty line';
    public static FAILURE_STRING_LINES_AFTER_BODY = 'JsDoc body should end without empty line';
    public static FAILURE_STRING_LINES_AFTER_COMMENT = 'JsDoc comment must be separated from other blocks by one line';

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        const walker = new NoVoidGetterWalker2(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    }
}

interface JsDocNode extends ts.Node {
    jsDoc?: ts.JSDoc[];
}

class NoVoidGetterWalker2 extends Lint.RuleWalker {

    protected visitNode(node: JsDocNode): void {
        if (node.jsDoc) {
            node.jsDoc.forEach(doc => this.checkJsDoc(doc));
        }
        super.visitNode(node);
    }

    private checkJsDoc(doc: ts.JSDoc): void {
        if (doc.kind !== ts.SyntaxKind.JSDocComment) {
            return;
        }

        if (!doc.comment && !doc.tags) {
            this.addFailureAtNode(doc, Rule.FAILURE_STRING_NO_BODY);
        }

        if (doc.comment || doc.tags) {
            this.checkBodyLines(doc);
        }

        if (doc.comment && doc.tags) {
            this.checkCommentEnding(doc);
        }
    }

    private checkBodyLines(doc: ts.JSDoc): void {
        const fullText = doc.getText();
        const bodyLines = this.getCutLines(fullText);
        if (bodyLines[0] === '') {
            this.addFailureAtNode(doc, Rule.FAILURE_STRING_LINES_BEFORE_BODY);
        }

        if (bodyLines[bodyLines.length - 1] === '') {
            this.addFailureAtNode(doc, Rule.FAILURE_STRING_LINES_AFTER_BODY);
        }
    }

    private checkCommentEnding(doc: ts.JSDoc): void {
        // @ts-ignore
        const tagsPos = doc.tags.pos;
        const fullText = doc.getText();
        const cutText = fullText.slice(0, tagsPos);
        const commentLines = this.getCutLines(cutText);
        const length = commentLines.length;
        const isNoLine = commentLines[length - 1] !== '';
        const isMoreThanOneLine = commentLines[length - 1] === '' && commentLines[length - 2] === '';
        if (isNoLine || isMoreThanOneLine) {
            this.addFailureAtNode(doc, Rule.FAILURE_STRING_LINES_AFTER_COMMENT);
        }
    }

    private getCutLines(text: string): string[] {
        const lines = text.toString().split(/\r\n?|\n/);
        lines.shift();
        lines.pop();
        return lines.map(line => line.replace(/ *\* */, ''));
    }
}