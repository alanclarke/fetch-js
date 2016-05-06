/* globals describe beforeEach afterEach it */
var expect = require('expect.js')
var appendScript = require('../index')

describe('append-script', function () {
  var serverUrl = '//' + window.location.hostname + ':' + '7788'
  beforeEach(function () {
    window.hello = undefined
  })
  afterEach(function () {
    window.hello = undefined
  })
  it('should execute a script and then trigger the callback', function (done) {
    appendScript('/base/test/fixtures/win.js', function (err) {
      expect(err).to.be(undefined)
      expect(window.hello).to.eql('hello')
      done()
    })
  })
  it('should work cross domain', function (done) {
    appendScript(serverUrl + '/respond/window.hello="hello"', function (err) {
      expect(err).to.be(undefined)
      expect(window.hello).to.eql('hello')
      done()
    })
  })
  it('should remove itself once complete', function (done) {
    var el
    el = appendScript('/base/test/fixtures/win.js', function () {
      expect(el.parentElement).to.eql(null)
      done()
    })
    expect(el.parentElement).to.eql(document.head)
  })
  it('should work multiple consecutive times with same file', function (done) {
    appendScript('/base/test/fixtures/win.js', function (err) {
      expect(err).to.be(undefined)
      expect(window.hello).to.eql('hello')
      window.hello = undefined
      appendScript('/base/test/fixtures/win.js', function (err) {
        expect(err).to.be(undefined)
        expect(window.hello).to.eql('hello')
        done()
      })
    })
  })
  it('should work multiple consecutive times when file is cached', function (done) {
    appendScript(serverUrl + '/cache/respond/window.hello="hello"', function (err) {
      expect(err).to.be(undefined)
      expect(window.hello).to.eql('hello')
      window.hello = undefined
      appendScript(serverUrl + '/cache/respond/window.hello="hello"', function (err) {
        expect(err).to.be(undefined)
        expect(window.hello).to.eql('hello')
        done()
      })
    })
  })
  it('should error if the script fails to load', function (done) {
    appendScript('/base/test/fixtures/i-dont-exist.js', function (err) {
      expect(err).not.to.be(undefined)
      done()
    })
  })
  it('should error if the script responds with a bad status', function (done) {
    appendScript(serverUrl + '/status/404', function (err) {
      expect(err).not.to.be(undefined)
      done()
    })
  })
})
