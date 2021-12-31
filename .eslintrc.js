module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  rules: {
    "no-use-before-define": "off",
    "no-restricted-syntax": "off",
    "func-names": "off",
    "indent": ["error", 4],
    "no-param-reassign": "off",
    "no-shadow": "off",
    "import/prefer-default-export": "off",
    "arrow-body-style": "off",
    "import/no-extraneous-dependencies": "off"
  },
};
