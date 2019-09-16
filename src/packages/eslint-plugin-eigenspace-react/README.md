# Eigenspace eslint plugin for react

Eigenspace`s rules and configuration for react projects

# Project structure

```
/lib
    /rules - folder with custom rules
index.js - exported plugin config
```

# Code writing guide

* [React](./doc/react/README.md)

# Environmental requirements
* `eslint`: `5.x`

# Rules for ESLint

To use this set of rules you should add them to your config.
In .eslintrc.js do following:
```
module.exports = {
    extends: [
        'plugin:eigenspace-react/all'
    ]
};
```
    
# Configurations for development environments

## Why do we have that dependencies?

* `eslint-plugin-react` - eslint rule package.
