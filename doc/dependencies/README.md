# npm dependencies

## Why is it here?

We developed a component library and encountered a problem while using it. Although we understood that this library
should use the consumer environment, we incorrectly used dependencies. Thereby we got a library that cannot be used.
So you need to understand how to organize dependencies.

## A bit of theory

At the moment, 3 types of dependencies are important for us and section of `package.json`:

* `dependencies` - main dependencies.  Dependencies specific to your project. Used directly 
in the project code. An important point: if you develop a library using the framework as a dependency, then it has
no place in this section. The library will become part of the ecosystem of another project and will use
its environment. You need to understand exactly why the dependency turned out to be in this section.  You also need
to understand how dependency conflicts are resolved: if a specific version of a dependency is specified in
the library, and another version of the same dependency is specified in a project that uses library, 
then both versions are installed. As a result we can get non-working app due to non-obvious conflicts and freaky
behaviour.
* `devDependencies` - dependencies to develop. Everything is simple here. Tools to help us write
and maintain a project. For example: utilities, tools for writing and running tests, module builder. 
In general, what should not be in the project after build. These dependencies are not installed 
when we use our library in another project.
* `peerDependencies` - dependencies on which the project is hoping. Here you can see the
dependencies and their versions or range of versions with which the project is guaranteed to work 
when installed in another project. These dependencies are not installed when we use our library 
in another project, but you see warnings if there are no required peer dependencies among 
installed ones.

## How to use peer dependencies

So now it is clear that some dependencies are needed in `peerDependencies` section. 
These dependencies are not installed when we pull dependencies for the project using 
`npm install` or `yarn` commands. Since we need last ones during development and ci process, 
at the moment, *until we find the best option*, it is proposed to duplicate peer dependencies 
in the `devDependencies` section.

### Example

`core-ui-kit` - library of ui components based on `react`.  `react` is listed in the `peerDependencies` section with
version 16.7.0 . This means that the library `guarantees` its work with this version of `react`.  Accordingly, it is
reasonable for the consumer to use this version in the project.

### Important!

It is not necessary to use a specific version. If we are sure that the library remains working, using
a range of React versions, you can specify a range.

## How to set version number of dependency


