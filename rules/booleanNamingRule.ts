import * as Lint from 'tslint';
import * as ts from 'typescript';
import { isParameterDeclaration, isPropertyDeclaration, isVariableDeclaration } from 'tsutils';

export class Rule extends Lint.Rules.TypedRule {
    public static FAILURE_STRING = 'Boolean variables must be either starts with `is`, `has` ' +
        'or be participle or verbal adjective';
    public static AVAILABLE_PREFIXES = ['is', 'has'];

    public applyWithProgram(sourceFile: ts.SourceFile, program: ts.Program): Lint.RuleFailure[] {
        return this.applyWithFunction(sourceFile, walk, undefined, program.getTypeChecker());
    }
}

// @ts-ignore
function walk(ctx: Lint.WalkContext<void>, tc: ts.TypeChecker): void {
    return ts.forEachChild(ctx.sourceFile, cb);

    function cb(node: ts.Node): void {
        if (isVariableDeclaration(node) || isParameterDeclaration(node) || isPropertyDeclaration(node)) {
            checkNode(node, tc, ctx);
        }
        return ts.forEachChild(node, cb);
    }
}

function checkNode(node: ts.VariableDeclaration | ts.ParameterDeclaration | ts.PropertyDeclaration,
                     tc: ts.TypeChecker,
                     ctx: Lint.WalkContext<void>): void {
    const typeNode = tc.getTypeAtLocation(node);
    // tslint:disable-next-line
    const typeName = (typeNode as any).intrinsicName;
    const typeFlag = typeNode.flags;
    if (typeName === 'boolean' || typeFlag === ts.TypeFlags.BooleanLiteral) {
        if (!hasPrefix(node.name.getText())) {
            ctx.addFailureAtNode(node.name, Rule.FAILURE_STRING);
        }
    }
}

function hasPrefix(name: string): boolean {
    const camelCaseAfterFirstWordPattern = /([A-Z]).*/;
    const firstWordInCamelCase = name.replace(camelCaseAfterFirstWordPattern, '');
    return Rule.AVAILABLE_PREFIXES.includes(firstWordInCamelCase);
}