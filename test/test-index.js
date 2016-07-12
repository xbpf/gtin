'use strict'

import test from 'ava'

import gtin from '../'

test('gtin.validate(barcode) (valid)', t => {
  t.plan(4)

  const cases = [
    '12341238',
    '012000007897',
    '1234123412344',
    '12341234123413'
  ]

  for (let testCase of cases) {
    t.is(gtin.validate(testCase), true)
  }
})

test('gtin.validate(barcode) (invalid)', t => {
  t.plan(4 * 9)

  const cases = [
    ['1234123', 8],
    ['01200000789', 7],
    ['123412341234', 4],
    ['1234123412341', 3]
  ]

  for (let testCase of cases) {
    for (let i = 0; i < 10; i++) {
      if (i === testCase[1]) continue
      t.is(gtin.validate(testCase[0] + String(i)), false)
    }
  }
})

test('gtin.validate(barcode) (error)', t => {
  t.plan(3)

  const cases = [
    [123, 'Barcode must be a string'],
    ['abc', 'Barcode is not of a valid format'],
    ['123', 'Barcode is not of a valid format']
  ]

  for (let testCase of cases) {
    try {
      gtin.validate(testCase[0])
      t.fail('Error not thrown')
    } catch (err) {
      t.is(err.message, testCase[1])
    }
  }
})
