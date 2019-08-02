Includes eslint shareable configs. 

# Installation

1. Create `.eslintrc.js` in project root or choose already existing.
2. Add `@eigenspace/codestyle` as dev dependency.
3. Then add this below <sup>(1)</sup>:
    ```
    "@eigenspace/eslint-config-codestyle": "file:node_modules/@eigenspace/codestyle/packages/eslint"
    ``` 
4. `yarn install`
5. Extends configurations on `.eslintrc` file:
    ```
    extends: [
        '@eigenspace/codestyle/base',
        '@eigenspace/codestyle/react'
    ]
    ```
   
    Note: `react` is optional. Use it only if your project uses `React`.
6. In IDE settings turn on `eslint` and specify `eslint` path.   

<sup>(1)</sup> 
We are forced to load it from codestyle project as subpackage because of satisfaction of 
[requirement for naming shareable configs](https://eslint.org/docs/developer-guide/shareable-configs).
      
# Project structure

```
base.js - Base configuration and rules for eslint
react.js - Configuration includes codestyle React rules
```

# Why do we have that dependencies?

* `eslint-plugin-react` - React plugin for ESLint.
