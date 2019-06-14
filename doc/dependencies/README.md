# Npm dependencies

## Why it is here?

We developed a component library and encountered a problem while using it. Although we understood that this library
should use the consumer environment, we incorrectly used dependencies. Thereby we got a library that cannot be used.
So you need to understand how to organize dependencies.

## A bit of theory

At the moment, 3 types of dependencies are important for us:

- Main dependencies -  `dependencies` section of package.json.  Dependencies specific to your project. Used directly 
in the project code. An important point: if you develop a library using the framework as a dependency, then it has
no place in this section. The library will become part of the ecosystem of another project and will use
its environment. You need to understand exactly why the dependency turned out to be in this section.  You also need
to understand how dependency conflicts are resolved:  if a specific version of a dependency is specified in
the library, and another version is a dependency in a project using the library, then both versions will be
installed. Consequences can be critical.
- Dependencies to develop - `devDependencies` section in package.json. Everything is simple here. Tools to help us write
and maintain a project. For example: utilities, tools for writing and running tests, module builder. In general, what
should not be in the project after build. These dependencies are not established when using the project in another.
- Dependencies on which the project is hoping - `peerDependencies` section in package.json. Here you can see the
dependencies and their versions or range of versions with which the project is guaranteed to work when installed in
another project. These dependencies are not established when using the project in another, but you will see warnings
if not proven installed or installed with other versions.

## How to use peer dependencies

So now it is clear that some dependencies are needed in `peerDependencies` section. But, since they are not installed
when the project is deployed by the `npm install` or `yarn` commands. But we need them during development and during
the ci process. At the moment, `until we find the best option`, it is proposed to duplicate peer dependencies
in the `devDependencies` section.

## Example

`core-ui-kit` - library of ui components based on `React`.  `React` is listed in the `peerDependencies` section with
version 16.7.0 . This means that the library `guarantees` its work with this version of React.  Accordingly, it is
reasonable for the consumer to use this version in the project.

`Important!` It is not necessary to use a specific version. If we are sure that the library remains working, using
a range of React versions, you can specify a range.
