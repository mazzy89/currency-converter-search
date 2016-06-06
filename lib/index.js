import 'babel-polyfill'

import Config from 'getconfig'
import Seneca from 'seneca'
import Search from './srv/search'

const {
  seneca,
  isolated,
  fixer
} = Config

const Service = Seneca(seneca)

Service
  .use(Search, fixer)
  .listen(isolated)
