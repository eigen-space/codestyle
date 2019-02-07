# CodeStyle

Основной язык: `TypeScript`

Проект включает в себя:
1. Руководство по написанию кода. Затрагивает эстетические моменты, вопросы конвенции именования и 
стандарты кодирования.
2. Правила для `tslint` и его конфигурация.
3. Конфигурация tsconfig - `codestyle.tsconfig.json`.
4. Конфигурации для сред разработки.

# Структура

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

# Руководство по написанию кода

* [Общие стандарты](./doc/common/README.md)
* [Angular](./doc/angular/README.md)
* [React](./doc/react/README.md)
* [Скрипты](./doc/scripts/README.md)
* [Стили](./doc/styles/README.md)

# Правила для tslint

Включены в `tslint.json`. Для подключения необходимо:
1. Создать `tslint.json` в корне вашего проекта или выбрать существующий.
2. Унаследовать `tslint.json` code-style проекта, добавив следующее:
    ```
    {
        "extends": [
            "@eigenspace/codestyle/tslint.json"
        ]
    }
    ```
3. В настройках IDE включить `tslint` и указать на `tslint` проекта.    
    
# Конфигурации для сред разработки

### IntelliJ IDEA / WebStorm

Используется для валидации кода и автоформатирования.
1. Открыть `Preferences`
2. Перейти по `Editor` -> `Code Style` -> `TypeScript`
3. Нажать на иконку `шестерёнка` рядом с `scheme`
4. Из контекстного меню выбрать `Import Scheme`

# Использование tsconfig.json

В текущем `tsconfig.json` проекта добавить:
```
"extends": "@eigenspace/codestyle/base.tsconfig.json"
```