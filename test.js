const Tom = require('test-runner').Tom
const Blacklist = require('./')
const Lws = require('lws')
const fetch = require('node-fetch')
const a = require('assert').strict

const tom = module.exports = new Tom()

tom.test('simple', async function () {
  const port = 8000 + this.index
  const lws = Lws.create({
    port,
    stack: Blacklist,
    blacklist: '/one'
  })
  const response = await fetch(`http://localhost:${port}/one`)
  const response2 = await fetch(`http://localhost:${port}/two`)
  lws.server.close()
  a.equal(response.status, 403)
  a.equal(response2.status, 404)
})

tom.test('wildcard', async function () {
  const port = 8000 + this.index
  const lws = Lws.create({
    port,
    stack: Blacklist,
    blacklist: '/(.*).php'
  })
  const response = await fetch(`http://localhost:${port}/one.php`)
  const response2 = await fetch(`http://localhost:${port}/two`)
  lws.server.close()
  a.equal(response.status, 403)
  a.equal(response2.status, 404)
})
