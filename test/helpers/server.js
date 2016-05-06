var cors = require('cors')
var express = require('express')
var app = express()
var CacheControl = require('express-cache-control')
var cache = new CacheControl().middleware

app.all('/status/:status', cors(), function (req, res) {
  res.status(Number(req.params.status)).send()
})

app.all('/respond/:response', cors(), function (req, res) {
  res.status(200).send(req.params.response)
})

app.all('/cache/respond/:response', cors(), cache('hours', 4), function (req, res) {
  res.status(200).send(req.params.response)
})

function serverStub (emitter) {
  app.listen(7788, function () {
    console.log('Server running on port 7788')
  })
}

serverStub.$inject = ['emitter']

module.exports = {
  'framework:server-stub': ['factory', serverStub]
}
