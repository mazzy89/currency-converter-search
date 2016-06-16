export default (deps) => {
  // inject ext dependencies
  const { getLatest } = deps
  // plugin options
  var defaults = {
    uri: 'NO_URL'
  }

  return function (options) {
    const seneca = this
    const plugin = 'currency-converter-search'
    const extend = seneca.util.deepextend

    options = extend(defaults, options)

    seneca.add({ role: 'search', cmd: 'latest' }, latest)

    async function latest (msg, respond) {
      const context = this
      const { query } = msg

      context.log.debug('Fetching latest rates')

      try {
        const latest = await getLatest(options.uri, query)

        respond(null, { ok: true, data: latest })
      }
      catch (err) {
        respond(null, { ok: false, err })
      }
    }

    return {
      name: plugin
    }
  }
}
