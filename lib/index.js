'use strict'

var common = require('./common')

function validate (barcode) {
  if (typeof barcode !== 'string') throw new Error(common.NONSTRING_ERR)
  if (!/^(\d{12,14})|(\d{8})$/.test(barcode)) throw new Error(common.FORMAT_ERR)

  var checkDigit = barcode.slice(-1)
  var generatedCheckDigit = common.generateCheckDigit(
    barcode.slice(0, -1)
  )

  return (checkDigit === generatedCheckDigit)
}

exports.validate = validate

exports.upce = require('./upce')
