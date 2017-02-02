gtin
===

[![Greenkeeper badge](https://badges.greenkeeper.io/xbpf/gtin.svg)](https://greenkeeper.io/)

[![npm version](https://img.shields.io/npm/v/gtin.svg?style=flat-square)](https://npmjs.com/package/gtin)
[![javascript standard style](https://img.shields.io/badge/code%20style-standard-blue.svg?style=flat-square)](http://standardjs.com/)
[![travis build](https://img.shields.io/travis/xbpf/gtin/master.svg?style=flat-square)](https://travis-ci.org/xbpf/gtin)
[![coveralls coverage](https://img.shields.io/coveralls/xbpf/gtin.svg?style=flat-square)](https://coveralls.io/github/xbpf/gtin)
[![david dependencies](https://david-dm.org/xbpf/gtin.svg?style=flat-square)](https://david-dm.org/xbpf/gtin)
[![david dev dependencies](https://david-dm.org/xbpf/gtin/dev-status.svg?style=flat-square)](https://david-dm.org/xbpf/gtin)


GTIN (UPC, EAN, ITF, etc.) utilities.

`npm install gtin`

---

* [gtin.isGTIN(barcode)](#user-content-gtin-isGTIN)
* [gtin.validate(barcode)](#user-content-gtin-validate)
* [gtin.minify(barcode)](#user-content-gtin-minify)
* [gtin.getFormat(barcode)](#user-content-gtin-getFormat)
* [gtin.getRealFormat(barcode)](#user-content-gtin-getRealFormat)
* [gtin.upce.compress(barcode)](#user-content-gtin-upce-compress)
* [gtin.upce.expand(barcode)](#user-content-gtin-upce-expand)

---

<a id='gtin-isGTIN'></a>
`gtin.isGTIN(barcode)`
---

Returns true or false, depending on if the string given is a GTIN barcode. Throws an error if an empty string or anything other than a string is provided.

```js
import {isGTIN} from 'gtin'
isGTIN('1234')      // false
isGTIN('12341238')  // true
isGTIN('')          // Error thrown
isGTIN(123)         // Error thrown
```

<a id='gtin-validate'></a>
`gtin.validate(barcode)`
---

Validates a GTIN (14, 13, 12, or 8-digit) barcode by check digit. Barcode must be a string.

To validate a UPC-E barcode, expand it first: `validate(upce.expand('01278906'))`

```js
import {validate} from 'gtin'
validate('12341238')       // true
validate('1234123412344')  // true
validate('12341234123413') // true
validate('012000007897')   // true
validate('012000007896')   // false
validate('abc')            // Error thrown
validate(123)              // Error thrown
validate('123')            // Error thrown
```

<a id='gtin-minify'></a>
`gtin.minify(barcode)`
---

Minifies GTIN to smallest possible representation, by stripping as many leading zeroes as possible. Does not compress to UPC-E.

```js
import {minify} from 'gtin'
minify('00000012341238')  // '12341238'
minify('0000012341238')   // '12341238'
minify('01234123412344')  // '1234123412344
minify('001234123412344') // Error thrown
minify('abc')             // Error thrown
minify(123)               // Error thrown
minify('123')             // Error thrown
```

<a id='gtin-getFormat'></a>
`gtin.getFormat(barcode)`
---

Gets the format of the given barcode. Does not validate checksum.

```js
import {getFormat} from 'gtin'
getFormat('12341238')       // 'GTIN-8'
getFormat('123412341234')   // 'GTIN-12'
getFormat('1234123412344')  // 'GTIN-13'
getFormat('01234123412344') // 'GTIN-14'
getFormat('123412381')      // Error thrown
getFormat('abc')            // Error thrown
getFormat(123)              // Error thrown
getFormat('123')            // Error thrown
```

<a id='gtin-getRealFormat'></a>
`gtin.getRealFormat(barcode)`
---

Gets the real format of the given barcode, by minifying it first.

```js
import {getFormat} from 'gtin'
getFormat('1234123412344')  // 'GTIN-13'
getFormat('01234123412344') // 'GTIN-13'
getFormat('123412381')      // Error thrown
getFormat('abc')            // Error thrown
getFormat(123)              // Error thrown
getFormat('123')            // Error thrown
```

<a id='gtin-upce-compress'></a>
`gtin.upce.compress(barcode)`
---

Compress a UPC-A barcode to an 8-digit UPC-E barcode. Does not validate
code by check digit. Barcode must be a string.

* 12-digit UPC-A: Number system and check digits are taken into account.
* 11-digit UPC-A: Number system 0 is assumed. Check digit is taken into account.
* 10-digit UPC-A: Number system 0 is assumed. Check digit is generated.

```js
import {upce} from 'gtin'
upce.compress('1200000789')   // '01278907'
upce.compress('12000007897')  // '01278907'
upce.compress('012000007897') // '01278907'
upce.compress('012000007896') // '01278906'
upce.compress('012345678905') // null
upce.compress(123)            // Error thrown
upce.compress('123')          // Error thrown
upce.compress('abc')          // Error thrown
```

<a id='gtin-upce-expand'></a>
`gtin.upce.expand(barcode)`
---

Expands a UPC-E barcode to a 12-digit UPC-A barcode. Does not validate
code by check digit. Barcode must be a string.

* 8-digit UPC-E: Number system and check digits are taken into account.
* 7-digit UPC-E: Number system 0 is assumed. Check digit is taken into account.
* 6-digit UPC-E: Number system 0 is assumed. Check digit is generated.

```js
import {upce} from 'gtin'
upce.expand('127890')    // '012000007897'
upce.expand('1278907')   // '012000007897'
upce.expand('01278907')  // '012000007897'
upce.expand('01278906')  // '012000007896'
upce.expand('123412341') // Error thrown
upce.expand(123)         // Error thrown
upce.expand('123')       // Error thrown
upce.expand('abc')       // Error thrown
```
