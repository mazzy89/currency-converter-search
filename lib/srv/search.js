import Request from 'request-promise'

var opts = {
  uri: 'NO_URL'
}

// NOTE: it is not possible to use at the moment export default
module.exports = function (options) {
  const seneca = this
  const plugin = 'currency-converter-search'
  const extend = seneca.util.deepextend

  opts = extend(opts, options)

  seneca.add({ role: 'search', cmd: 'latest' }, latest)

  return {
    name: plugin
  }
}

async function latest (args, done) {
  const context = this

  try {
    context.log.debug('Fetching latest rates')

    const requestOpts = {
      uri: `${opts.uri}/latest`,
      json: true
    }

    const latest = await Request(requestOpts)

    done(null, latest)
  }
  catch (err) {
    done(err)
  }
}
