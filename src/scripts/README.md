# scripts

## extract-rules-meta-info-to-google-sheets

### Why do we need that script?
We need most important rules data from huge text to be able find rules by some parameters.  
Basic usage of it is finding not automated rules in faster way.

### Documentation
Read more in JSDoc [here](./extract-rules-meta-info-to-google-sheets.ts)

### When we run that script?
We run it only on CI right after build to.

## markdown-lint

### Why do we need that script?
We have a rule that we should understand why we put this dependency in project.  
So we describe every dependency in readme file of the project.  
To make sure we describe all dependencies we need a dependency linter.

### Documentation
Read more in JSDoc [here](./markdown-lint.js)

### When we run that script?
We run it locally and on CI with linter.
