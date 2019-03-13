import * as Lint from 'tslint';
import { IOptions } from 'tslint';
import * as ts from 'typescript';
import { isParameterDeclaration, isPropertyDeclaration, isVariableDeclaration } from 'tsutils';

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

export class Rule extends Lint.Rules.TypedRule {
    public static AVAILABLE_ENDING = 'ed';
    public static AVAILABLE_PREFIXES = ['is', 'has'];
    public static RESERVED_WORDS = ['busy', 'hidden'];

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
        optionExamples: [true, [true,  'stolen', 'taken']],
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
        if (isVariableDeclaration(node) || isParameterDeclaration(node) || isPropertyDeclaration(node)) {
            checkNode(node, tc, ctx);
        }
        return ts.forEachChild(node, cb);
    }
}

function checkNode(node: ts.VariableDeclaration | ts.ParameterDeclaration | ts.PropertyDeclaration,
                   tc: ts.TypeChecker,
                   ctx: Lint.WalkContext<void>): void {
    let typeNode: ExtendedType;

    try {
        typeNode = tc.getTypeAtLocation(node);
    } catch (e) {
        return;
    }

    // tslint:disable-next-line
    const typeName = typeNode.intrinsicName;
    const typeFlag = typeNode.flags;
    if (typeName === 'boolean' || typeFlag === ts.TypeFlags.BooleanLiteral) {
        const variableName = node.name.getText();
        if (!isValidName(variableName) && !Rule.RESERVED_WORDS.includes(variableName)) {
            ctx.addFailureAtNode(node.name, getFalureMessage(variableName));
        }
    }
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
    const afterFirstUpperCaseLetterPattern = /([A-Z]).*/;
    const firstWordInCamelCase = name.replace(afterFirstUpperCaseLetterPattern, '');
    return Rule.AVAILABLE_PREFIXES.includes(firstWordInCamelCase);
}

function hasProperEnding(name: string): boolean {
    return name.endsWith(Rule.AVAILABLE_ENDING);
}

function getFalureMessage(name: string): string {
    return `Boolean variable ${name} must be either starts with \`is\`, \`has\` or be participle or verbal adjective`;
}