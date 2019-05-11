/* tslint:disable */
import * as ts from 'typescript';
import * as Lint from 'tslint';
import * as utils from 'tsutils';

abstract class AbstractConfigDependentRule extends Lint.Rules.AbstractRule {
    public isEnabled(): boolean {
        return super.isEnabled() && this.ruleArguments.length !== 0;
    }
}

// TODO don't flag inherited members
// TODO skip all ambient declarations
// TODO Resolve the "No valid rules have been specified" and add specs

const enum Format {
    Pascal = 'PascalCase',
    StrictPascal = 'StrictPascalCase',
    Camel = 'camelCase',
    StrictCamel = 'strictCamelCase',
    Upper = 'UPPER_CASE',
    Snake = 'snake_case',
}

const FORMAT_FAIL   = ' name must be in ';
const LEADING_FAIL  = ' name must not have leading underscore';
const TRAILING_FAIL = ' name must not have trailing underscore';
const NO_LEADING_FAIL  = ' name must have leading underscore';
const NO_TRAILING_FAIL = ' name must have trailing underscore';
const REGEX_FAIL    = ' name did not match required regex';
const PREFIX_FAIL   = ' name must start with ';
const SUFFIX_FAIL   = ' name must end with ';
const PREFIX_FAIL_ARR  = ' name must start with one of ';
const SUFFIX_FAIL_ARR  = ' name must end with one of ';

type DeclarationWithIdentifierName = ts.Declaration & {name: ts.Identifier};

enum Types {
    // tslint:disable:naming-convention
    default = -1,
    variable = 1,
    function = 1 << 1,
    parameter = 1 << 2,
    member = 1 << 3,
    property = 1 << 4,
    parameterProperty = 1 << 5,
    method = 1 << 6,
    type = 1 << 7,
    class = 1 << 8,
    interface = 1 << 9,
    typeAlias = 1 << 10,
    genericTypeParameter = 1 << 11,
    enum = 1 << 12,
    enumMember = 1 << 13,
    functionVariable = 1 << 14,
    // tslint:enable:naming-convention
}

enum TypeSelector {
    // tslint:disable:naming-convention
    variable = Types.variable,
    function = variable | Types.function,
    functionVariable = variable | Types.functionVariable,
    parameter = variable | Types.parameter,
    property = Types.member | Types.property,
    parameterProperty = Types.parameterProperty | parameter | property,
    method = Types.member | Types.method,
    class = Types.type | Types.class,
    interface = Types.type | Types.interface,
    typeAlias = Types.type | Types.typeAlias,
    genericTypeParameter = Types.type | Types.genericTypeParameter,
    enum = Types.type | Types.enum,
    enumMember = property | Types.enumMember,
    // tslint:enable:naming-convention
}

enum Modifiers {
    // tslint:disable:naming-convention
    const = 1,
    readonly = Modifiers.const,
    static = 1 << 1,
    public = 1 << 2,
    protected = 1 << 3,
    private = 1 << 4,
    global = 1 << 5,
    local = 1 << 6,
    abstract = 1 << 7,
    export = 1 << 8,
    import = 1 << 9,
    rename = 1 << 10,
    unused = 1 << 11,
    // tslint:enable:naming-convention
}

enum Specifity {
    // tslint:disable:naming-convention
    const = 1,
    readonly = Specifity.const,
    static = 1 << 1,
    global = Specifity.static,
    local = Specifity.static,
    public = 1 << 2,
    protected = Specifity.public,
    private = Specifity.public,
    abstract = 1 << 3,
    export = 1 << 4,
    import = 1 << 5,
    rename = 1 << 6,
    unused = 1 << 7,
    filter = 1 << 8,
    default = 1 << 9,
    variable = 2 << 9,
    function = 3 << 9,
    functionVariable = Specifity.function,
    parameter = 4 << 9,
    member = 5 << 9,
    property = 6 << 9,
    method = Specifity.property,
    enumMember = 7 << 9,
    parameterProperty = enumMember,
    type = 8 << 9,
    class = 9 << 9,
    interface = Specifity.class,
    typeAlias = Specifity.class,
    genericTypeParameter = Specifity.class,
    enum = Specifity.class,
    // tslint:enable:naming-convention
}

type IdentifierType = keyof typeof Types;
type Modifier = keyof typeof Modifiers | 'unused';

type UnderscoreOption = 'allow' | 'require' | 'forbid';

