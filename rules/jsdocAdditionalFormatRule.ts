import * as ts from 'typescript';
import * as Lint from 'tslint';
import { END_OF_LINE_PATTERN } from '../utils/common.utils';

export class Rule extends Lint.Rules.AbstractRule {
    public static FAILURE_STRING_NO_BODY = 'JsDoc requires body';
    public static FAILURE_STRING_LINES_BEFORE_BODY = 'JsDoc body should starts without empty line';
    public static FAILURE_STRING_LINES_AFTER_BODY = 'JsDoc body should end without empty line';
    public static FAILURE_STRING_LINES_AFTER_COMMENT = 'JsDoc comment must be separated from other blocks by one line';
    public static FAILURE_STRING_REST_OF_PARAMS = 'JsDoc parameters transfer should be done with' +
        ' an additional indentation of 6 spaces';

    public static metadata: Lint.IRuleMetadata = {
        ruleName: 'jsdoc-additional-format',
        description: 'Warns about wrong jsdoc formatting.',
        optionsDescription: '',
        options: {},
        optionExamples: [],
        type: 'style',
        typescriptOnly: true,
        requiresTypeInfo: false
    };


    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        const walker = new JsdocAdditionalFormatWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    }
}

interface JsDocNode extends ts.Node {
    jsDoc?: ts.JSDoc[];
}

class JsdocAdditionalFormatWalker extends Lint.RuleWalker {
    // tslint:disable-next-line:no-magic-numbers
    private static TRANSFER_PARAMETERS_START_PATTERN = new RegExp(`^${''.padStart(5, ' ')}[^ ]`);
    private static ONLY_SPACES_PATTERN = /^ *$/;

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

        this.checkBodyLines(doc);
        this.checkCommentEnding(doc);
        this.checkParams(doc);
    }

    private checkBodyLines(doc: ts.JSDoc): void {
        if (!doc.comment && !doc.tags) {
            return;
        }

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
        if (!doc.comment || !doc.tags) {
            return;
        }

        const relativeTagsPos = doc.tags.pos - doc.pos;
        const fullText = doc.getText();
        const cutText = fullText.slice(0, relativeTagsPos);
        const commentLines = this.getCutLines(cutText);
        const length = commentLines.length;
        const isNoLine = commentLines[length - 1] !== '';
        const isMoreThanOneLine = commentLines[length - 1] === '' && commentLines[length - 2] === '';
        if (isNoLine || isMoreThanOneLine) {
            this.addFailureAtNode(doc, Rule.FAILURE_STRING_LINES_AFTER_COMMENT);
        }
    }

    private checkParams(doc: ts.JSDoc): void {
        if (!doc.tags) {
            return;
        }

        const parameters = doc.tags.filter(tag => tag.kind === ts.SyntaxKind.JSDocParameterTag);
        parameters.forEach(parameter => this.checkParameter(parameter as ts.JSDocParameterTag));
    }

    private checkParameter(parameter: ts.JSDocParameterTag): void {
        const parameterText = parameter.getText();
        const lines: string[] = parameterText.toString().split(END_OF_LINE_PATTERN);
        if (lines.length === 1) {
            return;
        }

        const cutLines = lines.map(line => line.replace(/ *\* /, ''));
        const isEmptyLine = JsdocAdditionalFormatWalker.ONLY_SPACES_PATTERN.test(cutLines[cutLines.length - 1]);
        if (!cutLines[cutLines.length - 1] || isEmptyLine) {
            cutLines.pop();
        }

        const transitedLines = cutLines.slice(1);
        transitedLines.forEach(line => {
            if (!JsdocAdditionalFormatWalker.TRANSFER_PARAMETERS_START_PATTERN.test(line)) {
                this.addFailureAtNode(parameter, Rule.FAILURE_STRING_REST_OF_PARAMS);
            }
        });
    }

    private getCutLines(text: string): string[] {
        const lines = text.toString().split(END_OF_LINE_PATTERN);
        lines.shift();
        lines.pop();
        return lines.map(line => line.replace(/ *\* */, ''));
    }
}