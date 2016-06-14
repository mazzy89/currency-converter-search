import test from 'ava'
import Config from 'getconfig'
import Sinon from 'sinon'
import Seneca from 'seneca'
import Promise from 'bluebird'

// load the plugin Search
import Search from '../'

// mock data
import ratesDataEur from './rates-data-eur'
import ratesDataUsd from './rates-data-usd'

const createDepsMock = () => ({
  Request: Sinon.stub()
})

test.beforeEach(t => {
  const fixer = Config.fixer
  const opts = {}

  const deps = createDepsMock()

  const Service = Seneca(opts)
    .use(Search(deps), fixer)

  t.context.deps = deps
  t.context.Service = Promise.promisifyAll(Service)
})

test('role:search,cmd:latest - returns the latest foreign exchange reference rates for default base (EUR)', async t => {
  const deps = t.context.deps
  const Service = t.context.Service

  const requestOpts = {
    uri: `${Config.fixer.uri}/latest?base=EUR`,
    json: true
  }

  deps.Request.withArgs(requestOpts)
              .returns(Promise.resolve(ratesDataEur))

  const reply = await Service.actAsync({ role: 'search', cmd: 'latest' })

  t.truthy(reply)
  t.is(reply.base, 'EUR')
  t.is(reply.date, '2016-06-02')
})

test('role:search,cmd:latest,query:USD - returns the latest foreign exchange reference rates for USD currency', async t => {
  const deps = t.context.deps
  const Service = t.context.Service

  const requestOpts = {
    uri: `${Config.fixer.uri}/latest?base=USD`,
    json: true
  }

  deps.Request.withArgs(requestOpts)
              .returns(Promise.resolve(ratesDataUsd))

  const reply = await Service.actAsync({ role: 'search', cmd: 'latest', query: 'USD' })

  t.truthy(reply)
  t.is(reply.base, 'USD')
  t.is(reply.date, '2016-06-03')
})
