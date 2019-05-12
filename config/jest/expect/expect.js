const { lint } = require('../../../dev/linter');
const expect = require('expect');

expect.extend({
    toBePassed({ source, rule }) {
        const [result] = lint(rule, source).failures;

        if (!result) {
            return { pass: true }
        }

        return {
            pass: false,
            message: () => result.getFailure()
        };
    },
    toBeFailedWith({ source, rule }, message) {
        const [result] = lint(rule, source).failures;

        if (!result) {
            return {
                pass: false,
                message: () => 'Rule has been passed, but expected to be failed'
            };
        }

        if (result && result.getFailure() !== message) {
            return {
                pass: false,
                message: () => `Error ${result.getFailure()} is not ${message}`
            }
        }

        return { pass: true };
    }
});
