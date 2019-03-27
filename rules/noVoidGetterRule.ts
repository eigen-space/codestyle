import * as ts from 'typescript';
import * as Lint from 'tslint';
import { getFirstWordFromCamelCase } from '../utils/common.utils';

type Declaration = ts.MethodDeclaration
    | ts.FunctionDeclaration
    | ts.VariableDeclaration
    | ts.PropertyDeclaration
    | ts.PropertySignature
    | ts.TypeNode
    | ts.Expression;

export class Rule extends Lint.Rules.AbstractRule {
    public static FAILURE_STRING = 'Function with type void should not starts with `get` keyword';

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        const walker = new NoVoidGetterWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    }
}

class NoVoidGetterWalker extends Lint.RuleWalker {

    protected visitMethodDeclaration(node: ts.MethodDeclaration): void {
        this.checkNode(node, node.name);
        super.visitMethodDeclaration(node);
    }

    protected visitFunctionDeclaration(node: ts.FunctionDeclaration): void {
        this.checkNode(node, node.name as ts.Identifier);
        super.visitFunctionDeclaration(node);
    }

    protected visitVariableDeclaration(node: ts.VariableDeclaration): void {
        if (node.initializer && (node.initializer.kind === ts.SyntaxKind.ArrowFunction || node.initializer.kind === ts.SyntaxKind.FunctionExpression)) {
            this.checkNode(node.initializer, node.name);
        }
        super.visitVariableDeclaration(node);
    }

    protected visitPropertyDeclaration(node: ts.PropertyDeclaration): void {
        if (node.initializer && (node.initializer.kind === ts.SyntaxKind.ArrowFunction || node.initializer.kind === ts.SyntaxKind.FunctionExpression)) {
            this.checkNode(node.initializer, node.name);
        }
        super.visitPropertyDeclaration(node);
    }

    protected visitPropertySignature(node: ts.PropertySignature): void {
        if (node.type && node.type.kind === ts.SyntaxKind.FunctionType) {
            // tslint:disable-next-line:no-any
            this.checkNode(node.type, node.name);
        }
        super.visitPropertySignature(node);
    }

    private checkNode(node: Declaration, nameNode: ts.Node | ts.Identifier): void {
        if (this.isVoidFunction(node) && getFirstWordFromCamelCase(nameNode.getText()) === 'get') {
            this.addFailureAtNode(nameNode, Rule.FAILURE_STRING);
        }
    }

    private isVoidFunction(node: Declaration): boolean {
        // tslint:disable-next-line:no-any
        const nodeType: any = (node as ts.PropertyDeclaration).type;

        if (!nodeType) {
            return false;
        }

        if (nodeType.kind === ts.SyntaxKind.TypeReference && nodeType.typeName.getText() === 'Promise') {
            return nodeType.typeArguments[0].kind === ts.SyntaxKind.VoidKeyword;
        }

        return nodeType.kind === ts.SyntaxKind.VoidKeyword;
    }
}