'use strict'
const test = require('tape')
const Blacklist = require('../')
const c = require('./')

test('blacklist', function (t) {
  const blacklist = new Blacklist()
  const mw = blacklist.middleware({ forbid: [
    '*.txt', '/ignore'
  ]})

})
