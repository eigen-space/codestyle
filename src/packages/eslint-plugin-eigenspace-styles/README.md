# Eigenspace eslint plugin for styles

Eigenspace`s rules and configuration for web projects

# Project structure

We use same project structure as all plugin uses.
Example of project structure can be found [there](https://github.com/DianaSuvorova/eslint-plugin-react-redux)

# Code writing guide

* [Styles](https://standards.eigenspace.team/styles)

# Environmental requirements

* `eslint`: `5.x`

# Rules for ESLint

To use this set of rules you should add them to your config.
In .eslintrc.js do following:
```
module.exports = {
    extends: [
        'plugin:eigenspace-styles/all'
    ]
};
```
    
# Configurations for development environments

## Why do we have that dependencies?

* `eslint-plugin-prettier` - eslint rule package.
* `prettier` - used for code formatting. 

## Why do we have that dev dependencies?

* `typescript` - is a superset of JavaScript that have static type-checking and ECMAScript features.
