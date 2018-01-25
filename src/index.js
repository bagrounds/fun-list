/**
 *
 * @module fun-list
 */
;(() => {
  'use strict'

  /* imports */
  const curry = require('fun-curry')
  const { inputs } = require('guarded')
  const { map: oMap, ap: oAp } = require('fun-object')
  const { any, vector, tuple, array, fun } = require('fun-type')

  /**
   *
   * @function module:fun-list.of
   *
   * @param {*} x - item to lift into a list
   *
   * @return {Array} x in a list
   */
  const of = x => [x, []]

  /**
   *
   * @function module:fun-list.empty
   *
   * @return {Array} an empty list
   */
  const empty = () => []

  /**
   *
   * @function module:fun-list.isEmpty
   *
   * @param {Array} l - list to check
   *
   * @return {Boolean} if l is empty
   */
  const isEmpty = l => !l.length

  /**
   *
   * @function module:fun-list.isList
   *
   * @param {Array} l - item to check
   *
   * @return {Boolean} if l is a list (shallow check)
   */
  const isList = l => array(l) && isEmpty(l) || (l.length === 2 && array(l[1]))

  /**
   *
   * @function module:fun-list.isListR
   *
   * @param {Array} l - item to check
   *
   * @return {Boolean} if l is a list (deep check)
   */
  const isListR = l => isList(l) && (isEmpty(l) || isListR(l[1]))

  /**
   *
   * @function module:fun-list.prepend
   *
   * @param {*} x - item prepend
   * @param {Array} l - list to prepend to
   *
   * @return {Array} x : l
   */
  const prepend = (x, l) => [x, l]

  /**
   *
   * @function module:fun-list.map
   *
   * @param {Function} f - to map
   * @param {Array} l - list to map over
   *
   * @return {Array} f map l
   */
  const map = (f, l) => isEmpty(l) ? [] : (([x, ll]) => [f(x), map(f, ll)])(l)

  /**
   *
   * @function module:fun-list.length
   *
   * @param {Array} l - list to measure
   *
   * @return {Number} length of l
   */
  const length = l => isEmpty(l) ? 0 : 1 + length(l[1])

  /**
   *
   * @function module:fun-list.fold
   *
   * @param {Function} combine - (a, b) -> c
   * @param {*} init - initial value
   * @param {Array} l - list to fold
   *
   * @return {*} value produced by folding combine and init over l
   */
  const fold = (combine, init, l) => isEmpty(l)
    ? init
    : combine(l[0], fold(combine, init, l[1]))

  /**
   *
   * @function module:fun-list.toArray
   *
   * @param {Array} l - list to convert
   *
   * @return {Array} elements of l in an array
   */
  const toArray = l => isEmpty(l) ? [] : [l[0], ...toArray(l[1])]

  /**
   *
   * @function module:fun-list.fromArray
   *
   * @param {Array} a - array to convert
   *
   * @return {Array} elements of a in a list
   */
  const fromArray = a => a.reduceRight((l, x) => [x, l], [])

  /* exports */
  const api = { of, empty, isEmpty, isList, isListR, prepend, map, length,
    fold, toArray, fromArray }

  const guards = oMap(inputs, {
    of: vector(1),
    isEmpty: vector(1),
    isList: vector(1),
    isListR: vector(1),
    prepend: tuple([any, isList]),
    map: tuple([fun, isList]),
    length: tuple([isList]),
    fold: tuple([fun, any, isList]),
    toArray: tuple([isList]),
    fromArray: tuple([array])
  })

  module.exports = oMap(curry, oAp(guards, api))
})()

