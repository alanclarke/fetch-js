# Append script

Reliably append scripts to pages and execute callbacks once evaluated

It really is just that, but you know, cross browser testing etc.

Works in all good browsers and ie9+

## usage
```js
var appendScript = require('append-script')

appendScript('http://mycdn.com/hulu-js-frameworks/cheese.js', function (err) {
  if (err) return handleError(err)
  // win
})
```

## run tests
```js
npm test
```
