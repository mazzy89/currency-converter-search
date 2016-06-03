import Wreck from 'wreck'
import Promise from 'bluebird'

const getAsync = Promise.promisify(Wreck.get, { context: Wreck, multiArgs: true })

// NOTE: it is not possible to use at the moment export default
module.exports = function () {
  const seneca = this

  seneca.add({ role: 'search', cmd: 'latest' }, latest)

  return {
    name: 'currency-converter-search'
  }
}

async function latest (args, done) {
  const context = this

  // TODO: move and move to module opts
  const url = 'http://api.fixer.io/latest'

  try {
    context.log.debug('Fetching latest rates')

    const [, payload] = await getAsync(url, { json: true })

    console.log(payload)

    done(null, payload)
  }
  catch (err) {
    done(err)
  }
}
