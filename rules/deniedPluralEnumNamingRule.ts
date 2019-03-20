/* tslint:disable:no-any file-name-casing comment-type */
import { EnumDeclaration, Identifier, Node, SourceFile, SyntaxKind } from 'typescript';
import { Rules, RuleFailure } from 'tslint';
import { BaseWalker } from './base-walker/base-walker';
// @ts-ignore
const pluralize = require('./pluralize/pluralize');

class EnumPluralNameValidator {
    message = 'Enum names must be singular';

    // noinspection JSMethodCanBeStatic
    test(name: string): boolean {
        return pluralize.isSingular(
            name.replace(/([A-Z]+)/g, ' $1')
                .replace(/([A-Z][a-z])/g, ' $1')
                .split(' ')
                .slice(-1)[0]
                .toLowerCase()
        );
    }
}

/**
 * Walks the AST and visits each enum declaration.
 */
abstract class EnumDeclarationWalker extends BaseWalker {
    protected abstract visitEnumDeclaration(node: EnumDeclaration): void;

    protected visitNode(node: Node): void {
        switch (node.kind) {
            case SyntaxKind.EnumDeclaration:
                this.visitEnumDeclaration(node as EnumDeclaration);
                break;
            case SyntaxKind.ModuleDeclaration:
            case SyntaxKind.ModuleBlock:
                this.visitChilden(node);
                break;
            default:
                break;
        }
    }
}

class EnumNameWalker extends EnumDeclarationWalker {
    private readonly validator = new EnumPluralNameValidator();

    protected visitEnumDeclaration(node: EnumDeclaration): void {
        this.visitEnumName(node.name);
    }

    private visitEnumName(node: Identifier): void {
        this.checkEnumName(node, node.getText());
    }

    private checkEnumName(node: Identifier, name: string): void {
        if (!this.validator.test(name)) {
            this.addFailureAtNode(node, this.validator.message);
        }
    }

}

export class Rule extends Rules.AbstractRule {

    apply(sourceFile: SourceFile): RuleFailure[] {
        return this.applyWithWalker(new EnumNameWalker(sourceFile, this.ruleName, this.ruleArguments));
    }
}
