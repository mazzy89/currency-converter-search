import 'babel-polyfill'

import Seneca from 'seneca'
import Search from './srv/search'

const opts = {
  seneca: {
    host: 'localhost',
    port: 40001
  }
}

const Service = Seneca()

Service
  .listen(opts.seneca)
  .use(Search)
