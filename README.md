# CodeStyle [![Build Status](https://travis-ci.com/eigen-space/codestyle.svg?branch=master)](https://travis-ci.com/eigen-space/codestyle)

Main language: `TypeScript`

This project contains:
1. `eslint` configuration.
2. `typescript` configuration.
3. Configuration for development environments.

# Project structure

```
/configs - Some configurations, eg ide
/src
    /configs - Packaged configurations
    /sandbox
    /scripts
```   

## How to start development with sandbox

1. Build `eslint-plugin-eigenspace-script` project
    ```
        > cd src/packages/eslint-plugin-eigenspace-script
        > yarn build
    ```
2. Run `yarn` from root project

## How to run specs

To run specs for all subprojects, just call `yarn test` from the root project

## Why do we have that dependencies?

* `@typescript-eslint/eslint-plugin` - plugin to adapt eslint to typescript.
* `@typescript-eslint/parser` - parser typescript code for eslint.

## Why do we have that dev dependencies?

* `@eigenspace/commit-linter` - commit linter.
* `@eigenspace/helper-scripts` - common scripts for dev. environment.
* `@types/*` - contains type definitions for specific library.
* `eslint-plugin-eigenspace-script` - eslint script rules package.
* `eslint-plugin-eigenspace-react` - eslint react rules package.
* `eslint-plugin-eigenspace-redux` - eslint redux rules package.
* `eslint-plugin-eigenspace-styles` - eslint styles rules package.
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

# CI

**Important!**

Travis creates the .npmrc file during ci startup. This file contains the access token to the npm repository.

**Important!**

Snapshot versions of packages are stored at https://artifacts.arrival.services/
 Therefore, in order to use them, you need to add registry information to .yarnrc:
 
 ```markdown
    registry "https://artifacts.arrival.services/"
 ```
 
 Master versions of the packages are stored in the npm registry


