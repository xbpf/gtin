const gtin = require('../')

test.each([
  ['1200000789', '01278907'],
  ['12000007897', '01278907'],
  ['012000007897', '01278907'],
  ['012000007896', '01278906'],
  ['012300000890', '01238930'],
  ['012910000090', '01291940'],
  ['012911000050', '01291150']
])('gtin.upcE.compress(%p) (compressable: %p)', (originalBarcode, compressedBarcode) => {
  expect(gtin.upcE.compress(originalBarcode)).toBe(compressedBarcode)
})

test.each([
  ['1234567890'],
  ['12345678905'],
  ['012345678905']
])('gtin.upcE.compress() (uncompressable)', (barcode) => {
  expect(gtin.upcE.compress(barcode)).toBe(null)
})

test.each([
  [123, 'Barcode must be a string'],
  ['123', 'Barcode is not of a valid format'],
  ['abc', 'Barcode is not of a valid format']
])('gtin.upcE.compress(barcode) (invalid)', (barcode, expectedError) => {
  expect(() => gtin.upcE.compress(barcode)).toThrow(expectedError)
})

test.each([
  ['127890', '012000007897'],
  ['1278907', '012000007897'],
  ['01278907', '012000007897'],
  ['01278906', '012000007896'],
  ['01238930', '012300000890'],
  ['01291940', '012910000090'],
  ['01291150', '012911000050']
])('gtin.upcE.expand(%p) (expandable: %p)', (originalBarcode, expandedBarcode) => {
  expect(gtin.upcE.expand(originalBarcode)).toBe(expandedBarcode)
})

test.each([
  [123, 'Barcode must be a string'],
  ['123412341', 'Barcode is not of a valid format'],
  ['123', 'Barcode is not of a valid format'],
  ['abc', 'Barcode is not of a valid format']
])('gtin.upcE.expand(%p) (error: %p)', (barcode, expectedError) => {
  expect(() => gtin.upcE.expand(barcode)).toThrow(expectedError)
})
