const NONSTRING_ERR = 'Barcode must be a string'
const EMPTY_CODE_ERR = 'Barcode must not be an empty string'
const FORMAT_ERR = 'Barcode is not of a valid format'

function to13Digits (barcode) {
  return barcode.padStart(13, '0')
}

// This assumes the barcode does not have a check digit,
// AND has a number system on it.
function generateCheckDigit (barcode) {
  return String(
    (
      10 - (
        (
          to13Digits(barcode)
            .split('')
            .map((num, idx) => (
              (+num) * ((idx % 2 === 0) ? 3 : 1)
            ))
            .reduce((prev, cur) => prev + cur)
        ) % 10
      )
    ) % 10
  )
}

exports.NONSTRING_ERR = NONSTRING_ERR
exports.EMPTY_CODE_ERR = EMPTY_CODE_ERR
exports.FORMAT_ERR = FORMAT_ERR

exports.generateCheckDigit = generateCheckDigit
