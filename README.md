# Warning

This quickstart is under active development and hasn't yet reached its final form.

It may not be fully compatible with current versions of Angular.

# 22ndtech Common Lib
[![Build Status][travis-badge]][travis-badge-url]

This is a simple library defining the common functions and data structures for 22ndtech development efforts, implementing the
[Angular Package Format v4.0](https://docs.google.com/document/d/1CZC2rcpxffTDfRDs6p1cfbmKNLA6x5O-NtkJglDaBVs/edit#heading=h.k0mh3o8u5hx).

Features:
- a simple example library
- unit tests for the library
- a demo application that consumes the library in JIT mode and runs in watch mode
- an integration app that consumes the library in JIT and AOT mode and runs e2e tests

Common tasks are present as npm scripts:

- `npm start` to run a live-reload server with the demo app
- `npm run test` to test in watch mode, or `npm run test:once` to only run once
- `npm run build` to build the library
- `npm run lint` to lint 
- `npm run clean` to clean
- `npm run integration` to run the integration e2e tests
- `npm install ./relative/path/to/lib` after `npm run build` to test locally in another app

If you need to debug the integration app, please check `./integration/README.md`.

[travis-badge]: https://travis-ci.org/filipesilva/angular-quickstart-lib.svg?branch=master
[travis-badge-url]: https://travis-ci.org/filipesilva/angular-quickstart-lib

## The 22ndtech Common Library

This library implements


**Warning**: Do this only in the beginning to avoid accidentally deleting your own git setup!


## What's in the 22ndtech Common Lib?

src/
├── demo/
|  └── app/
|     ├── app.component.ts
|     └── app.module.ts
└── lib/
   ├── index.ts
   └── src/
      ├── component/
      |  └── lib.component.ts
      ├── service/
      |  └── lib.service.ts
      └── module.ts

```

Each file has a distinct purpose and evolves independently as the application grows.

Files outside `src/` concern building, deploying, and testing your app.
They include configuration files and external dependencies.

Files inside `src/lib/` "belong" to your library, while `src/demo/` contains a demo application
that loads your library.

Libraries do not run by themselves, so it's very useful to have this "demo" app while developing 
to see how your library would look like to consumers.

When you run `npm start`, the demo application is served.

The following are all in `src/`

<table width="100%">
  <col width="20%">
  </col>
  <col width="80%">
  </col>
  <tr>
    <th>
      File
    </th>
    <th>
      Purpose
    </th>
  </tr>
  <tr>
    <td>
      <code>demo/app/app.component.ts</code>
    </td>
    <td>
      A demo component that renders the library component and a value from the library service.
    </td>
  </tr>
  <tr>
    <td>
      <code>demo/app/app.module.ts</code>
    </td>
    <td>
      A demo <code>NgModule</code> that imports the Library <code>LibModule</code>.
    </td>
  </tr>
  <tr>
    <td>
      <code>lib/src/component/app.component.ts</code>
    </td>
    <td>
      A sample library component that renders an <code>h2</code> tag.
    </td>
  </tr>
  <tr>
    <td>
      <code>lib/src/service/lib.service.ts</code>
    </td>
    <td>
      A sample library service that exports a value.
    </td>
  </tr>
  <tr>
    <td>
      <code>lib/src/module.ts</code>
    </td>
    <td>
      The library's main <code>NgModule</code>, <code>LibModule</code>.
    </td>
  </tr>
  <tr>
    <td>
      <code>lib/index.ts</code>
    </td>
    <td>
      The public API of your library, where you choose what to export to consumers.
    </td>
  </tr>
</table>


## The build step

You can build the library by running `npm run build`. 
This will generate a `dist/` directory with all the entry points described above.

All the logic for creating the build can be found in `./build.js`. It consists of roughly 5 steps:

- Compile with the AOT Compiler (AOT compiler or `ngc`) for ES5 and ES2015.
- Inline html and css inside the generated JavaScript files.
- Copy typings, metatada, html and css.
- Create each bundle using Rollup.
- Copy `LICENSE`, `package.json` and `README.md` files


## Testing libraries

While testing is always important, it's **especially** important in libraries because consumer
applications might break due to bugs in libraries.

But the fact that a library is consumed by another application is also what makes it hard to test.

To properly test a library, you need to have an integration tests.
An integration test is to libraries what an end-to-end test is to applications.
It tests how an app would install and use your library.

The **22ndtech Common lib** includes a directory called `integration` containing a standalone
app that consumes your built library in both AOT and JIT modes, with end-to-end tests to verify
it works.

To run the integration tests, do `npm run integration` which does the following:
- Build your library.
- Enter the integration app's directory.
- Install dependencies.
- Build the app in AOT mode.
- Test the app in AOT mode.
- Test the app in JIT mode.

Running integration tests gives you greater confidence that your library is properly built.

In addition to integration tests, you can also run unit tests in watch mode via `npm run test`,
or single-run via `npm run test:once`.

You can also test the library by installing it in another local repository you have. 
To do so, first build your lib via `npm run build`.
Then install it from your other repo using a relative path to the dist folder: 
`npm install relative/path/to/library/dist`.


## Appendix: Supporting AOT

AOT plays an important role in optimizing Angular applications. 
It's therefore important that third party libraries be published in a format compatible with AOT
compilation.
Otherwise it will not be possible to include the library in an AOT compiled application.

Only code written in TypeScript can be AOT compiled.
 
Before publishing the library must first be compiled using the AOT compiler (`ngc`). 
`ngc` extends the `tsc` compiler by adding extensions to support AOT compilation in addition to
regular TypeScript compilation.   

AOT compilation outputs three files that must be included in order to be compatible with AOT.

*Transpiled JavaScript*

As usual the original TypeScript is transpiled to regular JavaScript.

*Typings files*

JavaScript has no way of representing typings. 
In order to preserve the original typings, `ngc` will generate `.d.ts` typings files.

*Meta Data JSON files*

`ngc` outputs a metadata.json file for every `Component` and `NgModule`.
These meta data files represent the information in the original `NgModule` and `Component`
decorators.   

The meta data may reference external templates or css files.
These external files must be included with the library.

### NgFactories

`ngc` generates a series of files with an `.ngfactory` suffix as well.
These files represent the AOT compiled source, but should not be included with the published library.

Instead the `ngc` compiler in the consuming application will generate `.ngfactory` files based
on the JavaScript, Typings and meta data shipped with the library. 

