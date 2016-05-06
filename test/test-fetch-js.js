/* globals describe beforeEach afterEach it */
var expect = require('expect.js')
var fetchJs = require('../index')

describe('fetch-js', function () {
  var serverUrl = '//' + window.location.hostname + ':' + '7788'
  beforeEach(function () {
    window.hello = undefined
  })
  afterEach(function () {
    window.hello = undefined
  })
  it('should execute a script and then trigger the callback', function (done) {
    fetchJs('/base/test/fixtures/win.js', function (err) {
      expect(err).to.be(undefined)
      expect(window.hello).to.eql('hello')
      done()
    })
  })
  it('should work cross domain', function (done) {
    fetchJs(serverUrl + '/respond/window.hello="hello"', function (err) {
      expect(err).to.be(undefined)
      expect(window.hello).to.eql('hello')
      done()
    })
  })
  it('should remove itself once complete', function (done) {
    var el
    el = fetchJs('/base/test/fixtures/win.js', function () {
      expect(el.parentElement).to.eql(null)
      done()
    })
    expect(el.parentElement).to.eql(document.head)
  })
  it('should work multiple consecutive times with same file', function (done) {
    fetchJs('/base/test/fixtures/win.js', function (err) {
      expect(err).to.be(undefined)
      expect(window.hello).to.eql('hello')
      window.hello = undefined
      fetchJs('/base/test/fixtures/win.js', function (err) {
        expect(err).to.be(undefined)
        expect(window.hello).to.eql('hello')
        done()
      })
    })
  })
  it('should work multiple consecutive times when file is cached', function (done) {
    fetchJs(serverUrl + '/cache/respond/window.hello="hello"', function (err) {
      expect(err).to.be(undefined)
      expect(window.hello).to.eql('hello')
      window.hello = undefined
      fetchJs(serverUrl + '/cache/respond/window.hello="hello"', function (err) {
        expect(err).to.be(undefined)
        expect(window.hello).to.eql('hello')
        done()
      })
    })
  })
  it('should error if the script fails to load', function (done) {
    fetchJs('/base/test/fixtures/i-dont-exist.js', function (err) {
      expect(err).not.to.be(undefined)
      done()
    })
  })
  it('should error if the script responds with a bad status', function (done) {
    fetchJs(serverUrl + '/status/404', function (err) {
      expect(err).not.to.be(undefined)
      done()
    })
  })
})
