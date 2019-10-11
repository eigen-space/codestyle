# README

## Eigenspace eslint plugin for react

Eigenspace\`s rules and configuration for React projects

## Project structure

We use same project structure as all plugin uses. Example of project structure can be found [there](https://github.com/DianaSuvorova/eslint-plugin-react-redux)

## Code writing guide

* [React](https://github.com/eigen-space/codestyle/tree/dev/doc/react)

## Environmental requirements

* `eslint`: `5.x`

## Rules for ESLint

To use this set of rules you should add them to your config. In .eslintrc.js do following:

```text
module.exports = {
    extends: [
        'plugin:eigenspace-react/all'
    ]
};
```

## Configurations for development environments

### Why do we have that dependencies?

* `eslint-plugin-react` - eslint rule package.

