import 'babel-polyfill'

import Seneca from 'seneca'

const opts = {
  seneca: {
    host: 'localhost',
    port: 40001
  }
}

const Service = Seneca()

Service
  .listen(opts.seneca)
  .use('./srv/search.js')
