'use strict'

var padStart = require('lodash.padstart')

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
  return padStart((
    barcode.length === 14
    ? barcode.slice(1)
    : barcode
  ), 13, '0')
}
