import test from 'ava'
import Config from 'getconfig'
import Sinon from 'sinon'
import Seneca from 'seneca'
import Promise from 'bluebird'
import _ from 'lodash'

require('sinon-as-promised')(Promise)

// load the plugin Search
import Search from '../'

// mock data
import ratesDataEur from './rates-data-eur'
import ratesDataUsd from './rates-data-usd'

const createDepsMock = () => ({
  getLatest: Sinon.stub()
})

test.beforeEach(t => {
  const { seneca, fixer } = Config
  let opts = {}

  opts = _.merge(opts, seneca)

  const deps = createDepsMock()

  const Service = Seneca(opts)
    .use(Search(deps), fixer)

  t.context.deps = deps
  t.context.Service = Promise.promisifyAll(Service)
})

test('role:search,cmd:latest - returns the latest foreign exchange reference rates for default base (EUR)', async t => {
  const deps = t.context.deps
  const Service = t.context.Service

  const uri = Config.fixer.uri

  deps.getLatest.withArgs(uri)
              .resolves(ratesDataEur)

  const reply = await Service.actAsync({ role: 'search', cmd: 'latest' })

  t.truthy(reply)
  t.is(reply.ok, true)
  t.is(reply.data.base, 'EUR')
  t.is(reply.data.date, '2016-06-02')
})

test('role:search,cmd:latest,query:USD - returns the latest foreign exchange reference rates for USD currency', async t => {
  const deps = t.context.deps
  const Service = t.context.Service

  const uri = Config.fixer.uri
  const query = 'USD'

  deps.getLatest.withArgs(uri, query)
              // NOTE: wrap this inside a promise because
              // await is waiting for a promise
              .resolves(ratesDataUsd)

  const reply = await Service.actAsync({ role: 'search', cmd: 'latest', query })

  t.truthy(reply)
  t.is(reply.ok, true)
  t.is(reply.data.base, 'USD')
  t.is(reply.data.date, '2016-06-03')
})

test('role:search,cmd:latest,query:ZZZ - throws an error when passing as query an invalid base', async t => {
  const deps = t.context.deps
  const Service = t.context.Service

  const uri = Config.fixer.uri
  const query = 'ZZZ'

  deps.getLatest.withArgs(uri, query)
              .rejects(new Error('Invalid base'))

  const reply = await Service.actAsync({ role: 'search', cmd: 'latest', query })

  t.truthy(reply)
  t.is(reply.ok, false)
})