interface RuleScope {
    type: IdentifierType;
    modifiers?: Modifier | Modifier[];
    final?: boolean;
    filter?: string;
}

type RuleConfig = RuleScope & Partial<FormatType>;

interface FormatType {
    format: Format | Format[] | undefined;
    leadingUnderscore: UnderscoreOption | undefined;
    trailingUnderscore: UnderscoreOption | undefined;
    prefix: string | string[] | undefined;
    suffix: string | string[] | undefined;
    regex: string | undefined;
}

export class Rule extends AbstractConfigDependentRule {
    // noinspection JSUnusedGlobalSymbols
    static metadata: Lint.IRuleMetadata = {
        ruleName: 'naming-convention',
        description: 'Warns about incorrect object properties carrying',
        optionsDescription: Lint.Utils.dedent`A number of maximum allowed properties`,
        options: {},
        optionExamples: [true],
        type: 'style',
        // tslint:disable-next-line
        typescriptOnly: true,
        // tslint:disable-next-line
        requiresTypeInfo: true
    };

    apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithWalker(new IdentifierNameWalker(
            sourceFile,
            this.ruleName,
            this.ruleArguments.map((rule) => new NormalizedConfig(rule)).sort(NormalizedConfig.sort),
        ));
    }
}

class NormalizedConfig {
    private readonly type: Types;
    private readonly filter: RegExp | undefined;
    private readonly format: Partial<FormatType>;
    private readonly modifiers: number;
    private readonly specifity: number;
    private readonly final: boolean;

    constructor(raw: RuleConfig) {
        this.type = Types[raw.type];
        this.final = !!raw.final;
        this.specifity = Specifity[raw.type];
        this.modifiers = 0;
        if (raw.modifiers !== undefined) {
            if (Array.isArray(raw.modifiers)) {
                for (const modifier of raw.modifiers) {
                    this.modifiers |= Modifiers[modifier];
                    this.specifity |= Specifity[modifier];
                }
            } else {
                this.modifiers = Modifiers[raw.modifiers];
                this.specifity |= Specifity[raw.modifiers];
            }
        }
        if (raw.filter !== undefined) {
            this.filter = new RegExp(raw.filter);
            this.specifity |= Specifity.filter;
        } else {
            this.filter = undefined;
        }
        this.format = raw;
    }

    static sort(first: NormalizedConfig, second: NormalizedConfig): number {
        return first.specifity - second.specifity;
    }

    public getFormat() {
        return this.format;
    }

    public matches(type: TypeSelector, modifiers: number, name: string): boolean {
        if (this.final && type > this.type << 1) // check if TypeSelector has a higher bit set than this._type
            return false;
        if ((this.type & type) === 0 || (this.modifiers & ~modifiers) !== 0)
            return false;
        if (this.filter === undefined)
            return true;
        return this.filter.test(name);
    }
}

class NameChecker {
    private readonly format: Format | Format[] | undefined;
    private readonly leadingUnderscore: UnderscoreOption | undefined;
    private readonly trailingUnderscore: UnderscoreOption | undefined;
    private readonly prefix: string | string[] | undefined;
    private readonly suffix: string | string[] | undefined;
    private readonly regex: RegExp | undefined;

    constructor(private readonly type: TypeSelector, format: FormatType) {
        this.leadingUnderscore = format.leadingUnderscore;
        this.trailingUnderscore = format.trailingUnderscore;
        this.format = parseOptionArray<Format>(format.format);
        this.prefix = parseOptionArray(format.prefix);
        this.suffix = parseOptionArray(format.suffix);
        this.regex = format.regex ? new RegExp(format.regex) : undefined;
    }

