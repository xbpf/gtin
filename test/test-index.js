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

  for (const testCase of cases) {
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

  for (const testCase of cases) {
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

  for (const testCase of cases) {
    try {
      gtin.validate(testCase[0])
      t.fail('Error not thrown')
    } catch (err) {
      t.is(err.message, testCase[1])
    }
  }
})

test('gtin.minify(barcode) (minified)', t => {
  t.plan(5)

  const cases = [
    ['00000012341238', '12341238'],
    ['0000012341238', '12341238'],
    ['000012341238', '12341238'],
    ['12341238', '12341238'],
    ['01234123412344', '1234123412344']
  ]

  for (const testCase of cases) {
    t.is(
      gtin.minify(testCase[0]),
      testCase[1]
    )
  }
})

test('gtin.minify(barcode) (error)', t => {
  t.plan(4)

  const cases = [
    [123, 'Barcode must be a string'],
    ['abc', 'Barcode is not of a valid format'],
    ['123', 'Barcode is not of a valid format'],
    ['001234123412344', 'Barcode is not of a valid format']
  ]

  for (const testCase of cases) {
    try {
      gtin.minify(testCase[0])
      t.fail('Error not thrown')
    } catch (err) {
      t.is(err.message, testCase[1])
    }
  }
})

test('gtin.getFormat(barcode) (ok)', t => {
  t.plan(4)

  const cases = [
    ['12341238', 'GTIN-8'],
    ['123412341234', 'GTIN-12'],
    ['1234123412344', 'GTIN-13'],
    ['01234123412344', 'GTIN-14']
  ]

  for (const testCase of cases) {
    t.is(
      gtin.getFormat(testCase[0]),
      testCase[1]
    )
  }
})

test('gtin.getFormat(barcode) (error)', t => {
  t.plan(4)

  const cases = [
    [123, 'Barcode must be a string'],
    ['abc', 'Barcode is not of a valid format'],
    ['123', 'Barcode is not of a valid format'],
    ['123412381', 'Barcode is not of a valid format']
  ]

  for (const testCase of cases) {
    try {
      gtin.getFormat(testCase[0])
      t.fail('Error not thrown')
    } catch (err) {
      t.is(err.message, testCase[1])
    }
  }
})

test('gtin.getRealFormat(barcode) (ok)', t => {
  t.plan(2)

  const cases = [
    ['1234123412344', 'GTIN-13'],
    ['01234123412344', 'GTIN-13']
  ]

  for (const testCase of cases) {
    t.is(
      gtin.getRealFormat(testCase[0]),
      testCase[1]
    )
  }
})

test('gtin.getRealFormat(barcode) (error)', t => {
  t.plan(4)

  const cases = [
    [123, 'Barcode must be a string'],
    ['abc', 'Barcode is not of a valid format'],
    ['123', 'Barcode is not of a valid format'],
    ['123412381', 'Barcode is not of a valid format']
  ]

  for (const testCase of cases) {
    try {
      gtin.getRealFormat(testCase[0])
      t.fail('Error not thrown')
    } catch (err) {
      t.is(err.message, testCase[1])
    }
  }
})

test('gtin.isGTIN(barcode) (ok)', t => {
  t.plan(8)

  const cases = [
    ['abcdabcdabcd', false],
    ['1234', false],
    ['123412341', false],
    ['12341234123412341', false],
    ['12341234', true],
    ['123412341234', true],
    ['1234123412343', true],
    ['12341234123434', true]
  ]

  for (const testCase of cases) {
    t.is(
      gtin.isGTIN(testCase[0]),
      testCase[1]
    )
  }
})

test('gtin.isGTIN(barcode) (error)', t => {
  t.plan(4)

  const cases = [
    [123, 'Barcode must be a string'],
    [{}, 'Barcode must be a string'],
    [undefined, 'Barcode must be a string'],
    ['', 'Barcode must not be an empty string']
  ]

  for (const testCase of cases) {
    try {
      gtin.isGTIN(testCase[0])
      t.fail('Error not thrown')
    } catch (err) {
      t.is(err.message, testCase[1])
    }
  }
})
