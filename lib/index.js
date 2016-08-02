import 'babel-polyfill'

import Config from 'getconfig'
import Seneca from 'seneca'
import Search from './srv/search'

// import dependency and inject in the plugin
import { getLatest } from './helpers/api'


const {
  seneca,
  isolated,
  fixer
} = Config

const deps = {
  getLatest
}

const Service = Seneca(seneca)

Service
  .use('entity')
  .use('joi')
  .use(Search(deps), fixer)
  .listen(isolated)
