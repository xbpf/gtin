export const NONSTRING_ERR = 'Barcode must be a string'
export const EMPTY_CODE_ERR = 'Barcode must not be an empty string'
export const FORMAT_ERR = 'Barcode is not of a valid format'

function to13Digits (barcode: string) {
  return barcode.padStart(13, '0')
}

// This assumes the barcode does not have a check digit,
// AND has a number system on it.
export function generateCheckDigit (barcode: string) {
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
