import * as gtin from '../'

test.each([
  ['12341238'],
  ['012000007897'],
  ['1234123412344'],
  ['12341234123413']
])('gtin.isValid(%p) (valid)', barcode => {
  expect(gtin.isValid(barcode)).toBe(true)
})

test.each([
  ['1234123', 8],
  ['01200000789', 7],
  ['123412341234', 4],
  ['1234123412341', 3]
])('gtin.isValid(%p) (invalid)', (partialBarcode, lastDigit) => {
  expect.assertions(9)
  for (let i = 0; i < 10; i++) {
    if (i === lastDigit) continue
    expect(gtin.isValid(partialBarcode + i)).toBe(false)
  }
})

test.each([
  [123, 'Barcode must be a string'],
  ['abc', 'Barcode is not of a valid format'],
  ['123', 'Barcode is not of a valid format']
])('gtin.isValid(%p) (error: %p)', (barcode, expectedError) => {
  // @ts-ignore
  expect(() => gtin.isValid(barcode)).toThrow(expectedError)
})

test.each([
  ['00000012341238', '12341238'],
  ['0000012341238', '12341238'],
  ['000012341238', '12341238'],
  ['12341238', '12341238'],
  ['01234123412344', '1234123412344']
])('gtin.minify(%p) (minified)', (originalBarcode, minifiedBarcode) => {
  expect(gtin.minify(originalBarcode)).toBe(minifiedBarcode)
})

test.each([
  [123, 'Barcode must be a string'],
  ['abc', 'Barcode is not of a valid format'],
  ['123', 'Barcode is not of a valid format'],
  ['001234123412344', 'Barcode is not of a valid format']
])('gtin.minify(%p) (error: %p)', (barcode, expectedError) => {
  // @ts-ignore
  expect(() => gtin.minify(barcode)).toThrow(expectedError)
})

test.each([
  ['12341238', 'GTIN-8'],
  ['123412341234', 'GTIN-12'],
  ['1234123412344', 'GTIN-13'],
  ['01234123412344', 'GTIN-14']
])('gtin.getFormat(%p) (ok: %p)', (barcode, expectedFormat) => {
  expect(gtin.getFormat(barcode)).toBe(expectedFormat)
})

test.each([
  [123, 'Barcode must be a string'],
  ['abc', 'Barcode is not of a valid format'],
  ['123', 'Barcode is not of a valid format'],
  ['123412381', 'Barcode is not of a valid format']
])('gtin.getFormat(%p) (error: %p)', (barcode, expectedError) => {
  // @ts-ignore
  expect(() => gtin.getFormat(barcode)).toThrow(expectedError)
})

test.each([
  ['1234123412344', 'GTIN-13'],
  ['01234123412344', 'GTIN-13']
])('gtin.getRealFormat(%p) (ok: %p)', (barcode, expectedFormat) => {
  expect(gtin.getRealFormat(barcode)).toBe(expectedFormat)
})

test.each([
  [123, 'Barcode must be a string'],
  ['abc', 'Barcode is not of a valid format'],
  ['123', 'Barcode is not of a valid format'],
  ['123412381', 'Barcode is not of a valid format']
])('gtin.getRealFormat(%p) (error: %p)', (barcode, expectedError) => {
  // @ts-ignore
  expect(() => gtin.getRealFormat(barcode)).toThrow(expectedError)
})

test.each([
  ['abcdabcdabcd', false],
  ['1234', false],
  ['123412341', false],
  ['12341234123412341', false],
  ['12341234', true],
  ['123412341234', true],
  ['1234123412343', true],
  ['12341234123434', true]
])('gtin.isGTIN(%p) (ok: %p)', (barcode, expectedValue) => {
  expect(gtin.isGTIN(barcode)).toBe(expectedValue)
})

test.each([
  [123, 'Barcode must be a string'],
  [{}, 'Barcode must be a string'],
  [undefined, 'Barcode must be a string'],
  ['', 'Barcode must not be an empty string']
])('gtin.isGTIN(%p) (error: %p)', (barcode, expectedError) => {
  // @ts-ignore
  expect(() => gtin.isGTIN(barcode)).toThrow(expectedError)
})
