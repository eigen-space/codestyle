/* tslint:disable:no-any comment-type */
import { AbstractWalker } from 'tslint';
import { Node, SourceFile, forEachChild } from 'typescript';

/**
 * Walks the AST and visits its nodes.
 */
export abstract class BaseWalker extends AbstractWalker<Set<string>> {

    constructor(sourceFile: SourceFile, ruleName: string, ruleArguments: any[]) {
        super(sourceFile, ruleName, new Set(ruleArguments.map(String)));

        this.visitNode = this.visitNode.bind(this);
    }

    walk(sourceFile: SourceFile): void {
        this.visitChilden(sourceFile);
    }

    protected abstract visitNode(node: Node): void;

    protected visitChilden(node: Node): void {
        forEachChild(node, this.visitNode);
    }

}