`master`
===

## Breaking changes

- Minimum supported Node.js version is now `10`.

Note that this library may still work with older versions and browsers, but no
effort will be made to fix this library to support those versions.

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