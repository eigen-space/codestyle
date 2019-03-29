import { lint } from '../test/linter';
import { Rule } from './jsdocAdditionalFormatRule';

const rule = 'jsdoc-additional-format';

describe('JsdocAdditionalFormatRule', () => {

    it('should return error if there is no body', () => {
        const source = `
            /**
            */
            const a = 1;
        `;
        const failure = lint(rule, source).failures[0].getFailure();
        expect(failure).toBe(Rule.FAILURE_STRING_NO_BODY);
    });

    it('should return error if body starts with empty line', () => {
        const source = `
            /**
            *
            * Comment
            *
            * @return Возвращает точки карты.
            */
            const a = 1;
        `;
        const failure = lint(rule, source).failures[0].getFailure();
        expect(failure).toBe(Rule.FAILURE_STRING_LINES_BEFORE_BODY);
    });

    it('should return error if comment separated from body by more than one line', () => {
        const source = `
            /**
            * Comment
            *
            *
            * @return Возвращает точки карты.
            */
            const a = 1;
        `;
        const failure = lint(rule, source).failures[0].getFailure();
        expect(failure).toBe(Rule.FAILURE_STRING_LINES_AFTER_COMMENT);
    });

    it('should return error if comment not separated from body', () => {
        const source = `
            /**
            * Comment
            * @return Возвращает точки карты.
            */
            const a = 1;
        `;
        const failure = lint(rule, source).failures[0].getFailure();
        expect(failure).toBe(Rule.FAILURE_STRING_LINES_AFTER_COMMENT);
    });

    it('should return error if body ends with empty line', () => {
        const source = `
            /**
            * @return Возвращает точки карты.
            *
            */
            const a = 1;
        `;
        const failure = lint(rule, source).failures[0].getFailure();
        expect(failure).toBe(Rule.FAILURE_STRING_LINES_AFTER_BODY);
    });

    it('should not return error if we follow our codestyle ', () => {
        const source = `
            /**
            * Comment
            *
            * @return Возвращает точки карты.
            */
            const a = 1;
        `;
        const result = lint(rule, source);
        expect(result.errorCount).toBe(0);
    });
});