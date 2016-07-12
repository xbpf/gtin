'use strict'

var common = require('./common')

function validate (barcode) {
  validateBarcodeInput(barcode)

  var checkDigit = barcode.slice(-1)
  var generatedCheckDigit = common.generateCheckDigit(
    barcode.slice(0, -1)
  )

  return (checkDigit === generatedCheckDigit)
}

function getFormat (barcode) {
  validateBarcodeInput(barcode)
  return 'GTIN-' + barcode.length
}

function minify (barcode) {
  validateBarcodeInput(barcode)
  var format = +getFormat(barcode).replace('GTIN-', '')
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

function validateBarcodeInput (barcode) {
  if (typeof barcode !== 'string') throw new Error(common.NONSTRING_ERR)
  if (!/^(\d{12,14}|\d{8})$/.test(barcode)) throw new Error(common.FORMAT_ERR)
}

exports.validate = validate
exports.minify = minify
exports.getFormat = getFormat
exports.getRealFormat = getRealFormat

exports.upce = require('./upce')
