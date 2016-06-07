import test from 'ava'
import Config from 'getconfig'
import Proxyquire from 'proxyquire'
import Promise from 'bluebird'
import Url from 'url'

import ratesDataEur from './rates-data-eur'
import ratesDataUsd from './rates-data-usd'

const Seneca = Proxyquire('seneca', {})
const Search = Proxyquire('..', {
  'request-promise': (opts) => {
    const parsedUri = Url.parse(opts.uri, true)
    if (parsedUri.query.base === 'USD') {
      return Promise.resolve(ratesDataUsd)
    }
    else {
      return Promise.resolve(ratesDataEur)
    }
  }
})

function createInstance () {
  const fixer = Config.fixer
  const opts = {}

  return Seneca(opts)
    .use(Search, fixer)
}

test.beforeEach(t => {
  const seneca = createInstance()
  t.truthy(seneca)
  t.context.act = Promise.promisify(seneca.act, { context: seneca })
})

test('role:search,cmd:latest - returns the latest foreign exchange reference rates for default base (EUR)', async t => {
  const act = t.context.act

  const reply = await act({ role: 'search', cmd: 'latest' })

  t.truthy(reply)
  t.is(reply.base, 'EUR')
  t.is(reply.date, '2016-06-02')
})

test('role:search,cmd:latest,query:USD - returns the latest foreign exchange reference rates for USD currency', async t => {
  const act = t.context.act

  const reply = await act({ role: 'search', cmd: 'latest', query: 'USD' })

  t.truthy(reply)
  t.is(reply.base, 'USD')
  t.is(reply.date, '2016-06-03')
})
