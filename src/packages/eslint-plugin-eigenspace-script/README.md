# Eigenspace eslint plugin for scripts

Eigenspace`s rules and configuration for web projects

# Project structure

```
/lib
    /rules - folder with custom rules
index.js - exported plugin config
```

# Code writing guide

* [Scripts](./doc/scripts/README.md)

# Environmental requirements
* `eslint`: `5.x`

# Rules for ESLint

To use this set of rules you should add them to your config.
In .eslintrc.js do following:
```
module.exports = {
    extends: [
        'plugin:eigenspace-script/all'
    ]
};
```
    
# Configurations for development environments

## Why do we have that dependencies?

* `eslint-plugin-unicorn` - eslint rule package.
