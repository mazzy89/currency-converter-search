export default (deps) => {
  // inject ext dependencies
  const { getLatest } = deps
  // plugin options
  var opts = {
    uri: 'NO_URL'
  }

  return function (options) {
    const seneca = this
    const plugin = 'currency-converter-search'
    const extend = seneca.util.deepextend

    opts = extend(opts, options)

    seneca.add({ role: 'search', cmd: 'latest' }, latest)

    async function latest (msg, respond) {
      const context = this
      const { query } = msg

      context.log.debug('Fetching latest rates')

      try {
        const latest = await getLatest(opts.uri, query)

        respond(null, latest)
      }
      catch (err) {
        respond(err)
      }
    }

    return {
      name: plugin
    }
  }
}
