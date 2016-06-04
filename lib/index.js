import 'babel-polyfill'

import config from 'getconfig'
import Seneca from 'seneca'
import Search from './srv/search'

const opts = {
  seneca: {
    host: config.seneca.host,
    port: config.seneca.port
  }
}

const Service = Seneca()

Service
  .listen(opts.seneca)
  .use(Search, { FIXER_URI: config.fixerUri })