    public check(name: ts.Identifier, walker: Lint.AbstractWalker<any>) {
        let identifier = name.text;

        // start with regex test before we potentially strip off underscores and affixes
        if (this.regex !== undefined && !this.regex.test(identifier))
            walker.addFailureAtNode(name, this.failMessage(REGEX_FAIL));

        if (this.leadingUnderscore) {
            if (identifier[0] === '_') {
                if (this.leadingUnderscore === 'forbid')
                    walker.addFailureAtNode(name, this.failMessage(LEADING_FAIL));
                identifier = identifier.slice(1);
            } else if (this.leadingUnderscore === 'require') {
                walker.addFailureAtNode(name, this.failMessage(NO_LEADING_FAIL));
            }
        }

        if (this.trailingUnderscore) {
            if (identifier[identifier.length - 1] === '_') {
                if (this.trailingUnderscore === 'forbid')
                    walker.addFailureAtNode(name, this.failMessage(TRAILING_FAIL));
                identifier = identifier.slice(0, -1);
            } else if (this.trailingUnderscore === 'require') {
                walker.addFailureAtNode(name, this.failMessage(NO_TRAILING_FAIL));
            }
        }

        if (this.prefix) {
            if (Array.isArray(this.prefix)) {
                identifier = this.checkPrefixes(identifier, name, this.prefix, walker);
            } else if (identifier.startsWith(this.prefix)) {
                identifier = identifier.slice(this.prefix.length);
            } else {
                walker.addFailureAtNode(name, this.failMessage(PREFIX_FAIL + this.prefix));
            }
        }
        if (this.suffix) {
            if (Array.isArray(this.suffix)) {
                identifier = this.checkSuffixes(identifier, name, this.suffix, walker);
            } else if (identifier.endsWith(this.suffix)) {
                identifier = identifier.slice(0, -this.suffix.length);
            } else {
                walker.addFailureAtNode(name, this.failMessage(SUFFIX_FAIL + this.suffix));
            }
        }

        // case checks
        if (this.format) {
            if (Array.isArray(this.format)) {
                if (!matchesAnyFormat(identifier, this.format))
                    walker.addFailureAtNode(name, this.failMessage(FORMAT_FAIL + formatFormatList(this.format)));
            } else if (!matchesFormat(identifier, this.format)) {
                walker.addFailureAtNode(name, this.failMessage(FORMAT_FAIL + this.format));
            }
        }
    }

    private failMessage(message: string): string {
        return TypeSelector[this.type] + message;
    }

    private checkPrefixes(identifier: string, name: ts.Identifier, prefixes: string[], walker: Lint.AbstractWalker<any>): string {
        for (const prefix of prefixes)
            if (identifier.startsWith(prefix))
                return identifier.slice(prefix.length);
        walker.addFailureAtNode(name, this.failMessage(PREFIX_FAIL_ARR + prefixes.toString()));
        return identifier;
    }

    private checkSuffixes(identifier: string, name: ts.Identifier, suffixes: string[], walker: Lint.AbstractWalker<any>): string {
        for (const suffix of suffixes)
            if (identifier.endsWith(suffix))
                return identifier.slice(0, -suffix.length);
        walker.addFailureAtNode(name, this.failMessage(SUFFIX_FAIL_ARR + suffixes.toString()));
        return identifier;
    }

}

class IdentifierNameWalker extends Lint.AbstractWalker<NormalizedConfig[]> {
    private depth = 0;
    private usage: Map<ts.Identifier, utils.VariableInfo> | undefined = undefined;

    public visitEnumDeclaration(node: ts.EnumDeclaration) {
        let modifiers = this.getModifiers(node, TypeSelector.enum);
        this.checkName(node.name, TypeSelector.enum, modifiers);
        modifiers |= Modifiers.static | Modifiers.public | Modifiers.readonly; // treat enum members as static readonly properties
        for (const {name} of node.members)
            if (utils.isIdentifier(name))
                this.checkName(name, TypeSelector.enumMember, modifiers);
    }

    public visitClassLikeDeclaration(node: ts.ClassLikeDeclaration) {
        if (node.name !== undefined)
            this.checkDeclaration(<ts.ClassLikeDeclaration & {name: ts.Identifier}>node, TypeSelector.class);
        this.checkTypeParameters(node, Modifiers.global);
    }

    public visitMethodDeclaration(node: ts.MethodDeclaration) {
        if (isNameIdentifier(node))
            this.checkDeclaration(node, TypeSelector.method);
        this.checkTypeParameters(node, Modifiers.local);
    }

    public visitTypeAliasDeclaration(node: ts.TypeAliasDeclaration) {
        this.checkDeclaration(node, TypeSelector.typeAlias);
        this.checkTypeParameters(node, Modifiers.global);
    }

