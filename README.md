# CodeStyle [![Build Status](https://travis-ci.com/eigen-space/codestyle.svg?branch=master)](https://travis-ci.com/eigen-space/codestyle)

Main language: `TypeScript`

This project contains:
1. Code writing guide. Covers aesthetic issues, convention naming and coding standards.
2. Rules for `tslint` and its configuration.
3. tsconfig configuration - `codestyle.tsconfig.json`.
4. Configuration for development environments.

# Structure

```
/doc 
    /common
    /angular
    /react
    /scripts
    /styles 
/rules
/tsconfig
/ide-configs
    codestyle.idea.xml
```   

# Code writing guide

* [Common standarts](./doc/common/README.md)
* [Angular](./doc/angular/README.md)
* [React](./doc/react/README.md)
* [Scripts](./doc/scripts/README.md)
* [Styles](./doc/styles/README.md)

# Rules for tslint

located in `tslint.json`. To connect you need:
1. Create `tslint.json` in project root or choose already existing.
2. Inherit `tslint.json` from code-style project, doing this:
    ```
    {
        "extends": [
            "@eigenspace/codestyle/tslint.json"
        ]
    }
    ```
3. In IDE settings turn on `tslint` and specify `tslint` path.    
    
# Configurations for development environments

### IntelliJ IDEA / WebStorm

Used for code validation and auto-formatting.
1. Open `Preferences`
2. Go to `Editor` -> `Code Style` -> `TypeScript`
3. Click on the `gear` icon neat to `scheme`
4. From the context menu select `Import Scheme`

# Usage tsconfig.json

In current `tsconfig.json` add:
```
"extends": "@eigenspace/codestyle/base.tsconfig.json"
"compilerOptions": {
    "moduleResolution": "node"
}
```

# Why do we have that dev dependencies?

* `@eigenspace/helper-scripts` - common scripts for dev. environment.
* `@types/*` - contains type definitions for specific library.
* `jest` - testing framework to write unit specs (including snapshots).
snapshots. It extends jest and add method `toMatchImageSnapshot`. It creates image snapshot
if there is no one like standard jest snapshot tool does. 
For instance, `expect(componentImage).toMatchImageSnapshot()`.
* `ts-jest` - it lets you use Jest to test projects written in TypeScript.
* `tslint` - it checks TypeScript code for readability, maintainability, and functionality errors.
* `typescript` - is a superset of JavaScript that have static type-checking and ECMAScript features.
* `husky` - used for configure git hooks.
* `lint-staged` - used for configure linters against staged git files.
