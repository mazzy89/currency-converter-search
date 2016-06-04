import test from 'ava'
import config from 'getconfig'
import Proxyquire from 'proxyquire'
import Promise from 'bluebird'

import ratesData from './rates-data'

const Seneca = Proxyquire('seneca', {})
const Search = Proxyquire('..', {
  'request-promise': () => {
    return Promise.resolve(ratesData)
  }
})

function createInstance () {
  const opts = {}

  return Seneca(opts)
    .use(Search, { FIXER_URI: config.fixerUri })
}

test.beforeEach(t => {
  const seneca = createInstance()
  t.context.act = Promise.promisify(seneca.act, { context: seneca })
})

test('role:search,cmd:latest - returns the latest foreign exchange reference rates', async t => {
  const act = t.context.act

  const reply = await act({ role: 'search', cmd: 'latest' })

  t.truthy(reply)
  t.true(reply.fake)
})