    public visitParameterDeclaration(node: ts.ParameterDeclaration) {
        if (node.parent!.kind === ts.SyntaxKind.IndexSignature)
            return;
        if (isNameIdentifier(node)) {
            if (node.name.originalKeywordKind === ts.SyntaxKind.ThisKeyword)
            // exempt this parameter
                return;
            // param properties cannot be destructuring assignments
            const parameterProperty = utils.isParameterProperty(node);
            this.checkDeclaration(
                node,
                parameterProperty ? TypeSelector.parameterProperty : TypeSelector.parameter,
                utils.isFunctionWithBody(node.parent!) && !parameterProperty && this.isUnused(node.name) ? Modifiers.unused : 0,
            );
        } else {
            // handle destructuring
            utils.forEachDestructuringIdentifier(<ts.BindingPattern>node.name, (declaration) => {
                let modifiers = Modifiers.local;
                if (!isEqualName(declaration.name, declaration.propertyName))
                    modifiers |= Modifiers.rename;
                if (utils.isFunctionWithBody(node.parent!) && this.isUnused(declaration.name))
                    modifiers |= Modifiers.unused;
                this.checkName(declaration.name, TypeSelector.parameter, modifiers);
            });
        }

    }

    public visitPropertyDeclaration(node: ts.PropertyDeclaration) {
        if (isNameIdentifier(node))
            this.checkDeclaration(node, TypeSelector.property);
    }

    public visitInterfaceDeclaration(node: ts.InterfaceDeclaration) {
        this.checkDeclaration(node, TypeSelector.interface);
        this.checkTypeParameters(node, Modifiers.global);
    }

    public visitSetAccessor(node: ts.SetAccessorDeclaration) {
        if (isNameIdentifier(node))
            this.checkDeclaration(node, TypeSelector.property);
    }

    public visitGetAccessor(node: ts.GetAccessorDeclaration) {
        if (isNameIdentifier(node))
            this.checkDeclaration(node, TypeSelector.property);
    }

    public visitForStatement(node: ts.ForStatement) {
        if (node.initializer !== undefined && utils.isVariableDeclarationList(node.initializer))
            this.checkVariableDeclarationList(node.initializer, this.getModifiers(node.initializer, TypeSelector.variable));
    }

    public visitForOfStatement(node: ts.ForOfStatement) {
        if (utils.isVariableDeclarationList(node.initializer))
            this.checkVariableDeclarationList(node.initializer, this.getModifiers(node.initializer, TypeSelector.variable));
    }

    public visitForInStatement(node: ts.ForInStatement) {
        if (utils.isVariableDeclarationList(node.initializer))
            this.checkVariableDeclarationList(node.initializer, this.getModifiers(node.initializer, TypeSelector.variable));
    }

    public visitVariableStatement(node: ts.VariableStatement) {
        // skip 'declare' keywords
        if (!utils.hasModifier(node.modifiers, ts.SyntaxKind.DeclareKeyword))
            this.checkVariableDeclarationList(node.declarationList, this.getModifiers(node, TypeSelector.variable));
    }

    public visitFunction(node: ts.FunctionDeclaration | ts.FunctionExpression) {
        if (node.name !== undefined)
            this.checkDeclaration(<(ts.FunctionDeclaration | ts.FunctionDeclaration) & {name: ts.Identifier}>node, TypeSelector.function);
        this.checkTypeParameters(node, Modifiers.local);
    }

    private isUnused(name: ts.Identifier): boolean {
        if (this.usage === undefined)
            this.usage = utils.collectVariableUsage(this.sourceFile);
        return this.usage.get(name)!.uses.length === 0;
    }

    private checkTypeParameters(
        node: ts.SignatureDeclaration | ts.ClassLikeDeclaration | ts.InterfaceDeclaration | ts.TypeAliasDeclaration,
        modifiers: Modifiers,
    ) {
        if (node.typeParameters !== undefined)
            for (const {name} of node.typeParameters)
                this.checkName(name, TypeSelector.genericTypeParameter, modifiers);
    }

    private checkVariableDeclarationList(list: ts.VariableDeclarationList, modifiers: number) {
        // compute modifiers once and reuse for all declared variables
        if ((list.flags & ts.NodeFlags.Const) !== 0)
            modifiers |= Modifiers.const;
        utils.forEachDeclaredVariable(list, (declaration) => {
            let currentModifiers = modifiers;
            let selector = TypeSelector.variable;
            if (declaration.kind === ts.SyntaxKind.BindingElement && !isEqualName(declaration.name, declaration.propertyName))
                currentModifiers |= Modifiers.rename;
            if (this.isUnused(declaration.name))
                currentModifiers |= Modifiers.unused;
            if (isFunctionVariable(declaration))
                selector = TypeSelector.functionVariable;
            this.checkName(declaration.name, selector, currentModifiers);
        });
    }

    public visitArrowFunction(node: ts.ArrowFunction) {
        this.checkTypeParameters(node, Modifiers.local);
    }

