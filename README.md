# README

## CodeStyle [![Build Status](https://travis-ci.com/eigen-space/codestyle.svg?branch=master)](https://travis-ci.com/eigen-space/codestyle)

Main language: `TypeScript`

This project contains: 1. Code writing guide. Covers aesthetic issues, convention naming and coding standards in russian and english languages. 2. `eslint` configuration. 3. `typescript` configuration. 4. Configuration for development environments.

## Getting started

For running documentation serving run the following command:

```text
yarn dev:doc
```

## Project structure

```text
/configs - Some configurations, eg ide
/docs - Codestyle
/src
    /configs - Packaged configurations
    /sandbox
    /scripts
```

### How to start development with sandbox

1. Build `eslint-plugin-eigenspace-script` project

   ```text
        > cd src/packages/eslint-plugin-eigenspace-script
        > yarn build
   ```

2. Run `yarn` from root project

### How to run specs

To run specs for all subprojects, just call `yarn test` from the root project

### Why do we have that dependencies?

* `@typescript-eslint/eslint-plugin` - plugin to adapt eslint to typescript.
* `@typescript-eslint/parser` - parser typescript code for eslint.

### Why do we have that dev dependencies?

* `@eigenspace/commit-linter` - commit linter.
* `@eigenspace/helper-scripts` - common scripts for dev. environment.
* `@types/*` - contains type definitions for specific library.
* `docsify-cli` - generates documentation to work with documentation in easier way.
* `eslint-plugin-eigenspace-script` - eslint script rules package.
* `eslint-plugin-eigenspace-react` - eslint react rules package.
* `eslint-plugin-eigenspace-redux` - eslint redux rules package.
* `eslint` - it checks code for readability, maintainability, and functionality errors.
* `google-spreadsheet` - it is used to work with google spreadsheet api to automate preparing google spreadsheet with all rules.
* `ts-jest` - used for jest to work with typescript files.
* `typescript` - is a superset of JavaScript that have static type-checking and ECMAScript features.
* `husky` - used for configure git hooks.
* `jest` - spec runner.
* `lint-staged` - used for configure linters against staged git files.
* `react` - used for sandbox and testing React rules.
* `react-redux` - used for sandbox and testing React redux rules.
* `eslint-utils` - eslint-utils package that helps with rules development.

## CI

**Important!**

Travis creates the .npmrc file during ci startup. This file contains the access token to the npm repository.

