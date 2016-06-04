import Request from 'request-promise'

var opts = {
  FIXER_URI: 'NO_URL'
}

// NOTE: it is not possible to use at the moment export default
module.exports = function (options) {
  const seneca = this
  const extend = seneca.util.deepextend

  opts = extend(opts, options)

  seneca.add({ role: 'search', cmd: 'latest' }, latest)

  return {
    name: 'currency-converter-search'
  }
}

async function latest (args, done) {
  const context = this

  try {
    context.log.debug('Fetching latest rates')

    const rpOpts = {
      uri: `${opts.FIXER_URI}/latest`,
      json: true
    }

    const latest = await Request(rpOpts)

    done(null, latest)
  }
  catch (err) {
    done(err)
  }
}
