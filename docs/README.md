# CodeStyle

## Code writing guide

* [Common standards](common.md)
* [Angular](angular.md)
* [React](react.md)
* [Scripts](scripts.md)
* [Styles](styles.md)

## Process rules

* [Process rules](process.md)

## Architecture

* [Frontend](architecture-frontend.md)

## Environmental requirements

* `eslint`: `5.x`

We use 5<sup>th</sup> version because `@typescript-eslint/eslint-plugin` and `@typescript-eslint/parser` require `eslint`
with 5<sup>th</sup> version.
```
warning " > @typescript-eslint/eslint-plugin@1.11.0" has incorrect peer dependency "eslint@^5.0.0".
warning " > @typescript-eslint/parser@1.11.0" has incorrect peer dependency "eslint@^5.0.0".
```

## Rules for ESLint

All requirement information is described [here](https://github.com/eigen-space/codestyle/tree/dev/src/packages).
    
## Configurations for development environments

### IntelliJ IDEA / WebStorm

Located in `configs/ide/codestyle.idea.xml`
Used for code validation and auto-formatting.
1. Open `Preferences`
2. Go to `Editor` -> `Code Style` -> `TypeScript`
3. Click on the `gear` icon neat to `scheme`
4. From the context menu select `Import Scheme`

### Usage tsconfig.json

Located in `src/configs/typescript/base.tsconfig.js`.
In current `tsconfig.json` add:
```
"extends": "@eigenspace/codestyle/configs/typescript/base.tsconfig.json"
"compilerOptions": {
    "moduleResolution": "node"
}
```
