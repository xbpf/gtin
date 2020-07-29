`master`
===

## Breaking changes

- Minimum supported Node.js version is now `10`.

  Note that this library may still work with older versions, but no
  effort will be made to fix this library to support those versions.

- Support for browsers that don't support `String.padStart` (e.g. all IE and opera mini versions) has been removed.

  Use [Babel](https://babeljs.io/) if you need to support older browsers.

- API rename
  - `gtin.validate` is now `gtin.isValid`
  - `gtin.upce` is now `gtin.upcE`

    Alternatively, you can also import the UPC-E functions directly:
    `import upcE from 'gtin/lib/upc-e'`

## Other changes

- TODO: Typescript support

--------------------------------------------------------------------------------

`0.3.0`
===

Initial release.
