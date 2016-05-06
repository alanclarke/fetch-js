module.exports = function fetchJs (url, cb) {
  var el = document.createElement('script')
  var loaded
  el.type = 'text\/javascript'
  el.async = true
  el.src = url
  el.onerror = el.onload = function (err) {
    if (err && err.type === 'error') return finish(err)
    if (loaded || (el.readyState && !/^(c|loade)/.test(el.readyState))) return
    return finish()
  }
  document.head.appendChild(el)
  return el

  function finish (err) {
    loaded = true
    if (el.parentElement) el.parentElement.removeChild(el)
    return cb && cb(err)
  }
}
