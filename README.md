# CodeStyle [![Build Status](https://travis-ci.com/eigen-space/codestyle.svg?branch=master)](https://travis-ci.com/eigen-space/codestyle)

This project contains:
1. Code writing guide. Covers aesthetic issues, convention naming and coding standards.
2. `eslint` configuration.
3. `typescript` configuration.
4. Configuration for development environments.

# Code writing guide

* [Common standarts](./doc/common/README.md)
* [Angular](./doc/angular/README.md)
* [React](./doc/react/README.md)
* [Scripts](./doc/scripts/README.md)
* [Styles](./doc/styles/README.md)

# Rules for eslint

Located in `src/configs/eslint/eslint.base.js`. To connect you need:
1. Create `.eslintrc.js` in project root or choose already existing.
2. Inherit `eslint.base.js` from code-style project, doing this:
    ```
    module.exports = require('@eigenspace/codestyle/configs/eslint/eslint.base.js')
    ```
3. In IDE settings turn on `eslint` and specify `eslint` path.    
    
# Configurations for development environments

## IntelliJ IDEA / WebStorm

Located in `configs/ide/codestyle.idea.xml`
Used for code validation and auto-formatting.
1. Open `Preferences`
2. Go to `Editor` -> `Code Style` -> `TypeScript`
3. Click on the `gear` icon neat to `scheme`
4. From the context menu select `Import Scheme`

## Usage tsconfig.json

Located in `src/configs/typescript/base.tsconfig.js`.
In current `tsconfig.json` add:
```
"extends": "@eigenspace/codestyle/configs/typescript/base.tsconfig.json"
"compilerOptions": {
    "moduleResolution": "node"
}
```

## Why do we have that dev dependencies?

* `@eigenspace/helper-scripts` - common scripts for dev. environment.
* `@types/*` - contains type definitions for specific library.
* `eslint` - it checks code for readability, maintainability, and functionality errors.
* `typescript` - is a superset of JavaScript that have static type-checking and ECMAScript features.
* `husky` - used for configure git hooks.
* `lint-staged` - used for configure linters against staged git files.
* `@typescript-eslint/eslint-plugin` - plugin to adapt eslint to typescript.
* `@typescript-eslint/parser` - parser typescript code for eslint.
* `eslint-plugin-unicorn` - eslint rule package.
* `prettier` - code formatter.
* `eslint-plugin-prettier` - plugin to integrate prettier in eslint.

# CI

**Important!**

Travis creates the .npmrc file during ci startup. This file contains the access token to the npm repository.
