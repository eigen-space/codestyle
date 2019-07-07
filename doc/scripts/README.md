[ru](./README.ru.md)

# Scripts (TypeScript / JavaScript)

## Work in progress

We are translating this document from russian to english and some sections are not ready yet.
Please, go [here](./README.ru.md) to get full description in russian language.

## 0. Introduction

### 0.1. Terms and definitions

TODO: Rethink and rewrite for both languages

### 0.2. Used sources

For preparing document used following sources:

a. [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html)

b. Steve McConnell, Code Complete, Second Edition, «Russkaya redakcia», 2010.

c. Code review in Gitlab in the workspace-web project of [VeeRoute](http://veeroute.ru) company

d. [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript/blob/master/README.md)

e. [Principles of writing consistent, idiomatic Javascript](https://github.com/rwaldron/idiomatic.js)

f. [C++ Guideline](https://lab.veeroute.com/development/docs-internal/blob/master/docs/internal/dev/guidelines/guidelines_cpp.md)

g. Intellij IDEA. File | Settings | Editor | Code Style | TypeScript

e. Robert Cecil Martin - Clean Code: A Handbook of Agile Software Craftsmanship: «Piter», 2010.

## 2. Formatting

### 2.8. Classes

#### 2.8.1. \[Not automated member-ordering\] Order of properties and methods

Properties and methods should be placed in the following order:

a. Static fields

b. Instance fields

c. Constructor

d. Accessors (getter/setter)

e. Static methods

f. Instance methods

Into of each group order is defined by access level of method / property:

a. Public

b. Protected

c. Private

Group of properties should be separated by empty line.

```typescript
    class SomeClass {
        static field;
        protected static field;
        private static field;
        
        field;
        protected field;
        private field;
        
        constructor(){
        }
        
        get() {}
        set() {}
        protected get() {}
        protected set() {}
        private get() {}
        private set() {}
        
        static method() {}
        protected static method() {}
        private static method() {}
        
        method() {}
        protected method() {}
        private method() {}
    }
```

#### 2.8.2. \[Not automated\] Order of methods common type and access level

Note: \
*For some frameworks there are some more additional rules.*

In the common rule could be formulated as: code should be reading from top to bottom.
The called method should placed under his invoker.

```typescript
private BuyButton(): React.Node {
    return (
      <Button onClick={this.buy}>Buy</Button/>  
    );
}

private buy() {
    ...
    const clientInfo = this.getClientInfo();
    ...
}

private getClientInfo(): ClientInfo {
    return ...;
}

```
.
If some methods placed together, firstly there is chain from first method, then from second, etc.

```typescript
private ActionList(): React.Node {
    return (
      <Button onClick={this.buy}>Buy</Button/> 
      <Button onClick={this.cancel}>Cancel</Button/>  
    );
}

private buy(): void {
    ...
    const clientInfo = this.getClientInfo();
    ...
}

private getClientInfo(): ClientInfo {
    return ...;
}

private cancel(): void {
    ...
    this.removeOrders();
    this.sendNotification();
    ...
}

private removeOrders(): void {
    ...
}

private sendNotification(): void {
    ...
}

```
