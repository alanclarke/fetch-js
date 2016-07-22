# Fetch js

Reliably fetch scripts and execute callbacks once evaluated

It really is just that, but you know, cross browser testing etc.

Works in all good browsers and ie9+

## usage
```js
var fetchJs = require('fetch-js')

fetchJs('http://mycdn.com/hulu-js-frameworks/cheese.js', function (err) {
  if (err) return handleError(err)
  // win
})
```

## run tests
```js
npm test
```
## Want to work on this for your day job?

This project was created by the Engineering team at Qubit. As we use open source libraries, we make our projects public where possible.

We’re currently looking to grow our team, so if you’re a JavaScript engineer and keen on ES2016 React+Redux applications and Node micro services, why not get in touch? Work with like minded engineers in an environment that has fantastic perks, including an annual ski trip, yoga, a competitive foosball league, and copious amounts of yogurt.

Find more details on our Engineering site. Don’t have an up to date CV? Just link us your Github profile! Better yet, send us a pull request that improves this project.`
Contact GitHub API Training Shop Blog About
