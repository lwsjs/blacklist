import EventEmitter from 'events'
import arrayify from 'array-back'

class Blacklist extends EventEmitter {
  description () {
    return 'Forbid access to sensitive or private resources.'
  }

  optionDefinitions () {
    return {
      name: 'blacklist',
      type: String,
      multiple: true,
      typeLabel: '{underline path} {underline ...}',
      description: 'A list of routes to forbid, e.g. `--blacklist "/admin/(.*)" "(.*).php"`'
    }
  }

  middleware (options) {
    const blacklist = arrayify(options.blacklist)
    if (blacklist.length) {
      this.emit('verbose', 'middleware.blacklist.config', { blacklist })
      return function (ctx, next) {
        const pathIsBlacklisted = blacklist.some(function (re) {
          return re.test(ctx.path)
        })
        if (pathIsBlacklisted) {
          ctx.status = 403
        } else {
          return next()
        }
      }
    }
  }
}

export default Blacklist
