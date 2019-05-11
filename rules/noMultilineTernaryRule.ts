import * as ts from 'typescript';
import * as Lint from 'tslint';
import { isConditionalExpression } from 'tsutils';

export class Rule extends Lint.Rules.AbstractRule {
    static FAILURE_STRING = 'Ternary operators must be written in one line';

    static metadata: Lint.IRuleMetadata = {
        ruleName: 'no-multiline-ternary',
        description: 'Warns about using ternary operator on multiple lines.',
        optionsDescription: '',
        options: {},
        optionExamples: [],
        type: 'style',
        // tslint:disable-next-line
        typescriptOnly: true,
        // tslint:disable-next-line
        requiresTypeInfo: false
    };

    apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        const walker = new NoMultilineTernaryWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    }
}

class NoMultilineTernaryWalker extends Lint.RuleWalker {

    protected visitNode(node: ts.ConditionalExpression): void {
        if (this.isValidNode(node)) {
            const startLine = this.getStartPosition(node).line;
            const endLine = this.getEndPosition(node).line;

            if (startLine !== endLine) {
                this.addFailureAtNode(node, Rule.FAILURE_STRING);
            }
        }

        super.visitNode(node);
    }

    // noinspection JSMethodCanBeStatic
    private getStartPosition(node: ts.ConditionalExpression): ts.LineAndCharacter {
        return node.getSourceFile().getLineAndCharacterOfPosition(node.getStart());
    }

    // noinspection JSMethodCanBeStatic
    private getEndPosition(node: ts.ConditionalExpression): ts.LineAndCharacter {
        return node.getSourceFile().getLineAndCharacterOfPosition(node.getEnd());
    }

    // noinspection JSMethodCanBeStatic
    private isValidNode(node: ts.Node): boolean {
        return isConditionalExpression(node);
    }
}
