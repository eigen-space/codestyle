# CodeStyle [![Build Status](https://travis-ci.com/eigen-space/codestyle.svg?branch=master)](https://travis-ci.com/eigen-space/codestyle)

Main language: `TypeScript`

This project contains:
1. Code writing guide. Covers aesthetic issues, convention naming and coding standards.
2. `eslint` configuration.
3. `typescript` configuration.
4. Configuration for development environments.

# Project structure

```
/configs - Some configurations, eg ide
/doc - Codestyle
/src
    /configs - Packaged configurations
    /sandbox
    /scripts
```   
# Code writing guide

* [React](./doc/react/README.md)

# Environmental requirements
* `eslint`: `5.x`

We use 5<sup>th</sup> version because `@typescript-eslint/eslint-plugin` and `@typescript-eslint/parser` require `eslint`
with 5<sup>th</sup> version.
```
warning " > @typescript-eslint/eslint-plugin@1.11.0" has incorrect peer dependency "eslint@^5.0.0".
warning " > @typescript-eslint/parser@1.11.0" has incorrect peer dependency "eslint@^5.0.0".
```

# Rules for ESLint

To use this set of rules you should add them to your config.
In .eslintrc.js do following:
```
module.exports = {
    extends: [
        'plugin:eigenspace-react/all'
    ]
};
```
    
# Configurations for development environments

## Why do we have that dependencies?

* `eslint-plugin-react` - eslint rule package.