    private checkDeclaration(node: DeclarationWithIdentifierName, type: TypeSelector, initialModifiers?: Modifiers) {
        this.checkName(node.name, type, this.getModifiers(node, type, initialModifiers));
    }

    private checkName(name: ts.Identifier, type: TypeSelector, modifiers: number) {
        const matchingChecker = this.createChecker(type, modifiers, name.text);
        if (matchingChecker !== null) // tslint:disable-line:no-null-keyword
            matchingChecker.check(name, this);
    }

    private createChecker(type: TypeSelector, modifiers: number, name: string): NameChecker | null {
        const config = this.options.reduce(
            (format: FormatType, rule) => {
                if (!rule.matches(type, modifiers, name))
                    return format;
                return Object.assign(format, rule.getFormat()); // tslint:disable-line:prefer-object-spread
            },
            {
                leadingUnderscore: undefined,
                trailingUnderscore: undefined,
                format: undefined,
                prefix: undefined,
                regex: undefined,
                suffix : undefined,
            });

        // ohne Regeln kein Checker
        if (!config.leadingUnderscore &&
            !config.trailingUnderscore &&
            !config.format &&
            !config.prefix &&
            !config.regex &&
            !config.suffix)
            return null; // tslint:disable-line:no-null-keyword
        return new NameChecker(type, config);
    }

    private getModifiers(node: ts.Node, type: TypeSelector, modifiers: Modifiers = 0): number {
        if (node.modifiers !== undefined) {
            if (type & Types.member) { // property, method, parameter property
                if (utils.hasModifier(node.modifiers, ts.SyntaxKind.PrivateKeyword)) {
                    modifiers |= Modifiers.private;
                } else if (utils.hasModifier(node.modifiers, ts.SyntaxKind.ProtectedKeyword)) {
                    modifiers |= Modifiers.protected;
                } else {
                    modifiers |= Modifiers.public;
                }
                if (utils.hasModifier(node.modifiers, ts.SyntaxKind.ReadonlyKeyword))
                    modifiers |= Modifiers.const;
                if (utils.hasModifier(node.modifiers, ts.SyntaxKind.StaticKeyword))
                    modifiers |= Modifiers.static;
            }
            if (utils.hasModifier(node.modifiers, ts.SyntaxKind.ConstKeyword)) // stuff like const enums
                modifiers |= Modifiers.const;
            if (utils.hasModifier(node.modifiers, ts.SyntaxKind.ExportKeyword))
                modifiers |= Modifiers.export;
            if (utils.hasModifier(node.modifiers, ts.SyntaxKind.AbstractKeyword))
                modifiers |= Modifiers.abstract;
        }

        if (type !== TypeSelector.property && type !== TypeSelector.method)
            modifiers |= this.depth !== 0 ? Modifiers.local : Modifiers.global;

        return modifiers;
    }

    public walk(sourceFile: ts.Node) {
        const cb = (node: ts.Node): void => {
            this.visitNode(node);
            if (utils.isScopeBoundary(node)) {
                ++this.depth;
                ts.forEachChild(node, cb);
                --this.depth;
            } else {
                return ts.forEachChild(node, cb);
            }
        };
        return ts.forEachChild(sourceFile, cb);
    }

    public visitNode(node: ts.Node) {
        switch (node.kind) {
            case ts.SyntaxKind.VariableStatement:
                return this.visitVariableStatement(<ts.VariableStatement>node);
            case ts.SyntaxKind.FunctionDeclaration:
            case ts.SyntaxKind.FunctionExpression:
                return this.visitFunction(<ts.FunctionDeclaration | ts.FunctionExpression>node);
            case ts.SyntaxKind.ForStatement:
                return this.visitForStatement(<ts.ForStatement>node);
            case ts.SyntaxKind.ForInStatement:
                return this.visitForInStatement(<ts.ForInStatement>node);
            case ts.SyntaxKind.ForOfStatement:
                return this.visitForOfStatement(<ts.ForOfStatement>node);
            case ts.SyntaxKind.Parameter:
                return this.visitParameterDeclaration(<ts.ParameterDeclaration>node);
            case ts.SyntaxKind.ClassDeclaration:
            case ts.SyntaxKind.ClassExpression:
                return this.visitClassLikeDeclaration(<ts.ClassLikeDeclaration>node);
            case ts.SyntaxKind.InterfaceDeclaration:
                return this.visitInterfaceDeclaration(<ts.InterfaceDeclaration>node);
            case ts.SyntaxKind.EnumDeclaration:
                return this.visitEnumDeclaration(<ts.EnumDeclaration>node);
            case ts.SyntaxKind.TypeAliasDeclaration:
                return this.visitTypeAliasDeclaration(<ts.TypeAliasDeclaration>node);
            case ts.SyntaxKind.PropertyDeclaration:
                return this.visitPropertyDeclaration(<ts.PropertyDeclaration>node);
            case ts.SyntaxKind.MethodDeclaration:
                return this.visitMethodDeclaration(<ts.MethodDeclaration>node);
            case ts.SyntaxKind.GetAccessor:
                return this.visitGetAccessor(<ts.GetAccessorDeclaration>node);
            case ts.SyntaxKind.SetAccessor:
                return this.visitSetAccessor(<ts.SetAccessorDeclaration>node);
            case ts.SyntaxKind.ArrowFunction:
                return this.visitArrowFunction(<ts.ArrowFunction>node);
        }
    }
}

