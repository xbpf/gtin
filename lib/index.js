const common = require('./common')

function isGTIN (barcode) {
  if (typeof barcode !== 'string') throw new Error(common.NONSTRING_ERR)
  if (barcode === '') throw new Error(common.EMPTY_CODE_ERR)
  return (
    /^(\d{12,14}|\d{8})$/.test(barcode)
  )
}

function assertIsGTIN (barcode) {
  if (!isGTIN(barcode)) throw new Error(common.FORMAT_ERR)
}

function isValid (barcode) {
  assertIsGTIN(barcode)

  const checkDigit = barcode.slice(-1)
  const generatedCheckDigit = common.generateCheckDigit(barcode.slice(0, -1))

  return checkDigit === generatedCheckDigit
}

function getFormat (barcode) {
  assertIsGTIN(barcode)

  return `GTIN-${barcode.length}`
}

function minify (barcode) {
  assertIsGTIN(barcode)

  const format = +getFormat(barcode).replace('GTIN-', '')
  switch (format) {
    case 14:
      return barcode.replace(/^(0{6}|0{1,2})/, '')
    case 13:
      return barcode.replace(/^(0{5}|0{1})/, '')
    case 12:
      return barcode.replace(/^0{4}/, '')
    case 8:
      return barcode
  }
}

function getRealFormat (barcode) {
  return getFormat(minify(barcode))
}

exports.isGTIN = isGTIN
exports.isValid = isValid
exports.minify = minify
exports.getFormat = getFormat
exports.getRealFormat = getRealFormat

exports.upcE = require('./upc-e')
