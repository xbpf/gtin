'use strict'

import test from 'ava'

import {upce} from '../'

test('compress examples from readme should work (compressable)', t => {
  t.plan(4)

  const cases = [
    ['1200000789', '01278907'],
    ['12000007897', '01278907'],
    ['012000007897', '01278907'],
    ['012000007896', '01278906']
  ]

  for (let testCase of cases) {
    t.is(
      upce.compress(testCase[0]),
      testCase[1]
    )
  }
})

test('compress examples from readme should work (uncompressable)', t => {
  t.plan(3)

  const cases = [
    '1234567890',
    '12345678905',
    '012345678905'
  ]

  for (let testCase of cases) {
    t.is(
      upce.compress(testCase),
      null
    )
  }
})

test('compress examples from readme should work (invalid)', t => {
  t.plan(3)

  const cases = [
    [123, 'Barcode must be a string'],
    ['123', 'Barcode is not of a valid format'],
    ['abc', 'Barcode is not of a valid format']
  ]

  for (let testCase of cases) {
    try {
      upce.compress(testCase[0])
      t.fail('Error was not thrown')
    } catch (err) {
      t.is(err.message, testCase[1])
    }
  }
})

test('expand examples from readme should work (expandable)', t => {
  t.plan(4)

  const cases = [
    ['127890', '012000007897'],
    ['1278907', '012000007897'],
    ['01278907', '012000007897'],
    ['01278906', '012000007896']
  ]

  for (let testCase of cases) {
    t.is(
      upce.expand(testCase[0]),
      testCase[1]
    )
  }
})

test('expand examples from readme should work (invalid)', t => {
  t.plan(4)

  const cases = [
    [123, 'Barcode must be a string'],
    ['123412341', 'Barcode is not of a valid format'],
    ['123', 'Barcode is not of a valid format'],
    ['abc', 'Barcode is not of a valid format']
  ]

  for (let testCase of cases) {
    try {
      upce.expand(testCase[0])
      t.fail('Error was not thrown')
    } catch (err) {
      t.is(err.message, testCase[1])
    }
  }
})
