const upce = require('../upce')

test.each([
  ['1200000789', '01278907'],
  ['12000007897', '01278907'],
  ['012000007897', '01278907'],
  ['012000007896', '01278906'],
  ['012300000890', '01238930'],
  ['012910000090', '01291940'],
  ['012911000050', '01291150']
])('gtin.upce.compress(%p) (compressable: %p)', (originalBarcode, compressedBarcode) => {
  expect(upce.compress(originalBarcode)).toBe(compressedBarcode)
})

test.each([
  ['1234567890'],
  ['12345678905'],
  ['012345678905']
])('gtin.upce.compress() (uncompressable)', (barcode) => {
  expect(upce.compress(barcode)).toBe(null)
})

test.each([
  [123, 'Barcode must be a string'],
  ['123', 'Barcode is not of a valid format'],
  ['abc', 'Barcode is not of a valid format']
])('gtin.upce.compress(barcode) (invalid)', (barcode, expectedError) => {
  expect(() => upce.compress(barcode)).toThrow(expectedError)
})

test.each([
  ['127890', '012000007897'],
  ['1278907', '012000007897'],
  ['01278907', '012000007897'],
  ['01278906', '012000007896'],
  ['01238930', '012300000890'],
  ['01291940', '012910000090'],
  ['01291150', '012911000050']
])('gtin.upce.expand(%p) (expandable: %p)', (originalBarcode, expandedBarcode) => {
  expect(upce.expand(originalBarcode)).toBe(expandedBarcode)
})

test.each([
  [123, 'Barcode must be a string'],
  ['123412341', 'Barcode is not of a valid format'],
  ['123', 'Barcode is not of a valid format'],
  ['abc', 'Barcode is not of a valid format']
])('gtin.upce.expand(%p) (error: %p)', (barcode, expectedError) => {
  expect(() => upce.expand(barcode)).toThrow(expectedError)
})