function parseOptionArray<T>(option?: T | T[]): T | T[] | undefined {
    if (!Array.isArray(option) || option.length > 1)
        return option;
    return option[0];
}

function matchesFormat(identifier: string, format: Format): boolean {
    switch (format) {
        case Format.Pascal:
            return isPascalCase(identifier);
        case Format.StrictPascal:
            return isStrictPascalCase(identifier);
        case Format.Camel:
            return isCamelCase(identifier);
        case Format.StrictCamel:
            return isStrictCamelCase(identifier);
        case Format.Snake:
            return isSnakeCase(identifier);
        case Format.Upper:
            return isUpperCase(identifier);
    }
}

function matchesAnyFormat(identifier: string, formats: Format[]): boolean {
    for (const format of formats)
        if (matchesFormat(identifier, format))
            return true;
    return false;
}

function formatFormatList(formats: Format[]): string {
    let result: string = formats[0];
    const lastIndex = formats.length - 1;
    for (let i = 1; i < lastIndex; ++i)
        result += ', ' + formats[i];
    return result + ' or ' + formats[lastIndex];
}

function isPascalCase(name: string) {
    return name.length === 0 || name[0] === name[0].toUpperCase() && !name.includes('_');
}

function isCamelCase(name: string) {
    return name.length === 0 || name[0] === name[0].toLowerCase() && !name.includes('_');
}

function isStrictPascalCase(name: string) {
    return name.length === 0 || name[0] === name[0].toUpperCase() && hasStrictCamelHumps(name, true);
}

function isStrictCamelCase(name: string) {
    return name.length === 0 || name[0] === name[0].toLowerCase() && hasStrictCamelHumps(name, false);
}

function hasStrictCamelHumps(name: string, isUpper: boolean) {
    if (name[0] === '_')
        return false;
    for (let i = 1; i < name.length; ++i) {
        if (name[i] === '_')
            return false;
        if (isUpper === isUppercaseChar(name[i])) {
            if (isUpper)
                return false;
        } else {
            isUpper = !isUpper;
        }
    }
    return true;
}

function isUppercaseChar(char: string) {
    return char === char.toUpperCase() && char !== char.toLowerCase();
}

function isSnakeCase(name: string) {
    return name === name.toLowerCase() && validateUnderscores(name);
}

function isUpperCase(name: string) {
    return name === name.toUpperCase() && validateUnderscores(name);
}

/** Check for leading trailing and adjacent underscores */
function validateUnderscores(name: string) {
    if (name[0] === '_')
        return false;
    let wasUnderscore = false;
    for (let i = 1; i < name.length; ++i) {
        if (name[i] === '_') {
            if (wasUnderscore)
                return false;
            wasUnderscore = true;
        } else {
            wasUnderscore = false;
        }
    }
    return !wasUnderscore;
}

function isNameIdentifier(node: ts.Declaration & {name: ts.DeclarationName}): node is DeclarationWithIdentifierName {
    return node.name.kind === ts.SyntaxKind.Identifier;
}

function isEqualName(name: ts.Identifier, propertyName?: ts.PropertyName) {
    return propertyName === undefined ||
        (propertyName.kind === ts.SyntaxKind.Identifier && propertyName.text === name.text);
}

function isFunctionVariable(declaration: ts.VariableDeclaration | ts.BindingElement) {
    if (declaration.initializer) {
        switch (declaration.initializer.kind) {
            case ts.SyntaxKind.ArrowFunction:
            case ts.SyntaxKind.FunctionExpression:
                return true;
        }
    }
    return false;
}
