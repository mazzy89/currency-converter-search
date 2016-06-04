const seneca = require('seneca')

module.exports = {
  seneca: {
    host: 'localhost',
    port: 40001,
    log: {
      map: [
        { level: 'all', handler: seneca.loghandler.print }
      ]
    }
  },
  fixerUri: 'http://api.fixer.io'
}
