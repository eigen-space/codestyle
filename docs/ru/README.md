# CodeStyle

## Правила написания кода

* [Общие стандарты](https://github.com/eigen-space/codestyle/tree/c8afb079ad9300b695d5d7cfc8409b59548c3028/docs/ru/ru/common/README.md)
* [Angular](https://github.com/eigen-space/codestyle/tree/c8afb079ad9300b695d5d7cfc8409b59548c3028/docs/ru/ru/angular/README.md)
* [React](https://github.com/eigen-space/codestyle/tree/c8afb079ad9300b695d5d7cfc8409b59548c3028/docs/ru/ru/react/README.md)
* [Скриты](https://github.com/eigen-space/codestyle/tree/c8afb079ad9300b695d5d7cfc8409b59548c3028/docs/ru/ru/scripts/README.md)
* [Стили](https://github.com/eigen-space/codestyle/tree/c8afb079ad9300b695d5d7cfc8409b59548c3028/docs/ru/ru/styles/README.md)

## Процессы

* [Процедурные стандарты](https://github.com/eigen-space/codestyle/tree/c8afb079ad9300b695d5d7cfc8409b59548c3028/docs/ru/ru/process/README.md)

## Архитектура

* [Frontend](https://github.com/eigen-space/codestyle/tree/c8afb079ad9300b695d5d7cfc8409b59548c3028/docs/ru/ru/architecture-frontend/README.md)

## Требования к окружению

* `eslint`: `5.x`

We use 5th version because `@typescript-eslint/eslint-plugin` and `@typescript-eslint/parser` require `eslint` with 5th version.

```text
warning " > @typescript-eslint/eslint-plugin@1.11.0" has incorrect peer dependency "eslint@^5.0.0".
warning " > @typescript-eslint/parser@1.11.0" has incorrect peer dependency "eslint@^5.0.0".
```

## Структура проекта

```text
/configs - Some configurations, eg ide
/doc - Codestyle
/src
    /configs - Packaged configurations
    /sandbox
    /scripts
```

## Правила для ESLint

All requirement information is described [here](https://github.com/eigen-space/codestyle/tree/c8afb079ad9300b695d5d7cfc8409b59548c3028/docs/ru/src/packages/eslint/README.md).

## Конфигурации для сред разработки

### IntelliJ IDEA / WebStorm

Located in `configs/ide/codestyle.idea.xml` Used for code validation and auto-formatting. 1. Open `Preferences` 2. Go to `Editor` -&gt; `Code Style` -&gt; `TypeScript` 3. Click on the `gear` icon neat to `scheme` 4. From the context menu select `Import Scheme`

### tsconfig.json

Located in `src/configs/typescript/base.tsconfig.js`. In current `tsconfig.json` add:

```text
"extends": "@eigenspace/codestyle/configs/typescript/base.tsconfig.json"
"compilerOptions": {
    "moduleResolution": "node"
}
```

