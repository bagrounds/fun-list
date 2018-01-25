;(() => {
  'use strict'

  /* imports */
  const arrange = require('fun-arrange')
  const { equalDeep } = require('fun-predicate')
  const { sync } = require('fun-test')
  const { ap, get } = require('fun-object')
  const { add, mul } = require('fun-scalar')
  const { map } = require('fun-array')
  const { compose } = require('fun-function')

  const tests = map(
    compose(
      ap({ predicate: equalDeep, contra: get }),
      arrange({ inputs: 0, predicate: 1, contra: 2 })
    ),
    [
      [[1], [1, []], 'of'],
      [[[1, []]], false, 'isEmpty'],
      [[[]], true, 'isEmpty'],
      [[[]], true, 'isList'],
      [[[1, []]], true, 'isList'],
      [[[1, [], 2]], false, 'isList'],
      [[[1]], false, 'isList'],
      [[[]], true, 'isListR'],
      [[[1, []]], true, 'isListR'],
      [[[1, [2, []]]], true, 'isListR'],
      [[[1, [2]]], false, 'isListR'],
      [[[1]], false, 'isListR'],
      [[], [], 'empty'],
      [[1, []], [1, []], 'prepend'],
      [[2, [1, []]], [2, [1, []]], 'prepend'],
      [[mul(2), [1, [2, []]]], [2, [4, []]], 'map'],
      [[mul(2), []], [], 'map'],
      [[[1, [2, [3, []]]]], 3, 'length'],
      [[[1, [2, []]]], 2, 'length'],
      [[[1, []]], 1, 'length'],
      [[[]], 0, 'length'],
      [[add, 0, [1, [2, [3, []]]]], 6, 'fold'],
      [[add, 0, []], 0, 'fold'],
      [[mul, 1, [2, [3, [4, []]]]], 24, 'fold'],
      [[mul, 1, []], 1, 'fold'],
      [[[2, [3, [4, []]]]], [2, 3, 4], 'toArray'],
      [[[2, 3, 4]], [2, [3, [4, []]]], 'fromArray']
    ]
  )

  /* exports */
  module.exports = map(sync, tests)
})()

