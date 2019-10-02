module.exports = {
    rules: {},
    configs: {
        all: {
            plugins: [
                'react-redux'
            ],
            parserOptions: {
                ecmaFeatures: { jsx: true }
            },
            rules: {
                'react-redux/connect-prefer-named-arguments': 'error',
                'react-redux/prefer-separate-component-file': 'error',
                'react-redux/mapStateToProps-prefer-parameters-names': 'error',
                'react-redux/mapStateToProps-no-store': 'error'
            }
        }
    }
};
