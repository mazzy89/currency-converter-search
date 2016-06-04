import test from 'ava'
import Config from 'getconfig'
import Proxyquire from 'proxyquire'
import Promise from 'bluebird'

import ratesData from './rates-data'

const Seneca = Proxyquire('seneca', {})
const Search = Proxyquire('..', {
  'request-promise': () => Promise.resolve(ratesData)
})

function createInstance () {
  const opts = {}

  const fixer = Config.fixer

  return Seneca(opts)
    .use(Search, fixer)
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
