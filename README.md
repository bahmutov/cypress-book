# cypress-book
[![ci status][ci image]][ci url] [![badges status][badges image]][badges url] [![renovate-app badge][renovate-badge]][renovate-app] ![cypress version](https://img.shields.io/badge/cypress-6.1.0-brightgreen)
> Utilities for updating Cypress screenshots saved as repo images

## Install

Assuming Cypress is a dev dependency

```
npm i -D cypress-book
# or
yarn add -D cypress-book
```

TODO

## Use

See an example test in [cypress/integration/spec.js](cypress/integration/spec.js).

![Example screenshot of the test above](./images/hello-world.png)

## Debugging

Run the tests with `DEBUG=cypress-book` environment variable to see verbose log messages using [debug](https://www.npmjs.com/package/debug) module.

## Examples

- [cypress-book-todomvc](https://github.com/bahmutov/cypress-book-todomvc)
- [cypress-examples](https://github.com/bahmutov/cypress-examples)

## See also

- [cypress-movie](http://github.com/bahmutov/cypress-movie)

## Small print

Author: Gleb Bahmutov &lt;gleb.bahmutov@gmail.com&gt; &copy; 2020

- [@bahmutov](https://twitter.com/bahmutov)
- [glebbahmutov.com](https://glebbahmutov.com)
- [blog](https://glebbahmutov.com/blog)

License: MIT - do anything with the code, but don't blame me if it does not work.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/cypress-book/issues) on Github

## MIT License

Copyright (c) 2020 Gleb Bahmutov &lt;gleb.bahmutov@gmail.com&gt;

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

[ci image]: https://github.com/bahmutov/cypress-book/workflows/ci/badge.svg?branch=main
[ci url]: https://github.com/bahmutov/cypress-book/actions
[badges image]: https://github.com/bahmutov/cypress-book/workflows/badges/badge.svg?branch=main
[badges url]: https://github.com/bahmutov/cypress-book/actions
[renovate-badge]: https://img.shields.io/badge/renovate-app-blue.svg
[renovate-app]: https://renovateapp.com/
