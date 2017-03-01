module.exports = {
    root: true,
    parserOptions: {
        sourceType: 'module'
    },
    env: {
        browser: true
    },
    extends: 'airbnb-base',
    plugins: [
        'html'
    ],
    'rules': {
        "global-require": 1,
        "no-console": 0,
        "no-plusplus": 0,
        "arrow-parens": 0,
        "indent": ["error", 4],
        "comma-dangle": ["error", "never"],
        "import/newline-after-import": 0,
        "import/no-dynamic-require": 1,
        "eol-last": ["error", "never"],

        // только на клиенте пока нет нормального импорта
        "no-unused-vars": 0,
        "no-undef": 0,

        'import/extensions': ['error', 'always', {
            'js': 'never',
            'vue': 'never'
        }],
        'import/no-extraneous-dependencies': ['error', {
            'optionalDependencies': ['test/unit/index.js']
        }],
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
    }
};