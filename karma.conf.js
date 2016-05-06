module.exports = function (config) {
  config.set({
    frameworks: ['mocha', 'server-stub'],
    files: [ 'test/test-*', { pattern: 'test/fixtures/**', included: false } ],
    preprocessors: { '**/*.js': ['webpack', 'sourcemap'] },
    webpack: {
      watch: true,
      devtool: 'inline-source-map'
    },
    webpackServer: {
      quiet: true,
      noInfo: true
    },
    browsers: ['Chrome']
  })
  config.plugins.push(require('./test/helpers/server'))
}
