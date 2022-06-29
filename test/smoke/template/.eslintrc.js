module.exports = {
    "parser": "babel-eslint",
    "extends": "airbnb",
    "env": {
        "browser": true,
        "node": true
    },
    "rules": {
        semi: ['error', 'never'],
        "indent": ["error", 4],
        'global-require': 'off',
        'import/no-extraneous-dependencies': 'off',
        'react/jsx-filename-extension': 'off',
        'max-len': ['error', { code: 180, comments: 200 }],
        "react/jsx-indent": [2, 'tab', {checkAttributes: true, indentLogicalExpressions: true}]
    }
}