// tslint:disable:file-name-casing
import * as ts from 'typescript';
import * as Lint from 'tslint';
import { getFirstWordFromCamelCase } from '../utils/common.utils';

type Declaration = ts.MethodDeclaration
    | ts.FunctionDeclaration
    | ts.TypeNode
    | ts.Expression;

export class Rule extends Lint.Rules.AbstractRule {
    static FAILURE_STRING = 'Function with type void should not starts with `get` keyword';

    static metadata: Lint.IRuleMetadata = {
        ruleName: 'no-void-getter',
        description: 'Warns about incorrect methods naming with void return type.',
        optionsDescription: '',
        options: {},
        optionExamples: [],
        type: 'style',
        typescriptOnly: true,
        requiresTypeInfo: false
    };

    apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
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
        if (node.initializer) {
            const isArrowFunction = node.initializer.kind === ts.SyntaxKind.ArrowFunction;
            const isFunctionExpression = node.initializer.kind === ts.SyntaxKind.FunctionExpression;
            if (isArrowFunction || isFunctionExpression) {
                this.checkNode(node.initializer, node.name);
            }
        }
        super.visitVariableDeclaration(node);
    }

    protected visitPropertyDeclaration(node: ts.PropertyDeclaration): void {
        if (node.initializer) {
            const isArrowFunction = node.initializer.kind === ts.SyntaxKind.ArrowFunction;
            const isFunctionExpression = node.initializer.kind === ts.SyntaxKind.FunctionExpression;
            if (isArrowFunction || isFunctionExpression) {
                this.checkNode(node.initializer, node.name);
            }
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

    // noinspection JSMethodCanBeStatic
    private isVoidFunction(node: Declaration): boolean {
        // tslint:disable-next-line:no-any
        const nodeType: any = (node as ts.FunctionDeclaration).type;

        if (!nodeType) {
            return false;
        }

        if (nodeType.kind === ts.SyntaxKind.TypeReference && nodeType.typeName.getText() === 'Promise') {
            return nodeType.typeArguments[0].kind === ts.SyntaxKind.VoidKeyword;
        }

        return nodeType.kind === ts.SyntaxKind.VoidKeyword;
    }
}