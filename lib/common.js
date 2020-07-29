'use strict'

// This assumes the barcode does not have a check digit,
// AND has a number system on it.
function generateCheckDigit (barcode) {
  return String(
    (
      10 - (
        (
          to13Digits(barcode)
          .split('')
          .map(function (num, idx) {
            return (+num) * ((idx % 2 === 0) ? 3 : 1)
          })
          .reduce(function (prev, cur) {
            return prev + cur
          })
        ) % 10
      )
    ) % 10
  )
}

exports.generateCheckDigit = generateCheckDigit

function to13Digits (barcode) {
  return barcode.padStart(13, '0')
}

exports.NONSTRING_ERR = 'Barcode must be a string'
exports.EMPTY_CODE_ERR = 'Barcode must not be an empty string'
exports.FORMAT_ERR = 'Barcode is not of a valid format'
