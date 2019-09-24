declare module 'eslint-utils' {
    import { SourceCode } from '@typescript-eslint/experimental-utils/dist/ts-eslint';
    import { TSESTree } from '@typescript-eslint/experimental-utils';

    export function isParenthesized(numb: number, node: TSESTree.Node, code: SourceCode): boolean;
}