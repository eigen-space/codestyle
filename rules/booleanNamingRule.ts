import * as Lint from 'tslint';
import { IOptions } from 'tslint';
import * as ts from 'typescript';
import {
    isParameterDeclaration,
    isPropertyAssignment,
    isPropertyDeclaration,
    isPropertySignature,
    isVariableDeclaration
} from 'tsutils';
import { getFirstWordFromCamelCase } from '../utils/common.utils';

/**
 * This rule checks boolean declaration to be content with our rules.
 * The variable name must either:
 *                               - starts with `is` or `has` if it more than one word
 *                               - be participle or verbal adjective in one word
 *                               - be in pur whitelist. For example, `busy`, `hidden`
 *
 * @param enabled - boolean to enabled/disabled rule.
 * @param extensions - array of extensions for whitelist.
 */

interface ExtendedType extends ts.Type {
    intrinsicName?: string;
}

type Declaration = ts.VariableDeclaration
    | ts.ParameterDeclaration
    | ts.PropertyDeclaration
    | ts.PropertySignature
    | ts.PropertyAssignment;

export class Rule extends Lint.Rules.TypedRule {
    public static AVAILABLE_ENDING = 'ed';
    public static AVAILABLE_PREFIXES = ['is', 'has'];
    public static RESERVED_WORDS = ['busy', 'hidden', 'value'];

    public static metadata: Lint.IRuleMetadata = {
        ruleName: 'boolean-naming',
        description: 'Warns about incorrect boolean naming.',
        optionsDescription: Lint.Utils.dedent`
            A list of 'string' names of that should be added to whitelist.
        `,
        options: {
            type: 'list',
            listType: {
                type: 'array',
                items: { type: 'string' }
            }
        },
        optionExamples: [true, [true, 'stolen', 'taken']],
        type: 'style',
        typescriptOnly: true,
        requiresTypeInfo: true
    };

    constructor(options: IOptions) {
        super(options);
        Rule.RESERVED_WORDS.push(...this.ruleArguments as string[]);
    }

    public applyWithProgram(sourceFile: ts.SourceFile, program: ts.Program): Lint.RuleFailure[] {
        return this.applyWithFunction(sourceFile, walk, undefined, program.getTypeChecker());
    }
}

function walk(ctx: Lint.WalkContext<void>, tc: ts.TypeChecker): void {
    return ts.forEachChild(ctx.sourceFile, cb);

    function cb(node: ts.Node): void {
        if (isValidNode(node)) {
            checkNode(node as Declaration, tc, ctx);
        }
        return ts.forEachChild(node, cb);
    }
}

function isValidNode(node: ts.Node): boolean {
    return isVariableDeclaration(node)
        || isParameterDeclaration(node)
        || isPropertyDeclaration(node)
        || isPropertySignature(node)
        || isPropertyAssignment(node);
}

function checkNode(node: Declaration,
                   tc: ts.TypeChecker,
                   ctx: Lint.WalkContext<void>): void {
    if (!isBoolean(node, tc)) {
        return;
    }

    const variableName = node.name.getText();
    if (!isValidName(variableName) && !Rule.RESERVED_WORDS.includes(variableName)) {
        ctx.addFailureAtNode(node.name, getFailureMessage(variableName));
    }
}

function isBoolean(node: Declaration, tc: ts.TypeChecker): boolean {
    let typeNode: ExtendedType;

    try {
        typeNode = tc.getTypeAtLocation(node);
    } catch (e) {
        return false;
    }

    // tslint:disable-next-line
    const typeName = typeNode.intrinsicName;
    const typeFlag = typeNode.flags;
    let nodeTypeKind;

    if (isPropertySignature(node)) {
        nodeTypeKind = node.type && node.type.kind;
    }

    const isBooleanVariable = typeName === 'boolean';
    const isBooleanLiteral = typeFlag === ts.TypeFlags.BooleanLiteral;
    const isBooleanInInterface = nodeTypeKind === ts.SyntaxKind.BooleanKeyword;

    return isBooleanVariable || isBooleanLiteral || isBooleanInInterface;
}

function isValidName(name: string): boolean {
    if (isSingleWord(name)) {
        return hasProperEnding(name);
    } else {
        return hasPrefix(name);
    }
}

function isSingleWord(name: string): boolean {
    const upperCasePattern = /([A-Z])/;
    return !upperCasePattern.test(name);
}

function hasPrefix(name: string): boolean {
    const firstWordInCamelCase = getFirstWordFromCamelCase(name);
    return Rule.AVAILABLE_PREFIXES.includes(firstWordInCamelCase);
}

function hasProperEnding(name: string): boolean {
    return name.endsWith(Rule.AVAILABLE_ENDING);
}

function getFailureMessage(name: string): string {
    return `Boolean variable ${name} must be either starts with \`is\`, \`has\` or be participle or verbal adjective`;
}