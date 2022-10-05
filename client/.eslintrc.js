/* eslint-disable no-undef */
module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
    "jest": true,
  },
  "settings": {
    "react": {
      "version": "detect",
    },
  },
  "extends": ["eslint:recommended", "plugin:react/recommended",],
  "parserOptions": {
    
    "ecmaFeatures": {
      "jsx": true,
    },
    "ecmaVersion": 13,
    "sourceType": "module",
  },
 
  "plugins": [
    "unused-imports"
  ],
  "rules": {
    "no-unused-vars": "off",
    "import/prefer-default-export": "off",
    "object-curly-spacing": [
      2,
      "always",
    ],
    "indent": [
      2,
      2,
    ],
    "require-jsdoc": "off",
    "valid-jsdoc": "off",
    "linebreak-style": "off",
    "operator-linebreak": [
      "error",
      "after",
    ],
    "react/jsx-first-prop-new-line": [
      "error",
      "multiline-multiprop",
    ],
    "react/jsx-closing-tag-location": [
      "error",
      "always",
    ],
    "react/jsx-closing-bracket-location": [
      "error",
      "line-aligned",
    ],
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        "vars": "all",
        "varsIgnorePattern": "^_",
        "args": "after-used",
        "argsIgnorePattern": "^_"
      }
    ],
    "react/react-in-jsx-scope": "off",
  },
};