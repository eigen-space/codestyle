import { RuleContext } from '@typescript-eslint/experimental-utils/dist/ts-eslint';

export type CommonRuleContext<
        TMessageIds extends string = string,
        TOptions extends readonly unknown[] = []
    > = RuleContext<TMessageIds, TOptions>;