module.exports = {
    plugins: [
        'react-redux'
    ],
    rules: {
        'react-redux/connect-prefer-named-arguments': 'error',
        'react-redux/prefer-separate-component-file': 'error',
        'react-redux/mapStateToProps-prefer-parameters-names': 'error',
        'react-redux/mapStateToProps-no-store': 'error'
    }
};
