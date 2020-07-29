import {
  generateCheckDigit,

  NONSTRING_ERR,
  EMPTY_CODE_ERR,
  FORMAT_ERR
} from './common'
import * as upcE from './upc-e'

export { upcE }

export function isGTIN (barcode: string) {
  if (typeof barcode !== 'string') throw new Error(NONSTRING_ERR)
  if (barcode === '') throw new Error(EMPTY_CODE_ERR)
  return (
    /^(\d{12,14}|\d{8})$/.test(barcode)
  )
}

function assertIsGTIN (barcode: string): asserts barcode is string {
  if (!isGTIN(barcode)) throw new Error(FORMAT_ERR)
}

export function isValid (barcode: string) {
  assertIsGTIN(barcode)

  const checkDigit = barcode.slice(-1)
  const generatedCheckDigit = generateCheckDigit(barcode.slice(0, -1))

  return checkDigit === generatedCheckDigit
}

export function getFormat (barcode: string) {
  assertIsGTIN(barcode)

  return `GTIN-${barcode.length}`
}

export function minify (barcode: string): string {
  assertIsGTIN(barcode)

  const format = getFormat(barcode)
  switch (format) {
    case 'GTIN-14':
      return barcode.replace(/^(0{6}|0{1,2})/, '')
    case 'GTIN-13':
      return barcode.replace(/^(0{5}|0{1})/, '')
    case 'GTIN-12':
      return barcode.replace(/^0{4}/, '')
    case 'GTIN-8':
      return barcode
  }

  throw new Error('Unknown barcode format')
}

export function getRealFormat (barcode: string) {
  return getFormat(minify(barcode))
}
