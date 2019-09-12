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

* [Common standards](./doc/common/README.md)
* [Angular](./doc/angular/README.md)
* [React](./doc/react/README.md)
* [Scripts](./doc/scripts/README.md)
* [Styles](./doc/styles/README.md)

# Process rules

* [Process rules](./doc/process/README.md)

# Environmental requirements
* `eslint`: `5.x`

We use 5<sup>th</sup> version because `@typescript-eslint/eslint-plugin` and `@typescript-eslint/parser` require `eslint`
with 5<sup>th</sup> version.
```
warning " > @typescript-eslint/eslint-plugin@1.11.0" has incorrect peer dependency "eslint@^5.0.0".
warning " > @typescript-eslint/parser@1.11.0" has incorrect peer dependency "eslint@^5.0.0".
```

# Rules for ESLint

All requirement information is described [here](./src/packages/eslint/README.md).
    
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

## Why do we have that dependencies?

* `@typescript-eslint/eslint-plugin` - plugin to adapt eslint to typescript.
* `@typescript-eslint/parser` - parser typescript code for eslint.

## Why do we have that dev dependencies?

* `@eigenspace/commit-linter` - commit linter.
* `eslint-plugin-eigenspace-script` - eslint script rules package.
* `eslint-plugin-eigenspace-react` - eslint react rules package.
* `eslint-plugin-eigenspace-redux` - eslint redux rules package.
* `@eigenspace/helper-scripts` - common scripts for dev. environment.
* `@types/*` - contains type definitions for specific library.
* `eslint` - it checks code for readability, maintainability, and functionality errors.
* `google-spreadsheet` - it is used to work with google spreadsheet api to automate preparing google spreadsheet with all rules.
* `typescript` - is a superset of JavaScript that have static type-checking and ECMAScript features.
* `husky` - used for configure git hooks.
* `lint-staged` - used for configure linters against staged git files.
* `react` - used for sandbox and testing React rules.
* `react-redux` - used for sandbox and testing React redux rules.
* `eslint-utils` - eslint-utils package that helps with rules development.

# CI

**Important!**

Travis creates the .npmrc file during ci startup. This file contains the access token to the npm repository.
