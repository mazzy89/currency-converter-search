import 'babel-polyfill'

import Config from 'getconfig'
import Seneca from 'seneca'
import Search from './srv/search'

import Request from 'request-promise'

const {
  seneca,
  isolated,
  fixer
} = Config

const Service = Seneca(seneca)

const deps = {
  Request
}

Service
  .use(Search(deps), fixer)
  .listen(isolated)
