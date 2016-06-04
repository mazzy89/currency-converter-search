import 'babel-polyfill'

import Config from 'config'
import Seneca from 'seneca'
import Search from './srv/search'

const Service = Seneca({ log: Config.seneca.log })

Service
  .listen({ host: Config.seneca.host, port: Config.seneca.port })
  .use(Search, { FIXER_URI: Config.fixerUri })
