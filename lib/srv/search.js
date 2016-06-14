var opts = {
  uri: 'NO_URL'
}

export default function ({ Request }) {
  return function (options) {
    const seneca = this
    const plugin = 'currency-converter-search'
    const extend = seneca.util.deepextend

    opts = extend(opts, options)

    seneca.add({ role: 'search', cmd: 'latest' }, latest)

    async function latest ({ query = 'EUR' }, done) {
      const context = this

      try {
        context.log.debug('Fetching latest rates')

        const requestOpts = {
          uri: `${opts.uri}/latest?base=${query}`,
          json: true
        }

        const latest = await Request(requestOpts)

        done(null, latest)
      }
      catch (err) {
        done(err)
      }
    }

    return {
      name: plugin
    }
  }
}
