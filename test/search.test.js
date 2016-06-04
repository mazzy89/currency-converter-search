// TODO: find another solution instead to include it
// at the beginning of the file
import 'babel-polyfill'

import Code from 'code'
import Lab from 'lab'
import Proxyquire from 'proxyquire'
import Promise from 'bluebird'

import ratesData from './rates-data'

const lab = exports.lab = Lab.script()

const suite = lab.suite
const test = lab.test
const expect = Code.expect

const Seneca = Proxyquire('seneca', {})
// FIXME: understand how to mock request
const Search = Proxyquire('..', {
  getAsync: (url, opts, res, payload) => {
    return Promise.resolve(payload)
  }
})

function createInstance (done) {
  const opts = {}

  return Seneca(opts)
    .use(Search)
}

suite('role:search', () => {
  suite('cmd:latest', () => {
    test('returns the latest foreign exchange reference rates', (done) => {
      const seneca = createInstance(done)

      seneca.act({ role: 'search', cmd: 'latest' }, (err, reply) => {
        expect(err).to.not.exist()
        expect(reply).to.exist()
        expect(reply).to.be.an.object()
        done()
      })
    })
  })
})
