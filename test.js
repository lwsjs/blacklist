const Tom = require('test-runner').Tom
const Blacklist = require('./')
const Lws = require('lws')
const fetch = require('node-fetch')
const a = require('assert')

const tom = module.exports = new Tom('blacklist')

tom.test('simple', async function () {
  const port = 8000 + this.index
  const lws = new Lws()
  const server = lws.listen({
    port,
    stack: Blacklist,
    blacklist: '/one'
  })
  const response = await fetch(`http://localhost:${port}/one`)
  const response2 = await fetch(`http://localhost:${port}/two`)
  server.close()
  a.strictEqual(response.status, 403)
  a.strictEqual(response2.status, 404)
})

tom.test('wildcard', async function () {
  const port = 8000 + this.index
  const lws = new Lws()
  const server = lws.listen({
    port,
    stack: Blacklist,
    blacklist: '/(.*).php'
  })
  const response = await fetch(`http://localhost:${port}/one.php`)
  const response2 = await fetch(`http://localhost:${port}/two`)
  server.close()
  a.strictEqual(response.status, 403)
  a.strictEqual(response2.status, 404)
})
