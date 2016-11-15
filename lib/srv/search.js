import Joi from 'joi'

export default ({ getLatest }) => {
  // inject ext dependencies
  // plugin options
  var defaults = {
    uri: 'NO_URL'
  }

  return function (options) {
    const seneca = this
    // TODO: use the package.json name property
    const plugin = 'currency-converter-search'
    const extend = seneca.util.deepextend

    options = extend(defaults, options)

    seneca.add({ role: 'search', cmd: 'latest' }, latest)
    seneca.add({ role: 'search', cmd: 'latest', query: Joi.string() }, latestByQuery)

    async function latest (msg, respond) {
      const context = this

      context.log.debug('Fetching latest rates')

      try {
        const data = await getLatest(options.uri)

        respond(null, { ok: true, data })
      }
      catch (err) {
        respond(null, { ok: false, err })
      }
    }

    async function latestByQuery (msg, respond) {
      const context = this
      const { query } = msg

      context.log.debug(`Fetching latest rates by base ${query}`)

      try {
        const data = await getLatest(options.uri, query)

        respond(null, { ok: true, data })
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
