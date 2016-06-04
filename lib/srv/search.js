import Request from 'request-promise'

// NOTE: it is not possible to use at the moment export default
module.exports = function (options) {
  const seneca = this

  seneca.add({ role: 'search', cmd: 'latest' }, latest)

  return {
    name: 'currency-converter-search'
  }
}

async function latest (args, done) {
  const context = this

  // TODO: move and move to module opts
  const uri = 'http://api.fixer.io/latest'

  try {
    context.log.debug('Fetching latest rates')

    const opts = {
      uri,
      json: true
    }

    const latest = await Request(opts)

    done(null, latest)
  }
  catch (err) {
    done(err)
  }
}
