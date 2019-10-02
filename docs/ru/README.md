# CodeStyle

## Правила написания кода

* [Общие стандарты](ru/common)
* [Angular](ru/angular)
* [React](ru/react)
* [Скриты](ru/scripts)
* [Стили](ru/styles)

## Процессы

* [Процедурные стандарты](ru/process)

## Архитектура

* [Frontend](ru/architecture-frontend)

## Требования к окружению

* `eslint`: `5.x`

We use 5<sup>th</sup> version because `@typescript-eslint/eslint-plugin` and `@typescript-eslint/parser` require `eslint`
with 5<sup>th</sup> version.
```
warning " > @typescript-eslint/eslint-plugin@1.11.0" has incorrect peer dependency "eslint@^5.0.0".
warning " > @typescript-eslint/parser@1.11.0" has incorrect peer dependency "eslint@^5.0.0".
```

## Структура проекта

```
/configs - Some configurations, eg ide
/doc - Codestyle
/src
    /configs - Packaged configurations
    /sandbox
    /scripts
```   

## Правила для ESLint

All requirement information is described [here](./src/packages/eslint/README.md).

## Конфигурации для сред разработки 

### IntelliJ IDEA / WebStorm

Located in `configs/ide/codestyle.idea.xml`
Used for code validation and auto-formatting.
1. Open `Preferences`
2. Go to `Editor` -> `Code Style` -> `TypeScript`
3. Click on the `gear` icon neat to `scheme`
4. From the context menu select `Import Scheme`

### tsconfig.json

Located in `src/configs/typescript/base.tsconfig.js`.
In current `tsconfig.json` add:
```
"extends": "@eigenspace/codestyle/configs/typescript/base.tsconfig.json"
"compilerOptions": {
    "moduleResolution": "node"
}
```
