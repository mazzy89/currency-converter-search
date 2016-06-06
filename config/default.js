module.exports = {
  seneca: {
    tag: 'currency-converter-search',
    log: {
      map: [
        { level: 'all', handler: 'print' }
      ]
    }
  },
  isolated: {
    host: 'localhost',
    port: 40001
  },
  fixer: {
    uri: 'https://api.fixer.io'
  }
}
