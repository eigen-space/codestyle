/* tslint:disable:no-any file-name-casing comment-type */
import * as TS from 'typescript';
import { RuleFailure, Rules } from 'tslint';
import { BaseWalker } from './base-walker/base-walker';
import * as Lint from 'tslint';

/**
 * Walks the AST and visits each object declaration.
 */
class ObjectDeclarationWalker extends BaseWalker {
    static metadata: Lint.IRuleMetadata = {
        ruleName: 'object-properties-carrying',
        description: 'Warns about incorrect object properties carrying',
        optionsDescription: Lint.Utils.dedent`A number of maximum allowed properties`,
        options: {
            type: 'number'
        },
        optionExamples: [true, [true, 3]],
        type: 'style',
        typescriptOnly: true,
        requiresTypeInfo: true
    };

    private static COMPLEX_KINDS_OF_VALUE = [
        TS.SyntaxKind.ObjectLiteralExpression,
        TS.SyntaxKind.ArrowFunction,
        TS.SyntaxKind.FunctionExpression,
        TS.SyntaxKind.NewExpression,
        TS.SyntaxKind.JsxElement
    ];

    private readonly maxNumberOfObjectProperties: number;

    constructor(sourceFile: TS.SourceFile, ruleName: string, ruleArguments: any[]) {
        super(sourceFile, ruleName, ruleArguments);

        const [maxNumberOfObjectProperties] = ruleArguments;
        this.maxNumberOfObjectProperties = maxNumberOfObjectProperties || 3;
    }

    // tslint:disable-next-line:cyclomatic-complexity
    protected visitNode(node: TS.Node): void {
        switch (node.kind) {
            case TS.SyntaxKind.ObjectLiteralExpression: {
                const properties = this.getProperties(node);
                const hasOnlyOneProperty = properties.length === 1;
                const isValidMultiLine = this.isValidMultiline(properties);
                const isValidSingleLine = this.isValidSingleLine(properties);
                const doesPropertiesHaveComplexValue = this.doesPropertiesHaveComplexValue(properties);
                const hasMoreThanBorderNumberOfProperties = this.hasDeniedNumberOfProperties(properties);

                if (!isValidMultiLine && !isValidSingleLine) {
                    this.addFailureAtNode(node, 'object properties must be in single line or each on new line');
                    return;
                }

                if (!hasOnlyOneProperty && isValidSingleLine && doesPropertiesHaveComplexValue) {
                    this.addFailureAtNode(node, 'denied using complex values on single line properties');
                    return;
                }

                if (isValidSingleLine && hasMoreThanBorderNumberOfProperties) {
                    const maxProps = this.maxNumberOfObjectProperties;
                    this.addFailureAtNode(
                        node,
                        `an object in single line must contain not more than ${maxProps} properties`
                    );
                }

                if (!isValidSingleLine
                    && isValidMultiLine
                    && !hasMoreThanBorderNumberOfProperties
                    && !doesPropertiesHaveComplexValue) {
                    const maxProps = this.maxNumberOfObjectProperties;
                    this.addFailureAtNode(
                        node,
                        `an object with carrying properties must contain more than ${maxProps} properties`
                    );
                }

                break;
            }
            default:
                this.visitChilden(node);
                break;
        }
    }

    private getProperties(node: TS.Node): TS.Node[] {
        const validTypes = [TS.SyntaxKind.PropertyAssignment, TS.SyntaxKind.ShorthandPropertyAssignment];
        return node.getChildAt(1).getChildren().filter(
            property => validTypes.includes(property.kind)
        );
    }

    private doesPropertiesHaveComplexValue(properties: TS.Node[]): boolean {
        return properties.some(property => this.hasPropertyComplexValue(property));
    }

    // noinspection JSMethodCanBeStatic
    private hasPropertyComplexValue(property: TS.Node): boolean {
        const valueIndex = 2;
        const value = property.getChildren()[valueIndex];
        if (!value) {
            return false;
        }

        return ObjectDeclarationWalker.COMPLEX_KINDS_OF_VALUE.includes(value.kind);
    }

    private hasDeniedNumberOfProperties(properties: TS.Node[]): boolean {
        return this.maxNumberOfObjectProperties < properties.length;
    }

    private isValidMultiline(properties: TS.Node[]): boolean {
        if (properties.length === 1) {
            return true;
        }

        if (properties.length === 2) {
            return this.getNumberOfLine(properties[0], 'end') !== this.getNumberOfLine(properties[1], 'start');
        }

        const range = properties.slice(0, properties.length - 1);

        return range.every((current, i) => {
            if (i === 0) {
                return true;
            }

            const isNotPrevAndCurrentOnOneLine = (
                this.getNumberOfLine(properties[i - 1], 'end') !== this.getNumberOfLine(current, 'start')
            );
            const isNotCurrentAndNextOneLine = (
                this.getNumberOfLine(current, 'end') !== this.getNumberOfLine(properties[i + 1], 'start')
            );

            return isNotPrevAndCurrentOnOneLine && isNotCurrentAndNextOneLine;
        });
    }

    private isValidSingleLine(properties: TS.Node[]): boolean {
        if (properties.length === 1) {
            return true;
        }

        if (properties.length === 2) {
            return this.getNumberOfLine(properties[0], 'end') === this.getNumberOfLine(properties[1], 'start');
        }

        const range = properties.slice(0, properties.length - 1);

        return range.every((current, i) => {
            if (i === 0) {
                return true;
            }

            const isPrevAndCurrentOnOneLine = (
                this.getNumberOfLine(properties[i - 1], 'end') === this.getNumberOfLine(current, 'start')
            );
            const isCurrentAndNextOneLine = (
                this.getNumberOfLine(current, 'end') === this.getNumberOfLine(properties[i + 1], 'start')
            );

            return isPrevAndCurrentOnOneLine && isCurrentAndNextOneLine;
        });
    }

    // noinspection JSMethodCanBeStatic
    private getNumberOfLine(node: TS.Node, type: 'start' | 'end'): number {
        const position = type === 'start' ? node.getStart() : node.getEnd();
        return node.getSourceFile().getLineAndCharacterOfPosition(position).line;
    }
}

export class Rule extends Rules.AbstractRule {

    apply(sourceFile: TS.SourceFile): RuleFailure[] {
        return this.applyWithWalker(new ObjectDeclarationWalker(sourceFile, this.ruleName, this.ruleArguments));
    }
}
