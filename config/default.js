module.exports = {
  seneca: {
    legacy: { validate: false },
    tag: 'currency-converter-search',
    log: {
      map: [
        { level: 'all', handler: 'print' }
      ]
    }
  },
  isolated: {
    port: 40001
  },
  fixer: {
    uri: 'https://api.fixer.io'
  }
}
