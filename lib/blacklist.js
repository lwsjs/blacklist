'use strict'

class Blacklist {
  optionDefinitions () {
    return {
      name: 'forbid',
      alias: 'b',
      type: String,
      multiple: true,
      typeLabel: '[underline]{path} ...',
      description: 'A list of forbidden routes.'
    }
  }

  middleware (options) {
    const arrayify = require('array-back')
    const forbidList = arrayify(options.forbid)
    if (forbidList.length) {
      const pathToRegexp = require('path-to-regexp')
      return function blacklist (ctx, next) {
        if (forbidList.some(expression => pathToRegexp(expression).test(ctx.path))) {
          ctx.status = 403
        } else {
          return next()
        }
      }
    }
  }
}

module.exports = Blacklist
