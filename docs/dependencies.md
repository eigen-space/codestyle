# npm dependencies

## 1. Why is it here?

We developed a component library and encountered a problem while using it. Although we understood that this library should use the consumer environment, we incorrectly used dependencies. Thereby we got a library that cannot be used. So you need to understand how to organize dependencies.

## 2. A little bit of theory

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

## 3. Peer dependencies

### 3.1. How to use?

So now it is clear that some dependencies are needed in `peerDependencies` section. These dependencies are not installed when we pull dependencies for the project using `npm install` or `yarn` commands. Since we need last ones during development and ci process, at the moment, _until we find the best option_, it is proposed to duplicate peer dependencies in the `devDependencies` section.

### 3.2. Example

`core-ui-kit` - library of ui components based on `react`. `react` is listed in the `peerDependencies` section with version 16.7.0 . This means that the library `guarantees` its work with this version of `react`. Accordingly, it is reasonable for the consumer to use this version in the project.

### 3.3. What version should we set for peer dependency?

It is not necessary to use a specific version. If we are sure that the library remains working, using a range of React versions, you can specify a range.

## 4. How to set version number of dependency

### 4.1. Only concrete version of dependency

If we use some dependency, we should set only concrete version of it. That is unacceptable to use fluent versions \(`^1.0.4`, `~1.0.4`\), that can be accidently updated, among main dependencies \(`dependencies`\) and dev dependencies \(`devDependencies`\). We should use only concrete ones: `1.0.4`. If we need concrete patch or feature for some dependency, we should consciously update version to get these updates. Otherwise we should not get updates if we do not wait it.

Technically we can avoid fluent dependencies the following ways:

1. Define concrete version when we add dependency: `npm install --save-dev some-dep@1.0.4`
2. Change default behaviour of parameter [`save-prefix`](https://docs.npmjs.com/misc/config#save-prefix) 

   of `.npmrc` \(`.yarnrc`\) in the root of project:

`.npmrc`:

```text
save-prefix=""
```

`.yarnrc`:

```text
save-prefix ""
```

### 4.2. Fluent versions for peerDependencies

When we write our own library, we likely use `peerDependencies` that imposes constraints on the environment in which it will be used. It makes sense to get as wide range as it is possible for peer dependencies to provide as much possibilities as possible for consumer projects that use our library. So it is preferable to set fluent versions \(range of versions\) for peer dependencies rather than concrete versions. However we should set only that range of versions we can guarantee our library works correctly with. If we do not really know whether our library works correctly with some versions of the peer dependency, we should set concrete version of the dependency.

