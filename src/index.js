import 'babel-polyfill'

import Config from 'getconfig'
import Seneca from 'seneca'

import { getLatest } from './lib/api'

const {
  seneca,
  isolated,
  fixer
} = Config

const Service = Seneca(seneca)

Service
  .use(require('seneca-joi'))
  .use(require('./srv/search')({ getLatest }), fixer)
  .listen(isolated)
